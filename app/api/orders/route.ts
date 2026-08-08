import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

interface OrderItemInput {
  productId?: string;
  name: string;
  image?: string;
  volume?: string;
  price: number;
  quantity: number;
}

/* =========================
   CREATE ORDER
   Checkout page calls this right before redirecting to WhatsApp,
   so every order actually lands in the DB and shows up in
   Admin -> Orders / Analytics.
========================= */

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      customer,
      items,
      subtotal,
      deliveryCharge,
      discount,
      coupon,
      total,
      paymentMethod,
    } = body;

    if (!customer?.name?.trim() || !customer?.phone?.trim() || !customer?.address?.trim()) {
      return NextResponse.json(
        { success: false, message: "Customer name, phone and address are required." },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Order must contain at least one item." },
        { status: 400 }
      );
    }

    const orderId = `FDR-${Date.now().toString(36).toUpperCase()}`;

    const order = await Order.create({
      orderId,
      customer: {
        name: customer.name,
        phone: customer.phone,
        email: customer.email || "",
        address: customer.address,
        note: customer.note || "",
      },
      items: items.map((item: OrderItemInput) => ({
        productId: item.productId || null,
        name: item.name,
        image: item.image || "",
        volume: item.volume || "",
        price: item.price,
        quantity: item.quantity,
      })),
      subtotal: subtotal || 0,
      deliveryCharge: deliveryCharge || 0,
      discount: discount || 0,
      coupon: coupon || "",
      total: total || 0,
      paymentMethod: paymentMethod || "COD",
      whatsappSent: true,
    });

    return NextResponse.json(
      { success: true, message: "Order created successfully.", order },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create order." },
      { status: 500 }
    );
  }
}
