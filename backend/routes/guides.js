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