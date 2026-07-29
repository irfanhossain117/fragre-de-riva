"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  Home,
  Menu,
  X,
  Search,
  Heart,
  ShoppingBag,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

import CartDrawer from "./CartDrawer";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const pathname = usePathname();

  const { totalItems, cartUpdated } = useCart();
  const { totalWishlist } = useWishlist();

  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navLink = (
    href: string,
    label: string
  ) => (
    <Link
      href={href}
      className={`group relative transition-all duration-300 hover:text-[#A88442] ${
        pathname === href
          ? "text-[#A88442]"
          : "text-[#2B241A]"
      }`}
    >
      {label}

      <span
        className={`absolute left-0 -bottom-1 h-[2px] bg-[#A88442] transition-all duration-300 ${
          pathname === href
            ? "w-full"
            : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#F8F4EE]/80 backdrop-blur-2xl border-b border-[#ECE4D8] shadow-xl"
            : "bg-[#F8F4EE]/95 border-b border-[#ECE4D8]"
        }`}
      >
        <div className="max-w-7xl mx-auto h-20 px-5 lg:px-8 flex items-center justify-between">

          {/* Logo */}

          <Link
  href="/"
  className="absolute left-1/2 -translate-x-1/2 md:absolute md:left-1/2 md:-translate-x-1/2 font-serif text-[#A88442] tracking-[0.15em] text-xl md:text-3xl whitespace-nowrap"
>
  FRAGRÉ DE RIVA
</Link>

          {/* Desktop Menu */}

          <div className="hidden md:flex items-center gap-8">
            {navLink("/", "Home")}
            {navLink("/shop", "Shop")}
            {navLink("/wishlist", "Wishlist")}
            {navLink("/story", "Story")}

<Link
  href="/#footer"
  className="text-[#2B241A] hover:text-[#A88442] transition"
>
  Contact
</Link>
          </div>

          {/* Desktop Right */}

          <div className="hidden md:flex items-center gap-3">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="w-11 h-11 rounded-full border border-[#E7DDCC] bg-white/70 backdrop-blur-md flex items-center justify-center text-[#A88442] hover:bg-[#A88442] hover:text-white transition-all duration-300"
            >
              <Search size={18} />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative w-11 h-11 rounded-full border border-[#E7DDCC] bg-white/70 backdrop-blur-md flex items-center justify-center text-[#A88442] hover:bg-[#A88442] hover:text-white transition-all duration-300"
            >
              <Heart size={18} />

              {totalWishlist > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                  {totalWishlist}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className={`relative flex items-center gap-2 px-5 py-3 rounded-full border border-[#E7DDCC] bg-white/70 backdrop-blur-md text-[#A88442] hover:bg-[#A88442] hover:text-white transition-all duration-300 ${
                cartUpdated ? "scale-105" : "scale-100"
              }`}
            >
              <ShoppingBag size={18} />

              <span>Cart</span>

              {totalItems > 0 && (
                <span
                  className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#A88442] text-white text-xs font-bold flex items-center justify-center ${
                    cartUpdated ? "scale-125" : "scale-100"
                  } transition-all duration-300`}
                >
                  {totalItems}
                </span>
              )}
            </button>

            {/* WhatsApp */}
            <a
              href="https://wa.me/8801511856101"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex px-6 py-3 rounded-full bg-[#A88442] text-white hover:opacity-90 transition"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            menuOpen
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="mx-3 mb-3 rounded-3xl border border-[#ECE4D8] bg-white/90 backdrop-blur-xl shadow-2xl">

            <div className="flex flex-col gap-2 p-4">
                            <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className={`rounded-2xl px-4 py-4 transition ${
                  pathname === "/"
                    ? "bg-[#A88442]/10 text-[#A88442]"
                    : "text-[#2B241A] hover:bg-[#F8F4EE]"
                }`}
              >
                Home
              </Link>

              <Link
                href="/shop"
                onClick={() => setMenuOpen(false)}
                className={`rounded-2xl px-4 py-4 transition ${
                  pathname === "/shop"
                    ? "bg-[#A88442]/10 text-[#A88442]"
                    : "text-[#2B241A] hover:bg-[#F8F4EE]"
                }`}
              >
                Shop
              </Link>

              <Link
                href="/wishlist"
                onClick={() => setMenuOpen(false)}
                className={`rounded-2xl px-4 py-4 transition ${
                  pathname === "/wishlist"
                    ? "bg-[#A88442]/10 text-[#A88442]"
                    : "text-[#2B241A] hover:bg-[#F8F4EE]"
                }`}
              >
                Wishlist
              </Link>

              <Link
                href="/story"
                onClick={() => setMenuOpen(false)}
                className={`rounded-2xl px-4 py-4 transition ${
                  pathname === "/story"
                    ? "bg-[#A88442]/10 text-[#A88442]"
                    : "text-[#2B241A] hover:bg-[#F8F4EE]"
                }`}
              >
                Story
              </Link>

              <Link
                href="/#footer"
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-4 text-[#2B241A] hover:bg-[#F8F4EE] hover:text-[#A88442] transition"
              >
                Contact
              </Link>

              <a
                href="https://wa.me/8801511856101"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 rounded-2xl bg-[#A88442] py-4 text-center font-medium text-white hover:opacity-90 transition"
              >
                WhatsApp
              </a>

            </div>
          </div>
        </div>

      </nav>

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      />

      {/* Mobile Bottom Navigation */}

      <div className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-[max(12px,env(safe-area-inset-bottom))] md:hidden">

        <div className="rounded-3xl border border-[#E7DDCC] bg-[#F8F4EE]/95 backdrop-blur-xl shadow-2xl">

          <div className="grid grid-cols-5">
                        {/* Home */}
            <Link
              href="/"
              className={`flex flex-col items-center justify-center py-3 transition ${
                pathname === "/"
                  ? "text-[#A88442]"
                  : "text-gray-500 hover:text-[#A88442]"
              }`}
            >
              <Home size={20} />
              <span className="mt-1 text-[11px]">Home</span>
            </Link>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex flex-col items-center justify-center py-3 text-gray-500 hover:text-[#A88442] transition"
            >
              <Search size={20} />
              <span className="mt-1 text-[11px]">Search</span>
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className={`relative flex flex-col items-center justify-center py-3 transition ${
                pathname === "/wishlist"
                  ? "text-[#A88442]"
                  : "text-gray-500 hover:text-[#A88442]"
              }`}
            >
              <Heart size={20} />

              {totalWishlist > 0 && (
                <span className="absolute top-2 right-4 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {totalWishlist}
                </span>
              )}

              <span className="mt-1 text-[11px]">
                Wishlist
              </span>
            </Link>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex flex-col items-center justify-center py-3 text-gray-500 hover:text-[#A88442] transition"
            >
              <ShoppingBag size={20} />

              {totalItems > 0 && (
                <span className="absolute top-2 right-4 flex h-5 w-5 items-center justify-center rounded-full bg-[#A88442] text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}

              <span className="mt-1 text-[11px]">
                Cart
              </span>
            </button>

            {/* Menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`flex flex-col items-center justify-center py-3 transition ${
                menuOpen
                  ? "text-[#A88442]"
                  : "text-gray-500 hover:text-[#A88442]"
              }`}
            >
              {menuOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}

              <span className="mt-1 text-[11px]">
                Menu
              </span>
            </button>
                      </div>
        </div>
      </div>
    </>
  );
}