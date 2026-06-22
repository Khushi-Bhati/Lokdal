import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  day: string;
  month: string;
  year: string;
  title: string;
  place: string;
  time: string;
  detail: string;
  level: "national" | "state";
}

const EventSchema: Schema = new Schema(
  {
    day: { type: String, required: true },
    month: { type: String, required: true },
    year: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    place: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    detail: { type: String, required: true, trim: true },
    level: { type: String, enum: ["national", "state"], default: "national" },
  },
  { timestamps: true }
);

export default mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
