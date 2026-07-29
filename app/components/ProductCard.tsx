"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Product = {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <div className="group overflow-hidden rounded-[32px] bg-white shadow-lg border border-[#E7DDCC] transition hover:-translate-y-1 hover:shadow-2xl">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square bg-[#F8F4EE] overflow-hidden">
          {isImageLoading && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#f1e7d8] via-[#fbf7f2] to-[#efe1cd]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full border-4 border-[#D6C7AB] border-t-[#A88442] animate-spin" />
              </div>
            </div>
          )}

          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition duration-500 group-hover:scale-105 ${
              isImageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoadingComplete={() => setIsImageLoading(false)}
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </div>

        <div className="p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-[#A88442] mb-3">
            {product.category}
          </p>

          <h3 className="text-2xl font-serif text-[#2B241A] mb-3">
            {product.name}
          </h3>

          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-[#A88442]">
              ৳{product.price}
            </p>

            <span className="text-sm text-gray-500 group-hover:text-[#A88442] transition">
              View →
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}