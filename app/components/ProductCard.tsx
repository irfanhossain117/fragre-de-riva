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
    <div className="group overflow-hidden rounded-3xl bg-white border border-[#E7DDCC] shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square bg-[#F8F4EE] overflow-hidden">

          {isImageLoading && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#F1E7D8] via-[#FBF7F2] to-[#EFE1CD]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full border-4 border-[#D6C7AB] border-t-[#A88442] animate-spin" />
              </div>
            </div>
          )}

          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${
              isImageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoadingComplete={() => setIsImageLoading(false)}
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
          />
        </div>

        <div className="p-4 sm:p-6">

          <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#A88442] mb-2 sm:mb-3">
            {product.category}
          </p>

          <h3 className="text-lg sm:text-xl lg:text-2xl font-serif text-[#2B241A] leading-snug mb-3 line-clamp-2">
            {product.name}
          </h3>

          <div className="flex items-center justify-between">

            <p className="text-lg sm:text-xl font-bold text-[#A88442]">
              ৳{product.price}
            </p>

            <span className="text-xs sm:text-sm text-gray-500 group-hover:text-[#A88442] transition">
              View →
            </span>

          </div>

        </div>
      </Link>
    </div>
  );
}