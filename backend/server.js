const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const UserDetails = require("./routes/UserDetailRoutes.js");
const searchProduct = require("./controllers/SearchProducts.js");
app.use(cors());
require("dotenv").config();

const PORT = process.env.PORT || 5000;
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to mongo db"))
  .catch((err) => console.log("There was an error", err));

app.listen(PORT, (req, res) => {
  console.log(`Server running on http://localhost:${PORT} `);
});

app.use("/auth", authRoutes);
app.use("/category", categoryRoutes);
app.use("/user", UserDetails);
app.use("/product", searchProduct);
