const Booking = require('../models/Booking');

// @desc    Create a booking
// @route   POST /api/bookings
exports.createBooking = async (req, res) => {
  try {
    const { tutoringSession, date, time } = req.body;
    const booking = await Booking.create({
      tutoringSession,
      date,
      time,
      student: req.user.id
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's bookings
// @route   GET /api/bookings/my-bookings
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ student: req.user.id })
      .populate('tutoringSession')
      .populate('student', 'name');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};