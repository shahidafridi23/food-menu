const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res
    .status(StatusCodes.CREATED)
    .json({ id: user._id, name: user.name, qrcode: user.qrcode });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Wrong Email or Password!");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Wrong Email or Password!");
  }
  // compare password
  const token = user.createJWT();
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res
    .status(StatusCodes.CREATED)
    .json({ id: user._id, name: user.name, qrcode: user.qrcode });
};

const getProfile = async (req, res) => {
  try {
    const { token } = req.cookies;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.userId });
    res
      .status(StatusCodes.CREATED)
      .json({ id: user._id, name: user.name, qrcode: user.qrcode });
  } catch (error) {
    res.status(500).json({ err: error });
  }
};

module.exports = {
  register,
  login,
  getProfile,
};
