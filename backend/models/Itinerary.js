import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    numberOfTravelers: {
      type: Number,
      required: true,
      min: 1,
    },
    departureDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
      required: true,
    },
    tourName: {
      type: String,
      required: true,
      trim: true,
    },
    descriptionItinerary: {
      type: String,
      required: true,
      trim: true,
    },
    tripTypes: {
      natureAdventure: { type: Boolean, default: false },
      cultureHistory: { type: Boolean, default: false },
      foodCulinary: { type: Boolean, default: false },
      wildlifeSafari: { type: Boolean, default: false },
      relaxationWellness: { type: Boolean, default: false },
      religiousSpiritual: { type: Boolean, default: false },
      others: { type: String, default: "", trim: true },
    },
    budget: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      enum: ["USD", "NRP"],
    },
    originalBudget: {
      type: Number,
      required: true,
      min: 0,
    },
    originalCurrency: {
      type: String,
      required: true,
      enum: ["USD", "NRP"],
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },
    feedback: {
    type: String, 
    default: null,
  },
  },
  { timestamps: true }
);

export default mongoose.model("Itinerary", itinerarySchema);