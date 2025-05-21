// import User from "../models/User.js";
// import Tour from "../models/Tour.js";
// import Booking from "../models/Bookings.js";
// import Review from "../models/Review.js";
// import mongoose from "mongoose";
// import bcrypt from 'bcryptjs';
// import multer from 'multer';
// import path from 'path';

// // Multer setup for file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/images/tours');
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });

// // Get all users for admin
// export const getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find({}).select('-password');
//         res.status(200).json({
//             success: true,
//             message: "Users retrieved successfully",
//             data: users
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to retrieve users",
//             error: err.message
//         });
//     }
// };

// // Create new user by admin
// export const createUser = async (req, res) => {
//     try {
//       const { username, email, password, role, photo } = req.body;
      
//       // Validate required fields
//       if (!username || !email || !password || !role) {
//         return res.status(400).json({
//           success: false,
//           message: "Username, email, password, and role are required"
//         });
//       }
  
//       // Check if user already exists
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({
//           success: false,
//           message: "User already exists with this email"
//         });
//       }
  
//       // Hash password
//       const salt = bcrypt.genSaltSync(10);
//       const hash = bcrypt.hashSync(password, salt);
  
//       // Create new user
//       const newUser = new User({
//         username,
//         email,
//         password: hash,
//         role,
//         photo: role !== 'Admin' ? photo : undefined
//       });
  
//       await newUser.save();
  
//       // Return user data without password
//       const userData = newUser.toObject();
//       delete userData.password;
  
//       res.status(201).json({
//         success: true,
//         message: "User created successfully",
//         data: userData
//       });
//     } catch (err) {
//       res.status(500).json({
//         success: false,
//         message: "Failed to create user",
//         error: err.message
//       });
//     }
//   };

// // Update user by admin
// export const updateUser = async (req, res) => {
//     const { id } = req.params;
//     const { username, email, role, status, password } = req.body;
  
//     try {
//       const updateData = {
//         updatedAt: Date.now()
//       };
  
//       // Update only fields that are provided
//       if (username) updateData.username = username;
//       if (email) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//           return res.status(400).json({
//             success: false,
//             message: "Invalid email format"
//           });
//         }
//         updateData.email = email;
//       }
  
//       if (role) updateData.role = role;
//       if (status) updateData.status = status;
  
//       // Handle password update if provided
//       if (password) {
//         const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
//         if (!passwordRegex.test(password)) {
//           return res.status(400).json({
//             success: false,
//             message: "Password must be at least 6 characters, include one uppercase letter and one number"
//           });
//         }
  
//         const salt = await bcrypt.genSalt(10);
//         updateData.password = await bcrypt.hash(password, salt);
//       }
  
//       const updatedUser = await User.findByIdAndUpdate(
//         id,
//         { $set: updateData },
//         {
//           new: true,
//           runValidators: true,
//           context: 'query'
//         }
//       ).select('-password');
  
//       if (!updatedUser) {
//         return res.status(404).json({
//           success: false,
//           message: "User not found"
//         });
//       }
  
//       res.status(200).json({
//         success: true,
//         message: "User updated successfully",
//         data: updatedUser
//       });
  
//     } catch (err) {
//       console.error('User update error:', err);
  
//       if (err.name === 'ValidationError') {
//         const messages = Object.values(err.errors).map(val => val.message);
//         return res.status(400).json({
//           success: false,
//           message: "Validation error",
//           errors: messages
//         });
//       }
  
//       if (err.code === 11000) {
//         return res.status(400).json({
//           success: false,
//           message: "Email already exists"
//         });
//       }
  
//       res.status(500).json({
//         success: false,
//         message: "Failed to update user",
//         error: err.message
//       });
//     }
//   };
  
// // Delete user by admin
// export const deleteUser = async (req, res) => {
//     const { id } = req.params;
    
//     try {
//         // Validate ID
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid user ID"
//             });
//         }

//         const deletedUser = await User.findByIdAndDelete(id);

//         if (!deletedUser) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "User deleted successfully"
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to delete user",
//             error: err.message
//         });
//     }
// };

// // Get all bookings for admin
// export const getAllBookings = async (req, res) => {
//     try {
//       const bookings = await Booking.find({})
//         .populate({
//           path: 'userId',
//           select: 'username email'
//         })
//         .populate({
//           path: 'tourId',
//           select: 'title'
//         })
//         .sort({ createdAt: -1 });
  
//       res.status(200).json({
//         success: true,
//         message: "Bookings retrieved successfully",
//         data: bookings
//       });
//     } catch (err) {
//       res.status(500).json({
//         success: false,
//         message: "Failed to retrieve bookings",
//         error: err.message
//       });
//     }
//   };

// // Create new booking by admin
// export const createBooking = async (req, res) => {
//     try {
//       const { userId, tourId, fullName, guestSize, phone, bookAt } = req.body;
      
//       if (!userId || !tourId || !fullName || !guestSize || !phone || !bookAt) {
//         return res.status(400).json({
//           success: false,
//           message: "All fields are required",
//         });
//       }
  
//       const tour = await Tour.findById(tourId);
//       if (!tour) {
//         return res.status(404).json({
//           success: false,
//           message: "Tour not found",
//         });
//       }
  
//       const amount = tour.price * guestSize;
  
//       const newBooking = new Booking({
//         userId,
//         tourId,
//         tourName: tour.title,
//         fullName,
//         guestSize,
//         phone,
//         bookAt,
//         amount,
//         originalPrice: amount, // Store the price in the original currency
//         originalCurrency: 'NPR', // Default to NPR; adjust based on your app's logic
//       });
  
//       await newBooking.save();
  
//       res.status(201).json({
//         success: true,
//         message: "Booking created successfully",
//         data: newBooking,
//       });
//     } catch (err) {
//       res.status(500).json({
//         success: false,
//         message: "Failed to create booking",
//         error: err.message,
//       });
//     }
//   };

// // Update booking by admin
// export const updateBooking = async (req, res) => {
//     const { id } = req.params;
//     const { fullName, guestSize, phone, bookAt, status } = req.body;
    
//     try {
//       if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(400).json({
//           success: false,
//           message: "Invalid booking ID",
//         });
//       }
  
//       const booking = await Booking.findById(id);
//       if (!booking) {
//         return res.status(404).json({
//           success: false,
//           message: "Booking not found",
//         });
//       }
  
//       let amount = booking.amount;
//       let originalPrice = booking.originalPrice;
//       if (guestSize && guestSize !== booking.guestSize) {
//         const tour = await Tour.findById(booking.tourId);
//         amount = tour.price * guestSize;
//         originalPrice = amount; // Update originalPrice
//       }
  
//       const updatedBooking = await Booking.findByIdAndUpdate(
//         id,
//         { 
//           $set: { 
//             fullName, 
//             guestSize, 
//             phone, 
//             bookAt, 
//             status,
//             amount,
//             originalPrice,
//           } 
//         },
//         { new: true, runValidators: true }
//       ).populate({
//         path: 'userId',
//         select: 'username email',
//       }).populate({
//         path: 'tourId',
//         select: 'title',
//       });
  
//       res.status(200).json({
//         success: true,
//         message: "Booking updated successfully",
//         data: updatedBooking,
//       });
//     } catch (err) {
//       res.status(500).json({
//         success: false,
//         message: "Failed to update booking",
//         error: err.message,
//       });
//     }
//   };

// // Delete booking by admin
// export const deleteBooking = async (req, res) => {
//     const { id } = req.params;
    
//     try {
//         // Validate ID
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid booking ID"
//             });
//         }

//         const deletedBooking = await Booking.findByIdAndDelete(id);

//         if (!deletedBooking) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Booking not found"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Booking deleted successfully"
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to delete booking",
//             error: err.message
//         });
//     }
// };

// // Get all tours for admin
// export const getAllTours = async (req, res) => {
//     try {
//         const tours = await Tour.find({})
//             .populate('reviews')
//             .sort({ createdAt: -1 });
            
//         res.status(200).json({
//             success: true,
//             message: "Tours retrieved successfully",
//             data: tours
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to retrieve tours",
//             error: err.message
//         });
//     }
// };

// // Create new tour by admin
// export const createTour = async (req, res) => {
//     try {
//         const { title, city, address, distance, desc, price, maxGroupSize, featured } = req.body;
        
//         // Validate required fields
//         if (!title || !city || !address || !distance || !desc || !price || !maxGroupSize) {
//             return res.status(400).json({
//                 success: false,
//                 message: "All fields are required"
//             });
//         }

//         // Check if a file was uploaded
//         if (!req.file) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Photo is required"
//             });
//         }

//         const newTour = new Tour({
//             title,
//             city,
//             address,
//             distance,
//             photo: req.file.filename, // Save the filename to the database
//             desc,
//             price,
//             maxGroupSize,
//             featured: featured === 'true' || featured === true
//         });

//         await newTour.save();

//         res.status(201).json({
//             success: true,
//             message: "Tour created successfully",
//             data: newTour
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to create tour",
//             error: err.message
//         });
//     }
// };

// // Update tour by admin
// export const updateTour = async (req, res) => {
//     const { id } = req.params;
//     const { title, city, address, distance, desc, price, maxGroupSize, featured } = req.body;
    
//     try {
//         // Validate ID
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid tour ID"
//             });
//         }

//         const tour = await Tour.findById(id);
//         if (!tour) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Tour not found"
//             });
//         }

//         // Update fields
//         const updateData = {
//             title,
//             city,
//             address,
//             distance,
//             desc,
//             price,
//             maxGroupSize,
//             featured: featured === 'true' || featured === true
//         };

//         // If a new photo is uploaded, update the photo field
//         if (req.file) {
//             updateData.photo = req.file.filename;
//         }

//         const updatedTour = await Tour.findByIdAndUpdate(
//             id,
//             { $set: updateData },
//             { new: true, runValidators: true }
//         );

//         res.status(200).json({
//             success: true,
//             message: "Tour updated successfully",
//             data: updatedTour
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to update tour",
//             error: err.message
//         });
//     }
// };

// // Delete tour by admin
// export const deleteTour = async (req, res) => {
//     const { id } = req.params;
    
//     try {
//         // Validate ID
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid tour ID"
//             });
//         }

//         // Delete all bookings for this tour
//         await Booking.deleteMany({ tourId: id });

//         // Delete the tour
//         const deletedTour = await Tour.findByIdAndDelete(id);

//         if (!deletedTour) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Tour not found"
//             });
//         }

//         // Also delete all reviews associated with this tour
//         await Review.deleteMany({ productId: id });

//         res.status(200).json({
//             success: true,
//             message: "Tour and all associated bookings and reviews deleted successfully"
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to delete tour",
//             error: err.message
//         });
//     }
// };

// export const getAllReviews = async (req, res) => {
//     try {
//         const reviews = await Review.find({})
//             .populate({
//                 path: 'productId',
//                 select: 'title'
//             })
//             .populate({
//                 path: 'userId',
//                 select: 'username email'
//             })
//             .sort({ createdAt: -1 });

//         res.status(200).json({
//             success: true,
//             message: "Reviews retrieved successfully",
//             data: reviews
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to retrieve reviews",
//             error: err.message
//         });
//     }
// };

// // Delete review by admin
// export const deleteReview = async (req, res) => {
//     const { id } = req.params;
    
//     try {
//         // Validate ID
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid review ID"
//             });
//         }

//         const review = await Review.findById(id);
//         if (!review) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Review not found"
//             });
//         }

//         // Remove the review from the associated tour
//         await Tour.findByIdAndUpdate(review.productId, {
//             $pull: { reviews: id }
//         });

//         // Delete the review
//         await Review.findByIdAndDelete(id);

//         res.status(200).json({
//             success: true,
//             message: "Review deleted successfully"
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to delete review",
//             error: err.message
//         });
//     }
// };

// // Get dashboard stats
// export const getDashboardStats = async (req, res) => {
//     try {
//       const EXCHANGE_RATE = 134; // 1 USD = 134 NPR
  
//       const users = await User.countDocuments();
//       const guides = await User.countDocuments({ role: 'Guide' });
//       const travelers = await User.countDocuments({ role: 'Traveler' });
//       const tours = await Tour.countDocuments();
//       const bookings = await Booking.countDocuments();
//       const reviews = await Review.countDocuments();
  
//       // Calculate total revenue (only for completed bookings, in USD)
//       const revenueResult = await Booking.aggregate([
//         { $match: { payment: "completed" } },
//         { $group: { _id: null, total: { $sum: '$originalPrice' } } } // Use originalPrice
//       ]);
//       const revenue = revenueResult.length > 0 ? revenueResult[0].total : 0;
  
//       // Calculate average rating
//       const ratingResult = await Review.aggregate([
//         { $group: { _id: null, average: { $avg: '$rating' } } }
//       ]);
//       const avgRating = ratingResult.length > 0 ? parseFloat(ratingResult[0].average.toFixed(1)) : 0;
  
//       // Revenue by Tour (only for completed bookings, in USD)
//       const revenueByTourResult = await Booking.aggregate([
//         { $match: { payment: "completed" } },
//         {
//           $group: {
//             _id: '$tourId',
//             totalRevenue: { $sum: '$originalPrice' } // Use originalPrice
//           }
//         },
//         {
//           $lookup: {
//             from: 'tours',
//             localField: '_id',
//             foreignField: '_id',
//             as: 'tour'
//           }
//         },
//         { $unwind: '$tour' },
//         {
//           $project: {
//             name: '$tour.title',
//             value: '$totalRevenue' // Already in original currency (USD or NPR)
//           }
//         },
//         { $sort: { value: -1 } },
//         { $limit: 5 }
//       ]);
  
//       // Booking Status Distribution
//       const bookingStatusResult = await Booking.aggregate([
//         {
//           $group: {
//             _id: '$payment',
//             count: { $sum: 1 }
//           }
//         },
//         {
//           $project: {
//             name: '$_id',
//             value: '$count'
//           }
//         }
//       ]);
  
//       res.status(200).json({
//         success: true,
//         data: {
//           totalUsers: users,
//           totalGuides: guides,
//           totalTravelers: travelers,
//           totalTours: tours,
//           totalBookings: bookings,
//           totalReviews: reviews,
//           totalRevenue: revenue,
//           avgRating: avgRating,
//           revenueByTour: revenueByTourResult,
//           bookingStatus: bookingStatusResult
//         }
//       });
//     } catch (err) {
//       console.error('Error in getDashboardStats:', err);
//       res.status(500).json({
//         success: false,
//         message: "Failed to fetch dashboard stats",
//         error: err.message
//       });
//     }
//   };



import User from "../models/User.js";
import Tour from "../models/Tour.js";
import Booking from "../models/Bookings.js";
import Review from "../models/Review.js";
import Itinerary from "../models/Itinerary.js"; // Add this import
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/tours');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Get all users for admin
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: users
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve users",
            error: err.message
        });
    }
};

// Create new user by admin
export const createUser = async (req, res) => {
    try {
      const { username, email, password, role, photo } = req.body;
      
      // Validate required fields
      if (!username || !email || !password || !role) {
        return res.status(400).json({
          success: false,
          message: "Username, email, password, and role are required"
        });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists with this email"
        });
      }
  
      // Hash password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
  
      // Create new user
      const newUser = new User({
        username,
        email,
        password: hash,
        role,
        photo: role !== 'Admin' ? photo : undefined
      });
  
      await newUser.save();
  
      // Return user data without password
      const userData = newUser.toObject();
      delete userData.password;
  
      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: userData
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to create user",
        error: err.message
      });
    }
  };

// Update user by admin
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, role, status, password } = req.body;
  
    try {
      const updateData = {
        updatedAt: Date.now()
      };
  
      // Update only fields that are provided
      if (username) updateData.username = username;
      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({
            success: false,
            message: "Invalid email format"
          });
        }
        updateData.email = email;
      }
  
      if (role) updateData.role = role;
      if (status) updateData.status = status;
  
      // Handle password update if provided
      if (password) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(password)) {
          return res.status(400).json({
            success: false,
            message: "Password must be at least 6 characters, include one uppercase letter and one number"
          });
        }
  
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(password, salt);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: updateData },
        {
          new: true,
          runValidators: true,
          context: 'query'
        }
      ).select('-password');
  
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
  
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser
      });
  
    } catch (err) {
      console.error('User update error:', err);
  
      if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: messages
        });
      }
  
      if (err.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "Email already exists"
        });
      }
  
      res.status(500).json({
        success: false,
        message: "Failed to update user",
        error: err.message
      });
    }
  };
  
// Delete user by admin
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    
    try {
        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID"
            });
        }

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: err.message
        });
    }
};

// Get all bookings for admin
export const getAllBookings = async (req, res) => {
    try {
      const bookings = await Booking.find({})
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
        message: "Bookings retrieved successfully",
        data: bookings
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve bookings",
        error: err.message
      });
    }
  };

// Create new booking by admin
export const createBooking = async (req, res) => {
    try {
      const { userId, tourId, fullName, guestSize, phone, bookAt } = req.body;
      
      if (!userId || !tourId || !fullName || !guestSize || !phone || !bookAt) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
  
      const tour = await Tour.findById(tourId);
      if (!tour) {
        return res.status(404).json({
          success: false,
          message: "Tour not found",
        });
      }
  
      const amount = tour.price * guestSize;
  
      const newBooking = new Booking({
        userId,
        tourId,
        tourName: tour.title,
        fullName,
        guestSize,
        phone,
        bookAt,
        amount,
        originalPrice: amount, // Store the price in the original currency
        originalCurrency: 'NPR', // Default to NPR; adjust based on your app's logic
      });
  
      await newBooking.save();
  
      res.status(201).json({
        success: true,
        message: "Booking created successfully",
        data: newBooking,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to create booking",
        error: err.message,
      });
    }
  };

// Update booking by admin
export const updateBooking = async (req, res) => {
    const { id } = req.params;
    const { fullName, guestSize, phone, bookAt, status } = req.body;
    
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid booking ID",
        });
      }
  
      const booking = await Booking.findById(id);
      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }
  
      let amount = booking.amount;
      let originalPrice = booking.originalPrice;
      if (guestSize && guestSize !== booking.guestSize) {
        const tour = await Tour.findById(booking.tourId);
        amount = tour.price * guestSize;
        originalPrice = amount; // Update originalPrice
      }
  
      const updatedBooking = await Booking.findByIdAndUpdate(
        id,
        { 
          $set: { 
            fullName, 
            guestSize, 
            phone, 
            bookAt, 
            status,
            amount,
            originalPrice,
          } 
        },
        { new: true, runValidators: true }
      ).populate({
        path: 'userId',
        select: 'username email',
      }).populate({
        path: 'tourId',
        select: 'title',
      });
  
      res.status(200).json({
        success: true,
        message: "Booking updated successfully",
        data: updatedBooking,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to update booking",
        error: err.message,
      });
    }
  };

// Delete booking by admin
export const deleteBooking = async (req, res) => {
    const { id } = req.params;
    
    try {
        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid booking ID"
            });
        }

        const deletedBooking = await Booking.findByIdAndDelete(id);

        if (!deletedBooking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Booking deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete booking",
            error: err.message
        });
    }
};

// Get all tours for admin
export const getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find({})
            .populate('reviews')
            .sort({ createdAt: -1 });
            
        res.status(200).json({
            success: true,
            message: "Tours retrieved successfully",
            data: tours
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve tours",
            error: err.message
        });
    }
};

// Create new tour by admin
export const createTour = async (req, res) => {
    try {
        const { title, city, address, distance, desc, price, maxGroupSize, featured } = req.body;
        
        // Validate required fields
        if (!title || !city || !address || !distance || !desc || !price || !maxGroupSize) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Photo is required"
            });
        }

        const newTour = new Tour({
            title,
            city,
            address,
            distance,
            photo: req.file.filename, // Save the filename to the database
            desc,
            price,
            maxGroupSize,
            featured: featured === 'true' || featured === true
        });

        await newTour.save();

        res.status(201).json({
            success: true,
            message: "Tour created successfully",
            data: newTour
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create tour",
            error: err.message
        });
    }
};

// Update tour by admin
export const updateTour = async (req, res) => {
    const { id } = req.params;
    const { title, city, address, distance, desc, price, maxGroupSize, featured } = req.body;
    
    try {
        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid tour ID"
            });
        }

        const tour = await Tour.findById(id);
        if (!tour) {
            return res.status(404).json({
                success: false,
                message: "Tour not found"
            });
        }

        // Update fields
        const updateData = {
            title,
            city,
            address,
            distance,
            desc,
            price,
            maxGroupSize,
            featured: featured === 'true' || featured === true
        };

        // If a new photo is uploaded, update the photo field
        if (req.file) {
            updateData.photo = req.file.filename;
        }

        const updatedTour = await Tour.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: "Tour updated successfully",
            data: updatedTour
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update tour",
            error: err.message
        });
    }
};

// Delete tour by admin
export const deleteTour = async (req, res) => {
    const { id } = req.params;
    
    try {
        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid tour ID"
            });
        }

        // Delete all bookings for this tour
        await Booking.deleteMany({ tourId: id });

        // Delete the tour
        const deletedTour = await Tour.findByIdAndDelete(id);

        if (!deletedTour) {
            return res.status(404).json({
                success: false,
                message: "Tour not found"
            });
        }

        // Also delete all reviews associated with this tour
        await Review.deleteMany({ productId: id });

        res.status(200).json({
            success: true,
            message: "Tour and all associated bookings and reviews deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete tour",
            error: err.message
        });
    }
};

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({})
            .populate({
                path: 'productId',
                select: 'title'
            })
            .populate({
                path: 'userId',
                select: 'username email'
            })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "Reviews retrieved successfully",
            data: reviews
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve reviews",
            error: err.message
        });
    }
};

// Delete review by admin
export const deleteReview = async (req, res) => {
    const { id } = req.params;
    
    try {
        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid review ID"
            });
        }

        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        // Remove the review from the associated tour
        await Tour.findByIdAndUpdate(review.productId, {
            $pull: { reviews: id }
        });

        // Delete the review
        await Review.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete review",
            error: err.message
        });
    }
};

// Get all itineraries for admin
export const getAllItineraries = async (req, res) => {
    try {
        const itineraries = await Itinerary.find({})
            .populate({
                path: 'userId',
                select: 'username email'
            })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "Itineraries retrieved successfully",
            data: itineraries
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve itineraries",
            error: err.message
        });
    }
};

// Update itinerary status by admin
export const updateItineraryStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid itinerary ID"
            });
        }

        const itinerary = await Itinerary.findById(id);
        if (!itinerary) {
            return res.status(404).json({
                success: false,
                message: "Itinerary not found"
            });
        }

        if (!['accepted', 'declined'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Status must be either 'accepted' or 'declined'"
            });
        }

        itinerary.status = status;
        await itinerary.save();

        res.status(200).json({
            success: true,
            message: `Itinerary ${status} successfully`,
            data: itinerary
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update itinerary status",
            error: err.message
        });
    }
};

// Get dashboard stats
export const getDashboardStats = async (req, res) => {
    try {
      const EXCHANGE_RATE = 134; // 1 USD = 134 NPR
  
      const users = await User.countDocuments();
      const guides = await User.countDocuments({ role: 'Guide' });
      const travelers = await User.countDocuments({ role: 'Traveler' });
      const tours = await Tour.countDocuments();
      const bookings = await Booking.countDocuments();
      const reviews = await Review.countDocuments();
  
      // Calculate total revenue (only for completed bookings, in USD)
      const revenueResult = await Booking.aggregate([
        { $match: { payment: "completed" } },
        { $group: { _id: null, total: { $sum: '$originalPrice' } } } // Use originalPrice
      ]);
      const revenue = revenueResult.length > 0 ? revenueResult[0].total : 0;
  
      // Calculate average rating
      const ratingResult = await Review.aggregate([
        { $group: { _id: null, average: { $avg: '$rating' } } }
      ]);
      const avgRating = ratingResult.length > 0 ? parseFloat(ratingResult[0].average.toFixed(1)) : 0;
  
      // Revenue by Tour (only for completed bookings, in USD)
      const revenueByTourResult = await Booking.aggregate([
        { $match: { payment: "completed" } },
        {
          $group: {
            _id: '$tourId',
            totalRevenue: { $sum: '$originalPrice' } // Use originalPrice
          }
        },
        {
          $lookup: {
            from: 'tours',
            localField: '_id',
            foreignField: '_id',
            as: 'tour'
          }
        },
        { $unwind: '$tour' },
        {
          $project: {
            name: '$tour.title',
            value: '$totalRevenue' // Already in original currency (USD or NPR)
          }
        },
        { $sort: { value: -1 } },
        { $limit: 5 }
      ]);
  
      // Booking Status Distribution
      const bookingStatusResult = await Booking.aggregate([
        {
          $group: {
            _id: '$payment',
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            name: '$_id',
            value: '$count'
          }
        }
      ]);
  
      res.status(200).json({
        success: true,
        data: {
          totalUsers: users,
          totalGuides: guides,
          totalTravelers: travelers,
          totalTours: tours,
          totalBookings: bookings,
          totalReviews: reviews,
          totalRevenue: revenue,
          avgRating: avgRating,
          revenueByTour: revenueByTourResult,
          bookingStatus: bookingStatusResult
        }
      });
    } catch (err) {
      console.error('Error in getDashboardStats:', err);
      res.status(500).json({
        success: false,
        message: "Failed to fetch dashboard stats",
        error: err.message
      });
    }
  };