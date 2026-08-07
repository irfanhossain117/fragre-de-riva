import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();

    // bestSeller ফিল্ডটি true এবং published এমন প্রোডাক্ট খুঁজবে
    // sortOrder/updatedAt দিয়ে সাজানো, যাতে একাধিক bestSeller থাকলেও ফলাফল predictable হয়
    const bestseller = await Product.findOne({
      bestSeller: true,
      isPublished: true,
    })
      .sort({ sortOrder: 1, updatedAt: -1 })
      .lean();

    if (!bestseller) {
      return NextResponse.json({ error: "No bestseller product found" }, { status: 404 });
    }

    // ভেরিয়েন্ট থেকে দাম বের করে নেওয়া (যদি variants অ্যারে থাকে)
    let price = 0;
    if (bestseller.variants && bestseller.variants.length > 0) {
      price = bestseller.variants[0].price;
    }

    const formattedProduct = {
      ...bestseller,
      _id: bestseller._id.toString(),
      price, // প্রাইস ফিল্ডটি আলাদাভাবে যুক্ত করা হলো যাতে ফ্রন্টএন্ডে সমস্যা না হয়
    };

    return NextResponse.json(formattedProduct, { status: 200 });
  } catch (error) {
    console.error("Error fetching bestseller:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
