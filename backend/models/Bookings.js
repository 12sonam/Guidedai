import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    userEmail: {
      type: String,
    },
    tourId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour',
      required: true // Make it required to ensure every booking references a tour
    },
    tourName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    guestSize: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    bookAt: {
      type: Date,
      required: true,
    },
    payment: {
      type: String,
      required: true,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'pending',
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    originalCurrency: {
      type: String,
      enum: ['USD', 'NPR'],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);