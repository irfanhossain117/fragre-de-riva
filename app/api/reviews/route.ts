import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Review from "@/models/Review";

// ১. POST মেথড: নতুন রিভিউ ডাটাবেজে সেভ করার জন্য
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { productId, rating, comment, userName } = body;

    if (!productId || !rating || !comment || !userName) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    const newReview = await Review.create({
      productId: String(productId),
      rating: Number(rating),
      comment,
      userName,
    });

    return NextResponse.json(
      { success: true, message: "Review saved successfully!", data: newReview },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving review:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save review" },
      { status: 500 }
    );
  }
}

// ২. GET মেথড: নির্দিষ্ট প্রোডাক্টের রিভিউ ফেচ করার জন্য (public, product page)
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { success: false, error: "Product ID is required" },
        { status: 400 }
      );
    }

    const reviews = await Review.find({ productId: String(productId) }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: reviews }, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
