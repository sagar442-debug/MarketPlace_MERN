const jwt = require("jsonwebtoken");

const CheckToken = async (req, res) => {
  const { token } = req.body;
  if (token == "") {
    res.json({ message: "No token provided" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: false });
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      res.json({ message: true });
    } else {
      console.log(error);
      res.status(500).json({ message: error });
    }
  }
};

module.exports = CheckToken;
