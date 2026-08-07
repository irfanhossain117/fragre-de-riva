import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();

    // 1. Fetch total products count from database
    const totalProducts = await Product.countDocuments();

    // 2. Fetch total orders from database
    const orders = await Order.find({});
    const totalOrders = orders.length;

    // 3. Calculate total revenue dynamically from orders
    const totalRevenue = orders.reduce((acc, order) => {
      return acc + (order.totalPrice || order.totalAmount || 0);
    }, 0);

    // 4. Unique customers count
    const uniqueCustomers = new Set(
      orders.map((order) => order.email || order.customerEmail)
    ).size;

    return NextResponse.json({
      success: true,
      analytics: {
        totalRevenue,
        totalOrders,
        totalCustomers: uniqueCustomers || 0,
        totalProducts,
      },
    });
  } catch (error) {
    console.error("Analytics API Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch analytics data" },
      { status: 500 }
    );
  }
}