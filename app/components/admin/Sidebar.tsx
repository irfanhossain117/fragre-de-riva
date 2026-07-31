"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/admin/dashboard/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/admin/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    href: "/admin/dashboard/customers",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/admin/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/admin/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-black text-white flex flex-col">

      <div className="px-8 py-8 border-b border-neutral-800">

        <h1 className="text-3xl font-serif text-[#C8A96A]">
          Fragré
        </h1>

        <p className="text-sm text-neutral-400">
          Admin Panel
        </p>

      </div>

      <nav className="flex-1 py-6">

        {menu.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mx-4 mb-2 flex items-center gap-4 rounded-xl px-5 py-4 transition ${
                active
                  ? "bg-[#A88442] text-white"
                  : "hover:bg-neutral-900"
              }`}
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </Link>
          );
        })}

      </nav>

      <div className="p-5 border-t border-neutral-800">

        <button className="flex w-full items-center gap-4 rounded-xl px-4 py-4 hover:bg-neutral-900">

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
}