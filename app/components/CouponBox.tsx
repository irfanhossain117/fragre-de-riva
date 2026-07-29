"use client";

import { useState } from "react";
import { useCoupon } from "../context/CouponContext";

export default function CouponBox() {
  const {
    coupon,
    applyCoupon,
    removeCoupon,
  } = useCoupon();

  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  function handleApply() {
    if (!code.trim()) {
      setMessage("Please enter a coupon code.");
      return;
    }

    const success = applyCoupon(code);

    if (success) {
      setMessage("");
      setCode("");
    } else {
      setMessage("❌ Invalid coupon code.");
    }
  }

  return (
    <div className="rounded-2xl border border-[#E7DDCC] bg-[#FAF7F2] p-5">

      <h3 className="text-lg font-semibold text-[#A88442] mb-4">
        Coupon Code
      </h3>

      {coupon ? (
        <div className="flex items-center justify-between">

          <div>

            <p className="font-semibold text-[#2B241A]">
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
            className="px-4 py-2 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
          >
            Remove
          </button>

        </div>
      ) : (
        <>
          <div className="flex gap-3">

            <input
  type="text"
  value={code}
  onChange={(e) => {
    setCode(e.target.value.toUpperCase());
    setMessage("");
  }}
  placeholder="Enter coupon..."
  className="flex-1 rounded-full border border-[#D6C7AB] bg-white px-5 py-3 text-[#2B241A] placeholder:text-gray-400 caret-[#A88442] outline-none focus:border-[#A88442]"
/>

            <button
              onClick={handleApply}
              className="px-6 rounded-full bg-[#A88442] text-white hover:opacity-90 transition"
            >
              Apply
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