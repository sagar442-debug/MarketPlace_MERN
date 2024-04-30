const Product = require("../models/Product");

const updateProduct = async (req, res) => {
  const { title, description, category, price, imgUrl, altImages, size } =
    req.body;
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({ message: "No products available" });
    }

    if (title) {
      product.title = title;
    }
    if (description) {
      product.description = description;
    }
    if (price) {
      product.price = price;
    }
    if (imgUrl) {
      product.imgUrl = imgUrl;
    }
    if (altImages) {
      product.altImages = altImages;
    }
    if (category) {
      product.category = category;
    }

    if (size) {
      product.size = size;
    }

    await product.save();
    res.status(200).json({ message: "Succesfully chaged the details" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updateProduct;
