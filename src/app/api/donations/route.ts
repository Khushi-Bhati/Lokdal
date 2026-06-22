import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Donation from "@/lib/models/Donation";

const initialDonations = [
  { name: "Ramesh Kumar", amount: 5000, method: "upi", date: "2026-06-20", status: "completed" },
  { name: "Sunita Devi", amount: 1000, method: "card", date: "2026-06-19", status: "completed" },
  { name: "Manoj Yadav", amount: 2100, method: "netbanking", date: "2026-06-18", status: "completed" },
  { name: "Priya Sharma", amount: 500, method: "upi", date: "2026-06-17", status: "pending" },
  { name: "Deepak Tomar", amount: 11000, method: "upi", date: "2026-06-16", status: "completed" },
  { name: "Kavita Singh", amount: 21000, method: "netbanking", date: "2026-06-15", status: "completed" },
];

export async function GET() {
  try {
    await dbConnect();
    let list = await Donation.find({}).sort({ createdAt: -1 });

    // Auto-seed if collection is empty
    if (list.length === 0) {
      await Donation.insertMany(initialDonations);
      list = await Donation.find({}).sort({ createdAt: -1 });
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
    const record = await Donation.create(body);
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

    const deleted = await Donation.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Donation not found" }, { status: 404 });
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

    const updated = await Donation.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) {
      return NextResponse.json({ success: false, error: "Donation not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: errMessage }, { status: 400 });
  }
}


