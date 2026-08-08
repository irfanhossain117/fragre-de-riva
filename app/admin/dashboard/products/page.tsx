"use client";

import Link from "next/link";
import ProductTable from "@/app/components/admin/ProductTable";

export default function ProductsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your perfumes</p>
        </div>

        <Link
          href="/admin/dashboard/products/new"
          className="rounded-xl bg-[#A88442] px-6 py-3 text-white transition hover:opacity-90"
        >
          Add Product
        </Link>
      </div>

      {/*
        আগে এখানে একটা আলাদা, সরল table বসানো ছিল যেখানে শুধু "Edit" বাটন ছিল —
        Delete করার কোনো উপায়ই ছিল না। অথচ পাশে <ProductTable /> কম্পোনেন্টে
        search + delete (confirm modal সহ) আগে থেকেই সম্পূর্ণভাবে বানানো ছিল,
        কিন্তু সেটা এই পেজে কখনো ব্যবহারই হতো না (dead code)।
        এখন সেই সঠিক কম্পোনেন্টটাই ব্যবহার করা হচ্ছে, তাই Delete এখন কাজ করবে।
      */}
      <ProductTable />
    </div>
  );
}
