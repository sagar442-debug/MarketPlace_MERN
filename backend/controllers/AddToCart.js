const jwt = require("jsonwebtoken");
const Product = require("../models/Product");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

const AddToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  const tokenFind = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(tokenFind, process.env.JWT_SECRET);
    const id = decoded.userId;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found!" });
    }

    const existingCartIndex = user.cart.findIndex((item, index) => {
      return item.productId.toString() === productId.toString();
    });

    if (existingCartIndex !== -1) {
      user.cart[existingCartIndex].quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();

    res.status(200).json({ message: "Item added to cart successfully!", user });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const DeleteItem = async (req, res) => {
  const { _id } = req.body;

  const tokenFind = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(tokenFind, process.env.JWT_SECRET);
    const id = decoded.userId;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // console.log(user.cart);

    const index = user.cart.findIndex((item, index) => {
      return item._id.toString() === _id.toString();
    });

    if (index !== -1) {
      user.cart.splice(index, 1);
      await user.save();
      return res
        .status(200)
        .json({ message: "Item deleted from cart successfully!", user });
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const quantityChange = async (req, res) => {
  const _id = req.params._id;
  const { action } = req.body;
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.userId;
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const item = user.cart.find((item) => item._id.toString() === _id);

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    if (action === "increase") {
      item.quantity += 1;
    } else if (action === "decrease") {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        const index = user.cart.findIndex(
          (item) => item._id.toString() === _id
        );
        user.cart.splice(index, 1);
      }
    } else {
      res.status(400).json({ message: "Invalid action" });
    }

    await user.save();
    res
      .status(200)
      .json({
        message: "Quantity updated successfully",
        quantity: item.quantity,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { DeleteItem, AddToCart, quantityChange };
