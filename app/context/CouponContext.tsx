"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Coupon = {
  code: string;
  type: "percent" | "fixed";
  discount: number;
};

type CouponContextType = {
  coupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
};

const CouponContext =
  createContext<CouponContextType | null>(
    null
  );

/* -----------------------------
   Available Coupons
--------------------------------*/

const COUPONS: Coupon[] = [
  {
    code: "WELCOME10",
    type: "percent",
    discount: 10,
  },

  {
    code: "RIVA15",
    type: "percent",
    discount: 15,
  },

  {
    code: "SAVE200",
    type: "fixed",
    discount: 200,
  },

  {
    code: "LUXURY500",
    type: "fixed",
    discount: 500,
  },
];

export function CouponProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [coupon, setCoupon] =
    useState<Coupon | null>(null);

  useEffect(() => {
    const saved =
      localStorage.getItem("coupon");

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

  function applyCoupon(code: string) {
    const found = COUPONS.find(
      (item) =>
        item.code ===
        code.trim().toUpperCase()
    );

    if (!found) return false;

    setCoupon(found);

    return true;
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
  const context =
    useContext(CouponContext);

  if (!context) {
    throw new Error(
      "useCoupon must be used inside CouponProvider"
    );
  }

  return context;
}