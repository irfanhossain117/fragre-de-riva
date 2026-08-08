"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type SearchProduct = {
  _id: string;
  slug: string;
  name: string;
  category: string;
  image?: string;
  images?: string[];
  variants?: { volume: string; price: number; stock: number }[];
};

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchProduct[]>([]);
  const [loading, setLoading] = useState(false);

  // ৩০০ms debounce করে API কল করা হচ্ছে, যাতে প্রতিটা key-press এ আলাদা রিকোয়েস্ট না যায়
  useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/products?published=true&search=${encodeURIComponent(trimmed)}`
        );
        const data = await res.json();
        if (data.success) {
          setResults(data.products);
        }
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const formatted = useMemo(
    () =>
      results.map((product) => ({
        ...product,
        price: product.variants?.[0]?.price ?? 0,
        image: product.image || product.images?.[0] || "/products/gugu.jpeg",
      })),
    [results]
  );

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

          {loading ? (

            <div className="p-6 text-center text-gray-500">
              Searching...
            </div>

          ) : formatted.length === 0 ? (

            <div className="p-6 text-center text-gray-500">
              No products found.
            </div>

          ) : (

            formatted.map((product) => (

              <Link
                key={product._id}
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
