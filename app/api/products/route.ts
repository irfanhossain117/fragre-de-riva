import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      name,
      slug,
      brand,
      category,
      sku,
      description,
      image,
      images,
      variants,
      featured,
      bestSeller,
      isPublished,
      seoTitle,
      seoDescription,
      seoKeywords,
      topNotes,
      heartNotes,
      baseNotes,
    } = body;

    if (!name || !slug || !brand || !category) {
      return NextResponse.json(
        {
          success: false,
          message: "Required fields are missing.",
        },
        {
          status: 400,
        }
      );
    }

    const existingSlug = await Product.findOne({ slug });

    if (existingSlug) {
      return NextResponse.json(
        {
          success: false,
          message: "Slug already exists.",
        },
        {
          status: 409,
        }
      );
    }

    const totalStock =
      Array.isArray(variants)
        ? variants.reduce(
            (sum: number, item: any) =>
              sum + (item.stock || 0),
            0
          )
        : 0;

    const product = await Product.create({
      name,
      slug,
      brand,
      category,
      sku,
      description,
      image,
      images,
      variants,
      featured,
      bestSeller,
      isPublished,
      seoTitle,
      seoDescription,
      seoKeywords,
      topNotes,
      heartNotes,
      baseNotes,
      totalStock,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully.",
        product,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create product.",
      },
      {
        status: 500,
      }
    );
  }
}