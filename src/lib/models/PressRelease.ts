import mongoose, { Schema, Document } from "mongoose";

export interface IPressRelease extends Document {
  title: string;
  date: string; // stored as ISO-ish string like "13-06-2026" (matches admin UI)
  category: "press" | "policy" | "organization" | "speech";
}

const PressReleaseSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["press", "policy", "organization", "speech"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.PressRelease || mongoose.model<IPressRelease>("PressRelease", PressReleaseSchema);

