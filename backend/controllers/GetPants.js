const Product = require("../models/Product");

const GetPants = async (req, res) => {
  try {
    const category = await Product.find({ category: "pants" });
    if (category.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found in the buy_sell category",
      });
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = GetPants;
