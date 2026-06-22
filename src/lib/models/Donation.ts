import mongoose, { Schema, Document } from "mongoose";

export interface IDonation extends Document {
  name: string;
  amount: number;
  method: "upi" | "card" | "netbanking";
  date: string; // admin UI uses ISO date string like "2026-06-20"
  status: "completed" | "pending" | "failed";
}

const DonationSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    method: {
      type: String,
      enum: ["upi", "card", "netbanking"],
      required: true,
    },
    date: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["completed", "pending", "failed"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Donation || mongoose.model<IDonation>("Donation", DonationSchema);

