import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Supporter from "@/lib/models/Supporter";

const initialSupporters = [
  { name: "Rajesh Kumar", email: "rajesh.k@gmail.com", phone: "+91 98100 23412", state: "Uttar Pradesh", district: "Meerut", role: "Volunteer", status: "Active", joinedDate: new Date("2026-06-18") },
  { name: "Sunita Chaudhary", email: "sunita.c@yahoo.com", phone: "+91 94520 88219", state: "Haryana", district: "Rohtak", role: "Member", status: "Active", joinedDate: new Date("2026-06-17") },
  { name: "Mukesh Yadav", email: "mukesh.yadav@outlook.com", phone: "+91 88229 10452", state: "Bihar", district: "Patna", role: "Volunteer", status: "Pending", joinedDate: new Date("2026-06-20") },
  { name: "Anjali Sharma", email: "anjali.sh@gmail.com", phone: "+91 70129 99042", state: "Rajasthan", district: "Jaipur", role: "Member", status: "Active", joinedDate: new Date("2026-06-15") },
  { name: "Deepak Tomar", email: "deepak.tomar@gmail.com", phone: "+91 99102 54321", state: "Uttar Pradesh", district: "Aligarh", role: "Volunteer", status: "Pending", joinedDate: new Date("2026-06-19") },
  { name: "Preeti Singh", email: "preeti.s@gmail.com", phone: "+91 98765 43210", state: "Uttar Pradesh", district: "Lucknow", role: "Member", status: "Active", joinedDate: new Date("2026-06-14") },
];

export async function GET() {
  try {
    await dbConnect();
    let list = await Supporter.find({}).sort({ createdAt: -1 });
    
    // Auto-seed if collection is empty
    if (list.length === 0) {
      await Supporter.insertMany(initialSupporters);
      list = await Supporter.find({}).sort({ createdAt: -1 });
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
    const record = await Supporter.create(body);
    return NextResponse.json({ success: true, data: record });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: errMessage }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }
    
    const body = await request.json();
    const updated = await Supporter.findByIdAndUpdate(id, body, { new: true });
    
    if (!updated) {
      return NextResponse.json({ success: false, error: "Supporter not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: updated });
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
    
    const deleted = await Supporter.findByIdAndDelete(id);
    
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Supporter not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: deleted });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: errMessage }, { status: 500 });
  }
}
