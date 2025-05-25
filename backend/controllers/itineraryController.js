import Itinerary from "../models/Itinerary.js";

// Create a new itinerary
export const createItinerary = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      numberOfTravelers,
      departureDate,
      returnDate,
      tourName,
      descriptionItinerary,
      tripTypes,
      budget,
      currency,
    } = req.body;

    // Validate required fields
    if (
      !fullName ||
      !email ||
      !phone ||
      !numberOfTravelers ||
      !departureDate ||
      !returnDate ||
      !tourName ||
      !descriptionItinerary ||
      !tripTypes ||
      !budget ||
      !currency
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate user authentication
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Validate trip types
    const tripTypesSelected = Object.values(tripTypes).some(
      (value) => value === true || (typeof value === "string" && value.trim() !== "")
    );
    if (!tripTypesSelected) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one trip type or specify others",
      });
    }

    // Validate dates
    const departure = new Date(departureDate);
    const returnD = new Date(returnDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (departure < today) {
      return res.status(400).json({
        success: false,
        message: "Departure date cannot be in the past",
      });
    }

    if (returnD <= departure) {
      return res.status(400).json({
        success: false,
        message: "Return date must be after departure date",
      });
    }

    // Validate budget
    if (isNaN(budget) || budget <= 0) {
      return res.status(400).json({
        success: false,
        message: "Budget must be a positive number",
      });
    }

    // Create new itinerary
    const itinerary = new Itinerary({
      userId: req.user.id,
      fullName,
      email,
      phone,
      numberOfTravelers,
      departureDate,
      returnDate,
      tourName,
      descriptionItinerary,
      tripTypes,
      budget,
      currency,
      originalBudget: budget,
      originalCurrency: currency,
    });

    await itinerary.save();

    res.status(201).json({
      success: true,
      message: "Itinerary created successfully",
      data: itinerary,
    });
  } catch (error) {
    console.error("Error creating itinerary:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create itinerary. Please try again.",
      error: error.message,
    });
  }
};

// Fetch all itineraries for the logged-in user
export const getUserItineraries = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const itineraries = await Itinerary.find({ userId: req.user.id })
      .populate({
        path: 'userId',
        select: 'username email'
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Itineraries retrieved successfully",
      data: itineraries,
    });
  } catch (error) {
    console.error("Error fetching itineraries:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch itineraries. Please try again.",
      error: error.message,
    });
  }
};

export const getItineraryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const itinerary = await Itinerary.findById(id)
      .populate({
        path: 'userId',
        select: 'username email'
      });
    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: "Itinerary not found",
      });
    }

    // Debug logging
    console.log("Authenticated User ID (req.user.id):", req.user.id);
    console.log("Itinerary User ID (itinerary.userId._id):", itinerary.userId._id);
    console.log("Itinerary User ID (toString):", itinerary.userId._id.toString());

    // Ensure both IDs are compared as strings
    if (itinerary.userId._id.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this itinerary",
      });
    }

    res.status(200).json({
      success: true,
      message: "Itinerary retrieved successfully",
      data: itinerary,
    });
  } catch (error) {
    console.error("Error fetching itinerary:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch itinerary. Please try again.",
      error: error.message,
    });
  }
};

// Update an itinerary
// export const updateItinerary = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       tourName,
//       descriptionItinerary,
//       departureDate,
//       returnDate,
//       numberOfTravelers,
//       budget,
//       currency,
//     } = req.body;

//     if (!req.user || !req.user.id) {
//       return res.status(401).json({
//         success: false,
//         message: "User not authenticated",
//       });
//     }

//     const itinerary = await Itinerary.findById(id);
//     if (!itinerary) {
//       return res.status(404).json({
//         success: false,
//         message: "Itinerary not found",
//       });
//     }

//     if (itinerary.userId.toString() !== req.user.id) {
//       return res.status(403).json({
//         success: false,
//         message: "You are not authorized to update this itinerary",
//       });
//     }

//     if (itinerary.status !== "pending") {
//       return res.status(400).json({
//         success: false,
//         message: "Cannot update an itinerary that is not pending",
//       });
//     }

//     // Validate dates
//     const departure = new Date(departureDate);
//     const returnD = new Date(returnDate);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     if (departure < today) {
//       return res.status(400).json({
//         success: false,
//         message: "Departure date cannot be in the past",
//       });
//     }

//     if (returnD <= departure) {
//       return res.status(400).json({
//         success: false,
//         message: "Return date must be after departure date",
//       });
//     }

//     // Validate budget
//     if (isNaN(budget) || budget <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Budget must be a positive number",
//       });
//     }

//     // Update fields
//     itinerary.tourName = tourName || itinerary.tourName;
//     itinerary.descriptionItinerary = descriptionItinerary || itinerary.descriptionItinerary;
//     itinerary.departureDate = departureDate || itinerary.departureDate;
//     itinerary.returnDate = returnDate || itinerary.returnDate;
//     itinerary.numberOfTravelers = numberOfTravelers || itinerary.numberOfTravelers;
//     itinerary.budget = budget || itinerary.budget;
//     itinerary.currency = currency || itinerary.currency;
//     itinerary.originalBudget = budget || itinerary.originalBudget;
//     itinerary.originalCurrency = currency || itinerary.originalCurrency;

//     await itinerary.save();

//     res.status(200).json({
//       success: true,
//       message: "Itinerary updated successfully",
//       data: itinerary,
//     });
//   } catch (error) {
//     console.error("Error updating itinerary:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to update itinerary. Please try again.",
//       error: error.message,
//     });
//   }
// };
export const updateItinerary = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      tourName,
      descriptionItinerary,
      departureDate,
      returnDate,
      numberOfTravelers,
      budget,
      currency,
    } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Find and update the itinerary in one step
    const itinerary = await Itinerary.findByIdAndUpdate(
      id,
      {
        tourName,
        descriptionItinerary,
        departureDate,
        returnDate,
        numberOfTravelers,
        budget,
        currency,
        originalBudget: budget,
        originalCurrency: currency,
      },
      { new: true, runValidators: false } // Return the updated document and skip full validation
    );

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: "Itinerary not found",
      });
    }

    if (itinerary.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this itinerary",
      });
    }

    if (itinerary.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Cannot update an itinerary that is not pending",
      });
    }

    // Validate dates
    const departure = new Date(departureDate);
    const returnD = new Date(returnDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (departure < today) {
      return res.status(400).json({
        success: false,
        message: "Departure date cannot be in the past",
      });
    }

    if (returnD <= departure) {
      return res.status(400).json({
        success: false,
        message: "Return date must be after departure date",
      });
    }

    // Validate budget
    if (isNaN(budget) || budget <= 0) {
      return res.status(400).json({
        success: false,
        message: "Budget must be a positive number",
      });
    }

    res.status(200).json({
      success: true,
      message: "Itinerary updated successfully",
      data: itinerary,
    });
  } catch (error) {
    console.error("Error updating itinerary:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update itinerary. Please try again.",
      error: error.message,
    });
  }
};

// Delete an itinerary
export const deleteItinerary = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const itinerary = await Itinerary.findById(id);
    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: "Itinerary not found",
      });
    }

    if (itinerary.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this itinerary",
      });
    }

    await Itinerary.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "Itinerary deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting itinerary:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete itinerary. Please try again.",
      error: error.message,
    });
  }
};

