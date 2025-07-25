const express = require("express");
const router = express.Router();
const { createTextbook, getTextbooks } = require("../controllers/textbookController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createTextbook);
router.get("/", getTextbooks);

module.exports = router;
