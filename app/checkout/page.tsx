"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useCart } from "../context/CartContext";
import { coupons } from "../components/coupons";

type Coupon = (typeof coupons)[number];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalItems, totalPrice } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const [deliveryMethod, setDeliveryMethod] = useState<
    "inside" | "outside"
  >("inside");

  const delivery = deliveryMethod === "inside" ? 60 : 120;

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponFeedback, setCouponFeedback] = useState("");
  const [error, setError] = useState("");

  const subtotal = totalPrice;

  const discount =
    appliedCoupon == null
      ? 0
      : appliedCoupon.type === "percent"
      ? Math.round((subtotal * appliedCoupon.value) / 100)
      : appliedCoupon.value;

  const grandTotal = Math.max(subtotal + delivery - discount, 0);

  function applyCoupon() {
    const code = couponCode.trim().toUpperCase();

    if (!code) {
      setCouponFeedback("Enter a coupon code.");
      setAppliedCoupon(null);
      return;
    }

    const coupon = coupons.find(
      (item) => item.code.toUpperCase() === code
    );

    if (!coupon) {
      setCouponFeedback("Invalid coupon code.");
      setAppliedCoupon(null);
      return;
    }

    setAppliedCoupon(coupon);
    setCouponFeedback(`Coupon "${coupon.code}" applied successfully.`);
    setError("");
  }

  const whatsappMessage = useMemo(() => {
    const itemsText = cart
      .map(
        (item) =>
          `• ${item.name}\nQty: ${item.quantity}\nPrice: ৳${item.price}\nSubtotal: ৳${item.price * item.quantity}`
      )
      .join("\n\n");

    return encodeURIComponent(`
Hello Fragre de Riva,

I would like to place an order.

Customer Details:
Name: ${name || "N/A"}
Phone: ${phone || "N/A"}
Address: ${address || "N/A"}
Note: ${note || "N/A"}

Delivery:
${deliveryMethod === "inside" ? "Inside City" : "Outside City"}

Order Items:
${itemsText || "No items"}

------------------------
Total Items: ${totalItems}
Subtotal: ৳${subtotal}
Delivery: ৳${delivery}
Discount: ৳${discount}
Grand Total: ৳${grandTotal}
Coupon: ${appliedCoupon ? appliedCoupon.code : "None"}
`);
  }, [
    cart,
    name,
    phone,
    address,
    note,
    subtotal,
    delivery,
    deliveryMethod,
    discount,
    grandTotal,
    appliedCoupon,
    totalItems,
  ]);

function handleCheckout() {
  if (cart.length === 0) {
    setError("Your cart is empty.");
    return;
  }

  if (!name.trim()) {
    setError("Please enter your full name.");
    return;
  }

  if (!phone.trim()) {
    setError("Please enter your phone number.");
    return;
  }

  if (!/^01\d{9}$/.test(phone.trim())) {
    setError("Please enter a valid Bangladeshi phone number.");
    return;
  }

  if (!address.trim()) {
    setError("Please enter your delivery address.");
    return;
  }

  setError("");

  const url =
    `https://api.whatsapp.com/send?phone=8801511856101&text=${whatsappMessage}`;

  window.location.href = url;

  setTimeout(() => {
    router.push("/order-success");
  }, 1000);
}

  return (
    <main className="min-h-screen bg-[#F8F4EE] pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.4em] text-[#A88442] mb-4">
            Secure Order
          </p>

          <h1 className="text-5xl md:text-6xl font-serif text-[#A88442]">
            Checkout
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-4xl font-serif text-[#A88442] mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-10">
              Add some fragrances before checkout.
            </p>
            <Link
              href="/shop"
              className="inline-block px-8 py-4 rounded-full bg-[#A88442] text-white hover:opacity-90 transition"
            >
              Back to Shop
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-10">
            <section className="bg-white rounded-3xl shadow-lg p-8 border border-[#E7DDCC]">
              <h2 className="text-3xl font-serif text-[#A88442] mb-8">
                Customer Details
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
                    Full Name
                  </label>

                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="Your full name"
                    className="w-full rounded-2xl border border-[#D6C7AB] bg-[#FAF7F2] px-5 py-4 outline-none focus:border-[#A88442] text-[#2B241A] placeholder:text-gray-400 caret-[#A88442]"
                  />
                </div>

                <div>
                  <label className="block text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    required
                    maxLength={11}
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="01XXXXXXXXX"
                    className="w-full rounded-2xl border border-[#D6C7AB] bg-[#FAF7F2] px-5 py-4 outline-none focus:border-[#A88442] text-[#2B241A] placeholder:text-gray-400 caret-[#A88442]"
                  />
                </div>

                <div>
                  <label className="block text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
                    Delivery Address
                  </label>

                  <textarea
                    rows={4}
                    required
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="House, Road, Area, District"
                    className="w-full rounded-2xl border border-[#D6C7AB] bg-[#FAF7F2] px-5 py-4 outline-none resize-none focus:border-[#A88442] text-[#2B241A] placeholder:text-gray-400 caret-[#A88442]"
                  />
                </div>

                <div>
                  <label className="block text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
                    Order Note
                  </label>

                  <textarea
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Any special instruction"
                    className="w-full rounded-2xl border border-[#D6C7AB] bg-[#FAF7F2] px-5 py-4 outline-none resize-none focus:border-[#A88442] text-[#2B241A] placeholder:text-gray-400 caret-[#A88442]"
                  />
                </div>

                <div>
                  <label className="block text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
                    Delivery Area
                  </label>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod("inside")}
                      className={`rounded-2xl border px-5 py-4 transition ${
                        deliveryMethod === "inside"
                          ? "bg-[#A88442] text-white border-[#A88442]"
                          : "bg-[#FAF7F2] border-[#D6C7AB] text-[#2B241A]"
                      }`}
                    >
                      <p className="font-semibold">Inside City</p>
                      <p className="text-sm mt-2">৳60 Delivery</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryMethod("outside")}
                      className={`rounded-2xl border px-5 py-4 transition ${
                        deliveryMethod === "outside"
                          ? "bg-[#A88442] text-white border-[#A88442]"
                          : "bg-[#FAF7F2] border-[#D6C7AB] text-[#2B241A]"
                      }`}
                    >
                      <p className="font-semibold">Outside City</p>
                      <p className="text-sm mt-2">৳120 Delivery</p>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
                    Coupon Code
                  </label>

                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon"
                      className="flex-1 rounded-2xl border border-[#D6C7AB] bg-[#FAF7F2] px-5 py-4 outline-none focus:border-[#A88442] text-[#2B241A] placeholder:text-gray-400 caret-[#A88442]"
                    />

                    <button
                      type="button"
                      onClick={applyCoupon}
                      className="px-6 rounded-2xl bg-[#A88442] text-white hover:opacity-90 transition"
                    >
                      Apply
                    </button>
                  </div>

                  {couponFeedback && (
                    <p
                      className={`mt-3 font-medium ${
                        appliedCoupon ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {couponFeedback}
                    </p>
                  )}

                  {appliedCoupon && (
                    <div className="mt-4 rounded-2xl border border-green-200 bg-green-50 p-4">
                      <p className="text-green-700 font-semibold">
                        ✓ {appliedCoupon.code} applied
                      </p>
                      <p className="text-green-600 mt-1">
                        {appliedCoupon.type === "percent"
                          ? `${appliedCoupon.value}% OFF`
                          : `৳${appliedCoupon.value} OFF`}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            <aside className="bg-white rounded-3xl shadow-lg p-8 border border-[#E7DDCC] h-fit">
              <h2 className="text-3xl font-serif text-[#A88442] mb-8">
                Order Summary
              </h2>

              <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b border-[#EFE3D0] pb-4"
                  >
                    <div>
                      <h3 className="font-semibold text-[#2B241A]">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold text-[#A88442]">
                      ৳{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mt-8 pt-6 border-t border-[#E7DDCC]">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>৳{subtotal}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>৳{delivery}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>
                      Discount{" "}
                      {appliedCoupon.type === "percent"
                        ? `(${appliedCoupon.value}%)`
                        : `(${appliedCoupon.code})`}
                    </span>

                    <span>-৳{discount}</span>
                  </div>
                )}

                <div className="border-t pt-4 flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span className="text-[#A88442]">৳{grandTotal}</span>
                </div>
              </div>

              {error && (
                <p className="mt-5 text-sm text-red-500 font-medium">
                  {error}
                </p>
              )}

              <button
                onClick={handleCheckout}
                className="w-full mt-8 py-4 rounded-full bg-[#A88442] text-white font-semibold hover:opacity-90 transition"
              >
                Place Order on WhatsApp
              </button>

              <Link
                href="/shop"
                className="block text-center mt-4 py-4 rounded-full border border-[#A88442] text-[#A88442] hover:bg-[#A88442] hover:text-white transition"
              >
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}