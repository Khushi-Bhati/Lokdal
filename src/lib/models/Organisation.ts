import mongoose, { Schema, Document } from "mongoose";

export interface IOrganisationRegion {
  region: string;
}

export interface IOrganisationProfile {
  name: string;
  role: string;
  image: string;
}

export interface IOrganisation extends Document {
  slug: string;
  title: string;
  slogan: string;
  regions: IOrganisationRegion[];
  profiles: IOrganisationProfile[];
}

const OrganisationRegionSchema = new Schema<IOrganisationRegion>(
  {
    region: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const OrganisationProfileSchema = new Schema<IOrganisationProfile>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const OrganisationSchema = new Schema<IOrganisation>(
  {
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    title: { type: String, required: true, trim: true },
    slogan: { type: String, required: true, trim: true },
    regions: { type: [OrganisationRegionSchema], default: [] },
    profiles: { type: [OrganisationProfileSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Organisation || mongoose.model<IOrganisation>("Organisation", OrganisationSchema);

