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
          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <p className="text-gray-500">
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

      <div className="overflow-hidden rounded-3xl bg-white shadow">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="p-5 text-left">Name</th>

              <th className="p-5 text-left">Brand</th>

              <th className="p-5 text-left">Category</th>

              <th className="p-5 text-left">Stock</th>

              <th className="p-5 text-left">Featured</th>

              <th className="p-5 text-left">Best Seller</th>

              <th className="p-5 text-left">Published</th>

              <th className="p-5 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  className="p-8 text-center"
                  colSpan={8}
                >
                  Loading Products...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td
                  className="p-8 text-center text-gray-500"
                  colSpan={8}
                >
                  No Products Found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b transition hover:bg-gray-50"
                >
                  <td className="p-5 font-medium">
                    {product.name}
                  </td>

                  <td className="p-5">
                    {product.brand}
                  </td>

                  <td className="p-5">
                    {product.category}
                  </td>

                  <td className="p-5">
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
                      className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
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