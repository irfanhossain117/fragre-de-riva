"use client";

type Props = {
  stock: number;
  quantity: number;
  onChange: (quantity: number) => void;
};

export default function QuantitySelector({
  stock,
  quantity,
  onChange,
}: Props) {
  const increase = () => {
    if (quantity < stock) {
      onChange(quantity + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };

  return (
    <div className="mb-10">
      <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">
        Quantity
      </p>

      <div className="flex items-center w-fit rounded-full border border-[#A88442] bg-white overflow-hidden">
        <button
          onClick={decrease}
          className="w-14 h-14 flex items-center justify-center text-[#A88442] text-2xl font-bold hover:bg-[#A88442] hover:text-white transition"
        >
          −
        </button>

        <span className="w-16 text-center text-[#A88442] text-lg font-bold">
          {quantity}
        </span>

        <button
          onClick={increase}
          className="w-14 h-14 flex items-center justify-center text-[#A88442] text-2xl font-bold hover:bg-[#A88442] hover:text-white transition"
        >
          +
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-3">
        {stock} items available
      </p>
    </div>
  );
}