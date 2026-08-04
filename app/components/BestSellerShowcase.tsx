"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type BestSellerProduct = {
  name: string;
  subtitle?: string;
  description: string;
  price: number;
  image: string;
  topNotes: string;
  heartNotes: string;
  baseNotes: string;
};

export default function BestSellerShowcase() {
  const [product, setProduct] = useState<BestSellerProduct | null>(null);

  useEffect(() => {
    fetch("/api/products/bestseller")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setProduct(data);
        }
      })
      .catch((err) => console.error("Failed to load bestseller", err));
  }, []);

  // ডাটা লোড না হওয়া পর্যন্ত বা ডেটা না পেলে ফলব্যাক বা স্ট্যাটিক ডেটা দেখাবে
  const displayProduct = product || {
    name: "Royal Oud",
    subtitle: "Signature Creation",
    description: "A rich composition of oud, amber and rare florals designed to create a memorable presence. Elegant, confident and timeless.",
    price: 2490,
    image: "/products/gaga.jpeg",
    topNotes: "Bergamot, Lemon",
    heartNotes: "Rose, Jasmine",
    baseNotes: "Oud, Amber, Musk",
  };

  return (
    <section className="bg-[#F8F4EE] py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="uppercase tracking-[0.4em] text-[#A88442]">
            Best Seller
          </p>
          <h2 className="text-6xl font-serif text-[#A88442] mt-6">
            {displayProduct.name}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative h-[450px] rounded-[40px] overflow-hidden shadow-2xl">
            <Image
              src={displayProduct.image || "/products/gugu.jpeg"}
              alt={displayProduct.name}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p className="uppercase tracking-[0.3em] text-[#A88442] mb-4">
              {displayProduct.subtitle || "Signature Creation"}
            </p>

            <h3 className="text-5xl font-serif text-[#A88442] mb-8">
              Crafted For Presence
            </h3>

            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {displayProduct.description}
            </p>

            <div className="space-y-2 text-[#A88442] mb-8">
              <div>
                <strong>Top Notes:</strong> {displayProduct.topNotes}
              </div>
              <div>
                <strong>Heart Notes:</strong> {displayProduct.heartNotes}
              </div>
              <div>
                <strong>Base Notes:</strong> {displayProduct.baseNotes}
              </div>
            </div>

            <div>
              <p className="text-4xl text-[#A88442] font-serif">
                ৳{displayProduct.price}
              </p>

              <a
                href="https://wa.me/8801511856101"
                className="inline-block mt-6 bg-[#A88442] text-white px-8 py-4 rounded-full hover:opacity-90 transition"
              >
                Order via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}