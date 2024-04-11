const express = require("express");
const UserData = require("../controllers/UserData");
const router = express.Router();
const PasswordChange = require("../controllers/PasswordChange");
const DeleteUser = require("../controllers/DeleteUser");
const { deleteItem, AddToCart } = require("../controllers/AddToCart");

router.get("/data", UserData);
router.post("/changeUserData", PasswordChange);
router.delete("/deleteuser", DeleteUser);
router.post("/addtocart", AddToCart);
router.post("/deletecart", deleteItem);

module.exports = router;
