// import express from 'express';
// import { 
//   createOrUpdateGuideProfile,  
//   getGuideProfile, 
//   getAllGuideProfiles, 
//   updateGuideProfile,
//   getGuideProfileByUser  
// } from '../controllers/guideController.js';
// import { verifyToken, verifyGuide } from '../utils/verifyToken.js';
// import { 
//   manageAvailability,
//   getAvailability,
//   getMyAvailability
// } from '../controllers/guideController.js';

// const router = express.Router();

// // Update this route to use createOrUpdateGuideProfile
// router.post('/', verifyToken, verifyGuide, createOrUpdateGuideProfile);

// // Add this new route for fetching profile by user ID
// router.get('/user/profile', verifyToken, verifyGuide, getGuideProfileByUser);

// // Keep all your existing routes
// router.get('/:id', getGuideProfile);
// router.get('/', getAllGuideProfiles);
// router.put('/:id', verifyToken, verifyGuide, updateGuideProfile);
// router.put('/', verifyToken, verifyGuide, updateGuideProfile);

// router.post('/availability', verifyToken, verifyGuide, manageAvailability);
// router.get('/:id/availability', getAvailability);
// router.get('/user/availability', verifyToken, verifyGuide, getMyAvailability);

// export default router;

import express from 'express';
import { 
  createOrUpdateGuideProfile,  
  getGuideProfile, 
  getAllGuideProfiles, 
  updateGuideProfile,
  getGuideProfileByUser,
  deleteAvailability
} from '../controllers/guideController.js';
import { verifyToken, verifyGuide } from '../utils/verifyToken.js';
import { 
  manageAvailability,
  getAvailability,
  getMyAvailability
} from '../controllers/guideController.js';

const router = express.Router();

// Specific routes first
router.get('/user/profile', verifyToken, verifyGuide, getGuideProfileByUser);
router.get('/user/availability', verifyToken, verifyGuide, getMyAvailability);
router.post('/availability', verifyToken, verifyGuide, manageAvailability);
router.delete('/availability/:id', verifyToken, verifyGuide, deleteAvailability);

// General routes after
router.post('/', verifyToken, verifyGuide, createOrUpdateGuideProfile);
router.get('/', getAllGuideProfiles);
router.get('/:id/availability', getAvailability);
router.get('/:id', getGuideProfile); // Moved after specific routes
router.put('/:id', verifyToken, verifyGuide, updateGuideProfile);
router.put('/', verifyToken, verifyGuide, updateGuideProfile);

export default router;