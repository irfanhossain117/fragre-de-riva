"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success) {
          const formatted = data.products.map((p: any) => ({
            ...p,
            id: p._id.toString(),
            price: p.variants?.[0]?.price || 0,
            image: p.image || p.images?.[0] || "",
          }));
          // শুধু ফিচারড প্রোডাক্ট ফিল্টার করতে পারেন অথবা প্রথম ৪-৮টি দেখাতে পারেন
          setProducts(formatted.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeatured();
  }, []);

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (products.length === 0) return null;

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-14">
        <p className="uppercase tracking-[0.4em] text-[#A88442] mb-4">
          Collection
        </p>
        <h2 className="text-5xl font-serif text-[#A88442]">
          Signature Fragrances
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}