const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  altImages: {
    type: String,
  },
  size: {
    type: String,
  },
  uploadDate: {
    type: Date,
    default: Date.now(),
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Product = mongoose.model("Products", ProductSchema);
module.exports = Product;
