import { MetadataRoute } from "next";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

// আগে এখানে "https://YOURDOMAIN.com" প্লেসহোল্ডার URL এবং একটা পুরনো, হার্ডকোডেড ডামি
// প্রোডাক্ট লিস্ট ব্যবহার হতো — মানে sitemap.xml Google-এর কাছে ভুল ডোমেইন আর
// fake/test প্রোডাক্ট পাঠাত, আসল প্রোডাক্ট কখনো sitemap-এ যুক্তই হতো না।
const baseUrl = "https://fragrederiva.shop";

// প্রতি ঘণ্টায় sitemap নতুন করে জেনারেট হবে, যাতে নতুন প্রোডাক্ট add/remove করলে
// পুরো সাইট redeploy না করেই sitemap.xml আপডেটেড থাকে।
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let productPages: MetadataRoute.Sitemap = [];

  try {
    await connectDB();
    const products = await Product.find({ isPublished: true }, { slug: 1, updatedAt: 1 }).lean();

    productPages = products.map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));
  } catch (error) {
    console.error("SITEMAP: failed to load products from DB:", error);
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },

    ...productPages,
  ];
}
