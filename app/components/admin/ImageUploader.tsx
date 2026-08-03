"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { UploadCloud, X, Loader2 } from "lucide-react";

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
  const [isDragging, setIsDragging] = useState(false);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;

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

  // Drag and Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  function removeImage(index: number) {
    setImages(images.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-6">
      {/* Upload Dropzone */}
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-8 text-center transition cursor-pointer ${
          isDragging
            ? "border-[#A88442] bg-amber-50/50"
            : "border-gray-300 hover:border-[#A88442] hover:bg-gray-50/50"
        } ${uploading ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-[#A88442] mb-3">
          {uploading ? (
            <Loader2 className="animate-spin" size={28} />
          ) : (
            <UploadCloud size={28} />
          )}
        </div>

        <p className="text-base font-semibold text-gray-900">
          {uploading
            ? "Uploading images..."
            : "Click or Drag & Drop to Upload"}
        </p>

        <p className="mt-1 text-xs text-gray-400">
          Supports JPG, PNG, WEBP (Multiple allowed)
        </p>

        <input
          ref={inputRef}
          hidden
          multiple
          type="file"
          accept="image/*"
          onChange={(e) => handleFiles(e.target.files)}
          disabled={uploading}
        />
      </div>

      {/* Uploaded Images Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative h-36 w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50"
            >
              <Image
                src={image}
                alt={`Product Image ${index + 1}`}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
              />

              {/* Remove Image Button */}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition hover:bg-red-600"
                title="Remove Image"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}