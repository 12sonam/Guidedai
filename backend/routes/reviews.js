import express from 'express'
import Review from '../models/Review.js';
import Tour from '../models/Tour.js'; 
import { createReview } from '../controllers/reviewContoller.js';
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router()

router.post('/:tourId', verifyUser, createReview);

// Get all reviews (admin only)
router.get('/', verifyAdmin, async (req, res) => {
    try {
      const reviews = await Review.find()
        .populate({
          path: 'userId',
          select: 'username email'
        })
        .populate({
          path: 'tourId',
          select: 'title'
        })
        .sort({ createdAt: -1 });
  
      res.status(200).json({
        success: true,
        message: "Reviews retrieved successfully",
        data: reviews
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve reviews",
        error: err.message
      });
    }
  });
  
  // Delete review (admin only)
  router.delete('/:id', verifyAdmin, async (req, res) => {
    try {
      const review = await Review.findByIdAndDelete(req.params.id);
      
      if (!review) {
        return res.status(404).json({
          success: false,
          message: "Review not found"
        });
      }
  
      // Remove review reference from tour
      await Tour.findByIdAndUpdate(review.tourId, {
        $pull: { reviews: review._id }
      });
  
      res.status(200).json({
        success: true,
        message: "Review deleted successfully"
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Failed to delete review",
        error: err.message
      });
    }
  });
  

export default router;