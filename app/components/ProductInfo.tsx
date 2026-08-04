"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Toast from "./ui/Toast";
import QuantitySelector from "./QuantitySelector";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

type Variant = {
  volume: string;
  price: number;
  stock: number;
};

type Product = {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  topNotes: string;
  heartNotes: string;
  baseNotes: string;
  volume: string;
  category: string;
  rating: number;
  reviews: number;
  stock: number;
  variants?: Variant[]; // ভ্যারিয়েন্ট অপশনাল সাপোর্ট
};

type Props = {
  product: Product;
};

export default function ProductInfo({ product }: Props) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  // ১. বাই-ডিফল্ট ভ্যারিয়েন্ট লিস্ট (যদি ডাটাবেজে না থাকে তবে ডিফল্ট ৩টি সাইজ তৈরি করে নেবে)
  const variants: Variant[] = product.variants && product.variants.length > 0 
    ? product.variants 
    : [
        { volume: product.volume || "50ml", price: product.price, stock: product.stock },
        { volume: "30ml", price: Math.round(product.price * 0.65), stock: 5 },
        { volume: "10ml", price: Math.round(product.price * 0.35), stock: 8 },
      ];

  // ২. সিলেক্টেড ভ্যারিয়েন্ট স্টেট (বাই-ডিফল্ট ১ম ভ্যারিয়েন্ট)
  const [selectedVariant, setSelectedVariant] = useState<Variant>(variants[0]);

  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const pathname = usePathname();
  const [toastMessage, setToastMessage] = useState("");

  function handleAddToCart() {
    addToCart(
      {
        id: product.id,
        name: `${product.name} (${selectedVariant.volume})`,
        price: selectedVariant.price,
        image: product.image,
      },
      quantity
    );

    setToastMessage(`${product.name} (${selectedVariant.volume}) × ${quantity}`);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  }

  function handleWishlist() {
    toggleWishlist({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: selectedVariant.price,
    });
  }

  async function handleShare() {
    const url = window.location.origin + pathname;

    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: product.description,
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      setToastMessage("Product link copied!");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 2500);
    }
  }

  // সিলেক্টেড দাম এবং সাইজ অনুযায়ী হোয়াটসঅ্যাপ মেসেজ আপডেট হবে
  const whatsappUrl = `https://wa.me/8801511856101?text=${encodeURIComponent(
    `Hello Fragré de Riva,\n\nI would like to order:\n\nProduct: ${product.name}\nVolume: ${selectedVariant.volume}\nQuantity: ${quantity}\nPrice: ৳${selectedVariant.price}\n\nTotal: ৳${selectedVariant.price * quantity}`
  )}`;

  return (
    <div>
      <Toast show={showToast} message={toastMessage} />

      <p className="uppercase tracking-[0.4em] text-[#A88442] mb-4">
        {product.category}
      </p>

      <h1 className="text-6xl md:text-7xl font-serif text-[#A88442] mb-6">
        {product.name}
      </h1>

      {/* 💰 DYNAMIC PRICE (ক্লিক করা ভ্যারিয়েন্ট অনুযায়ী দাম দেখাবে) */}
      <p className="text-3xl font-bold text-[#A88442] mb-6">
        ৳{selectedVariant.price}
      </p>

      {/* Rating */}
      <div className="flex items-center gap-3 mb-6">
        <div className="text-yellow-500 text-xl">⭐⭐⭐⭐⭐</div>
        <p className="text-gray-600">
          {product.rating} ({product.reviews} Reviews)
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-3 mb-8">
        <span
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            selectedVariant.stock <= 3
              ? "bg-red-100 text-red-600"
              : selectedVariant.stock <= 10
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {selectedVariant.stock <= 3
            ? `🔥 Only ${selectedVariant.stock} Left`
            : `✓ In Stock (${selectedVariant.stock})`}
        </span>

        <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
          🚚 Free Delivery
        </span>

        <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
          ✔ 100% Authentic
        </span>
      </div>

      {/* 🧪 CLICKABLE VOLUME BUTTONS */}
      <div className="mb-6">
        <p className="text-gray-700 mb-3 font-semibold">
          Volume: <span className="text-[#A88442]">{selectedVariant.volume}</span>
        </p>
        <div className="flex flex-wrap gap-3">
          {variants.map((v, i) => {
            const isSelected = selectedVariant.volume === v.volume;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedVariant(v)}
                className={`px-6 py-2 rounded-full text-sm font-medium border transition-all ${
                  isSelected
                    ? "bg-[#A88442] text-white border-[#A88442] shadow-md scale-105"
                    : "bg-white text-gray-700 border-gray-300 hover:border-[#A88442]"
                }`}
              >
                {v.volume}
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-lg text-gray-600 leading-relaxed mb-8">
        {product.description}
      </p>

      <QuantitySelector
        stock={selectedVariant.stock}
        quantity={quantity}
        onChange={setQuantity}
      />

      <div className="flex flex-wrap gap-4 mb-12">
        <button
          onClick={handleAddToCart}
          className="px-8 py-4 rounded-full bg-[#A88442] text-white hover:opacity-90 transition"
        >
          Add To Cart
        </button>

        <button
          onClick={() => window.open(whatsappUrl, "_blank")}
          className="px-8 py-4 rounded-full bg-black text-white hover:opacity-90 transition"
        >
          Buy Now
        </button>

        <button
          onClick={handleWishlist}
          className={`px-8 py-4 rounded-full border transition ${
            isWishlisted(product.id)
              ? "bg-red-500 border-red-500 text-white"
              : "border-[#A88442] text-[#A88442] hover:bg-[#A88442] hover:text-white"
          }`}
        >
          {isWishlisted(product.id) ? "❤️ Saved" : "🤍 Save"}
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 rounded-full border border-[#A88442] text-[#A88442] hover:bg-[#A88442] hover:text-white transition"
        >
          Order on WhatsApp
        </a>

        <button
          onClick={handleShare}
          className="px-8 py-4 rounded-full border border-[#A88442] text-[#A88442] hover:bg-[#A88442] hover:text-white transition"
        >
          🔗 Share
        </button>
      </div>

      {/* Fragrance Notes */}
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-semibold mb-2 text-[#2b2b2b]">Top Notes</h4>
          <p className="text-gray-500">{product.topNotes}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-[#2b2b2b]">Heart Notes</h4>
          <p className="text-gray-500">{product.heartNotes}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-[#2b2b2b]">Base Notes</h4>
          <p className="text-gray-500">{product.baseNotes}</p>
        </div>
      </div>
    </div>
  );
}