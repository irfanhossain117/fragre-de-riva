"use client";

type Props = {
  show: boolean;
  message: string;
};

export default function Toast({
  show,
  message,
}: Props) {
  return (
    <div
      className={`fixed top-8 left-1/2 -translate-x-1/2 z-[999] transition-all duration-300 ${
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <div className="rounded-2xl bg-[#2B241A] text-white px-6 py-4 shadow-2xl">

        <div className="font-semibold">
          ✓ Added to Cart
        </div>

        <div className="text-sm text-gray-300 mt-1">
          {message}
        </div>

      </div>
    </div>
  );
}