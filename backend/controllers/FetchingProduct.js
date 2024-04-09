const Product = require("../models/Product");
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const FetchingProducts = async (req, res) => {
  const text = req.params.text;

  try {
    const products = await Product.find({ category: text });
    const shuffledProducts = shuffleArray(products);
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for the given category" });
    }

    res.status(200).json({ success: true, data: shuffledProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports = FetchingProducts;
