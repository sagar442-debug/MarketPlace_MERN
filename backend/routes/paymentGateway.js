const express = require("express");
const router = express.Router();
const StripePaymentMethod = require("../controllers/StripePaymentMethod");

router.post("/checkout", StripePaymentMethod);

module.exports = router;
