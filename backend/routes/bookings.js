// backend/routes/bookings.js
import express from 'express';
import Booking from '../models/Bookings.js';
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import { createBooking, getAllBooking, getBooking } from '../controllers/bookingController.js';

const router = express.Router();

// Create booking
router.post('/', verifyUser, createBooking);

// Admin booking management routes
router.get('/admin/all', verifyAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'username email')   
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

router.get('/admin/all', verifyAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'username email')
      .populate('tourId', 'title') // Populate tourId to get tour details
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get bookings by user ID
  router.get('/user/:id', verifyUser, async (req, res) => {
    try {
      const userId = req.params.id;
      
      // Ensure the requesting user can only access their own bookings
      if (req.user.id !== userId && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: "You can only access your own bookings"
        });
      }
      
      const bookings = await Booking.find({ userId: userId }).sort({ createdAt: -1 });
      
      res.status(200).json({
        success: true,
        message: "User bookings retrieved successfully",
        data: bookings
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Failed to fetch bookings",
        error: err.message
      });
    }
  });

// Cancel booking
router.put('/cancel/:id', verifyUser, async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }
    
    // Ensure the user can only cancel their own bookings
    if (booking.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "You can only cancel your own bookings"
      });
    }
    
    // Update booking status to cancelled
    booking.payment = "cancelled";
    const updatedBooking = await booking.save();
    
    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: updatedBooking
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to cancel booking",
      error: err.message
    });
  }
});

// Get single booking
router.get('/:id', verifyUser, getBooking);

// Get all bookings (admin only)
router.get('/', verifyAdmin, getAllBooking);


export default router;