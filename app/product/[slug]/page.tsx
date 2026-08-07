import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductGallery from "../../components/ProductGallery";
import ProductInfo from "../../components/ProductInfo";
import RelatedProducts from "../../components/RelatedProducts";
import ProductReviews from "../../components/ProductReviews";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// ডাটাবেস থেকে প্রোডাক্ট ফেচ করার ফাংশন
async function getProductBySlug(slug: string) {
  try {
    await connectDB();
    const product = await Product.findOne({ slug, isPublished: true }).lean();
    if (!product) return null;

    // MongoDB অবজেক্টকে প্রপার্টির সাথে ম্যাপ করা
    return {
      ...product,
      id: (product._id as any).toString(),
      price: product.variants?.[0]?.price || 0,
      volume: product.variants?.[0]?.volume || "50ml",
      stock: product.totalStock || 0,
      rating: 4.9, // ডিফল্ট রেটিং বা আপনার ডাটাবেস ফিল্ড থাকলে দিন
      reviews: 127,
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // JSON-LD for Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images || [product.image],
    description: product.description,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "BDT",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
  };

  return (
    <main className="bg-[#F8F4EE] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <ProductGallery
            images={product.images?.length > 0 ? product.images : [product.image]}
            name={product.name}
          />

          <ProductInfo product={product} />
        </div>
      </section>

      <RelatedProducts
        currentId={product.id}
        category={product.category}
      />

      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="uppercase tracking-[0.4em] text-[#A88442] mb-4">
            About This Fragrance
          </p>

          <h2 className="text-5xl font-serif text-[#A88442] mb-8">
            Crafted For Presence
          </h2>

          <p className="text-gray-600 leading-loose text-lg">
            {product.description}
          </p>
        </div>
      </section>

      {/* কাস্টমার রিভিউ সেকশন */}
      <ProductReviews productId={product.id} />
    </main>
  );
}