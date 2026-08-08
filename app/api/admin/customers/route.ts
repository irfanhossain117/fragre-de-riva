import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET() {
  try {
    await connectDB();

    // Fetch all orders to extract unique customer details
    const orders = await Order.find({}).sort({ createdAt: -1 }).lean();

    // Group orders by phone (Order model requires phone; email is optional so it's not reliable
    // as a grouping key). Previously this read order.email/order.fullName/order.phone/order.totalPrice
    // which don't exist on the Order schema (real fields live under order.customer.*), so every order
    // fell back to the same "N/A" key and merged into one fake customer.
    const customerMap = new Map();

    orders.forEach((order) => {
      const phone = order.customer?.phone || "N/A";
      const name = order.customer?.name || "Valued Customer";
      const email = order.customer?.email || "N/A";

      if (!customerMap.has(phone)) {
        customerMap.set(phone, {
          id: order._id.toString(),
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

      const customer = customerMap.get(phone);
      customer.ordersCount += 1;
      customer.totalSpent += order.total || 0;
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
