import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    averageConsultationTime: {
      type: Number,
      default: 7,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Setting", settingSchema);