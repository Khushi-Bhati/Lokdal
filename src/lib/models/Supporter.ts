import mongoose, { Schema, Document } from "mongoose";

export interface ISupporter extends Document {
  name: string;
  email: string;
  phone: string;
  state: string;
  district: string;
  role: "Volunteer" | "Member";
  status: "Active" | "Pending";
  joinedDate: Date;
}

const SupporterSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true },
    role: { type: String, enum: ["Volunteer", "Member"], default: "Volunteer" },
    status: { type: String, enum: ["Active", "Pending"], default: "Pending" },
    joinedDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Supporter || mongoose.model<ISupporter>("Supporter", SupporterSchema);
