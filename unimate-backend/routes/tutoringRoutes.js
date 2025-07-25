const express = require("express");
const router = express.Router();
const { 
  createListing, 
  getListings, 
  getMyListings  // ✅ Now imported properly
} = require("../controllers/tutoringController");
const { protect } = require("../middleware/authMiddleware");

// Create a new tutoring listing (Private)
router.post("/", protect, createListing);

// Get all tutoring listings (Public)
router.get("/", getListings);

// Get logged-in user's listings (Private)
router.get("/mine", protect, getMyListings);

module.exports = router;