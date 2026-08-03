"use client";

import { usePathname } from "next/navigation";

// Dynamic route onujayi title ebong subtitle map
const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/admin/dashboard": {
    title: "Dashboard",
    subtitle: "Welcome back Admin",
  },
  "/admin/dashboard/products": {
    title: "Products",
    subtitle: "Manage your perfumes",
  },
  "/admin/dashboard/products/new": {
    title: "Add Product",
    subtitle: "Create a new perfume listing",
  },
  "/admin/dashboard/orders": {
    title: "Orders",
    subtitle: "Manage customer orders",
  },
  "/admin/dashboard/customers": {
    title: "Customers",
    subtitle: "View registered users and customers",
  },
  "/admin/dashboard/analytics": {
    title: "Analytics",
    subtitle: "View store sales and performance",
  },
  "/admin/dashboard/settings": {
    title: "Settings",
    subtitle: "Manage admin settings",
  },
};

export default function Header() {
  const pathname = usePathname();

  // Active path onujayi title khunja, dynamic id product page handling
  let currentPage = pageTitles[pathname];

  if (!currentPage) {
    if (pathname.startsWith("/admin/dashboard/products/")) {
      currentPage = { title: "Edit Product", subtitle: "Update perfume details" };
    } else {
      currentPage = { title: "Admin Panel", subtitle: "Welcome back Admin" };
    }
  }

  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-10 sticky top-0 z-10">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          {currentPage.title}
        </h2>
        <p className="text-sm text-gray-500">
          {currentPage.subtitle}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-[#A88442] flex items-center justify-center text-white font-bold shadow-sm">
          A
        </div>
      </div>
    </header>
  );
}