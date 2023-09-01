const express = require("express");
const router = express.Router();

const { register, login, getProfile } = require("../controllers/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile").get(getProfile);

module.exports = router;
