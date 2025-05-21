// import jwt from 'jsonwebtoken';
// import ErrorResponse from '../utils/errorResponse.js';
// import User from '../models/User.js';

// // Protect routes
// export const protect = async (req, res, next) => {
//   let token;
  
//   if (req.headers.authorization?.startsWith('Bearer')) {
//     token = req.headers.authorization.split(' ')[1];
//   }
  
//   if (!token) {
//     return next(new ErrorResponse('Not authorized', 401));
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id);
//     next();
//   } catch (err) {
//     return next(new ErrorResponse('Not authorized', 401));
//   }
// };

// // Grant access to specific roles
// // In auth.js
// export const authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!req.user || !roles.includes(req.user.role)) {
//       console.log('Unauthorized access attempt:', req.user);
//       return next(new ErrorResponse(`Role ${req.user?.role} is not authorized`, 403));
//     }
//     next();
//   };
// };

const jwt = require('jsonwebtoken');

const authenticateTraveler = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    if (decoded.role !== 'traveler') {
      return res.status(403).json({ message: "Access denied" });
    }

    req.user = decoded; // contains _id and role
    next();
  });
};

module.exports = authenticateTraveler;