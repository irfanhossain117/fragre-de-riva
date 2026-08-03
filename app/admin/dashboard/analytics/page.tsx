"use client";

import { TrendingUp, DollarSign, Users, ShoppingBag } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Top Stats Overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">৳1,24,500</h3>
            </div>
            <div className="rounded-xl bg-amber-50 p-3 text-[#A88442]">
              <DollarSign size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600 font-medium">
            <TrendingUp size={16} className="mr-1" />
            <span>+12% from last month</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">342</h3>
            </div>
            <div className="rounded-xl bg-amber-50 p-3 text-[#A88442]">
              <ShoppingBag size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600 font-medium">
            <TrendingUp size={16} className="mr-1" />
            <span>+8% from last month</span>
          </div>
        </div>

        {/* New Customers */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">New Customers</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">128</h3>
            </div>
            <div className="rounded-xl bg-amber-50 p-3 text-[#A88442]">
              <Users size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600 font-medium">
            <TrendingUp size={16} className="mr-1" />
            <span>+15% from last month</span>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">3.2%</h3>
            </div>
            <div className="rounded-xl bg-amber-50 p-3 text-[#A88442]">
              <TrendingUp size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600 font-medium">
            <TrendingUp size={16} className="mr-1" />
            <span>+0.5% growth</span>
          </div>
        </div>
      </div>

      {/* Analytics Breakdown */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Category Breakdown */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Sales by Category</h3>
          <p className="text-sm text-gray-500 mt-1">Monthly sales distribution</p>

          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Perfumes & Fragrances</span>
                <span className="font-medium text-gray-900">৳85,000 (68%)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-100">
                <div className="h-2 rounded-full bg-[#A88442]" style={{ width: "68%" }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Attar Oils</span>
                <span className="font-medium text-gray-900">৳25,000 (20%)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-100">
                <div className="h-2 rounded-full bg-black" style={{ width: "20%" }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Gift Sets & Combos</span>
                <span className="font-medium text-gray-900">৳14,500 (12%)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-100">
                <div className="h-2 rounded-full bg-gray-400" style={{ width: "12%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Top Performing Perfumes */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Top Perfumes</h3>
          <p className="text-sm text-gray-500 mt-1">Best selling items this month</p>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Royal Oud EDP</p>
                <p className="text-xs text-gray-500">120 sales</p>
              </div>
              <span className="font-semibold text-gray-900">৳36,000</span>
            </div>

            <div className="flex items-center justify-between border-b pb-3 border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Velvet Rose</p>
                <p className="text-xs text-gray-500">95 sales</p>
              </div>
              <span className="font-semibold text-gray-900">৳28,500</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Ocean Breeze Extrait</p>
                <p className="text-xs text-gray-500">70 sales</p>
              </div>
              <span className="font-semibold text-gray-900">৳21,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}