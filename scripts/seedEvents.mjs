import mongoose from "mongoose";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

// Manually read .env file (no dotenv needed)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "../.env");
const envContent = readFileSync(envPath, "utf8");
envContent.split("\n").forEach((line) => {
  const [key, ...rest] = line.split("=");
  if (key && rest.length) {
    process.env[key.trim()] = rest.join("=").trim().replace(/^"|"$/g, "");
  }
});

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env");
  process.exit(1);
}

const EventSchema = new mongoose.Schema(
  {
    day:    { type: String, required: true },
    month:  { type: String, required: true },
    year:   { type: String, required: true },
    title:  { type: String, required: true },
    place:  { type: String, required: true },
    time:   { type: String, required: true },
    detail: { type: String, required: true },
    level:  { type: String, enum: ["national", "state"], default: "national" },
  },
  { timestamps: true }
);

const Event = mongoose.models?.Event || mongoose.model("Event", EventSchema);

const initialEvents = [
  { day: "15", month: "JUN", year: "2025", title: "National Executive Meeting",   place: "New Delhi",    time: "11:00 AM", detail: "Strategic discussion on strengthening organization and future roadmap.", level: "national" },
  { day: "20", month: "JUN", year: "2025", title: "Farmers' Convention",          place: "Lucknow, UP",  time: "02:00 PM", detail: "Empowering farmers, discussing issues and sustainable solutions.",      level: "state"    },
  { day: "28", month: "JUN", year: "2025", title: "Youth Leadership Summit",      place: "Bhopal, MP",   time: "10:30 AM", detail: "Inspiring young minds, building leadership for tomorrow.",              level: "state"    },
  { day: "05", month: "JUL", year: "2025", title: "Public Outreach Program",      place: "Patna, Bihar", time: "03:00 PM", detail: "Connecting with communities, listening to people, working for change.", level: "state"    },
  { day: "12", month: "JUL", year: "2025", title: "National Council Meeting",     place: "New Delhi",    time: "11:00 AM", detail: "Reviewing progress and planning next steps for nation-building.",       level: "national" },
  { day: "18", month: "JUL", year: "2025", title: "Kisan Samman Rally",           place: "New Delhi",    time: "10:00 AM", detail: "Honouring farmers and discussing national agricultural policy reforms.", level: "national" },
  { day: "25", month: "JUL", year: "2025", title: "Lokdal Annual Convention",     place: "New Delhi",    time: "09:30 AM", detail: "Annual gathering of leaders to chart Lokdal's vision for a stronger India.", level: "national" },
  { day: "08", month: "JUL", year: "2025", title: "Gram Vikas Abhiyan",           place: "Varanasi, UP", time: "09:00 AM", detail: "Village outreach to understand rural challenges and drive development.", level: "state"    },
];

async function seed() {
  console.log("🔌 Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected!");

  const existing = await Event.countDocuments();
  if (existing > 0) {
    console.log(`ℹ️  Database already has ${existing} event(s). Deleting and re-seeding...`);
    await Event.deleteMany({});
  }

  console.log("🌱 Seeding 8 initial events...");
  const inserted = await Event.insertMany(initialEvents);
  console.log(`\n✅ Successfully inserted ${inserted.length} events into MongoDB!\n`);
  inserted.forEach((e, i) =>
    console.log(`   ${i + 1}. [${e.level.toUpperCase().padEnd(8)}] ${e.day} ${e.month} ${e.year}  —  ${e.title}`)
  );

  await mongoose.disconnect();
  console.log("\n🔒 Disconnected. Done!");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});
