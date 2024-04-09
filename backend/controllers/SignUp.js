const User = require("../models/User");
const bcrypt = require("bcryptjs");

const SignUp = async (req, res) => {
  const { email, fullName, password } = req.body;

  try {
    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      fullName,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User signed up successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = SignUp;
