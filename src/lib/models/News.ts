import mongoose, { Schema, Document } from "mongoose";

export interface INews extends Document {
  image: string;
  text: string;
  badge: string;
  author: string;
  role: string;
  date: Date;
}

const NewsSchema: Schema = new Schema(
  {
    image: { type: String, required: true },
    text: { type: String, required: true, trim: true },
    badge: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.News || mongoose.model<INews>("News", NewsSchema);
