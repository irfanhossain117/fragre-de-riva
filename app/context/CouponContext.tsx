"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { coupons, Coupon } from "../components/coupons";

type CouponContextType = {
  coupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
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

  function applyCoupon(code: string) {
    const found = coupons.find(
      (item) =>
        item.code.toUpperCase() ===
        code.trim().toUpperCase()
    );

    if (!found) {
      return false;
    }

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
  const context = useContext(CouponContext);

  if (!context) {
    throw new Error(
      "useCoupon must be used inside CouponProvider"
    );
  }

  return context;
}