import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Coupon from "@/models/Coupon";

/* Public endpoint — customer applies a coupon code in the cart/checkout */
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { code, subtotal } = body;

    if (!code?.trim()) {
      return NextResponse.json({ success: false, message: "Please enter a coupon code." }, { status: 400 });
    }

    const coupon = await Coupon.findOne({ code: code.trim().toUpperCase() });

    if (!coupon) {
      return NextResponse.json({ success: false, message: "Invalid coupon code." }, { status: 404 });
    }

    if (!coupon.isActive) {
      return NextResponse.json({ success: false, message: "This coupon is no longer active." }, { status: 400 });
    }

    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return NextResponse.json({ success: false, message: "This coupon has expired." }, { status: 400 });
    }

    if (coupon.minOrderAmount && typeof subtotal === "number" && subtotal < coupon.minOrderAmount) {
      return NextResponse.json(
        {
          success: false,
          message: `This coupon requires a minimum order of ৳${coupon.minOrderAmount.toLocaleString()}.`,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      coupon: {
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
      },
    });
  } catch (error) {
    console.error("VALIDATE COUPON ERROR:", error);
    return NextResponse.json({ success: false, message: "Failed to validate coupon" }, { status: 500 });
  }
}
