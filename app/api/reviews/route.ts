import { NextResponse } from "next/server";
import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

// ২. পারফরম্যান্স ফিক্স: Mongoose Connection Caching (Next.js serverless/hot-reload অপ্টিমাইজেশন)
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// ৩. রিভিউ স্কিমা এবং মডেল তৈরি (যদি আগে থেকে না থাকে)
const reviewSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  userName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

// ৪. POST মেথড: নতুন রিভিউ ডাটাবেজে সেভ করার জন্য
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { productId, rating, comment, userName } = body;

    // ভ্যালিডেশন চেক
    if (!productId || !rating || !comment || !userName) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // ডাটাবেজে সেভ করা
    const newReview = await Review.create({
      productId: Number(productId),
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

// ৫. GET মেথড: নির্দিষ্ট প্রোডাক্টের রিভিউ ফেচ করার জন্য
export async function GET(request: Request) {
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

    const reviews = await Review.find({ productId: Number(productId) }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: reviews }, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}