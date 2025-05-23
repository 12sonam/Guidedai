import express from "express";
import mongoose from "mongoose";
import { initializeKhaltiPayment, verifyKhaltiPayment } from "./khalti.js";
import Payment from "../models/paymentmodel.js";
import Booking from "../models/Bookings.js";
import Tour from "../models/Tour.js";

const router = express.Router();

// ✅ Route to initialize Khalti payment
router.post("/initialize-khalti", async (req, res) => {
  try {
    let {
      itemId,
      tourId, // Added tourId from the request body (sent by the updated Booking.jsx)
      fullName,
      userEmail,
      userId,
      tourName,
      guestSize,
      phone,
      bookAt,
      price,
      originalPrice,
      originalCurrency,
      website_url,
    } = req.body;

    // Validate required fields
    if (
      !itemId ||
      !fullName ||
      !userEmail ||
      !userId ||
      !guestSize ||
      !phone ||
      !bookAt ||
      !price ||
      !originalPrice ||
      !originalCurrency ||
      !website_url
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: itemId, fullName, userEmail, userId, guestSize, phone, bookAt, price, originalPrice, originalCurrency, and website_url are required",
      });
    }

    // Validate originalCurrency
    if (!['USD', 'NPR'].includes(originalCurrency)) {
      return res.status(400).json({
        success: false,
        message: "Invalid originalCurrency: must be either 'USD' or 'NPR'",
      });
    }

    // Log the itemId to debug its exact value
    console.log("itemId:", itemId);
    console.log("itemId length:", itemId.length);
    console.log("itemId type:", typeof itemId);

    // Validate itemId format (24-character hex string)
    if (typeof itemId !== 'string' || !/^[0-9a-fA-F]{24}$/.test(itemId.trim())) {
      return res.status(400).json({
        success: false,
        message: "Invalid itemId: must be a 24-character hex string",
      });
    }

    // If tourId is provided, ensure it matches itemId
    if (tourId && tourId !== itemId) {
      return res.status(400).json({
        success: false,
        message: "tourId does not match itemId",
      });
    }
    tourId = itemId; // Use itemId as tourId

    price = Number(price);
    guestSize = Number(guestSize);
    phone = Number(phone);
    originalPrice = Number(originalPrice);

    // Find tour by ID
    const tourData = await Tour.findOne({
      _id: new mongoose.Types.ObjectId(itemId.trim()),
    });

    if (!tourData) {
      return res.status(404).json({ success: false, message: "Tour not found" });
    }

    // Create booking with pending payment
    const bookingData = await Booking.create({
      userId,
      userEmail,
      tourId, // Set the tourId field
      tourName: tourName || tourData.title,
      fullName,
      guestSize,
      phone,
      bookAt: new Date(bookAt),
      payment: "pending",
      price,
      originalPrice,
      originalCurrency,
    });

    // Include itemId in the return_url
    const returnUrl = new URL(`http://localhost:3000/payment/complete-khalti-payment`);
    returnUrl.searchParams.append('itemId', itemId);

    const payment = await initializeKhaltiPayment({
      amount: price * 100,
      currency: 'NPR',
      purchase_order_id: bookingData._id.toString(),
      purchase_order_name: tourName || tourData.title,
      return_url: returnUrl.toString(),
      website_url,
    });

    return res.json({
      success: true,
      payment,
      booking: bookingData,
    });
  } catch (error) {
    console.error("Khalti Init Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ Route to verify Khalti payment
router.get("/complete-khalti-payment", async (req, res) => {
  const {
    pidx,
    txnId,
    amount,
    mobile,
    purchase_order_id,
    purchase_order_name,
    transaction_id,
  } = req.query;

  try {
    // Validate required query parameters
    if (!pidx || !transaction_id || !amount || !purchase_order_id) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required query parameters: pidx, transaction_id, amount, and purchase_order_id are required",
      });
    }

    // Validate purchase_order_id format
    if (!mongoose.Types.ObjectId.isValid(purchase_order_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid purchase_order_id: must be a valid MongoDB ObjectId",
      });
    }

    // Verify Khalti payment
    const paymentInfo = await verifyKhaltiPayment(pidx);
    if (!paymentInfo) {
      return res.status(400).json({
        success: false,
        message: "Failed to verify payment with Khalti",
      });
    }

    if (
      paymentInfo?.status !== "Completed" ||
      paymentInfo.transaction_id !== transaction_id ||
      Number(paymentInfo.total_amount) !== Number(amount)
    ) {
      return res.status(400).json({
        success: false,
        message: "Incomplete or mismatched payment information",
        paymentInfo,
      });
    }

    // Find the booking and verify details
    const bookingData = await Booking.findOne({
      _id: new mongoose.Types.ObjectId(purchase_order_id),
    });

    if (!bookingData) {
      return res.status(400).json({
        success: false,
        message: "Booking data not found",
      });
    }

    // Use findOneAndUpdate with upsert to handle duplicate payments
    const paymentData = await Payment.findOneAndUpdate(
      { pidx, transactionId: transaction_id },
      {
        $setOnInsert: {
          productId: purchase_order_id,
          amount,
          dataFromVerificationReq: paymentInfo,
          apiQueryFromUser: req.query,
          paymentGateway: "khalti",
          status: "success",
        },
      },
      { upsert: true, new: true }
    );

    // Update booking payment status to completed (only if not already updated)
    if (bookingData.payment !== "completed") {
      await Booking.findByIdAndUpdate(purchase_order_id, {
        $set: { payment: "completed" },
      });
    }

    // Refetch the booking to get the updated payment status
    const updatedBookingData = await Booking.findOne({
      _id: new mongoose.Types.ObjectId(purchase_order_id),
    });

    res.json({
      success: true,
      message: "Payment Successful",
      paymentData,
      booking: updatedBookingData,
    });
  } catch (error) {
    console.error("Verification Error:", error.message);
    console.error("Stack Trace:", error.stack);
    res.status(500).json({
      success: false,
      message: "An error occurred during verification",
      error: error.message,
    });
  }
});

export default router;