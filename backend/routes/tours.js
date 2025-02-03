import express from 'express';
import { createTour, deleteTour, getAllTour, updateTour, getSingleTour, getTourBySearch, getRecommendationTour, getTourCount } from '../controllers/tourController.js';

const router = express.Router();

// create new tour
router.post("/", createTour);

// update tour
router.put("/:id", updateTour);

// delete tour
router.delete("/:id", deleteTour);

// get single tour
router.get("/:id", getSingleTour);  

// get all tours
router.get("/", getAllTour);

//get tour by search
router.get("/search/getTourBySearch", getTourBySearch);
router.get("/search/getRecommendationTours", getRecommendationTour);
router.get("/search/getTourCount", getTourCount);

export default router;