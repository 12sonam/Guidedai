import User from "../models/User.js";
import GuideProfile from "../models/GuideProfile.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'


import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

// Verify if email credentials are available
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('WARNING: Email credentials are missing in environment variables');
  console.error('Make sure EMAIL_USER and EMAIL_APP_PASSWORD are set in your .env file');
}

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Create Nodemailer transporter with Gmail
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS 
  },
  debug: true // Enable for troubleshooting, disable in production
});

// Verify transporter connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server connection established successfully');
  }
});

export const sendOTPEmail = async (email, otp) => {
  // Email template with responsive design
  const emailTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <div style="text-align: center; padding: 10px 0;">
        <h1 style="color: #4285f4;">Account Verification</h1>
      </div>
      <div style="padding: 20px; background-color: #f9f9f9; border-radius: 5px;">
        <h2 style="color: #333333; margin-bottom: 20px;">Complete Your Registration</h2>
        <p style="color: #666666; font-size: 16px; line-height: 1.5;">
          Thank you for registering with our service. To verify your email address, please use the following verification code:
        </p>
        <div style="background-color: #ffffff; padding: 15px; border-radius: 4px; text-align: center; font-size: 28px; letter-spacing: 5px; font-weight: bold; margin: 20px 0; border: 2px dashed #4285f4;">
          ${otp}
        </div>
        <p style="color: #666666; font-size: 16px; line-height: 1.5;">
          This code will expire in <strong>5 minutes</strong>.
        </p>
        <p style="color: #666666; font-size: 14px; margin-top: 30px;">
          If you didn't request this code, please ignore this email or contact our support team.
        </p>
      </div>
      <div style="text-align: center; padding: 15px 0; font-size: 14px; color: #999999;">
        &copy; ${new Date().getFullYear()} Tour Booking Service. All rights reserved.
      </div>
    </div>
  `;

  // Email content configuration
  const mailOptions = {
    from: {
      name: 'Tour Booking Service',
      address: process.env.EMAIL_USER
    },
    to: email,
    subject: "Verify Your Email - Your OTP Code",
    text: `Your verification code is ${otp}. It will expire in 5 minutes.`,
    html: emailTemplate
  };

  try {
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${email}: ${otp} - Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Failed to send OTP email:", error);
    return { success: false, error: error.message };
  }
};


// Initial registration - saves user info and sends OTP
export const register = async(req, res) => {
  try {
    const { email, username, password, role, photo } = req.body;

    // Input validation
    if (!email || !username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email, username and password are required' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email });
    
    // Handle existing users
    if (existingUser) {
      // If user exists but is not verified, resend OTP
      if (!existingUser.isVerified) {
        const otp = generateOTP();
        const otpExpiry = new Date();
        otpExpiry.setMinutes(otpExpiry.getMinutes() + 5); // OTP valid for 5 minutes
        
        existingUser.otp = otp;
        existingUser.otpExpiry = otpExpiry;
        await existingUser.save();
        
        const emailResult = await sendOTPEmail(existingUser.email, otp);
        if (!emailResult.success) {
          return res.status(500).json({
            success: false, 
            message: 'Failed to send verification code. Please try again.'
          });
        }
        
        return res.status(200).json({
          success: true, 
          message: 'Verification code sent to your email.',
          userId: existingUser._id
        });
      }
      
      // If user exists and is verified
      return res.status(400).json({ 
        success: false, 
        message: 'Email already registered. Please login instead.' 
      });
    }
    
    // For new users - hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    
    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 5);
    
    // Create new user (not verified yet)
    const newUser = new User({
      username,
      email,
      password: hash,
      role: role || 'user', // Default role
      photo: photo || 'default.jpg', // Default photo
      otp,
      otpExpiry,
      isVerified: false,
      createdAt: new Date()
    });

    await newUser.save();
    
    // Send OTP via email
    const emailResult = await sendOTPEmail(email, otp);
    if (!emailResult.success) {
      // User is created but email failed - provide appropriate message
      return res.status(500).json({
        success: false, 
        message: 'Account created but failed to send verification code. Please request a new code.',
        userId: newUser._id // Still return userId so they can request a new code
      });
    }
    
    res.status(201).json({
      success: true, 
      message: 'Registration initiated. Please check your email for verification code.',
      userId: newUser._id
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({
      success: false, 
      message: 'Failed to create account. Please try again later.'
    });
  }
};

// OTP verification endpoint
export const verifyOTP = async(req, res) => {
  try {
    const { userId, otp } = req.body;
    
    if (!userId || !otp) {
      return res.status(400).json({
        success: false, 
        message: 'User ID and verification code are required'
      });
    }
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false, 
        message: 'User not found'
      });
    }
    
    // Check if OTP is expired
    if (user.otpExpiry < new Date()) {
      return res.status(400).json({
        success: false, 
        message: 'Verification code has expired. Please request a new one.'
      });
    }
    
    // Check if OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false, 
        message: 'Invalid verification code'
      });
    }
    
    // Mark user as verified
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    
    res.status(200).json({
      success: true, 
      message: 'Email verified successfully. You can now login.'
    });
  } catch (err) {
    console.error("OTP verification error:", err);
    res.status(500).json({
      success: false, 
      message: 'Failed to verify account. Please try again.'
    });
  }
};

// Resend OTP endpoint
export const resendOTP = async(req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false, 
        message: 'Email is required'
      });
    }
    
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({
        success: false, 
        message: 'User not found with this email'
      });
    }
    
    // If user is already verified
    if (user.isVerified) {
      return res.status(400).json({
        success: false, 
        message: 'Your account is already verified. Please login.'
      });
    }
    
    // Generate new OTP
    const otp = generateOTP();
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 5);
    
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
    
    // Send new OTP via email
    const emailResult = await sendOTPEmail(user.email, otp);
    if (!emailResult.success) {
      return res.status(500).json({
        success: false, 
        message: 'Failed to send verification code. Please try again.'
      });
    }
    
    res.status(200).json({
      success: true, 
      message: 'New verification code sent to your email.',
      userId: user._id
    });
  } catch (err) {
    console.error("Resend OTP error:", err);
    res.status(500).json({
      success: false, 
      message: 'Failed to resend verification code. Please try again.'
    });
  }
};

// Forgot Password Endpoint (Send OTP)
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      // Return a generic message to prevent email enumeration
      return res.status(200).json({
        success: true,
        message: 'If an account with that email exists, an OTP has been sent.'
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: 'Please verify your email before resetting your password.'
      });
    }

    // Generate an OTP for password reset
    const otp = generateOTP();
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 5); // OTP valid for 5 minutes

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    user.resetToken = undefined; // Clear any existing reset token
    user.resetTokenExpiry = undefined;
    await user.save();

    // Send OTP via email
    const emailResult = await sendOTPEmail(user.email, otp, 'reset-password');
    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to send OTP. Please try again.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'If an account with that email exists, an OTP has been sent.',
      email: user.email // Return email to frontend to prefill in reset form
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({
      success: false,
      message: 'Failed to process request. Please try again.'
    });
  }
};

// Reset Password Endpoint (Verify OTP and Reset Password)
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email, OTP, and new password are required'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long'
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or OTP'
      });
    }

    // Check if OTP is expired
    if (user.otpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new one.'
      });
    }

    // Check if OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP'
      });
    }

    // Hash the new password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // Update the password and clear the OTP fields
    user.password = hash;
    user.otp = undefined;
    user.otpExpiry = undefined;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successfully. You can now login with your new password.'
    });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({
      success: false,
      message: 'Failed to reset password. Please try again.'
    });
  }
};

//user login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if user is verified
        if (!user.isVerified) {
            // Generate new OTP for convenience
            const otp = generateOTP();
            const otpExpiry = new Date();
            otpExpiry.setMinutes(otpExpiry.getMinutes() + 5);
            
            user.otp = otp;
            user.otpExpiry = otpExpiry;
            await user.save();
            
            await sendOTPEmail(user.email, otp);
            
            return res.status(403).json({
                success: false, 
                message: 'Email not verified. We sent a new OTP to your email.',
                userId: user._id,
                requiresVerification: true
            });
        }

        const checkPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!checkPasswordCorrect) {
            return res.status(401).json({ success: false, message: 'Incorrect password' });
        }

        let guideProfile = null;
        if (user.role === "Guide") {
            guideProfile = await GuideProfile.findOne({ userId: user._id });
        }

        const { password: userPassword, ...userData } = user._doc;

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '15d' }
        );

        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
        }).status(200).json({
            token,
            success: true,
            message: 'Successfully Login',
            data: {
                ...userData,
                guideProfile
            },
            role: user.role 
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to login' });
    }
};