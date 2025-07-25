const mongoose = require("mongoose");

const tutoringListingSchema = new mongoose.Schema({
  title: String,
  description: String,
  subject: String,
  pricePerHour: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("TutoringListing", tutoringListingSchema);
