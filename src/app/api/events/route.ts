import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Event from "@/lib/models/Event";

const initialEvents = [
  {
    day: "15",
    month: "JUN",
    year: "2025",
    title: "National Executive Meeting",
    place: "New Delhi",
    time: "11:00 AM",
    detail: "Strategic discussion on strengthening organization and future roadmap.",
    level: "national",
  },
  {
    day: "20",
    month: "JUN",
    year: "2025",
    title: "Farmers' Convention",
    place: "Lucknow, UP",
    time: "02:00 PM",
    detail: "Empowering farmers, discussing issues and sustainable solutions.",
    level: "state",
  },
  {
    day: "28",
    month: "JUN",
    year: "2025",
    title: "Youth Leadership Summit",
    place: "Bhopal, MP",
    time: "10:30 AM",
    detail: "Inspiring young minds, building leadership for tomorrow.",
    level: "state",
  },
  {
    day: "05",
    month: "JUL",
    year: "2025",
    title: "Public Outreach Program",
    place: "Patna, Bihar",
    time: "03:00 PM",
    detail: "Connecting with communities, listening to people, working for change.",
    level: "state",
  },
  {
    day: "12",
    month: "JUL",
    year: "2025",
    title: "National Council Meeting",
    place: "New Delhi",
    time: "11:00 AM",
    detail: "Reviewing progress and planning next steps for nation-building.",
    level: "national",
  },
  {
    day: "18",
    month: "JUL",
    year: "2025",
    title: "Kisan Samman Rally",
    place: "New Delhi",
    time: "10:00 AM",
    detail: "Honouring farmers and discussing national agricultural policy reforms.",
    level: "national",
  },
  {
    day: "25",
    month: "JUL",
    year: "2025",
    title: "Lokdal Annual Convention",
    place: "New Delhi",
    time: "09:30 AM",
    detail: "Annual gathering of leaders to chart Lokdal's vision for a stronger India.",
    level: "national",
  },
  {
    day: "08",
    month: "JUL",
    year: "2025",
    title: "Gram Vikas Abhiyan",
    place: "Varanasi, UP",
    time: "09:00 AM",
    detail: "Village outreach to understand rural challenges and drive development.",
    level: "state",
  },
];

export async function GET() {
  try {
    await dbConnect();
    let list = await Event.find({}).sort({ createdAt: -1 });
    
    // Auto-seed if collection is empty
    if (list.length === 0) {
      await Event.insertMany(initialEvents);
      list = await Event.find({}).sort({ createdAt: -1 });
    }
    
    return NextResponse.json({ success: true, data: list });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: errMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const record = await Event.create(body);
    return NextResponse.json({ success: true, data: record });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: errMessage }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }
    
    const deleted = await Event.findByIdAndDelete(id);
    
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: deleted });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: errMessage }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { id, ...updateData } = body;
    
    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    const updated = await Event.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updated) {
      return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: errMessage }, { status: 400 });
  }
}

