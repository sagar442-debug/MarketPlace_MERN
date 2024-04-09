const Product = require("../models/Product");
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const allProducts = async (req, res) => {
  try {
    const getAllProducts = await Product.find();
    const shuffledProducts = shuffleArray(getAllProducts);

    res.status(200).json({ success: true, data: shuffledProducts });
  } catch (error) {
    console.error("Internal server error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const productDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const idExist = await Product.findOne({ _id: id });
    if (!idExist) {
      res.status(404).json({ message: "Id does not exist" });
    }
    res.status(200).json(idExist);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

module.exports = { allProducts, productDetails };
