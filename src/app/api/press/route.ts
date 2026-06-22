import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import PressRelease from "@/lib/models/PressRelease";

const initialPress = [
  {
    title: "Hon'ble Sunil Singh जी की प्रेस वार्ता के मुख्य बिंदु",
    date: "13-06-2026",
    category: "press",
  },
  {
    title: "किसान, युवा और ग्रामीण विकास पर लोकदल की प्राथमिकताएं",
    date: "11-06-2026",
    category: "policy",
  },
  {
    title: "Hon'ble Sunil Singh जी ने केंद्र सरकार की नीतियों पर उठाए प्रश्न",
    date: "10-06-2026",
    category: "press",
  },
  {
    title: "NDA बैठक में लोकदल की अहम प्रस्तावनाएं",
    date: "09-06-2026",
    category: "policy",
  },
  {
    title: "मीडिया के सवालों के जवाब में लोकदल का आधिकारिक बयान",
    date: "08-06-2026",
    category: "press",
  },
  {
    title: "लोकदल की संगठनात्मक बैठक सफलतापूर्वक संपन्न",
    date: "07-06-2026",
    category: "organization",
  },
  {
    title: "दिल्ली अधिवेशन में Sunil Singh जी का प्रेरणादायक संबोधन",
    date: "06-06-2026",
    category: "speech",
  },
  {
    title: "बिहार दौरे पर Hon'ble Sunil Singh जी, कई जनसभाओं को किया संबोधित",
    date: "05-06-2026",
    category: "speech",
  },
  {
    title: "Hon'ble Sunil Singh जी का युवा सम्मेलन को संबोधन",
    date: "02-06-2026",
    category: "speech",
  },
];

export async function GET() {
  try {
    await dbConnect();
    let list = await PressRelease.find({}).sort({ createdAt: -1 });

    // Auto-seed if collection is empty
    if (list.length === 0) {
      await PressRelease.insertMany(initialPress);
      list = await PressRelease.find({}).sort({ createdAt: -1 });
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
    const record = await PressRelease.create(body);
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

    const deleted = await PressRelease.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Press release not found" }, { status: 404 });
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

    const updated = await PressRelease.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) {
      return NextResponse.json({ success: false, error: "Press release not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: errMessage }, { status: 400 });
  }
}

