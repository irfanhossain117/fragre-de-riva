"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Product, Variant } from "@/types/product";
import ImageUploader from "./ImageUploader";

interface ProductFormProps {
  editMode?: boolean;
  product?: Product;
}

export default function ProductForm({
  editMode = false,
  product,
}: ProductFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  // =========================
  // Basic Information
  // =========================

  const [name, setName] = useState(product?.name ?? "");

  const [slug, setSlug] = useState(product?.slug ?? "");

  const [brand, setBrand] = useState(product?.brand ?? "");

  const [category, setCategory] = useState(
    product?.category ?? ""
  );

  const [sku, setSku] = useState(product?.sku ?? "");

  const [description, setDescription] = useState(
    product?.description ?? ""
  );

  // =========================
  // Notes
  // =========================

  const [topNotes, setTopNotes] = useState(
    product?.topNotes ?? ""
  );

  const [heartNotes, setHeartNotes] = useState(
    product?.heartNotes ?? ""
  );

  const [baseNotes, setBaseNotes] = useState(
    product?.baseNotes ?? ""
  );

  // =========================
  // Images
  // =========================

  const [galleryImages, setGalleryImages] = useState<string[]>(
    product?.images ?? []
  );

  // =========================
  // Variants
  // =========================

  const [variants, setVariants] = useState<Variant[]>(
    product?.variants ?? [
      {
        volume: "",
        price: 0,
        stock: 0,
      },
    ]
  );

  // =========================
  // Homepage
  // =========================

  const [featured, setFeatured] = useState(
    product?.featured ?? false
  );

  const [bestSeller, setBestSeller] = useState(
    product?.bestSeller ?? false
  );

  const [isPublished, setIsPublished] = useState(
    product?.isPublished ?? true
  );

  // =========================
  // SEO
  // =========================

  const [seoTitle, setSeoTitle] = useState(
    product?.seoTitle ?? ""
  );

  const [seoDescription, setSeoDescription] = useState(
    product?.seoDescription ?? ""
  );

  const [seoKeywords, setSeoKeywords] = useState(
    product?.seoKeywords?.join(", ") ?? ""
  );

  // =========================
  // Helper Functions
  // =========================
    function generateSlug(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function addVariant() {
    setVariants((prev) => [
      ...prev,
      {
        volume: "",
        price: 0,
        stock: 0,
      },
    ]);
  }

  function removeVariant(index: number) {
    setVariants((prev) =>
      prev.filter((_, i) => i !== index)
    );
  }

  function updateVariant(
    index: number,
    field: keyof Variant,
    value: string
  ) {
    const copy = [...variants];

    if (field === "price" || field === "stock") {
      copy[index][field] = Number(value) as never;
    } else {
      copy[index][field] = value as never;
    }

    setVariants(copy);
  }

  async function handleSubmit() {
    try {
      setLoading(true);

      if (!name.trim()) {
        alert("Product name is required.");
        return;
      }

      if (!brand.trim()) {
        alert("Brand is required.");
        return;
      }

      if (!category.trim()) {
        alert("Category is required.");
        return;
      }

      if (!slug.trim()) {
        alert("Slug is required.");
        return;
      }

      if (galleryImages.length === 0) {
        alert("Upload at least one image.");
        return;
      }

      const payload = {
        name,
        slug,
        brand,
        category,
        sku,
        description,

        topNotes,
        heartNotes,
        baseNotes,

        image: galleryImages[0],
        images: galleryImages,

        variants,

        featured,
        bestSeller,
        isPublished,

        seoTitle,
        seoDescription,

        seoKeywords: seoKeywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean),
      };

      const endpoint = editMode
        ? `/api/products/${product?._id}`
        : "/api/products";

      const method = editMode ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Something went wrong.");
        return;
      }

      alert(
        editMode
          ? "Product Updated Successfully"
          : "Product Added Successfully"
      );

      if (!editMode) {
        setName("");
        setSlug("");
        setBrand("");
        setCategory("");
        setSku("");
        setDescription("");

        setTopNotes("");
        setHeartNotes("");
        setBaseNotes("");

        setGalleryImages([]);

        setVariants([
          {
            volume: "",
            price: 0,
            stock: 0,
          },
        ]);

        setFeatured(false);
        setBestSeller(false);
        setIsPublished(true);

        setSeoTitle("");
        setSeoDescription("");
        setSeoKeywords("");
      }

      router.push("/admin/dashboard/products");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
        <div className="rounded-3xl bg-white p-8 shadow">
      <h2 className="mb-8 text-3xl font-bold">
        {editMode ? "Edit Product" : "Add Product"}
      </h2>

      <div className="grid gap-6">

        {/* Product Name */}
        <div>
          <label className="mb-2 block font-medium">
            Product Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);

              if (!editMode) {
                setSlug(generateSlug(e.target.value));
              }
            }}
            className="w-full rounded-xl border p-4"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="mb-2 block font-medium">
            Slug
          </label>

          <input
            value={slug}
            onChange={(e) => setSlug(generateSlug(e.target.value))}
            className="w-full rounded-xl border bg-gray-100 p-4"
          />
        </div>

        {/* Brand */}
        <div>
          <label className="mb-2 block font-medium">
            Brand
          </label>

          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full rounded-xl border p-4"
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block font-medium">
            Category
          </label>

          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border p-4"
          />
        </div>

        {/* SKU */}
        <div>
          <label className="mb-2 block font-medium">
            SKU
          </label>

          <input
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            className="w-full rounded-xl border p-4"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border p-4"
          />
        </div>

        {/* Fragrance Notes */}
        <div className="grid grid-cols-3 gap-4">

          <input
            placeholder="Top Notes"
            value={topNotes}
            onChange={(e) => setTopNotes(e.target.value)}
            className="rounded-xl border p-4"
          />

          <input
            placeholder="Heart Notes"
            value={heartNotes}
            onChange={(e) => setHeartNotes(e.target.value)}
            className="rounded-xl border p-4"
          />

          <input
            placeholder="Base Notes"
            value={baseNotes}
            onChange={(e) => setBaseNotes(e.target.value)}
            className="rounded-xl border p-4"
          />

        </div>
                {/* Variants */}

        <div className="space-y-4">

          <div className="flex items-center justify-between">

            <h3 className="text-xl font-semibold">
              Variants
            </h3>

            <button
              type="button"
              onClick={addVariant}
              className="rounded-lg bg-[#A88442] px-4 py-2 text-white transition hover:opacity-90"
            >
              + Add Variant
            </button>

          </div>

          {variants.map((variant, index) => (

            <div
              key={index}
              className="grid grid-cols-4 gap-4"
            >

              <input
                type="text"
                placeholder="50ml"
                value={variant.volume}
                onChange={(e) =>
                  updateVariant(
                    index,
                    "volume",
                    e.target.value
                  )
                }
                className="rounded-xl border p-3"
              />

              <input
                type="number"
                placeholder="Price"
                value={variant.price}
                onChange={(e) =>
                  updateVariant(
                    index,
                    "price",
                    e.target.value
                  )
                }
                className="rounded-xl border p-3"
              />

              <input
                type="number"
                placeholder="Stock"
                value={variant.stock}
                onChange={(e) =>
                  updateVariant(
                    index,
                    "stock",
                    e.target.value
                  )
                }
                className="rounded-xl border p-3"
              />

              <button
                type="button"
                onClick={() => removeVariant(index)}
                disabled={variants.length === 1}
                className="rounded-xl bg-red-500 px-4 py-3 text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Delete
              </button>

            </div>

          ))}

        </div>

        {/* Images */}

        <div>

          <h3 className="mb-4 text-xl font-semibold">
            Product Images
          </h3>

          <ImageUploader
            images={galleryImages}
            setImages={setGalleryImages}
          />

        </div>
                {/* Homepage */}

        <div className="grid grid-cols-3 gap-4">

          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              checked={featured}
              onChange={(e) =>
                setFeatured(e.target.checked)
              }
            />

            Featured

          </label>

          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              checked={bestSeller}
              onChange={(e) =>
                setBestSeller(e.target.checked)
              }
            />

            Best Seller

          </label>

          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) =>
                setIsPublished(e.target.checked)
              }
            />

            Publish

          </label>

        </div>

        {/* SEO */}

        <div className="space-y-4">

          <input
            placeholder="SEO Title"
            value={seoTitle}
            onChange={(e) =>
              setSeoTitle(e.target.value)
            }
            className="w-full rounded-xl border p-4"
          />

          <textarea
            placeholder="SEO Description"
            value={seoDescription}
            onChange={(e) =>
              setSeoDescription(e.target.value)
            }
            className="w-full rounded-xl border p-4"
          />

          <input
            placeholder="perfume,luxury,oud"
            value={seoKeywords}
            onChange={(e) =>
              setSeoKeywords(e.target.value)
            }
            className="w-full rounded-xl border p-4"
          />

        </div>

        {/* Save Button */}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-xl bg-[#A88442] py-4 text-lg font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? editMode
              ? "Updating Product..."
              : "Saving Product..."
            : editMode
            ? "Update Product"
            : "Save Product"}
        </button>

      </div>

    </div>
  );
}