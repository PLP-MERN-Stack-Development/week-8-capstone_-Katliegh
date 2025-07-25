// routes/index.js
const express = require('express');
const router = express.Router();

// Import all route files
const authRoutes = require('./authRoutes');
const bookingRoutes = require('./bookingRoutes');
const resourceRoutes = require('./resourceRoutes');
const textbookRoutes = require('./textbookRoutes');
const tutoringRoutes = require('./tutoringRoutes');
const userRoutes = require('./userRoutes');

// Combine routes with logical API prefixes
router.use('/auth', authRoutes);          // Authentication routes (login, register)
router.use('/bookings', bookingRoutes);   // Tutoring session bookings
router.use('/resources', resourceRoutes); // Educational resources
router.use('/textbooks', textbookRoutes); // Textbook listings
router.use('/tutoring', tutoringRoutes);  // Tutoring listings
router.use('/user', userRoutes);          // User profile management

module.exports = router;