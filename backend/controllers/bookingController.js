// import Booking from '../models/Bookings.js';
// import Tour from '../models/Tour.js'; // Import the Tour model to validate tourId

// export const createBooking = async (req, res) => {
//   const {
//     userId,
//     userEmail,
//     tourId, // Add tourId to the request body
//     tourName,
//     fullName,
//     guestSize,
//     phone,
//     bookAt,
//     payment,
//     price,
//   } = req.body;

//   // Validate required fields
//   if (!tourId || !tourName || !fullName || !guestSize || !phone || !bookAt || !payment) {
//     return res.status(400).json({
//       success: false,
//       message: "Missing required fields: tourId, tourName, fullName, guestSize, phone, bookAt, and payment are required"
//     });
//   }

//   try {
//     // Verify that the tourId exists in the tours collection
//     const tour = await Tour.findById(tourId);
//     if (!tour) {
//       return res.status(404).json({
//         success: false,
//         message: "Tour not found with the provided tourId"
//       });
//     }

//     // Verify that the tourName matches the tour's title (optional, for consistency)
//     if (tour.title !== tourName) {
//       return res.status(400).json({
//         success: false,
//         message: "tourName does not match the tour associated with the provided tourId"
//       });
//     }

//     // Create a new booking
//     const newBooking = new Booking({
//       userId,
//       userEmail,
//       tourId, // Include tourId
//       tourName,
//       fullName,
//       guestSize,
//       phone,
//       bookAt,
//       payment,
//       price,
//     });

//     // Save the booking to the database
//     const savedBooking = await newBooking.save();

//     // Send success response
//     res.status(200).json({
//       success: true,
//       message: "Your tour is booked successfully!",
//       data: savedBooking
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: err.message
//     });
//   }
// };

// // get single booking
// export const getBooking = async(req,res) => {
//     const id = req.params.id

//     try {
//         const book = await Booking.findById(id).populate('tourId', 'title'); // Populate tourId to get tour details
//         res.status(200).json({success:true, message:"Successful", data:book});
//     } catch (err) {
//         res.status(404).json({success:false, message:"not found"});
//     }
// };

// // get all booking
// export const getAllBooking = async(req,res) => {
//     try {
//       const books = await Booking.find()
//         .populate('tourId', 'title') // Populate tourId to get tour details
//         .sort({ createdAt: -1 });
//       res.status(200).json({
//         success: true,
//         message: "Successful",
//         count: books.length,
//         data: books
//       });
//     } catch (err) {
//       res.status(500).json({
//         success: false,
//         message: "Internal server error"
//       });
//     }
// };



import Booking from '../models/Bookings.js';
import Tour from '../models/Tour.js';

const EXCHANGE_RATE = 134; // 1 USD = 134 NPR

export const createBooking = async (req, res) => {
  const {
    userId,
    userEmail,
    tourId,
    tourName,
    fullName,
    guestSize,
    phone,
    bookAt,
    payment,
    price,
    originalCurrency = 'NPR', // Default to NPR if not specified
  } = req.body;

  // Validate required fields
  if (!tourId || !tourName || !fullName || !guestSize || !phone || !bookAt || !payment || !price) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: tourId, tourName, fullName, guestSize, phone, bookAt, payment, and price are required"
    });
  }

  try {
    // Verify that the tourId exists in the tours collection
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found with the provided tourId"
      });
    }

    // Verify that the tourName matches the tour's title (optional, for consistency)
    if (tour.title !== tourName) {
      return res.status(400).json({
        success: false,
        message: "tourName does not match the tour associated with the provided tourId"
      });
    }

    // Use the provided price as originalPrice, convert to NPR for storage
    const originalPrice = parseFloat(price);
    let storedPrice = originalPrice;
    if (originalCurrency === 'USD') {
      storedPrice = originalPrice * EXCHANGE_RATE; // Convert USD to NPR for storage
    }

    // Create a new booking
    const newBooking = new Booking({
      userId,
      userEmail,
      tourId,
      tourName,
      fullName,
      guestSize,
      phone,
      bookAt,
      payment,
      price: storedPrice, // Store price in NPR
      originalPrice,
      originalCurrency,
    });

    // Save the booking to the database
    const savedBooking = await newBooking.save();

    // Send success response with original values
    res.status(200).json({
      success: true,
      message: "Your tour is booked successfully!",
      data: savedBooking
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message
    });
  }
};

// get single booking
export const getBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Booking.findById(id).populate('tourId', 'title');
    if (!book) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({ success: true, message: "Successful", data: book });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
};

// get all booking
export const getAllBooking = async (req, res) => {
  try {
    const books = await Booking.find()
      .populate('tourId', 'title')
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Successful",
      count: books.length,
      data: books
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message
    });
  }
};