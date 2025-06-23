import mongoose from "mongoose";

const petschema = new mongoose.Schema(
  {
    petName: { type: String, required: true },
    gender: { type: String, required: true },
    location: { type: String, required: true },
    ownerName: { type: String, required: true },
    postedOn: { type: String },
    age: { type: String },
    imageUrl: { type: String },
    adoptionLink: { type: String },
    userid:{type : mongoose.ObjectId, required:true}
  },
  { timestamps: true }
);

export const Savedpet =
  mongoose.models.Savedpet || mongoose.model("Savedpet", petschema);

