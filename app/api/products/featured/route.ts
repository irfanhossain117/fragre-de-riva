import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();

    // ডেটাবেজ থেকে যে প্রোডাক্টগুলোর featured: true এবং isPublished: true সেগুলোকে খুঁজবে
    const featuredProducts = await Product.find({ 
      featured: true, 
      isPublished: true 
    }).lean();

    // প্রতিটি প্রোডাক্টের জন্য ভेरিয়েন্ট থেকে প্রথম প্রাইস এবং সঠিক ইমেজ সেট করা
    const formattedProducts = featuredProducts.map((product) => {
      let price = 0;
      if (product.variants && product.variants.length > 0) {
        price = product.variants[0].price;
      }

      return {
        _id: product._id.toString(),
        name: product.name,
        price: `৳${price.toLocaleString()}`,
        image: product.image || (product.images && product.images[0]) || "/products/gugu.jpeg",
      };
    });

    return NextResponse.json(formattedProducts, { status: 200 });
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}