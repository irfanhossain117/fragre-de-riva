"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type Coupon = {
  code: string;
  type: "percent" | "fixed";
  value: number;
};

type CouponContextType = {
  coupon: Coupon | null;
  applyCoupon: (code: string, subtotal?: number) => Promise<{ success: boolean; message?: string }>;
  removeCoupon: () => void;
};

const CouponContext =
  createContext<CouponContextType | null>(null);

export function CouponProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [coupon, setCoupon] = useState<Coupon | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("coupon");

    if (saved) {
      setCoupon(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (coupon) {
      localStorage.setItem(
        "coupon",
        JSON.stringify(coupon)
      );
    } else {
      localStorage.removeItem("coupon");
    }
  }, [coupon]);

  // কুপন এখন আর hardcoded local list থেকে না, বরং DB থেকে (Admin panel থেকে add/remove করা কুপন) validate হয়।
  async function applyCoupon(code: string, subtotal?: number) {
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, subtotal }),
      });

      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message || "Invalid coupon code." };
      }

      setCoupon(data.coupon);
      return { success: true };
    } catch (error) {
      console.error("Failed to apply coupon:", error);
      return { success: false, message: "Something went wrong. Please try again." };
    }
  }

  function removeCoupon() {
    setCoupon(null);
  }

  return (
    <CouponContext.Provider
      value={{
        coupon,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
}

export function useCoupon() {
  const context = useContext(CouponContext);

  if (!context) {
    throw new Error(
      "useCoupon must be used inside CouponProvider"
    );
  }

  return context;
}