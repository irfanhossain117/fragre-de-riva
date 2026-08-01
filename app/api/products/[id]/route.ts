import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import type { Variant } from "@/types/product";

interface Context {
  params: Promise<{
    id: string;
  }>;
}

/* =========================
   GET PRODUCT
========================= */

export async function GET(
  req: NextRequest,
  { params }: Context
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Product ID",
        },
        {
          status: 400,
        }
      );
    }

    const product = await Product.findById(id).lean();

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================
   UPDATE PRODUCT
========================= */

export async function PUT(
  req: NextRequest,
  { params }: Context
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Product ID",
        },
        {
          status: 400,
        }
      );
    }

    const body = (await req.json()) as {
  name: string;
  slug: string;
  brand: string;
  category: string;
  sku?: string;
  description?: string;

  image?: string;
  images?: string[];

  variants: Variant[];

  featured?: boolean;
  bestSeller?: boolean;
  isPublished?: boolean;

  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];

  topNotes?: string;
  heartNotes?: string;
  baseNotes?: string;

  totalStock?: number;
};

    // Required Fields

    if (
      !body.name?.trim() ||
      !body.slug?.trim() ||
      !body.brand?.trim() ||
      !body.category?.trim()
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

    // Variant Validation

    if (
      !Array.isArray(body.variants) ||
      body.variants.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "At least one product variant is required.",
        },
        {
          status: 400,
        }
      );
    }

    for (const variant of body.variants as Variant[]) {
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

    // Slug Duplicate Check

    const existingSlug = await Product.findOne({
      slug: body.slug,
      _id: { $ne: id },
    });

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

    // Calculate Total Stock

    body.totalStock = (body.variants as Variant[]).reduce(
      (sum, item) => sum + item.stock,
      0
    );

    // Auto Thumbnail

    if (
      (!body.image || body.image === "") &&
      Array.isArray(body.images) &&
      body.images.length > 0
    ) {
      body.image = body.images[0];
    }

    // Update

    const product = await Product.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product updated successfully.",
      product,
    });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================
   DELETE PRODUCT
========================= */

export async function DELETE(
  req: NextRequest,
  { params }: Context
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Product ID",
        },
        {
          status: 400,
        }
      );
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}