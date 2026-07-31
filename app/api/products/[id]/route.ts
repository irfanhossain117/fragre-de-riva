import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

interface Context {
  params: Promise<{
    id: string;
  }>;
}

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

    const body = await req.json();

    if (body.slug) {
      const existing = await Product.findOne({
        slug: body.slug,
        _id: { $ne: id },
      });

      if (existing) {
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
    }

    if (Array.isArray(body.variants)) {
      body.totalStock = body.variants.reduce(
        (sum: number, item: any) =>
          sum + (item.stock || 0),
        0
      );
    }

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