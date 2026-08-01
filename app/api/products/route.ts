import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import type { Variant, ProductInput } from "@/types/product";


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

    const body = (await req.json()) as ProductInput;

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

    // =========================
    // Required Fields
    // =========================

    if (
      !name?.trim() ||
      !slug?.trim() ||
      !brand?.trim() ||
      !category?.trim()
    ) {
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

    // =========================
    // Variant Validation
    // =========================

    if (!Array.isArray(variants) || variants.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "At least one product variant is required.",
        },
        {
          status: 400,
        }
      );
    }

    for (const variant of variants) {
      if (!variant.volume?.trim()) {
        return NextResponse.json(
          {
            success: false,
            message: "Variant volume is required.",
          },
          {
            status: 400,
          }
        );
      }

      if (variant.price < 0) {
        return NextResponse.json(
          {
            success: false,
            message: "Price cannot be negative.",
          },
          {
            status: 400,
          }
        );
      }

      if (variant.stock < 0) {
        return NextResponse.json(
          {
            success: false,
            message: "Stock cannot be negative.",
          },
          {
            status: 400,
          }
        );
      }
    }

    // =========================
    // Slug Check
    // =========================

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

    // =========================
    // Total Stock
    // =========================

    const totalStock = variants.reduce(
      (sum: number, item: Variant) => sum + item.stock,
      0
    );

    // =========================
    // Create Product
    // =========================

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