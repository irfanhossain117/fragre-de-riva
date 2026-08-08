import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();

    // 1. Total products
    const totalProducts = await Product.countDocuments();

    // 2. Total orders
    const orders = await Order.find({}).lean();
    const totalOrders = orders.length;

    // 3. Revenue — আগে ভুল field নাম (order.totalPrice / order.totalAmount) ব্যবহার হতো যেগুলো
    //    Order model-এ আদৌ নেই (আসল field হলো order.total), তাই revenue সবসময় ৳0 দেখাত।
    //    এখন সঠিক field ব্যবহার করা হচ্ছে, এবং Cancelled অর্ডারগুলো revenue থেকে বাদ দেওয়া হচ্ছে —
    //    Admin যখন manually order status বদলাবে (Pending -> Confirmed -> ... -> Delivered/Cancelled),
    //    তখন সেই অনুযায়ী revenue হিসাব আপডেট হবে।
    const nonCancelledOrders = orders.filter((order) => order.status !== "Cancelled");

    const totalRevenue = nonCancelledOrders.reduce(
      (acc, order) => acc + (order.total || 0),
      0
    );

    const deliveredRevenue = orders
      .filter((order) => order.status === "Delivered")
      .reduce((acc, order) => acc + (order.total || 0), 0);

    // 4. Status breakdown — dashboard এ pending/shipped/delivered ইত্যাদির সংখ্যা দেখানোর জন্য
    const statusBreakdown: Record<string, number> = {
      Pending: 0,
      Confirmed: 0,
      Packing: 0,
      Shipped: 0,
      Delivered: 0,
      Cancelled: 0,
    };
    for (const order of orders) {
      const s = order.status || "Pending";
      statusBreakdown[s] = (statusBreakdown[s] || 0) + 1;
    }

    // 5. Unique customers — আগে order.email / order.customerEmail (ভুল field, নেই) ব্যবহার হতো।
    //    আসল field হলো order.customer.phone (email অনেক সময় optional/blank থাকতে পারে, phone সবসময় থাকে)।
    const uniqueCustomers = new Set(
      orders.map((order) => order.customer?.phone).filter(Boolean)
    ).size;

    return NextResponse.json({
      success: true,
      analytics: {
        totalRevenue,
        deliveredRevenue,
        totalOrders,
        totalCustomers: uniqueCustomers,
        totalProducts,
        statusBreakdown,
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
