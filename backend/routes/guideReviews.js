import express from 'express';
import { 
  createGuideReview, 
  getGuideReviews, 
  markGuideReviewAsRead 
} from '../controllers/guidereviewController.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, createGuideReview);
router.get('/guide/:guideId', getGuideReviews);
router.put('/:id/read', verifyToken, markGuideReviewAsRead);

export default router;