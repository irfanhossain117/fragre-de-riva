"use client";

import Image from "next/image";
import Link from "next/link";

import { useCart } from "../context/CartContext";
import { useCoupon } from "../context/CouponContext";

import CouponBox from "./CouponBox";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({
  open,
  onClose,
}: Props) {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalItems,
    totalPrice,
  } = useCart();

  const { coupon } = useCoupon();

  const subtotal = totalPrice;

  const discount =
    coupon == null
      ? 0
      : coupon.type === "percent"
      ? Math.round(
          subtotal * (coupon.value / 100)
        )
      : coupon.value;

  const delivery = 0;

  const grandTotal =
    Math.max(subtotal - discount, 0) + delivery;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-[90] transition-all duration-300 ${
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white text-[#2B241A] z-[100] shadow-2xl transition-transform duration-300 flex flex-col ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 sm:p-6 py-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif text-[#A88442]">
              Shopping Cart
            </h2>

            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              {totalItems} item(s)
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-3xl text-gray-500 hover:text-black transition p-1"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-6">
              <div className="text-6xl sm:text-7xl mb-4">
                🛍️
              </div>

              <h3 className="text-xl sm:text-2xl font-serif text-[#A88442]">
                Your Cart is Empty
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Add your favourite fragrance.
              </p>
            </div>
          ) : (
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex items-start gap-3 sm:gap-4 border-b border-gray-200 pb-4 sm:pb-6 relative"
                >
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#F8F4EE] flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base text-[#2B241A] truncate">
                      {item.name}
                    </h3>

                    {item.size && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        Volume: <span className="font-medium text-[#A88442]">{item.size}</span>
                      </p>
                    )}

                    <p className="text-[#A88442] font-bold text-sm sm:text-base mt-1">
                      ৳{item.price}
                    </p>

                    <div className="flex items-center gap-2 sm:gap-3 mt-3">
                      <button
                        onClick={() =>
                          decreaseQuantity(item.id, item.size)
                        }
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#A88442] text-[#A88442] hover:bg-[#A88442] hover:text-white transition flex items-center justify-center text-sm"
                      >
                        −
                      </button>

                      <span className="font-semibold text-sm sm:text-base text-[#2B241A]">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.id, item.size)
                        }
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#A88442] text-[#A88442] hover:bg-[#A88442] hover:text-white transition flex items-center justify-center text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      removeFromCart(item.id, item.size)
                    }
                    className="text-red-500 hover:text-red-700 text-lg sm:text-xl px-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 sm:p-6 bg-white">

          {cart.length > 0 && (
            <div className="mb-4 sm:mb-6">
              <CouponBox />
            </div>
          )}

          <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 text-sm sm:text-base">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>৳{subtotal}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-600 font-medium">
                <span>Discount</span>
                <span>-৳{discount}</span>
              </div>
            )}

            <div className="flex justify-between text-gray-600">
              <span>Delivery</span>

              <span className="text-green-600 font-medium">
                FREE
              </span>
            </div>

            <div className="border-t pt-3 flex justify-between text-lg sm:text-xl font-bold">
              <span className="text-[#2B241A]">
                Total
              </span>

              <span className="text-[#A88442]">
                ৳{grandTotal}
              </span>
            </div>
          </div>

          <Link
            href="/checkout"
            onClick={onClose}
            className={`block w-full text-center py-3 sm:py-4 rounded-full font-semibold transition text-sm sm:text-base ${
              cart.length === 0
                ? "bg-gray-300 text-gray-500 pointer-events-none"
                : "bg-[#A88442] text-white hover:opacity-90"
            }`}
          >
            Proceed to Checkout
          </Link>

          <p className="text-center text-[10px] sm:text-xs text-gray-400 mt-3 sm:mt-4">
            Secure Checkout • 100% Authentic Products
          </p>
        </div>
      </aside>
    </>
  );
}