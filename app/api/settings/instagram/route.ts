import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Settings from "@/models/Settings"; // আপনার যদি Settings মডেল থাকে

export async function GET() {
  try {
    await connectDB();
    // ডাটাবেজ থেকে সেটিংস বা ইনস্টাগ্রাম ইমেজ নিয়ে আসা
    const settings = await Settings.findOne().lean();

    const instagramImages = (settings as any)?.instagramImages || [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1200",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200",
      "https://images.unsplash.com/photo-1615634262417-2b0e3f6f0d08?q=80&w=1200",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59db9?q=80&w=1200",
    ];

    return NextResponse.json(instagramImages, { status: 200 });
  } catch (error) {
    console.error("GET INSTAGRAM SETTINGS ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch instagram images" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { instagramImages } = body;

    // ডাটাবেজে সেটিংস আপডেট বা সেভ করা
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({ instagramImages });
    } else {
      settings.instagramImages = instagramImages;
      await settings.save();
    }

    return NextResponse.json(
      { success: true, message: "Instagram gallery updated successfully", settings },
      { status: 200 }
    );
  } catch (error) {
    console.error("UPDATE INSTAGRAM SETTINGS ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update instagram images" },
      { status: 500 }
    );
  }
}