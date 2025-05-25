const jwt = require('jsonwebtoken');

const authenticateTraveler = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    if (decoded.role !== 'traveler') {
      return res.status(403).json({ message: "Access denied" });
    }

    req.user = decoded; // contains _id and role
    next();
  });
};

module.exports = authenticateTraveler;

// import jwt from 'jsonwebtoken';

// // General authentication middleware for all roles
// const authenticateUser = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) return res.status(401).json({ message: "No token provided" });

//   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
//     if (err) return res.status(403).json({ message: "Invalid token" });

//     req.user = decoded; // Contains _id and role
//     next();
//   });
// };

// export { authenticateTraveler, authorizeNotificationAccess };