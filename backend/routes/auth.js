import express from "express";
import { login, register, verifyOTP, resendOTP, forgotPassword, resetPassword } from "../controllers/authController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// Existing routes
router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/login', login);

// routes for forgot password
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// token verification endpoint
router.get('/verify-token', verifyToken, (req, res) => {
  res.status(200).json({ 
    success: true, 
    user: {
      id: req.user.id,
      username: req.user.username,
      role: req.user.role
    }
  });
});

export default router;