const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Product = require("../models/Product");

dotenv.config();

const UserData = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    res.status(404).json({ message: "No token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const user = await User.findOne({ _id: userId }).select("-password");
    const { password, ...userData } = user;
    if (!user) {
      res.status(404).json({ message: "User does not exist" });
    }
    const allProducts = await Product.find({ uploadedBy: userId });
    res.status(200).json({ user, allProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = UserData;
