"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

import DeleteModal from "./DeleteModal";





export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedId, setSelectedId] = useState("");
  const [selectedName, setSelectedName] = useState("");

  async function loadProducts() {
    try {
      setLoading(true);

      const res = await fetch("/api/products", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {
        setProducts(data.products);
        setFilteredProducts(data.products);
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

  useEffect(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) {
      setFilteredProducts(products);
      return;
    }

    setFilteredProducts(
  products.filter((product) => {
    return (
      product.name.toLowerCase().includes(keyword) ||
      (product.brand || "").toLowerCase().includes(keyword) ||
      (product.category || "").toLowerCase().includes(keyword)
    );
  })
);
  }, [search, products]);

  async function deleteProduct(id: string) {
    try {
      setDeleteLoading(true);

      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Delete failed.");
        return;
      }

      setDeleteOpen(false);

      await loadProducts();

      alert("Product deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Delete failed.");
    } finally {
      setDeleteLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow">
        <p className="text-lg font-medium">
          Loading Products...
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white shadow">

  <div className="flex flex-col gap-4 border-b p-6 md:flex-row md:items-center md:justify-between">

    <h2 className="text-2xl font-bold">
      Products
    </h2>

    <input
      type="text"
      placeholder="Search product..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full rounded-xl border p-3 outline-none md:w-80"
    />

  </div>

  <div className="overflow-x-auto">

    <table className="min-w-full">

      <thead className="bg-[#A88442] text-white">

        <tr>

          <th className="p-4 text-left">Image</th>

          <th className="p-4 text-left">Product</th>

          <th className="p-4 text-left">Brand</th>

          <th className="p-4 text-left">Category</th>

          <th className="p-4 text-left">Price</th>

          <th className="p-4 text-left">Stock</th>

          <th className="p-4 text-left">Status</th>

          <th className="p-4 text-center">Action</th>

        </tr>

      </thead>

      <tbody>

        {filteredProducts.length === 0 && (

          <tr>

            <td
              colSpan={8}
              className="p-12 text-center text-gray-500"
            >
              No Products Found
            </td>

          </tr>

        )}

        {filteredProducts.map((product) => (

          <tr
            key={product._id}
            className="border-b transition hover:bg-gray-50"
          >

            <td className="p-4">

              <Image
                src={product.image || "/placeholder.png"}
                alt={product.name}
                width={70}
                height={70}
                sizes="70px"
                className="rounded-xl object-cover"
              />

            </td>

            <td className="p-4">

              <div className="font-semibold">
                {product.name}
              </div>

              <div className="text-sm text-gray-500">
                {product.slug}
              </div>

            </td>

            <td className="p-4">

              {product.brand}

            </td>

            <td className="p-4">

              {product.category}

            </td>

            <td className="p-4 font-medium">

              ৳{product.variants?.[0]?.price ?? 0}

            </td>

            <td className="p-4">

              {product.variants?.[0]?.stock ?? 0}

            </td>

            <td className="space-x-2 p-4">

              {product.featured && (

                <span className="rounded bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                  Featured
                </span>

              )}

              {product.bestSeller && (

                <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                  Bestseller
                </span>

              )}

              {product.isPublished ? (

                <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                  Published
                </span>

              ) : (

                <span className="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                  Draft
                </span>

              )}

            </td>

            <td className="space-x-2 p-4 text-center">

              <Link
                href={`/admin/dashboard/products/${product._id}`}
                className="rounded-lg bg-blue-500 px-3 py-2 text-white transition hover:bg-blue-600"
              >
                Edit
              </Link>

              <button
                onClick={() => {
                  setSelectedId(product._id);
                  setSelectedName(product.name);
                  setDeleteOpen(true);
                }}
                className="rounded-lg bg-red-500 px-3 py-2 text-white transition hover:bg-red-600"
              >
                Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>
      </div>

  <DeleteModal
    open={deleteOpen}
    productName={selectedName}
    loading={deleteLoading}
    onClose={() => setDeleteOpen(false)}
    onDelete={() => deleteProduct(selectedId)}
  />

</div>
);
}