"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  StickyNote,
  Package,
  Save,
} from "lucide-react";

interface OrderItem {
  name: string;
  image?: string;
  volume?: string;
  price: number;
  quantity: number;
}

interface OrderDetail {
  _id: string;
  orderId: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
    address: string;
    note?: string;
  };
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  coupon?: string;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  trackingNumber?: string;
  createdAt: string;
}

const ORDER_STATUSES = ["Pending", "Confirmed", "Packing", "Shipped", "Delivered", "Cancelled"];
const PAYMENT_STATUSES = ["Pending", "Paid", "Failed", "Refunded"];

export default function OrderDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [status, setStatus] = useState("Pending");
  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const [trackingNumber, setTrackingNumber] = useState("");

  async function loadOrder() {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/orders/${id}`, { cache: "no-store" });
      const data = await res.json();

      if (!data.success) {
        alert("Order not found.");
        router.push("/admin/dashboard/orders");
        return;
      }

      setOrder(data.order);
      setStatus(data.order.status || "Pending");
      setPaymentStatus(data.order.paymentStatus || "Pending");
      setTrackingNumber(data.order.trackingNumber || "");
    } catch (error) {
      console.error(error);
      alert("Failed to load order.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) loadOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function handleSave() {
    try {
      setSaving(true);

      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, paymentStatus, trackingNumber }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Failed to update order.");
        return;
      }

      alert("Order updated successfully.");
      loadOrder();
    } catch (error) {
      console.error(error);
      alert("Failed to update order.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow">
        <p className="text-lg font-medium text-gray-900">Loading Order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow">
        <p className="text-lg font-medium text-gray-900">Order not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/dashboard/orders"
            className="mb-2 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800"
          >
            <ArrowLeft size={16} /> Back to Orders
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Order {order.orderId || `#${order._id.slice(-6).toUpperCase()}`}
          </h1>
          <p className="text-sm text-gray-500">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: Customer + Items */}
        <div className="space-y-6 lg:col-span-2">
          {/* Customer Info */}
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Customer Information</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <p className="font-medium text-gray-900">{order.customer.name}</p>
              <div className="flex items-center gap-2">
                <Phone size={15} className="text-gray-400" />
                <a href={`tel:${order.customer.phone}`} className="hover:text-[#A88442]">
                  {order.customer.phone}
                </a>
              </div>
              {order.customer.email && (
                <div className="flex items-center gap-2">
                  <Mail size={15} className="text-gray-400" />
                  <span>{order.customer.email}</span>
                </div>
              )}
              <div className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0 text-gray-400" />
                <span>{order.customer.address}</span>
              </div>
              {order.customer.note && (
                <div className="flex items-start gap-2">
                  <StickyNote size={15} className="mt-0.5 shrink-0 text-gray-400" />
                  <span className="italic text-gray-500">{order.customer.note}</span>
                </div>
              )}
            </div>
          </div>

          {/* Items */}
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
              <Package size={18} /> Items ({order.items.length})
            </h3>
            <div className="divide-y divide-gray-100">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 py-3">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-xl bg-gray-100" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.volume ? `${item.volume} · ` : ""}Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    ৳{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-1.5 border-t border-gray-100 pt-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>৳{order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Charge</span>
                <span>৳{order.deliveryCharge.toLocaleString()}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount {order.coupon ? `(${order.coupon})` : ""}</span>
                  <span>-৳{order.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-bold text-gray-900">
                <span>Total</span>
                <span>৳{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Status Management */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Order Status</h3>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Fulfillment Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm text-gray-900 outline-none focus:border-[#A88442]"
                >
                  {ORDER_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Payment Status
                </label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm text-gray-900 outline-none focus:border-[#A88442]"
                >
                  {PAYMENT_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Tracking Number (optional)
                </label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="e.g. courier tracking id"
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm text-gray-900 outline-none focus:border-[#A88442]"
                />
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#A88442] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
              >
                <Save size={16} />
                {saving ? "Saving..." : "Update Status"}
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm text-sm text-gray-600">
            <p className="font-medium text-gray-900 mb-2">Payment Method</p>
            <p>{order.paymentMethod}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
