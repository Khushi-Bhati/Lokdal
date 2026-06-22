import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import News from "@/lib/models/News";

const initialNews = [
  {
    image: "/assets/dharna3.jpeg",
    text: "किसान आंदोलन: किसानों की मांगों को लेकर लोकदल का देशव्यापी प्रदर्शन शुरू।",
    badge: "लोकदल अपडेट",
    author: "सुनील सिंह",
    role: "राष्ट्रीय अध्यक्ष, लोकदल",
    date: new Date("2026-06-20"),
  },
  {
    image: "/assets/join.jpg",
    text: "सदस्यता अभियान ने रिकॉर्ड स्तर छुआ, लाखों युवा संगठन से जुड़े।",
    badge: "प्रेस विज्ञप्ति",
    author: "सुनील सिंह",
    role: "राष्ट्रीय अध्यक्ष, लोकदल",
    date: new Date("2026-06-18"),
  },
];

export async function GET() {
  try {
    await dbConnect();
    let list = await News.find({}).sort({ createdAt: -1 });
    
    // Auto-seed if collection is empty
    if (list.length === 0) {
      await News.insertMany(initialNews);
      list = await News.find({}).sort({ createdAt: -1 });
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
    const record = await News.create(body);
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
    
    const deleted = await News.findByIdAndDelete(id);
    
    if (!deleted) {
      return NextResponse.json({ success: false, error: "News item not found" }, { status: 404 });
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

    const updated = await News.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updated) {
      return NextResponse.json({ success: false, error: "News item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: errMessage }, { status: 400 });
  }
}

