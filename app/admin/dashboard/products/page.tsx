"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Product } from "@/types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProducts() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/products");

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = (await res.json()) as {
        success: boolean;
        products: Product[];
      };

      if (data.success) {
        setProducts(data.products);
      } else {
        setError("Failed to load products.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Products
          </h1>
          <p className="text-gray-600">
            Manage your perfumes
          </p>
        </div>

        <Link
          href="/admin/dashboard/products/new"
          className="rounded-xl bg-[#A88442] px-6 py-3 text-white transition hover:opacity-90"
        >
          Add Product
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
          <div className="flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={loadProducts}
              className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-3xl bg-white shadow border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead className="border-b border-gray-200 bg-gray-100 text-gray-800 uppercase text-xs font-semibold">
            <tr>
              <th className="p-5">Name</th>
              <th className="p-5">Brand</th>
              <th className="p-5">Category</th>
              <th className="p-5">Stock</th>
              <th className="p-5">Featured</th>
              <th className="p-5">Best Seller</th>
              <th className="p-5">Published</th>
              <th className="p-5">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-gray-800">
            {loading ? (
              <tr>
                <td
                  className="p-8 text-center text-gray-600"
                  colSpan={8}
                >
                  Loading Products...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td
                  className="p-8 text-center text-gray-600"
                  colSpan={8}
                >
                  No Products Found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="transition hover:bg-gray-50"
                >
                  <td className="p-5 font-semibold text-gray-900">
                    {product.name}
                  </td>
                  <td className="p-5 text-gray-700">
                    {product.brand}
                  </td>
                  <td className="p-5 text-gray-700">
                    {product.category}
                  </td>
                  <td className="p-5 text-gray-700">
                    {product.totalStock}
                  </td>
                  <td className="p-5">
                    {product.featured ? "✅" : "❌"}
                  </td>
                  <td className="p-5">
                    {product.bestSeller ? "🔥" : "—"}
                  </td>
                  <td className="p-5">
                    {product.isPublished ? "🟢" : "⚪"}
                  </td>
                  <td className="p-5">
                    <Link
                      href={`/admin/dashboard/products/${product._id}`}
                      className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-800 inline-block"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}