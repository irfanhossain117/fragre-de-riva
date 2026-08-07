import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET() {
  try {
    await connectDB();

    // Fetch all orders to extract unique customer details
    const orders = await Order.find({}).sort({ createdAt: -1 });

    // Group orders by customer email/phone to aggregate real customer data
    const customerMap = new Map();

    orders.forEach((order) => {
      const email = order.email || order.customerEmail || "N/A";
      const name = order.fullName || order.customerName || "Valued Customer";
      const phone = order.phone || order.customerPhone || "N/A";

      if (!customerMap.has(email)) {
        customerMap.set(email, {
          id: order._id,
          name,
          email,
          phone,
          ordersCount: 0,
          totalSpent: 0,
          joinedDate: order.createdAt 
            ? new Date(order.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) 
            : "Recent",
          status: "Active",
        });
      }

      const customer = customerMap.get(email);
      customer.ordersCount += 1;
      customer.totalSpent += (order.totalPrice || order.totalAmount || 0);
    });

    // Convert map to array and format totalSpent currency
    const customers = Array.from(customerMap.values()).map((cust) => ({
      ...cust,
      totalSpent: `৳${cust.totalSpent.toLocaleString()}`,
    }));

    return NextResponse.json({
      success: true,
      customers,
    });
  } catch (error) {
    console.error("Customers API Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}