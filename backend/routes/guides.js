// import express from 'express';
// import { protect, authorize } from '../middleware/auth.js';
// import {
//   getGuides,
//   getGuide,
//   getMyProfile,
//   updateGuideProfile,
//   deleteGuideProfile,
//   addReview
// } from '../controllers/guideController.js';

// const router = express.Router();

// // Public routes
// router.get('/', getGuides);
// router.get('/:id', getGuide);

// // Protected routes
// router.use(protect);

// // Guide profile management
// router.get('/me', protect, authorize('guide'), getMyProfile);
// router.put('/me', authorize('guide'), updateGuideProfile);
// router.delete('/me', authorize('guide'), deleteGuideProfile);

// // Reviews
// router.post('/:id/reviews', authorize('traveler'), addReview);

// export default router;

// import express from 'express';
// import { createGuideProfile, getGuideProfile, getAllGuideProfiles, updateGuideProfile } from '../controllers/guideController.js';
// import { verifyToken, verifyGuide } from '../utils/verifyToken.js';

// const router = express.Router();

// // Create guide profile
// router.post('/', verifyToken, verifyGuide, createGuideProfile);

// // Get single guide profile
// router.get('/:id', getGuideProfile);

// // Get all guide profiles
// router.get('/', getAllGuideProfiles);

// // Update guide profile
// router.put('/:id', verifyToken, verifyGuide, updateGuideProfile);

// export default router;

import express from 'express';
import { 
  createOrUpdateGuideProfile,  // Changed from createGuideProfile
  getGuideProfile, 
  getAllGuideProfiles, 
  updateGuideProfile,
  getGuideProfileByUser  // Add this import
} from '../controllers/guideController.js';
import { verifyToken, verifyGuide } from '../utils/verifyToken.js';
import { 
  manageAvailability,
  getAvailability,
  getMyAvailability
} from '../controllers/guideController.js';

const router = express.Router();

// Update this route to use createOrUpdateGuideProfile
router.post('/', verifyToken, verifyGuide, createOrUpdateGuideProfile);

// Add this new route for fetching profile by user ID
router.get('/user/profile', verifyToken, verifyGuide, getGuideProfileByUser);

// Keep all your existing routes
router.get('/:id', getGuideProfile);
router.get('/', getAllGuideProfiles);
router.put('/:id', verifyToken, verifyGuide, updateGuideProfile);
router.put('/', verifyToken, verifyGuide, updateGuideProfile);

router.post('/availability', verifyToken, verifyGuide, manageAvailability);
router.get('/:id/availability', getAvailability);
router.get('/user/availability', verifyToken, verifyGuide, getMyAvailability);

export default router;