"use client";

import { useEffect, useState } from "react";
import { Search, Eye, Package, Clock, CheckCircle2, Truck, XCircle } from "lucide-react";
import Link from "next/link";

interface OrderItem {
  id: string;
  displayId: string;
  customer: string;
  email: string;
  itemsCount: number;
  total: string;
  paymentStatus: string;
  orderStatus: string;
  date: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/admin/orders");
        const data = await res.json();
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("Failed to load orders:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.displayId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || order.orderStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search orders by Order ID or Customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#A88442] focus:ring-1 focus:ring-[#A88442]"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {["All", "Processing", "Shipped", "Delivered", "Cancelled"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`rounded-xl px-4 py-2.5 text-xs font-medium transition shrink-0 ${
                  statusFilter === status
                    ? "bg-[#A88442] text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-100 bg-gray-50/50 text-xs uppercase text-gray-400">
              <tr>
                <th className="p-5 font-semibold">Order ID</th>
                <th className="p-5 font-semibold">Customer</th>
                <th className="p-5 font-semibold">Items</th>
                <th className="p-5 font-semibold">Total Amount</th>
                <th className="p-5 font-semibold">Payment</th>
                <th className="p-5 font-semibold">Order Status</th>
                <th className="p-5 font-semibold">Date</th>
                <th className="p-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-gray-500">
                    Loading Orders...
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="transition hover:bg-gray-50/50"
                  >
                    {/* Order ID */}
                    <td className="p-5 font-semibold text-gray-900">
                      {order.displayId}
                    </td>

                    {/* Customer Info */}
                    <td className="p-5">
                      <div>
                        <p className="font-medium text-gray-900">
                          {order.customer}
                        </p>
                        <p className="text-xs text-gray-400">{order.email}</p>
                      </div>
                    </td>

                    {/* Items */}
                    <td className="p-5 text-gray-700">
                      <div className="flex items-center gap-1.5">
                        <Package size={16} className="text-gray-400" />
                        <span>{order.itemsCount} items</span>
                      </div>
                    </td>

                    {/* Total */}
                    <td className="p-5 font-semibold text-gray-900">
                      {order.total}
                    </td>

                    {/* Payment Status */}
                    <td className="p-5">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          order.paymentStatus === "Paid"
                            ? "bg-green-50 text-green-700"
                            : order.paymentStatus === "Pending"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>

                    {/* Order Status */}
                    <td className="p-5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                          order.orderStatus === "Delivered"
                            ? "border border-green-200 bg-green-50 text-green-700"
                            : order.orderStatus === "Shipped"
                            ? "border border-blue-200 bg-blue-50 text-blue-700"
                            : order.orderStatus === "Processing"
                            ? "border border-amber-200 bg-amber-50 text-amber-700"
                            : "border border-red-200 bg-red-50 text-red-700"
                        }`}
                      >
                        {order.orderStatus === "Delivered" && (
                          <CheckCircle2 size={13} />
                        )}
                        {order.orderStatus === "Shipped" && <Truck size={13} />}
                        {order.orderStatus === "Processing" && (
                          <Clock size={13} />
                        )}
                        {order.orderStatus === "Cancelled" && (
                          <XCircle size={13} />
                        )}
                        {order.orderStatus}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="p-5 text-xs text-gray-500">{order.date}</td>

                    {/* Actions */}
                    <td className="p-5 text-right">
                      <Link
                        href={`/admin/dashboard/orders/${order.id}`}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
                      >
                        <Eye size={14} />
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}