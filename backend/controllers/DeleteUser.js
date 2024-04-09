const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
const bcryptjs = require("bcryptjs");
dotenv.config();

const deleteUser = async (req, res) => {
  const { email, previousPassword } = req.body;
  try {
    // Extract the token from the authorization header
    const token = req.headers.authorization.split(" ")[1];

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the password
    const isPasswordValid = await bcryptjs.compare(
      previousPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.userId;

    // Delete the user
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = deleteUser;
