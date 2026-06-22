import mongoose, { Schema, Document } from "mongoose";

export interface IGallery extends Document {
  src: string;
  type: "image" | "video";
  category: string;
  title: string;
  year: number;
}

const GallerySchema: Schema = new Schema(
  {
    src: { type: String, required: true },
    type: { type: String, enum: ["image", "video"], default: "image" },
    category: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Gallery || mongoose.model<IGallery>("Gallery", GallerySchema);
