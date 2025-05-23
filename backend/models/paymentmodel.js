import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    transactionId: { type: String, unique: true },
    pidx: { type: String, unique: true },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    amount: { type: Number, required: true },
    dataFromVerificationReq: { type: Object },
    apiQueryFromUser: { type: Object },
    paymentGateway: {
      type: String,
      enum: ["khalti", "esewa", "connectIps"],
      required: true,
    },
    status: {
      type: String,
      enum: ["success", "pending", "failed"],
      default: "pending",
    },
    paymentDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Add error handling for duplicate keys
paymentSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('Duplicate payment detected: payment with this pidx or transactionId already exists'));
  } else {
    next(error);
  }
});

const Payment = mongoose.model("payment", paymentSchema);

export default Payment;