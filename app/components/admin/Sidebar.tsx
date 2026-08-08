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
  Ticket,
  Star,
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
    title: "Coupons",
    href: "/admin/dashboard/coupons",
    icon: Ticket,
  },
  {
    title: "Reviews",
    href: "/admin/dashboard/reviews",
    icon: Star,
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
    <aside className="w-72 bg-black text-white flex flex-col sticky top-0 h-screen shrink-0">
      <div className="px-8 py-8 border-b border-neutral-800">
        <h1 className="text-3xl font-serif text-[#C8A96A]">Fragré</h1>
        <p className="text-sm text-neutral-400">Admin Panel</p>
      </div>

      <nav className="flex-1 py-6 space-y-1">
        {menu.map((item) => {
          const Icon = item.icon;

          // Sub-pages er jonno active state handle kora
          const active =
            pathname === item.href ||
            (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mx-4 flex items-center gap-4 rounded-xl px-5 py-4 transition ${
                active
                  ? "bg-[#A88442] text-white font-medium"
                  : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-5 border-t border-neutral-800">
        <button className="flex w-full items-center gap-4 rounded-xl px-4 py-4 text-neutral-400 hover:bg-neutral-900 hover:text-white transition">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}