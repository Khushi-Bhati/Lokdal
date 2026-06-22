import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Gallery from "@/lib/models/Gallery";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const initialGallery = [
  { src: "/assets/dharna1.jpeg", type: "image", category: "Dharna Pradershan", title: "Dharna Pradarshan Campaign", year: 2024 },
  { src: "/assets/dharna3.jpeg", type: "image", category: "Dharna Pradershan", title: "Farmer Demands Rally", year: 2024 },
  { src: "/assets/dharna5.jpeg", type: "image", category: "Karkarta Sambhelan", title: "Karkarta Sammelan Meetup", year: 2024 },
  { src: "/assets/kisan.jpg", type: "image", category: "Posters", title: "Kisan Rights Manifesto", year: 2024 },
  { src: "/videos/6.mp4", type: "video", category: "Videos", title: "Yuva Hunkar Rally Video", year: 2024 },
];

export async function GET() {
  try {
    await dbConnect();
    let list = await Gallery.find({}).sort({ createdAt: -1 });
    
    // Auto-seed if collection is empty
    if (list.length === 0) {
      await Gallery.insertMany(initialGallery);
      list = await Gallery.find({}).sort({ createdAt: -1 });
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
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string;
    const type = formData.get("type") as "image" | "video";
    const category = formData.get("category") as string;
    const year = formData.get("year") ? Number(formData.get("year")) : new Date().getFullYear();

    if (!file) {
      return NextResponse.json({ success: false, error: "File is required" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save locally
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);
    const fileUrl = `/uploads/${filename}`;

    const record = await Gallery.create({
      src: fileUrl,
      type,
      category: type === "video" ? "Videos" : category,
      title,
      year,
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
    
    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }
    
    const deleted = await Gallery.findByIdAndDelete(id);
    
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Gallery item not found" }, { status: 404 });
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

    const updated = await Gallery.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updated) {
      return NextResponse.json({ success: false, error: "Gallery item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: errMessage }, { status: 400 });
  }
}

