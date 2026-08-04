"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type ProductType = {
  _id?: string;
  name: string;
  price: string;
  image: string;
};

// ফলব্যাক স্ট্যাটিক ডেটা
const fallbackProducts: ProductType[] = [
  { name: "Royal Oud", price: "৳2,490", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1200" },
  { name: "Velvet Noir", price: "৳2,990", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200" },
  { name: "Golden Essence", price: "৳3,490", image: "https://images.unsplash.com/photo-1615634262417-2b0e3f6f0d08?q=80&w=1200" },
  { name: "Midnight Bloom", price: "৳2,790", image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59db9?q=80&w=1200" },
  { name: "Imperial Rose", price: "৳3,990", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1200" },
];

export default function FeaturedProducts() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products/featured")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load featured products", err);
        setLoading(false);
      });
  }, []);

  const displayProducts = products.length > 0 ? products : fallbackProducts;

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.3em] text-[#A88442]">
            Collection
          </p>
          <h2 className="text-5xl font-serif text-[#A88442] mt-4">
            Signature Fragrances
          </h2>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
          {displayProducts.map((product, index) => (
            <div
              key={product._id || index}
            className="group rounded-3xl overflow-hidden bg-[#FAF8F4] shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="relative h-72 w-full overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-700"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-medium text-[#2b2b2b]">
                  {product.name}
                </h3>
                <p className="text-[#A88442] mt-2">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}