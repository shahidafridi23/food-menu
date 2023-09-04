const express = require("express");
const router = express.Router();

const { register, login, getProfile, logout } = require("../controllers/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile").get(getProfile);

module.exports = router;
