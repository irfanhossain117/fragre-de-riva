"use client";

import { useState } from "react";
import { useCoupon } from "../context/CouponContext";

export default function CouponBox({ subtotal }: { subtotal?: number }) {
  const {
    coupon,
    applyCoupon,
    removeCoupon,
  } = useCoupon();

  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleApply() {
    if (!code.trim()) {
      setMessage("Please enter a coupon code.");
      return;
    }

    setLoading(true);
    const result = await applyCoupon(code, subtotal);
    setLoading(false);

    if (result.success) {
      setMessage("");
      setCode("");
    } else {
      setMessage(`❌ ${result.message || "Invalid coupon code."}`);
    }
  }

  return (
    <div className="rounded-2xl border border-[#E7DDCC] bg-[#FAF7F2] p-4 sm:p-5">

      <h3 className="text-base sm:text-lg font-semibold text-[#A88442] mb-3 sm:mb-4">
        Coupon Code
      </h3>

      {coupon ? (
        <div className="flex items-center justify-between gap-2">

          <div className="min-w-0">

            <p className="font-semibold text-[#2B241A] truncate">
              {coupon.code}
            </p>

            <p className="text-sm text-green-600 mt-1">
              {coupon.type === "percent"
                ? `${coupon.value}% OFF`
                : `৳${coupon.value} OFF`}
            </p>

          </div>

          <button
            onClick={removeCoupon}
            className="shrink-0 px-3 sm:px-4 py-2 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition text-sm sm:text-base"
          >
            Remove
          </button>

        </div>
      ) : (
        <>
          <div className="flex gap-2 sm:gap-3">

            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setMessage("");
              }}
              placeholder="Enter coupon..."
              className="min-w-0 flex-1 rounded-full border border-[#D6C7AB] bg-white px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base text-[#2B241A] placeholder:text-gray-400 caret-[#A88442] outline-none focus:border-[#A88442]"
            />

            <button
              onClick={handleApply}
              disabled={loading}
              className="shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#A88442] text-white text-sm sm:text-base hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Checking..." : "Apply"}
            </button>

          </div>

          {message && (
            <p className="mt-3 text-sm text-red-500">
              {message}
            </p>
          )}
        </>
      )}
    </div>
  );
}
