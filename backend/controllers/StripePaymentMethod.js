const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY);

require("dotenv").config();

const StripePaymentMethod = async (req, res) => {
  const { items } = req.body; // Destructure items from req.body
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => {
        return {
          price_data: {
            currency: "cad",
            product_data: {
              name: item.title,
            },
            unit_amount: item.price * 100, // Convert price to cents
          },
          quantity: item.quantity,
        };
      }),
      success_url: "http://localhost:5173/addtobag",
      cancel_url: "http://localhost:5173/addtobag",
    });

    res.json({ url: session.url }); // Corrected session URL
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = StripePaymentMethod;
