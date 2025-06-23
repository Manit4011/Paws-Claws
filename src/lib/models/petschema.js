import mongoose from "mongoose";

const petschema = new mongoose.Schema(
  {
    petname: { type: String, required: true },
    gender: { type: String, required: true },
    location: { type: String, required: true },
    owner: { type: String, required: true },
    postedOn: { type: String },
    age: { type: String },
    imageUrl: { type: String },
    adoptionLink: { type: String }
  },
  { timestamps: true }
);

export const Savedpet =
  mongoose.models.savedpets || mongoose.model("savedpets", petschema);
