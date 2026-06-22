import mongoose, { Schema, Document } from "mongoose";

export interface IContactRequest extends Document {
  name: string;
  mobile: string;
  subject?: string;
  message: string;
  createdAt?: Date;
}

const ContactRequestSchema = new Schema<IContactRequest>(
  {
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    subject: { type: String, required: false, trim: true },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.models.ContactRequest || mongoose.model<IContactRequest>("ContactRequest", ContactRequestSchema);

