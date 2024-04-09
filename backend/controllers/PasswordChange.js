const User = require("../models/User");
const bcryptjs = require("bcryptjs");

const PasswordChange = async (req, res) => {
  const { fullName, email, previousPassword, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!previousPassword) {
      return res.status(400).json({ message: "Previous password is required" });
    }

    const isValidPassword = await bcryptjs.compare(
      previousPassword,
      user.password
    );

    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid previous password" });
    }

    user.fullName = fullName || user.fullName;
    user.email = email || user.email;

    if (newPassword) {
      const hashedPassword = await bcryptjs.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    await user.save();
    return res.status(200).json({ message: "Data changed successfully!" });
  } catch (error) {
    console.error("Error in PasswordChange:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = PasswordChange;
