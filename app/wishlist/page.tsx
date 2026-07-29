"use client";

import Link from "next/link";
import Image from "next/image";

import { useWishlist } from "../context/WishlistContext";

export default function WishlistPage() {
  const {
    wishlist,
    removeFromWishlist,
  } = useWishlist();

  return (
    <main className="min-h-screen bg-[#F8F4EE] pt-36 pb-20">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-16 text-center">

          <p className="uppercase tracking-[0.4em] text-[#A88442] mb-4">
            Your Collection
          </p>

          <h1 className="text-5xl md:text-6xl font-serif text-[#A88442]">
            Wishlist
          </h1>

        </div>

        {wishlist.length === 0 ? (

          <div className="text-center py-24">

            <div className="text-8xl mb-8">
              🤍
            </div>

            <h2 className="text-4xl font-serif text-[#A88442] mb-4">
              Wishlist is Empty
            </h2>

            <p className="text-gray-500 mb-10">
              Save your favourite fragrances here.
            </p>

            <Link
              href="/shop"
              className="inline-block px-8 py-4 rounded-full bg-[#A88442] text-white hover:opacity-90 transition"
            >
              Explore Collection
            </Link>

          </div>

        ) : (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">

            {wishlist.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg"
              >

                <div className="relative aspect-square">

                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />

                </div>

                <div className="p-6">

                  <h3 className="text-2xl font-serif text-[#A88442]">
                    {item.name}
                  </h3>

                  <p className="text-xl font-bold mt-3">
                    ৳{item.price}
                  </p>

                  <div className="flex gap-3 mt-6">

                    <Link
                      href={`/product/${item.slug}`}
                      className="flex-1 text-center py-3 rounded-full bg-[#A88442] text-white hover:opacity-90 transition"
                    >
                      View
                    </Link>

                    <button
                      onClick={() =>
                        removeFromWishlist(item.id)
                      }
                      className="px-5 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                    >
                      ✕
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}