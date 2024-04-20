const User = require("../models/User");

const ClearCart = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findById(id);

    if (!user) {
      console.log("User does not exist");
      return res.status(404).json({ error: "User not found" });
    }
    user.cart = [];

    await user.save();
  } catch (error) {
    console.error("Error clearing user's cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = ClearCart;
