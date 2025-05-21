// import express from 'express';
// import { protect } from '../middleware/auth.js';
// import { v2 as cloudinary } from 'cloudinary';
// import multer from 'multer';
// import fs from 'fs';
// const router = express.Router();

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// // Configure multer for file upload
// const upload = multer({ dest: 'uploads/' });

// // @desc    Upload file
// // @route   POST /api/v2/upload
// // @access  Private
// router.post('/', protect, upload.single('file'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Please upload a file' 
//       });
//     }

//     // Upload image to Cloudinary
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: 'guide_profiles',
//       width: 500,
//       height: 500,
//       crop: 'fill'
//     });

//     // Delete the temporary file
//     fs.unlinkSync(req.file.path);

//     res.status(200).json({
//       success: true,
//       url: result.secure_url
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Server Error' 
//     });
//   }
// });

// export default router;