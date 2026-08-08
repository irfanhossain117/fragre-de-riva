"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Ticket, ToggleLeft, ToggleRight } from "lucide-react";

interface CouponItem {
  _id: string;
  code: string;
  type: "percent" | "fixed";
  value: number;
  isActive: boolean;
  minOrderAmount: number;
  expiresAt: string | null;
  createdAt: string;
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<CouponItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [code, setCode] = useState("");
  const [type, setType] = useState<"percent" | "fixed">("percent");
  const [value, setValue] = useState("");
  const [minOrderAmount, setMinOrderAmount] = useState("");

  async function loadCoupons() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/coupons", { cache: "no-store" });
      const data = await res.json();
      if (data.success) setCoupons(data.coupons);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCoupons();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();

    if (!code.trim() || !value) {
      alert("Please enter a coupon code and discount value.");
      return;
    }

    try {
      setSaving(true);
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          type,
          value: Number(value),
          minOrderAmount: Number(minOrderAmount) || 0,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Failed to create coupon.");
        return;
      }

      setCode("");
      setValue("");
      setMinOrderAmount("");
      await loadCoupons();
    } catch (error) {
      console.error(error);
      alert("Failed to create coupon.");
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(coupon: CouponItem) {
    try {
      await fetch(`/api/admin/coupons/${coupon._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !coupon.isActive }),
      });
      await loadCoupons();
    } catch (error) {
      console.error(error);
      alert("Failed to update coupon.");
    }
  }

  async function deleteCoupon(id: string, code: string) {
    if (!confirm(`Delete coupon "${code}"? This cannot be undone.`)) return;

    try {
      await fetch(`/api/admin/coupons/${id}`, { method: "DELETE" });
      await loadCoupons();
    } catch (error) {
      console.error(error);
      alert("Failed to delete coupon.");
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Coupons</h1>
        <p className="text-gray-600 mt-1">
          Create and manage discount codes customers can apply at checkout.
        </p>
      </div>

      {/* Create Coupon Form */}
      <form
        onSubmit={handleCreate}
        className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm space-y-4"
      >
        <h3 className="text-lg font-semibold text-gray-900">Add New Coupon</h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">Coupon Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="e.g. WELCOME10"
              className="w-full rounded-xl border border-gray-200 p-3 text-sm text-gray-900 outline-none focus:border-[#A88442]"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">Discount Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as "percent" | "fixed")}
              className="w-full rounded-xl border border-gray-200 p-3 text-sm text-gray-900 outline-none focus:border-[#A88442]"
            >
              <option value="percent">Percentage (%)</option>
              <option value="fixed">Fixed Amount (৳)</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">
              Value {type === "percent" ? "(%)" : "(৳)"}
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={type === "percent" ? "10" : "200"}
              min={0}
              className="w-full rounded-xl border border-gray-200 p-3 text-sm text-gray-900 outline-none focus:border-[#A88442]"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">
              Min. Order (৳, optional)
            </label>
            <input
              type="number"
              value={minOrderAmount}
              onChange={(e) => setMinOrderAmount(e.target.value)}
              placeholder="0"
              min={0}
              className="w-full rounded-xl border border-gray-200 p-3 text-sm text-gray-900 outline-none focus:border-[#A88442]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-[#A88442] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
        >
          <Plus size={18} />
          {saving ? "Creating..." : "Create Coupon"}
        </button>
      </form>

      {/* Coupons Table */}
      <div className="rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900">All Coupons</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/50 text-xs uppercase text-gray-400">
              <tr>
                <th className="p-4 font-semibold">Code</th>
                <th className="p-4 font-semibold">Discount</th>
                <th className="p-4 font-semibold">Min. Order</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Loading coupons...
                  </td>
                </tr>
              ) : coupons.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <Ticket className="text-gray-300" size={32} />
                      No coupons yet. Create one above.
                    </div>
                  </td>
                </tr>
              ) : (
                coupons.map((c) => (
                  <tr key={c._id} className="hover:bg-gray-50/50">
                    <td className="p-4 font-semibold text-gray-900">{c.code}</td>
                    <td className="p-4">
                      {c.type === "percent" ? `${c.value}% OFF` : `৳${c.value} OFF`}
                    </td>
                    <td className="p-4">
                      {c.minOrderAmount > 0 ? `৳${c.minOrderAmount.toLocaleString()}` : "—"}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleActive(c)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${
                          c.isActive
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-gray-100 text-gray-500 border border-gray-200"
                        }`}
                      >
                        {c.isActive ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                        {c.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => deleteCoupon(c._id, c.code)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-100"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
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
