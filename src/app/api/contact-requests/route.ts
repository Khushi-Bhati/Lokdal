import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ContactRequest from "@/lib/models/ContactRequest";

export async function GET() {
  try {
    await dbConnect();
    const list = await ContactRequest.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: list });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: errMessage }, { status: 500 });
  }
}

// Optional endpoint for forms; admin UI only needs GET/DELETE.
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    if (!body?.name || !body?.mobile || !body?.message) {
      return NextResponse.json({ success: false, error: "name, mobile, message are required" }, { status: 400 });
    }

    const record = await ContactRequest.create({
      name: body.name,
      mobile: body.mobile,
      subject: body.subject,
      message: body.message,
    });

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
    if (!id) return NextResponse.json({ success: false, error: "id is required" }, { status: 400 });

    const deleted = await ContactRequest.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ success: false, error: "Contact request not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: deleted });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: errMessage }, { status: 500 });
  }
}

