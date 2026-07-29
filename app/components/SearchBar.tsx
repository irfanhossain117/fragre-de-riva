"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { products } from "./products";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();

    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.topNotes.toLowerCase().includes(q) ||
        product.heartNotes.toLowerCase().includes(q) ||
        product.baseNotes.toLowerCase().includes(q)
      );
    });
  }, [query]);

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search fragrance..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-full border border-[#D6C7AB] bg-white px-5 py-3 outline-none focus:border-[#A88442]"
      />

      {query && (
        <div className="absolute left-0 right-0 mt-3 rounded-2xl bg-white shadow-2xl border border-[#EEE] overflow-hidden z-50 max-h-[420px] overflow-y-auto">

          {results.length === 0 ? (

            <div className="p-6 text-center text-gray-500">
              No products found.
            </div>

          ) : (

            results.map((product) => (

              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="flex items-center gap-4 p-4 hover:bg-[#F8F4EE] transition"
                onClick={() => setQuery("")}
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#F8F4EE]">

                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />

                </div>

                <div className="flex-1">

                  <h3 className="font-semibold text-[#2B241A]">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {product.category}
                  </p>

                </div>

                <div className="font-bold text-[#A88442]">
                  ৳{product.price}
                </div>

              </Link>

            ))

          )}

        </div>
      )}
    </div>
  );
}