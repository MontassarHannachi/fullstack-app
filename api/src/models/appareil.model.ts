import mongoose from "mongoose";

const appareilSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    status: { type: String, enum: ["On", "Off"], required: true },
  },
  { timestamps: true, versionKey: false } // timestamps adds createdAt and updatedAt
);

export const Appareil = mongoose.model("Appareil", appareilSchema);
