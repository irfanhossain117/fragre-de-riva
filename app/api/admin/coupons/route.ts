import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Coupon from "@/models/Coupon";

/* GET all coupons (admin only — protected via middleware /api/admin prefix) */
export async function GET() {
  try {
    await connectDB();
    const coupons = await Coupon.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, coupons });
  } catch (error) {
    console.error("GET COUPONS ERROR:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch coupons" }, { status: 500 });
  }
}

/* CREATE a new coupon (admin only) */
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { code, type, value, minOrderAmount, expiresAt } = body;

    if (!code?.trim() || !type || value === undefined) {
      return NextResponse.json(
        { success: false, message: "Code, type and value are required." },
        { status: 400 }
      );
    }

    if (!["percent", "fixed"].includes(type)) {
      return NextResponse.json({ success: false, message: "Type must be 'percent' or 'fixed'." }, { status: 400 });
    }

    if (Number(value) <= 0 || (type === "percent" && Number(value) > 100)) {
      return NextResponse.json(
        { success: false, message: "Invalid discount value." },
        { status: 400 }
      );
    }

    const existing = await Coupon.findOne({ code: code.trim().toUpperCase() });
    if (existing) {
      return NextResponse.json({ success: false, message: "This coupon code already exists." }, { status: 409 });
    }

    const coupon = await Coupon.create({
      code: code.trim().toUpperCase(),
      type,
      value: Number(value),
      minOrderAmount: Number(minOrderAmount) || 0,
      expiresAt: expiresAt || null,
    });

    return NextResponse.json(
      { success: true, message: "Coupon created successfully.", coupon },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE COUPON ERROR:", error);
    return NextResponse.json({ success: false, message: "Failed to create coupon" }, { status: 500 });
  }
}
