const Product = require("../models/Product");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const ProductUpload = async (req, res) => {
  const {
    title,
    description,
    category,
    price,
    imgUrl,
    altImages,
    size,
    uploadedBy,
  } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const newProduct = new Product({
      title,
      description,
      category,
      price,
      imgUrl,
      altImages,
      size,
      uploadedBy: decoded.userId,
    });

    await newProduct.save();

    res
      .status(201)
      .json({ success: true, message: "Product uploaded successfully" });
  } catch (error) {
    console.log("Error", error);
    res
      .status(500)
      .json({ success: "fail", message: "Internal server error", error });
  }
};

module.exports = ProductUpload;
