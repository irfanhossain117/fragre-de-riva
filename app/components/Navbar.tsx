"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
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
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#F8F4EE]/80 backdrop-blur-2xl border-b border-[#ECE4D8] shadow-lg"
            : "bg-[#F8F4EE]/95 border-b border-[#ECE4D8]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <Link
  href="/"
  className="font-serif tracking-[0.18em] text-[#A88442] transition hover:opacity-80 whitespace-nowrap"
>
  <span className="hidden md:block text-3xl">
    FRAGRÉ DE RIVA
  </span>

  <span className="block md:hidden text-xl">
    FRAGRÉ
  </span>
</Link>

          <div className="hidden md:flex gap-8 text-[#2B241A] font-medium">
            <Link href="/" className="hover:text-[#A88442] transition">
              Home
            </Link>

            <Link href="/shop" className="hover:text-[#A88442] transition">
              Shop
            </Link>

            <Link href="/wishlist" className="hover:text-[#A88442] transition">
              Wishlist
            </Link>

            <Link href="/story" className="hover:text-[#A88442] transition">
              Story
            </Link>

            <Link href="/#footer" className="hover:text-[#A88442] transition">
              Contact
            </Link>
          </div>
          <button
  onClick={() => setMenuOpen(!menuOpen)}
  className="md:hidden w-10 h-10 rounded-full border border-[#A88442] flex items-center justify-center text-[#A88442] hover:bg-[#A88442] hover:text-white transition"
  aria-label="Toggle Menu"
>
  {menuOpen ? "✕" : "☰"}
</button>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#A88442] flex items-center justify-center text-xl text-[#A88442] hover:bg-[#A88442] hover:text-white transition"
              aria-label="Search"
            >
              🔍
            </button>

            <Link
              href="/wishlist"
              className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#A88442] flex items-center justify-center text-xl text-[#A88442] hover:bg-[#A88442] hover:text-white transition"
            >
              ❤️

              {totalWishlist > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                  {totalWishlist}
                </span>
              )}
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              className={`relative px-3 md:px-6 py-2.5 md:py-3 rounded-full border border-[#A88442] text-[#A88442] hover:bg-[#A88442] hover:text-white transition-all duration-300 ${
                cartUpdated ? "scale-105" : "scale-100"
              }`}
            >
              <span className="text-lg">🛒</span>
<span className="hidden md:inline ml-2">Cart</span>

              {totalItems > 0 && (
                <span
                  className={`absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#A88442] text-white text-xs font-bold flex items-center justify-center transition-transform duration-300 ${
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
              className="hidden md:flex px-6 py-3 rounded-full bg-[#A88442] text-white hover:opacity-90 transition"
            >
              WhatsApp
            </a>
          </div>
        </div>
        {menuOpen && (
  <div className="md:hidden bg-[#F8F4EE] border-t border-[#E7DDCC] shadow-lg">
    <div className="flex flex-col px-5 py-5 gap-5">

      <Link
        href="/"
        onClick={() => setMenuOpen(false)}
        className="text-[#2B241A] hover:text-[#A88442]"
      >
        Home
      </Link>

      <Link
        href="/shop"
        onClick={() => setMenuOpen(false)}
        className="text-[#2B241A] hover:text-[#A88442]"
      >
        Shop
      </Link>

      <Link
        href="/wishlist"
        onClick={() => setMenuOpen(false)}
        className="text-[#2B241A] hover:text-[#A88442]"
      >
        Wishlist
      </Link>

      <Link
        href="/story"
        onClick={() => setMenuOpen(false)}
        className="text-[#2B241A] hover:text-[#A88442]"
      >
        Our Story
      </Link>

      <a
        href="https://wa.me/8801511856101"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#A88442] text-white text-center py-3 rounded-full"
      >
        WhatsApp
      </a>

    </div>
  </div>
)}
      </nav>

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </>
  );
}