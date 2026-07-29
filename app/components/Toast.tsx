"use client";

import { useEffect } from "react";

type Props = {
  show: boolean;
  message: string;
  onClose: () => void;
};

export default function Toast({
  show,
  message,
  onClose,
}: Props) {
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      onClose();
    }, 2500);

    return () => clearTimeout(timer);
  }, [show, onClose]);

  return (
    <div
      className={`fixed top-8 left-1/2 -translate-x-1/2 z-[999] transition-all duration-500 ${
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-5 pointer-events-none"
      }`}
    >
      <div className="backdrop-blur-xl bg-white/80 border border-[#E8D9B5] shadow-2xl rounded-2xl px-6 py-4 flex items-center gap-4">

        <div className="w-10 h-10 rounded-full bg-[#A88442] text-white flex items-center justify-center text-lg">
          ✓
        </div>

        <div>
          <p className="font-semibold text-[#2B241A]">
            Added to Cart
          </p>

          <p className="text-sm text-gray-500">
            {message}
          </p>
        </div>

      </div>
    </div>
  );
}