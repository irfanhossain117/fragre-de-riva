import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Review from "@/models/Review";

interface Context {
  params: Promise<{ id: string }>;
}

/* DELETE a review (admin — e.g. removing spam/inappropriate reviews) */
export async function DELETE(req: NextRequest, { params }: Context) {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid review ID" }, { status: 400 });
    }

    const review = await Review.findByIdAndDelete(id);

    if (!review) {
      return NextResponse.json({ success: false, message: "Review not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Review deleted." });
  } catch (error) {
    console.error("DELETE REVIEW ERROR:", error);
    return NextResponse.json({ success: false, message: "Failed to delete review" }, { status: 500 });
  }
}
