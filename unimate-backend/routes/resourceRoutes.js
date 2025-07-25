const express = require("express");
const multer = require("multer");
const { uploadResource, getResources } = require("../controllers/resourceController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", protect, upload.single("file"), uploadResource);
router.get("/", getResources);

module.exports = router;
