const express = require("express");
const router = express.Router();
const SearchProducts = require("../controllers/SearchProducts");

router.get("/search", SearchProducts);
