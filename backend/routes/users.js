import express from 'express';
import { deleteUser, getAllUser, getSingleUser, updateUser } from '../controllers/userController.js';
const router = express.Router()
import upload from '../middleware/upload.js';

import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

// update user
router.put("/:id", verifyUser,upload.single("photo"), updateUser);

// delete user
router.delete("/:id", verifyUser, deleteUser);

// get single user
router.get("/:id", verifyUser, getSingleUser);  

// get all users
router.get("/", verifyAdmin, getAllUser);

export default router 



// import express from 'express';
// const router = express.Router();
// import {
//     deleteUser,
//     getAllUser,
//     getSingleUser,
//     updateUser
// } from '../controllers/userController.js';
// import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

// // User routes
// router.route('/')
//     .get(verifyAdmin, getAllUser);

// router.route('/:id')
//     .get(verifyUser, getSingleUser)
//     .put(verifyUser, updateUser)
//     .delete(verifyUser, deleteUser);

// export default router;