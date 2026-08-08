import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Coupon from "@/models/Coupon";

interface Context {
  params: Promise<{ id: string }>;
}

/* TOGGLE active / edit a coupon (admin only) */
export async function PATCH(req: NextRequest, { params }: Context) {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid coupon ID" }, { status: 400 });
    }

    const body = await req.json();
    const update: Record<string, unknown> = {};

    if (body.isActive !== undefined) update.isActive = !!body.isActive;
    if (body.value !== undefined) update.value = Number(body.value);
    if (body.type !== undefined) update.type = body.type;
    if (body.minOrderAmount !== undefined) update.minOrderAmount = Number(body.minOrderAmount);
    if (body.expiresAt !== undefined) update.expiresAt = body.expiresAt || null;

    const coupon = await Coupon.findByIdAndUpdate(id, update, { new: true });

    if (!coupon) {
      return NextResponse.json({ success: false, message: "Coupon not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Coupon updated.", coupon });
  } catch (error) {
    console.error("UPDATE COUPON ERROR:", error);
    return NextResponse.json({ success: false, message: "Failed to update coupon" }, { status: 500 });
  }
}

/* DELETE a coupon (admin only) */
export async function DELETE(req: NextRequest, { params }: Context) {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid coupon ID" }, { status: 400 });
    }

    const coupon = await Coupon.findByIdAndDelete(id);

    if (!coupon) {
      return NextResponse.json({ success: false, message: "Coupon not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Coupon deleted." });
  } catch (error) {
    console.error("DELETE COUPON ERROR:", error);
    return NextResponse.json({ success: false, message: "Failed to delete coupon" }, { status: 500 });
  }
}
