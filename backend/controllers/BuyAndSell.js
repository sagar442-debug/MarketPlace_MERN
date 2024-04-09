const Product = require("../models/Product");

const BuyAndSell = async (req, res) => {
  try {
    const buyAndSellProducts = await Product.find({ category: "buy_sell" });
    res.status(200).json({ success: true, data: buyAndSellProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};

module.exports = BuyAndSell;
