"use client";

import ProductCard from "./ProductCard";
import { products } from "./products";

type Props = {
  currentId: number;
  category: string;
};

export default function RelatedProducts({
  currentId,
  category,
}: Props) {
  // ১. প্রথমে বর্তমান প্রোডাক্ট বাদ দিয়ে একই ক্যাটাগরির প্রোডাক্টগুলো ফিল্টার করা
  const sameCategoryProducts = products.filter(
    (p) => p.category === category && p.id !== currentId
  );

  // ২. যদি একই ক্যাটাগরিতে পর্যাপ্ত প্রোডাক্ট না থাকে, তবে অন্য ক্যাটাগরি থেকেও প্রোডাক্ট নিয়ে আসা (যাতে লিস্ট খালি না থাকে)
  const otherCategoryProducts = products.filter(
    (p) => p.category !== category && p.id !== currentId
  );

  // ৩. দুটি মিলিয়ে মোট সর্বোচ্চ ৪টি প্রোডাক্ট রিলেটেড সেকশনের জন্য তৈরি করা
  const related = [...sameCategoryProducts, ...otherCategoryProducts].slice(0, 4);

  if (related.length === 0) return null;

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