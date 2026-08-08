"use client";

import { useEffect, useState } from "react";

const fallbackImages = [
  "/products/logo.jpeg",
  "/products/logo.jpeg",
  "/products/logo.jpeg",
  "/products/logo.jpeg",
];

export default function InstagramGallery() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        const gallery = data?.settings?.instagramImages;
        if (Array.isArray(gallery) && gallery.length > 0) {
          setImages(gallery);
        }
      })
      .catch((err) => console.error("Failed to load instagram gallery", err));
  }, []);

  const displayImages = images.length > 0 ? images : fallbackImages;

  return (
    <section className="py-28 bg-[#F8F4EE]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="uppercase tracking-[0.4em] text-[#A88442]">
            Follow The Journey
          </p>
          <h2 className="text-5xl font-serif text-[#A88442] mt-4">
            Instagram Gallery
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {displayImages.map((img, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl shadow-sm"
            >
              <img
                src={img}
                alt="Instagram Gallery"
                className="w-full h-[320px] object-cover hover:scale-110 transition duration-700"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}