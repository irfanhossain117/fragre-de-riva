import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Review from "@/models/Review";
import Product from "@/models/Product";

/* GET all reviews across all products (admin only) — with product name attached */
export async function GET() {
  try {
    await connectDB();

    const reviews = await Review.find({}).sort({ createdAt: -1 }).lean();

    // Review-এ শুধু productId (string) সেভ থাকে, product এর নাম না —
    // তাই এখানে সংশ্লিষ্ট প্রোডাক্টগুলো এক কুয়েরিতে এনে নাম যুক্ত করে দেওয়া হচ্ছে।
    const validProductIds = [
      ...new Set(
        reviews
          .map((r) => r.productId)
          .filter((id) => mongoose.Types.ObjectId.isValid(id))
      ),
    ];

    const products = await Product.find(
      { _id: { $in: validProductIds } },
      { name: 1, slug: 1 }
    ).lean();

    const productMap = new Map(products.map((p) => [p._id.toString(), p]));

    const formatted = reviews.map((r) => {
      const product = productMap.get(r.productId);
      return {
        _id: r._id.toString(),
        productId: r.productId,
        productName: product?.name || "Deleted Product",
        productSlug: product?.slug || null,
        rating: r.rating,
        comment: r.comment,
        userName: r.userName,
        createdAt: r.createdAt,
      };
    });

    return NextResponse.json({ success: true, reviews: formatted });
  } catch (error) {
    console.error("GET ALL REVIEWS ERROR:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch reviews" }, { status: 500 });
  }
}
