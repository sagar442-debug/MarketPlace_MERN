const express = require("express");
const router = express.Router();

const SignUp = require("../controllers/SignUp");
const Login = require("../controllers/Login");
const CheckToken = require("../controllers/CheckToken");
const UserDataChange = require("../controllers/PasswordChange");

router.post("/signup", SignUp);
router.post("/login", Login);
router.post("/check-token", CheckToken);
router.put("/chageuserdata", UserDataChange);

module.exports = router;
