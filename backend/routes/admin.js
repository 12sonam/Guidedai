import express from 'express';
import { verifyAdmin } from '../utils/verifyToken.js';
import {
    // User Management
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    
    // Booking Management
    getAllBookings,
    createBooking,
    updateBooking,
    deleteBooking,
    
    // Tour Management
    getAllTours,
    createTour,
    updateTour,
    deleteTour,
    
    // Review Management
    getAllReviews,
    deleteReview,

    // Itinerary Management
    getAllItineraries,
    updateItineraryStatus,
    
    // Dashboard Stats
    getDashboardStats,
} from '../controllers/adminController.js';

const router = express.Router();

// User Management
router.get('/users', verifyAdmin, getAllUsers);
router.post('/users', verifyAdmin, createUser);
router.put('/users/:id', verifyAdmin, updateUser);
router.delete('/users/:id', verifyAdmin, deleteUser);

// Booking Management
router.get('/bookings', verifyAdmin, getAllBookings);
router.post('/bookings', verifyAdmin, createBooking);
router.put('/bookings/:id', verifyAdmin, updateBooking);
router.delete('/bookings/:id', verifyAdmin, deleteBooking);

// Tour Management
router.get('/tours', verifyAdmin, getAllTours);
router.post('/tours', verifyAdmin, createTour);
router.put('/tours/:id', verifyAdmin, updateTour);
router.delete('/tours/:id', verifyAdmin, deleteTour);

// Review Management
router.get('/reviews', verifyAdmin, getAllReviews);
router.delete('/reviews/:id', verifyAdmin, deleteReview);

// Itinerary Management
router.get('/itineraries', verifyAdmin, getAllItineraries);
router.put('/itineraries/:id/status', verifyAdmin, updateItineraryStatus);

// Dashboard Stats
router.get('/stats', verifyAdmin, getDashboardStats);

export default router;