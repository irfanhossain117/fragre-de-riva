"use client";

import { useEffect, useState } from "react";
import { TrendingUp, DollarSign, Users, ShoppingBag } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-gray-100 text-gray-700",
  Confirmed: "bg-amber-50 text-amber-700",
  Packing: "bg-purple-50 text-purple-700",
  Shipped: "bg-blue-50 text-blue-700",
  Delivered: "bg-green-50 text-green-700",
  Cancelled: "bg-red-50 text-red-700",
};

export default function AnalyticsPage() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    deliveredRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    statusBreakdown: {} as Record<string, number>,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch("/api/admin/analytics");
        const data = await res.json();
        if (data.success) {
          setStats(data.analytics);
        }
      } catch (error) {
        console.error("Failed to load analytics", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
        <p className="text-gray-600 mt-1">Real-time performance metrics of your store</p>
      </div>

      {/* Top Stats Overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {loading ? "Loading..." : `৳${stats.totalRevenue.toLocaleString()}`}
              </h3>
            </div>
            <div className="rounded-xl bg-amber-50 p-3 text-[#A88442]">
              <DollarSign size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600 font-medium">
            <TrendingUp size={16} className="mr-1" />
            <span>Live from database</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {loading ? "Loading..." : stats.totalOrders}
              </h3>
            </div>
            <div className="rounded-xl bg-amber-50 p-3 text-[#A88442]">
              <ShoppingBag size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600 font-medium">
            <TrendingUp size={16} className="mr-1" />
            <span>Live from database</span>
          </div>
        </div>

        {/* New Customers */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Customers</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {loading ? "Loading..." : stats.totalCustomers}
              </h3>
            </div>
            <div className="rounded-xl bg-amber-50 p-3 text-[#A88442]">
              <Users size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600 font-medium">
            <TrendingUp size={16} className="mr-1" />
            <span>Live from database</span>
          </div>
        </div>

        {/* Total Products */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {loading ? "Loading..." : stats.totalProducts}
              </h3>
            </div>
            <div className="rounded-xl bg-amber-50 p-3 text-[#A88442]">
              <ShoppingBag size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600 font-medium">
            <TrendingUp size={16} className="mr-1" />
            <span>Active store items</span>
          </div>
        </div>
      </div>

      {/* Order Status Breakdown */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Order Status Breakdown</h3>
        <p className="text-sm text-gray-500 mb-5">
          Delivered revenue so far: {loading ? "..." : `৳${stats.deliveredRevenue.toLocaleString()}`}
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {Object.entries(stats.statusBreakdown).map(([status, count]) => (
            <div
              key={status}
              className={`rounded-xl p-4 text-center ${STATUS_COLORS[status] || "bg-gray-100 text-gray-700"}`}
            >
              <p className="text-2xl font-bold">{loading ? "..." : count}</p>
              <p className="text-xs font-medium mt-1">{status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}