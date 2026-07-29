"use client";

import { useState } from "react";

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div>

      <div className="overflow-hidden rounded-3xl shadow-xl">
        <img
          src={selectedImage}
          alt={name}
          className="w-full aspect-square object-cover"
        />
      </div>

      <div className="grid grid-cols-4 gap-4 mt-5">

        {images.map((img, index) => (

          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`overflow-hidden rounded-xl border-2 transition

            ${
              selectedImage === img
                ? "border-[#A88442]"
                : "border-transparent"
            }`}
          >

            <img
              src={img}
              alt=""
              className="w-full h-24 object-cover"
            />

          </button>

        ))}

      </div>

    </div>
  );
}