const TutoringListing = require("../models/TutoringListing");

// @desc    Create a new tutoring listing
// @route   POST /api/tutoring
// @access  Private
exports.createListing = async (req, res) => {
  const { title, description, subject, pricePerHour } = req.body;
  try {
    const listing = new TutoringListing({
      title,
      description,
      subject,
      pricePerHour,
      createdBy: req.user.userId
    });
    await listing.save();
    res.status(201).json(listing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get all tutoring listings
// @route   GET /api/tutoring
// @access  Public
exports.getListings = async (req, res) => {
  try {
    const listings = await TutoringListing.find().populate("createdBy", "name");
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get current user's tutoring listings
// @route   GET /api/tutoring/mine
// @access  Private
exports.getMyListings = async (req, res) => {
  try {
    const listings = await TutoringListing.find({ createdBy: req.user.userId })
      .populate("createdBy", "name");
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};