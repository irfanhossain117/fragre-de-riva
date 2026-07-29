"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Toast from "./ui/Toast";
import QuantitySelector from "./QuantitySelector";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";


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
};

type Props = {
  product: Product;
};

export default function ProductInfo({
  product,
}: Props) {
  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  const [quantity, setQuantity] =
    useState(1);

  const [showToast, setShowToast] =
    useState(false);
   const pathname = usePathname(); 

  const [toastMessage, setToastMessage] =
    useState("");

  function handleAddToCart() {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      quantity
    );

    setToastMessage(
      `${product.name} × ${quantity}`
    );

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
    price: product.price,
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

  const whatsappUrl = `https://wa.me/8801511856101?text=${encodeURIComponent(
`Hello Fragré de Riva,

I would like to order:

Product: ${product.name}
Quantity: ${quantity}
Price: ৳${product.price}

Total: ৳${product.price * quantity}`
  )}`;

  return (
    <div>
      <Toast
        show={showToast}
        message={toastMessage}
      />

      <p className="uppercase tracking-[0.4em] text-[#A88442] mb-4">
        {product.category}
      </p>

      <h1 className="text-6xl md:text-7xl font-serif text-[#A88442] mb-6">
        {product.name}
      </h1>

      <p className="text-3xl font-bold text-[#A88442] mb-6">
        ৳{product.price}
      </p>

      {/* Rating */}
      <div className="flex items-center gap-3 mb-6">
        <div className="text-yellow-500 text-xl">
          ⭐⭐⭐⭐⭐
        </div>

        <p className="text-gray-600">
          {product.rating} ({product.reviews} Reviews)
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-3 mb-8">
        <span
  className={`px-4 py-2 rounded-full text-sm font-medium ${
    product.stock <= 3
      ? "bg-red-100 text-red-600"
      : product.stock <= 10
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700"
  }`}
>
  {product.stock <= 3
    ? `🔥 Only ${product.stock} Left`
    : `✓ In Stock (${product.stock})`}
</span>

        <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
          🚚 Free Delivery
        </span>

        <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
          ✔ 100% Authentic
        </span>
      </div>

      <p className="text-gray-500 mb-6">
        <span className="font-semibold">
          Volume:
        </span>{" "}
        {product.volume}
      </p>

      <p className="text-lg text-gray-600 leading-relaxed mb-8">
        {product.description}
      </p>

      <QuantitySelector
        stock={product.stock}
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
    {isWishlisted(product.id)
      ? "❤️ Saved"
      : "🤍 Save"}
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
          <h4 className="font-semibold mb-2 text-[#2b2b2b]">
            Top Notes
          </h4>

          <p className="text-gray-500 ">
            {product.topNotes}
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-[#2b2b2b]">
            Heart Notes
          </h4>

          <p className="text-gray-500">
            {product.heartNotes}
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-[#2b2b2b]">
            Base Notes
          </h4>

          <p className="text-gray-500 ">
            {product.baseNotes}
          </p>
        </div>
      </div>
    </div>
  );
}