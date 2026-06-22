import mongoose from "mongoose";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

// Read .env manually
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envContent = readFileSync(path.join(__dirname, "../.env.local"), "utf8");
envContent.split("\n").forEach((line) => {
  const [key, ...rest] = line.split("=");
  if (key && rest.length) process.env[key.trim()] = rest.join("=").trim().replace(/^"|"$/g, "");
});

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error("❌ MONGODB_URI not found"); process.exit(1); }

// ── Schemas ──────────────────────────────────────────────────────────────────
const NewsSchema = new mongoose.Schema({ image: String, text: String, badge: String, author: String, role: String, date: Date }, { timestamps: true });
const PressSchema = new mongoose.Schema({ title: String, date: String, category: String }, { timestamps: true });
const GallerySchema = new mongoose.Schema({ src: String, type: String, category: String, title: String, year: Number }, { timestamps: true });
const SupporterSchema = new mongoose.Schema({ name: String, email: { type: String, unique: true }, phone: String, state: String, district: String, role: String, status: String, joinedDate: Date }, { timestamps: true });

const News = mongoose.model("News", NewsSchema);
const Press = mongoose.model("PressRelease", PressSchema);
const Gallery = mongoose.model("Gallery", GallerySchema);
const Supporter = mongoose.model("Supporter", SupporterSchema);

// ── Seed Data ─────────────────────────────────────────────────────────────────
const newsData = [
  { image: "/assets/dharna3.jpeg", text: "किसान आंदोलन: किसानों की मांगों को लेकर लोकदल का देशव्यापी प्रदर्शन शुरू।", badge: "लोकदल अपडेट", author: "सुनील सिंह", role: "राष्ट्रीय अध्यक्ष, लोकदल", date: new Date("2026-06-20") },
  { image: "/assets/join.jpg", text: "सदस्यता अभियान ने रिकॉर्ड स्तर छुआ, लाखों युवा संगठन से जुड़े।", badge: "प्रेस विज्ञप्ति", author: "सुनील सिंह", role: "राष्ट्रीय अध्यक्ष, लोकदल", date: new Date("2026-06-18") },
];

const pressData = [
  { title: "Hon'ble Sunil Singh जी की प्रेस वार्ता के मुख्य बिंदु", date: "13-06-2026", category: "press" },
  { title: "किसान, युवा और ग्रामीण विकास पर लोकदल की प्राथमिकताएं", date: "11-06-2026", category: "policy" },
  { title: "Hon'ble Sunil Singh जी ने केंद्र सरकार की नीतियों पर उठाए प्रश्न", date: "10-06-2026", category: "press" },
  { title: "NDA बैठक में लोकदल की अहम प्रस्तावनाएं", date: "09-06-2026", category: "policy" },
  { title: "मीडिया के सवालों के जवाब में लोकदल का आधिकारिक बयान", date: "08-06-2026", category: "press" },
  { title: "लोकदल की संगठनात्मक बैठक सफलतापूर्वक संपन्न", date: "07-06-2026", category: "organization" },
  { title: "दिल्ली अधिवेशन में Sunil Singh जी का प्रेरणादायक संबोधन", date: "06-06-2026", category: "speech" },
  { title: "बिहार दौरे पर Hon'ble Sunil Singh जी, कई जनसभाओं को किया संबोधित", date: "05-06-2026", category: "speech" },
  { title: "Hon'ble Sunil Singh जी का युवा सम्मेलन को संबोधन", date: "02-06-2026", category: "speech" },
];

const galleryData = [
  { src: "/assets/dharna1.jpeg", type: "image", category: "Dharna Pradershan", title: "Dharna Pradarshan Campaign", year: 2024 },
  { src: "/assets/dharna3.jpeg", type: "image", category: "Dharna Pradershan", title: "Farmer Demands Rally", year: 2024 },
  { src: "/assets/dharna5.jpeg", type: "image", category: "Karkarta Sambhelan", title: "Karkarta Sammelan Meetup", year: 2024 },
  { src: "/assets/kisan.jpg",    type: "image", category: "Posters",            title: "Kisan Rights Manifesto", year: 2024 },
  { src: "/assets/join.jpg",     type: "image", category: "Lokdal Jansabha",    title: "Lokdal Jansabha", year: 2024 },
  { src: "/assets/gallery-5.jpg",type: "image", category: "Lokdal Jansabha",    title: "Lokdal Jansabha", year: 2023 },
  { src: "/assets/gallery-9.jpg",type: "image", category: "T-20 Championship",  title: "T-20 Championship", year: 2023 },
  { src: "/assets/hazare1.jpg",  type: "image", category: "Lokdal Haryana President with Anna Hazare", title: "With Anna Hazare", year: 2023 },
  { src: "/assets/hazare2.jpg",  type: "image", category: "Lokdal Haryana President with Anna Hazare", title: "With Anna Hazare 2", year: 2022 },
  { src: "/assets/samman-2.jpg", type: "image", category: "Posters",            title: "Posters", year: 2024 },
  { src: "/assets/6.jpg",        type: "image", category: "Karkarta Sambhelan", title: "Karkarta Sambhelan", year: 2023 },
  { src: "/assets/delhichalo-16.jpg", type: "image", category: "Delhi Chalo",   title: "Delhi Chalo", year: 2022 },
  { src: "/videos/6.mp4",        type: "video", category: "Videos",             title: "Yuva Hunkar Rally", year: 2024 },
  { src: "/videos/8.mp4",        type: "video", category: "Videos",             title: "Press Conference Patna", year: 2024 },
  { src: "/videos/10.mp4",       type: "video", category: "Videos",             title: "National Executive Address", year: 2023 },
];

const supportersData = [
  { name: "Rajesh Kumar",    email: "rajesh.k@gmail.com",       phone: "+91 98100 23412", state: "Uttar Pradesh", district: "Meerut",  role: "Volunteer", status: "Active",  joinedDate: new Date("2026-06-18") },
  { name: "Sunita Chaudhary",email: "sunita.c@yahoo.com",       phone: "+91 94520 88219", state: "Haryana",       district: "Rohtak", role: "Member",    status: "Active",  joinedDate: new Date("2026-06-17") },
  { name: "Mukesh Yadav",    email: "mukesh.yadav@outlook.com", phone: "+91 88229 10452", state: "Bihar",         district: "Patna",  role: "Volunteer", status: "Pending", joinedDate: new Date("2026-06-20") },
  { name: "Anjali Sharma",   email: "anjali.sh@gmail.com",      phone: "+91 70129 99042", state: "Rajasthan",    district: "Jaipur", role: "Member",    status: "Active",  joinedDate: new Date("2026-06-15") },
  { name: "Deepak Tomar",    email: "deepak.tomar@gmail.com",   phone: "+91 99102 54321", state: "Uttar Pradesh", district: "Aligarh",role: "Volunteer", status: "Pending", joinedDate: new Date("2026-06-19") },
  { name: "Preeti Singh",    email: "preeti.s@gmail.com",       phone: "+91 98765 43210", state: "Uttar Pradesh", district: "Lucknow",role: "Member",    status: "Active",  joinedDate: new Date("2026-06-14") },
];

// ── Seed function ─────────────────────────────────────────────────────────────
async function seedCollection(Model, data, label) {
  const count = await Model.countDocuments();
  if (count > 0) {
    console.log(`  ℹ️  ${label}: already has ${count} records — skipping.`);
    return;
  }
  const inserted = await Model.insertMany(data);
  console.log(`  ✅ ${label}: inserted ${inserted.length} records.`);
}

async function seed() {
  console.log("\n🔌 Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected!\n");

  console.log("🌱 Seeding collections...");
  await seedCollection(News,      newsData,       "News & Updates");
  await seedCollection(Press,     pressData,      "Press Releases");
  await seedCollection(Gallery,   galleryData,    "Gallery");
  await seedCollection(Supporter, supportersData, "Supporters");

  await mongoose.disconnect();
  console.log("\n🔒 Done! All collections seeded.\n");
}

seed().catch((err) => { console.error("❌ Seed failed:", err.message); process.exit(1); });
