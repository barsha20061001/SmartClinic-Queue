import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    tokenNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["waiting", "serving", "completed"],
      default: "waiting",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Patient", patientSchema);