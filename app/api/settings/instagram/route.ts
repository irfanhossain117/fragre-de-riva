import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product"; // অথবা তোমার নিজস্ব Settings মডেল থাকলে সেটি ব্যবহার করতে পার

export async function GET() {
  try {
    await connectDB();

    // বিকল্প ১: ডেটাবেজের পাবলিশড প্রোডাক্টগুলোর ছবি থেকে র্যান্ডম ৪টি ছবি গ্যালারিতে দেখানো
    const products = await Product.find({ isPublished: true }).limit(4).lean();
    
    let galleryImages = products.map((p) => p.image || (p.images && p.images[0])).filter(Boolean);

    // যদি ডেটাবেজে পর্যাপ্ত ছবি না থাকে, তবে ডিফল্ট ছবি দিয়ে ফিলআপ করা
    const defaultImages = [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1200",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200",
      "https://images.unsplash.com/photo-1615634262417-2b0e3f6f0d08?q=80&w=1200",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59db9?q=80&w=1200",
    ];

    while (galleryImages.length < 4) {
      galleryImages.push(defaultImages[galleryImages.length]);
    }

    return NextResponse.json(galleryImages.slice(0, 4), { status: 200 });
  } catch (error) {
    console.error("Error fetching instagram gallery:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}