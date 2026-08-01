"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface ImageUploaderProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ImageUploader({
  images,
  setImages,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  async function handleFiles(files: FileList | null) {
    if (!files) return;

    setUploading(true);

    try {
      const uploaded: string[] = [];

      for (const file of Array.from(files)) {
        const formData = new FormData();

        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

const data = await res.json();

if (!res.ok || !data.success) {
    throw new Error(data.message || "Upload failed");
}

uploaded.push(data.url);
      }

      setImages((prev) => [...prev, ...uploaded]);
    } catch (error) {
      console.error(error);
      alert("Image upload failed.");
    } finally {
    if (inputRef.current) {
        inputRef.current.value = "";
    }

    setUploading(false);
}
  }

  function removeImage(index: number) {
    setImages(images.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-6">
      <div
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-2xl border-2 border-dashed border-gray-300 p-10 text-center hover:border-[#A88442]"
      >
        <p className="text-lg font-medium">
          {uploading ? "Uploading..." : "Click to Upload Images"}
        </p>

        <p className="mt-2 text-sm text-gray-500">
          JPG, PNG, WEBP
        </p>

        <input
          ref={inputRef}
          hidden
          multiple
          type="file"
          accept="image/*"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl border"
            >
              <Image
  src={image}
  alt={`Product ${index + 1}`}
  width={500}
  height={500}
  className="h-40 w-full object-cover rounded-xl"
/>

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs text-white"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}