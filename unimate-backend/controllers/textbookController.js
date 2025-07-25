const TextbookListing = require("../models/Textbook");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Create a textbook listing
exports.createTextbook = async (req, res) => {
  const { title, author, price, imageUrl } = req.body;
  try {
    const listing = new TextbookListing({
      title,
      author,
      price,
      imageUrl,
      seller: req.user.userId
    });
    await listing.save();
    res.status(201).json(listing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all textbooks
exports.getTextbooks = async (req, res) => {
  try {
    const books = await TextbookListing.find().populate("seller", "name");
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create Stripe Checkout Session
exports.createCheckoutSession = async (req, res) => {
  const { textbookId } = req.body;

  try {
    // Find textbook in DB
    const textbook = await TextbookListing.findById(textbookId);
    if (!textbook) {
      return res.status(404).json({ message: "Textbook not found." });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "zar",
            product_data: {
              name: textbook.title,
              description: `Author: ${textbook.author}`
            },
            unit_amount: textbook.price * 100 // Convert R to cents
          },
          quantity: 1
        }
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel"
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment session error." });
  }
};
