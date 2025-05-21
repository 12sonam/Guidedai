import GuideReview from '../models/GuideReview.js';
import GuideProfile from '../models/GuideProfile.js';

// Create a review
export const createGuideReview = async (req, res) => {
  try {
    const { guideId, rating, comment } = req.body;
    const travelerId = req.user.id;

    // Create review
    const review = await GuideReview.create({
      guideId,
      travelerId,
      rating,
      comment
    });

    // Update guide's average rating
    await updateGuideRating(guideId);

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create review',
      error: err.message
    });
  }
};

// Get reviews for a guide
export const getGuideReviews = async (req, res) => {
  try {
    const reviews = await GuideReview.find({ guideId: req.params.guideId })
      .populate('travelerId', 'username photo');

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reviews',
      error: err.message
    });
  }
};

// Mark review as read
export const markGuideReviewAsRead = async (req, res) => {
  try {
    const review = await GuideReview.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.status(200).json({
      success: true,
      data: review
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to mark review as read',
      error: err.message
    });
  }
};

// Helper function to update guide rating
const updateGuideRating = async (guideId) => {
  const reviews = await GuideReview.find({ guideId });
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  
  await GuideProfile.findByIdAndUpdate(guideId, {
    rating: averageRating
  });
};