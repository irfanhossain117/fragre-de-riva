"use client";

import { useEffect, useState } from "react";
import DashboardCard from "@/app/components/admin/DashboardCard";

interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
}

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch("/api/admin/analytics");
        const data = await res.json();
        if (data.success && data.analytics) {
          setAnalytics(data.analytics);
        }
      } catch (error) {
        console.error("Failed to load analytics:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-2">
          Welcome back Admin
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <DashboardCard
          title="Revenue"
          value={loading ? "Loading..." : `৳${analytics.totalRevenue.toLocaleString()}`}
        />

        <DashboardCard
          title="Orders"
          value={loading ? "..." : analytics.totalOrders}
        />

        <DashboardCard
          title="Customers"
          value={loading ? "..." : analytics.totalCustomers}
        />

        <DashboardCard
          title="Products"
          value={loading ? "..." : analytics.totalProducts}
        />
      </div>
    </div>
  );
}