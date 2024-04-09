const express = require("express");
const router = express.Router();
const multer = require("multer");
const ProductUpload = require("../controllers/Product");
const { allProducts, productDetails } = require("../controllers/AllProducts");
const upload = multer({ dest: "uploads/" });
const BuyAndSell = require("../controllers/BuyAndSell");
const RealEstate = require("../controllers/RealEstate");
const FetchingProduct = require("../controllers/FetchingProduct");
const GetPants = require("../controllers/GetPants");

router.post("/products", ProductUpload);
router.get("/allproduct", allProducts);
// router.get("/buy_sell", BuyAndSell);
// router.get("/realestate", RealEstate);
// router.get("/pants", GetPants);
router.get("/find/", allProducts);
router.get("/:text", FetchingProduct);
router.get("/product/:id", productDetails);

module.exports = router;
