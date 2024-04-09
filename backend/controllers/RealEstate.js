const Product = require("../models/Product");

const RealEstate = async (req, res) => {
  try {
    const real_Estate = await Product.find({ category: "real_estate" });
    if (real_Estate.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found in the buy_sell category",
      });
    }
    res.status(200).json({ success: true, data: real_Estate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = RealEstate;
