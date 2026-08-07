"use client";

import { useEffect, useState } from "react";
import { Search, Mail, Phone, ShoppingBag } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpent: string;
  joinedDate: string;
  status: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await fetch("/api/admin/customers");
        const data = await res.json();
        if (data.success) {
          setCustomers(data.customers);
        }
      } catch (error) {
        console.error("Failed to load customers:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Controls: Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search customers by name, email or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#A88442] focus:ring-1 focus:ring-[#A88442]"
          />
        </div>

        <div className="text-sm font-medium text-gray-500">
          Total Customers:{" "}
          <span className="font-semibold text-gray-900">
            {filteredCustomers.length}
          </span>
        </div>
      </div>

      {/* Customers Table */}
      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-100 bg-gray-50/50 text-xs uppercase text-gray-400">
              <tr>
                <th className="p-5 font-semibold">Customer</th>
                <th className="p-5 font-semibold">Contact</th>
                <th className="p-5 font-semibold">Orders</th>
                <th className="p-5 font-semibold">Total Spent</th>
                <th className="p-5 font-semibold">Joined Date</th>
                <th className="p-5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    Loading Customers...
                  </td>
                </tr>
              ) : filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No customers found.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="transition hover:bg-gray-50/50"
                  >
                    {/* Customer Profile */}
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 font-semibold text-[#A88442]">
                          {customer.name ? customer.name.charAt(0) : "C"}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {customer.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            ID: {customer.id.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact Info */}
                    <td className="p-5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Mail size={14} className="text-gray-400" />
                          <span>{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Phone size={14} className="text-gray-400" />
                          <span>{customer.phone}</span>
                        </div>
                      </div>
                    </td>

                    {/* Orders Count */}
                    <td className="p-5 font-medium text-gray-900">
                      <div className="flex items-center gap-2">
                        <ShoppingBag size={16} className="text-gray-400" />
                        <span>{customer.ordersCount} orders</span>
                      </div>
                    </td>

                    {/* Total Spent */}
                    <td className="p-5 font-semibold text-gray-900">
                      {customer.totalSpent}
                    </td>

                    {/* Joined Date */}
                    <td className="p-5 text-gray-500">
                      {customer.joinedDate}
                    </td>

                    {/* Status */}
                    <td className="p-5">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                          customer.status === "Active"
                            ? "border border-green-200 bg-green-50 text-green-700"
                            : "border border-gray-200 bg-gray-100 text-gray-600"
                        }`}
                      >
                        {customer.status}
                      </span>
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