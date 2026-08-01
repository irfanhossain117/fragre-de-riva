"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Product } from "@/types/product";
import ProductForm from "@/app/components/admin/ProductForm";





export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState<Product | null>(null);

  async function loadProduct() {
    try {
      setLoading(true);

      const res = await fetch(`/api/products/${id}`, {
        cache: "no-store",
      });

      const data = await res.json();

      if (!data.success) {
        alert("Product not found.");
        router.push("/admin/dashboard/products");
        return;
      }

      setProduct(data.product);
    } catch (error) {
      console.error(error);

      alert("Failed to load product.");

      router.push("/admin/dashboard/products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow">
        <p className="text-lg font-medium">
          Loading Product...
        </p>
      </div>
    );
  }
    if (!product) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow">
        <p className="text-lg font-medium">
          Product not found.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Edit Product
          </h1>

          <p className="mt-1 text-gray-500">
            Update your product information.
          </p>

        </div>

        <button
          onClick={() =>
            router.push("/admin/dashboard/products")
          }
          className="rounded-xl border px-5 py-3 transition hover:bg-gray-100"
        >
          ← Back
        </button>

      </div>

      <ProductForm
        editMode
        product={product}
      />

    </div>
  );
}