const Product = require("../models/Product");

const DeleteProduct = async (req, res) => {
  const productId = req.body.productId;

  try {
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      res.status(400).json({ message: "No product found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = DeleteProduct;
