import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Organisation from "@/lib/models/Organisation";

const seed = [
  {
    slug: "national-executive",
    title: "National Executives",
    slogan: "Strong Leadership. Stronger Nation.",
    regions: [
      { region: "North Zone" },
      { region: "South Zone" },
      { region: "East Zone" },
      { region: "West Zone" },
    ],
    profiles: [
      { name: "Chaudhary Sunil Singh", role: "National President", image: "/assets/sunil profile.jpg" },
      { name: "Chaudhary Charan Singh", role: "Founder & Former PM", image: "/assets/charan profile.jpg" },
    ],
  },
  {
    slug: "uttar-pradesh",
    title: "UP Executives",
    slogan: "Strong Leadership. Stronger Uttar Pradesh.",
    regions: [{ region: "Sambhal" }, { region: "Aligarh" }],
    profiles: [{ name: "Sunil Singh", role: "State Coordinator", image: "/assets/sunil profile.jpg" }],
  },
  {
    slug: "haryana",
    title: "Haryana Executives",
    slogan: "Strong Leadership. Stronger Haryana.",
    regions: [
      { region: "Rohtak" },
      { region: "Hisar" },
      { region: "Karnal" },
      { region: "Ambala" },
    ],
    profiles: [{ name: "Chaudhary Charan Singh", role: "Senior Leader", image: "/assets/charan profile.jpg" }],
  },
  {
    slug: "rajasthan",
    title: "Rajasthan Executives",
    slogan: "Strong Leadership. Stronger Rajasthan.",
    regions: [
      { region: "Jaipur" },
      { region: "Jodhpur" },
      { region: "Udaipur" },
      { region: "Bikaner" },
    ],
    profiles: [{ name: "Chaudhary Rajinder Singh", role: "Senior Leader", image: "/assets/Rajinder Singh.png" }],
  },
];

export async function GET() {
  try {
    await dbConnect();
    let list = await Organisation.find({}).sort({ createdAt: -1 });

    if (!list || list.length === 0) {
      await Organisation.insertMany(seed);
      list = await Organisation.find({}).sort({ createdAt: -1 });
    }

    return NextResponse.json({ success: true, data: list });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: errMessage }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await dbConnect();
    const { id, ...body } = await request.json();

    if (!id) {
      return NextResponse.json({ success: false, error: "id is required" }, { status: 400 });
    }

    const updated = await Organisation.findByIdAndUpdate(id, body, { new: true });
    if (!updated) {
      return NextResponse.json({ success: false, error: "Organisation not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: errMessage }, { status: 400 });
  }
}


