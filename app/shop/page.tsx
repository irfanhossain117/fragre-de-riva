"use client";

import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { products } from "../components/products";

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const categories = useMemo(() => {
    return ["All", ...new Set(products.map((p) => p.category))];
  }, []);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();

    let result = products.filter((product) => {
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.topNotes.toLowerCase().includes(q) ||
        product.heartNotes.toLowerCase().includes(q) ||
        product.baseNotes.toLowerCase().includes(q);

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sortBy === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-asc") {
      result = [...result].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return result;
  }, [search, category, sortBy]);

  return (
    <main className="bg-[#F8F4EE] min-h-screen py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.4em] text-[#A88442]">
            Collection
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#A88442] mt-4">
            Shop
          </h1>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div>
            <label className="block text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
              Search
            </label>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search fragrances..."
              className="w-full rounded-full border border-[#D6C7AB] bg-white px-5 py-3 outline-none focus:border-[#A88442] text-[#2B241A]"
            />
          </div>

          <div>
            <label className="block text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-full border border-[#D6C7AB] bg-white px-5 py-3 outline-none focus:border-[#A88442] text-[#2B241A]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
              Sort by
            </label>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-full border border-[#D6C7AB] bg-white px-5 py-3 outline-none focus:border-[#A88442] text-[#2B241A]"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <p className="text-gray-500">
            Showing {filteredProducts.length} product(s)
          </p>

          {(search || category !== "All" || sortBy !== "featured") && (
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
                setSortBy("featured");
              }}
              className="text-[#A88442] font-medium hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 sm:py-24">
            <p className="text-2xl sm:text-3xl font-serif text-[#A88442]">
              No products found
            </p>
            <p className="text-gray-500 mt-3">
              Try a different search or filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}