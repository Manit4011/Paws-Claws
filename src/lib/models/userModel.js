import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    about: {
      type: String
    },
    profileUrl: {
      type: String
    },

    otp: {
      type: String,
      default: null
    },
    otpExpires: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

export const User = mongoose.models.users || mongoose.model("users", UserSchema);
