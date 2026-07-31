"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  brand: string;
  category: string;
  featured: boolean;
  bestSeller: boolean;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();

      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="space-y-8">

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
          className="rounded-xl bg-[#A88442] px-6 py-3 text-white hover:opacity-90 transition"
        >
          Add Product
        </Link>

      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow">

        <table className="w-full">

          <thead className="border-b bg-gray-50">

            <tr>

              <th className="p-5 text-left">Name</th>

              <th className="p-5 text-left">Brand</th>

              <th className="p-5 text-left">Category</th>

              <th className="p-5 text-left">Featured</th>

              <th className="p-5 text-left">Best Seller</th>

            </tr>

          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td
                  className="p-5 text-center"
                  colSpan={5}
                >
                  Loading...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td
                  className="p-5 text-center"
                  colSpan={5}
                >
                  No Products Found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-5">
                    {product.name}
                  </td>

                  <td className="p-5">
                    {product.brand}
                  </td>

                  <td className="p-5">
                    {product.category}
                  </td>

                  <td className="p-5">
                    {product.featured ? "✅" : "❌"}
                  </td>

                  <td className="p-5">
                    {product.bestSeller ? "🔥" : "-"}
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