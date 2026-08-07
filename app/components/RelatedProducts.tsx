"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

type Props = {
  currentId: string;
  category: string;
};

export default function RelatedProducts({ currentId, category }: Props) {
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelatedProducts() {
      try {
        const res = await fetch(`/api/products?category=${encodeURIComponent(category)}&exclude=${currentId}&published=true`);
        const data = await res.json();
        
        if (data.success && Array.isArray(data.data)) {
          const formatted = data.data.map((p: any) => ({
            ...p,
            id: p._id.toString(),
            price: p.variants?.[0]?.price || 0,
            image: p.image || p.images?.[0] || "",
          }));
          setRelated(formatted.slice(0, 4));
        }
      } catch (err) {
        console.error("Failed to fetch related products", err);
      } finally {
        setLoading(false);
      }
    }

    if (category) {
      fetchRelatedProducts();
    }
  }, [currentId, category]);

  if (loading || related.length === 0) return null;

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <p className="uppercase tracking-[0.4em] text-[#A88442] mb-4 text-center">
          You May Also Like
        </p>

        <h2 className="text-5xl font-serif text-[#A88442] text-center mb-14">
          Related Products
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {related.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}