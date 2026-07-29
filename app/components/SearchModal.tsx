"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { products } from "./products";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SearchModal({
  open,
  onClose,
}: Props) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return products.filter((product) => {
      const searchableText = [
        product.name,
        product.category,
        product.description,
        product.topNotes,
        product.heartNotes,
        product.baseNotes,
        product.volume,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(q);
    });
  }, [query]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex justify-center items-start pt-24 px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden border border-[#E7DDCC]"
      >
        <div className="flex items-center gap-3 p-6 border-b border-[#E7DDCC]">
          <span className="text-xl text-[#A88442]">🔍</span>

          <input
            autoFocus
            type="text"
            placeholder="Search fragrances..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 outline-none text-lg text-[#2B241A] placeholder:text-gray-400"
          />

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full text-2xl text-gray-500 hover:text-black hover:bg-gray-100 transition"
            aria-label="Close search"
          >
            ×
          </button>
        </div>

        <div className="max-h-[500px] overflow-y-auto">
          {query.length === 0 ? (
            <p className="p-6 text-gray-500">
              Start typing to search by name, category, or notes.
            </p>
          ) : results.length === 0 ? (
            <p className="p-6 text-gray-500">
              No fragrance found.
            </p>
          ) : (
            results.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                onClick={onClose}
                className="flex items-center gap-4 px-6 py-4 hover:bg-[#F8F4EE] transition border-b border-[#F1E8D9]"
              >
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#F8F4EE] shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#2B241A] truncate">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    {product.category}
                  </p>
                </div>

                <div className="font-bold text-[#A88442] shrink-0">
                  ৳{product.price}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}