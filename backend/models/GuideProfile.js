import mongoose from "mongoose";

const guideProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      required: true
    },
    expertise: {
      type: [String],
      required: true
    },
    locations: {
      type: [String],
      required: true
    },
    pricing: {
      hourly: {
        type: Number,
        required: true
      },
      daily: {
        type: Number,
        required: true
      },
      weekly: {
        type: Number,
        required: true
      }
    },
    contact: {
      email: {
        type: String,
        required: true
      },
      phone: String,
      instagram: String,
      facebook: String,
      linkedin: String
    },
    rating: {
      type: Number,
      default: 0
    },
    profileImage: {
      type: String,
      required: true
    },
    languages: {
      type: [String],
      default: ["English"]
    }
  },
  { timestamps: true }
);

export default mongoose.model("GuideProfile", guideProfileSchema);