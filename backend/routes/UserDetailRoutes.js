const express = require("express");
const UserData = require("../controllers/UserData");
const router = express.Router();
const PasswordChange = require("../controllers/PasswordChange");
const DeleteUser = require("../controllers/DeleteUser");
const DeleteProduct = require("../controllers/DeleteProduct");
const updateProduct = require("../controllers/UpdateProduct");
const {
  DeleteItem,
  AddToCart,
  quantityChange,
} = require("../controllers/AddToCart");
const ClearCart = require("../controllers/ClearCart");

router.get("/data", UserData);
router.post("/changeUserData", PasswordChange);
router.delete("/deleteuser", DeleteUser);
router.post("/addtocart", AddToCart);
router.delete("/deletecart", DeleteItem);
router.put("/changequantity/:_id", quantityChange);
router.post("/emptycart", ClearCart);
router.delete("/deleteproduct", DeleteProduct);
router.put("/updateproduct/:productId", updateProduct);

module.exports = router;
