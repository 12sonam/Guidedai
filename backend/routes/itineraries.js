import express from "express";
import { createItinerary, getUserItineraries, getItineraryById, updateItinerary, deleteItinerary } from "../controllers/itineraryController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// Create a new itinerary (protected route)
router.post("/", verifyToken, createItinerary);

// Get all itineraries for the logged-in user (protected route)
router.get("/", verifyToken, getUserItineraries);

// Get a single itinerary by ID (protected route)
router.get("/:id", verifyToken, getItineraryById);

// Update an itinerary (protected route)
router.put("/:id", verifyToken, updateItinerary);

// Delete an itinerary (protected route)
router.delete("/:id", verifyToken, deleteItinerary);

export default router;