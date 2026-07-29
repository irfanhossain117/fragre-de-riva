"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
  const { totalItems, cartUpdated } = useCart();
  const { totalWishlist } = useWishlist();

  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Mobile Menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Glass Navbar on Scroll
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
  setScrolled(window.scrollY > 20);

  if (menuOpen) {
    setMenuOpen(false);
  }
};

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#F8F4EE]/80 backdrop-blur-2xl border-b border-[#ECE4D8] shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            : "bg-[#F8F4EE]/95 border-b border-[#ECE4D8]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-center md:justify-between">
<Link
  href="/"
  className="font-serif text-[#A88442] transition hover:opacity-80 whitespace-nowrap"
>
  <span className="text-lg sm:text-xl md:text-3xl tracking-[0.12em]">
    FRAGRÉ DE RIVA
  </span>
</Link>

          <div className="hidden md:flex gap-8 text-[#2B241A] font-medium">
            <Link href="/" className="transition-all duration-300 hover:text-[#A88442] hover:-translate-y-0.5">
              Home
            </Link>

            <Link href="/shop" className="transition-all duration-300 hover:text-[#A88442] hover:-translate-y-0.5">
              Shop
            </Link>

            <Link href="/wishlist" className="transition-all duration-300 hover:text-[#A88442] hover:-translate-y-0.5">
              Wishlist
            </Link>

            <Link href="/story" className="transition-all duration-300 hover:text-[#A88442] hover:-translate-y-0.5">
              Story
            </Link>

            <Link href="/#footer" className="transition-all duration-300 hover:text-[#A88442] hover:-translate-y-0.5">
              Contact
            </Link>
          </div>
          <button
  onClick={() => setMenuOpen(!menuOpen)}
  className="hidden md:flex w-10 h-10 rounded-full border border-[#E7DDCC] bg-white/70 backdrop-blur-md items-center justify-center text-[#A88442] hover:bg-[#A88442] hover:text-white transition-all duration-300"
>
  {menuOpen ? <X size={20} /> : <Menu size={20} />}
</button>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="relative w-10 h-10 md:w-11 md:h-11 rounded-full border border-[#E7DDCC] bg-white/70 backdrop-blur-md flex items-center justify-center text-[#A88442] hover:bg-[#A88442] hover:text-white transition-all duration-300"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            <Link
              href="/wishlist"
              className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#A88442] flex items-center justify-center text-xl text-[#A88442] hover:bg-[#A88442] hover:text-white transition"
            >
              <Heart size={18} />

              {totalWishlist > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                  {totalWishlist}
                </span>
              )}
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              className={`relative flex items-center justify-center px-3 md:px-5 py-2.5 md:py-3 rounded-full border border-[#E7DDCC] bg-white/70 backdrop-blur-md text-[#A88442] hover:bg-[#A88442] hover:text-white transition-all duration-300 ${
                cartUpdated ? "scale-105" : "scale-100"
              }`}
            >
              <ShoppingBag size={18} />
<span className="hidden md:inline ml-2">Cart</span>

              {totalItems > 0 && (
                <span
                  className={`absolute -top-1.5 -right-1.5 w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#A88442] text-white text-xs font-bold flex items-center justify-center transition-transform duration-300 ${
                    cartUpdated ? "scale-125" : "scale-100"
                  }`}
                >
                  {totalItems}
                </span>
              )}
            </button>

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
        <div
  className={`md:hidden overflow-hidden transition-all duration-500 ${
    menuOpen
      ? "max-h-[500px] opacity-100"
      : "max-h-0 opacity-0"
  }`}
>
  <div className="mx-3 mb-3 rounded-3xl bg-white/80 backdrop-blur-xl border border-[#ECE4D8] shadow-2xl">
    <div className="flex flex-col p-4 gap-2">

      <Link
        href="/"
        onClick={() => setMenuOpen(false)}
        className="rounded-2xl px-4 py-4 text-[#2B241A] hover:bg-[#F8F4EE] hover:text-[#A88442] transition-all duration-300"
      >
        Home
      </Link>

      <Link
        href="/shop"
        onClick={() => setMenuOpen(false)}
        className="rounded-2xl px-4 py-4 text-[#2B241A] hover:bg-[#F8F4EE] hover:text-[#A88442] transition-all duration-300"
      >
        Shop
      </Link>

      <Link
        href="/wishlist"
        onClick={() => setMenuOpen(false)}
        className="rounded-2xl px-4 py-4 text-[#2B241A] hover:bg-[#F8F4EE] hover:text-[#A88442] transition-all duration-300"
      >
        Wishlist
      </Link>

      <Link
        href="/story"
        onClick={() => setMenuOpen(false)}
        className="rounded-2xl px-4 py-4 text-[#2B241A] hover:bg-[#F8F4EE] hover:text-[#A88442] transition-all duration-300"
      >
        Our Story
      </Link>

      <a
        href="https://wa.me/8801511856101"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 rounded-2xl bg-[#A88442] py-4 text-center font-medium text-white transition hover:scale-[1.02] hover:opacity-90"
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
      {/* ---------------- Mobile Bottom Navigation ---------------- */}
<div className="fixed bottom-0 left-0 right-0 md:hidden z-50 px-3 pb-3">
  <div className="rounded-3xl border border-[#E7DDCC] bg-[#F8F4EE]/95 backdrop-blur-xl shadow-2xl">

    <div className="grid grid-cols-5">

      {/* Home */}
      <Link
        href="/"
        className="flex flex-col items-center justify-center py-3 text-[#A88442]"
      >
        <Home size={20} />
        <span className="text-[11px] mt-1">Home</span>
      </Link>

      {/* Search */}
      <button
        onClick={() => setSearchOpen(true)}
        className="flex flex-col items-center justify-center py-3 text-[#A88442]"
      >
        <Search size={20} />
        <span className="text-[11px] mt-1">Search</span>
      </button>

      {/* Wishlist */}
      <Link
        href="/wishlist"
        className="relative flex flex-col items-center justify-center py-3 text-[#A88442]"
      >
        <Heart size={20} />

        {totalWishlist > 0 && (
          <span className="absolute top-2 right-5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white font-bold">
            {totalWishlist}
          </span>
        )}

        <span className="text-[11px] mt-1">
          Wishlist
        </span>
      </Link>

      {/* Cart */}
      <button
        onClick={() => setCartOpen(true)}
        className="relative flex flex-col items-center justify-center py-3 text-[#A88442]"
      >
        <ShoppingBag size={20} />

        {totalItems > 0 && (
          <span className="absolute top-2 right-5 flex h-5 w-5 items-center justify-center rounded-full bg-[#A88442] text-[10px] text-white font-bold">
            {totalItems}
          </span>
        )}

        <span className="text-[11px] mt-1">
          Cart
        </span>
      </button>

      {/* Menu */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex flex-col items-center justify-center py-3 text-[#A88442]"
      >
        {menuOpen ? (
          <X size={20} />
        ) : (
          <Menu size={20} />
        )}

        <span className="text-[11px] mt-1">
          Menu
        </span>
      </button>

    </div>
  </div>
</div>
    </>
  );
}