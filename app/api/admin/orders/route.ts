import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET() {
  try {
    await connectDB();

    // Fetch all orders from database sorted by latest first
    const orders = await Order.find({}).sort({ createdAt: -1 });

    const formattedOrders = orders.map((order) => {
      const items = order.items || order.products || [];
      const itemsCount = items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);

      return {
        id: order._id.toString(),
        displayId: `ORD-${order._id.toString().slice(-4).toUpperCase()}`,
        customer: order.fullName || order.customerName || "Valued Customer",
        email: order.email || order.customerEmail || "N/A",
        itemsCount: itemsCount || 1,
        total: `৳${(order.totalPrice || order.totalAmount || 0).toLocaleString()}`,
        paymentStatus: order.paymentStatus || "Paid",
        orderStatus: order.status || order.orderStatus || "Processing",
        date: order.createdAt
          ? new Date(order.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "Recent",
      };
    });

    return NextResponse.json({
      success: true,
      orders: formattedOrders,
    });
  } catch (error) {
    console.error("Orders API Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}