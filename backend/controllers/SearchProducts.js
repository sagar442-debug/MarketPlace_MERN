const Products = require("../models/Product");

const searchProduct = async (req, res) => {
  try {
    const searchTerm = req.query.term;
    const products = await Products.find({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
        { size: { $regex: searchTerm, $options: "i" } },
        { price: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
      ],
    });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = searchProduct;
