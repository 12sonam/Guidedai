import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: String,
    otpExpiry: Date,
    isVerified: {
      type: Boolean,
      default: false
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    role: {
      type: String,
      enum: ["Admin", "Guide", "Traveler"],
      default: "Traveler",
    },
    guideProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GuideProfile",
    },
    resetToken: String, 
    resetTokenExpiry: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);


// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       minlength: 3,
//       maxlength: 30
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       lowercase: true,
//       match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
//     },
//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//       select: false // Don't return password in queries by default
//     },
//     photo: {
//       type: String,
//       default: ""
//     },
//     role: {
//       type: String,
//       enum: ["Admin", "Guide", "Traveler"],
//       default: "Traveler"
//     },
//     status: {
//       type: String,
//       enum: ["Active", "Inactive", "Suspended"],
//       default: "Active"
//     },
//     lastLogin: {
//       type: Date
//     },
//     resetPasswordToken: String,
//     resetPasswordExpire: Date
//   },
//   { 
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true }
//   }
// );

// // Indexes for better query performance
// userSchema.index({ email: 1 });
// userSchema.index({ role: 1 });
// userSchema.index({ status: 1 });

// export default mongoose.model("User", userSchema);