const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const UserDetails = require("./routes/UserDetailRoutes.js");
const searchProduct = require("./controllers/SearchProducts.js");
const paymentGateway = require("./routes/paymentGateway.js");
app.use(cors());
require("dotenv").config();

const PORT = process.env.PORT || 3000; // Update the port to 3000
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Update server setup to listen on 0.0.0.0:3000
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

app.use("/auth", authRoutes);
app.use("/category", categoryRoutes);
app.use("/user", UserDetails);
app.use("/product", searchProduct);
app.use("/payment", paymentGateway);
