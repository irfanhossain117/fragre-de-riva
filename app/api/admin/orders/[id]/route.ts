import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

interface Context {
  params: Promise<{ id: string }>;
}

const VALID_STATUSES = ["Pending", "Confirmed", "Packing", "Shipped", "Delivered", "Cancelled"];
const VALID_PAYMENT_STATUSES = ["Pending", "Paid", "Failed", "Refunded"];

/* =========================
   GET single order (full detail — customer, items, totals)
========================= */
export async function GET(req: NextRequest, { params }: Context) {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid Order ID" }, { status: 400 });
    }

    const order = await Order.findById(id).lean();

    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("GET ORDER ERROR:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

/* =========================
   UPDATE order status / payment status / tracking number
   (admin manually moves order: Pending -> Confirmed -> Packing -> Shipped -> Delivered, or Cancelled)
========================= */
export async function PATCH(req: NextRequest, { params }: Context) {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid Order ID" }, { status: 400 });
    }

    const body = await req.json();
    const { status, paymentStatus, trackingNumber } = body;

    const update: Record<string, unknown> = {};

    if (status !== undefined) {
      if (!VALID_STATUSES.includes(status)) {
        return NextResponse.json({ success: false, message: "Invalid order status." }, { status: 400 });
      }
      update.status = status;
    }

    if (paymentStatus !== undefined) {
      if (!VALID_PAYMENT_STATUSES.includes(paymentStatus)) {
        return NextResponse.json({ success: false, message: "Invalid payment status." }, { status: 400 });
      }
      update.paymentStatus = paymentStatus;
    }

    if (trackingNumber !== undefined) {
      update.trackingNumber = trackingNumber;
    }

    const order = await Order.findByIdAndUpdate(id, update, { new: true });

    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Order updated successfully.", order });
  } catch (error) {
    console.error("UPDATE ORDER ERROR:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
