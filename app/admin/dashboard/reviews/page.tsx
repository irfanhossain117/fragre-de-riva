"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, Star, MessageSquareText } from "lucide-react";

interface ReviewItem {
  _id: string;
  productId: string;
  productName: string;
  productSlug: string | null;
  rating: number;
  comment: string;
  userName: string;
  createdAt: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadReviews() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/reviews", { cache: "no-store" });
      const data = await res.json();
      if (data.success) setReviews(data.reviews);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReviews();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this review? This cannot be undone.")) return;

    try {
      await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete review.");
    }
  }

  const filtered = reviews.filter((r) => {
    const keyword = search.toLowerCase().trim();
    if (!keyword) return true;
    return (
      r.productName.toLowerCase().includes(keyword) ||
      r.userName.toLowerCase().includes(keyword) ||
      r.comment.toLowerCase().includes(keyword)
    );
  });

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "—";

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
          <p className="text-gray-600 mt-1">
            {reviews.length} reviews · Average rating {averageRating}
            {reviews.length > 0 && " ★"}
          </p>
        </div>

        <input
          type="text"
          placeholder="Search by product, name or comment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-300 p-3 outline-none sm:w-80 bg-white text-gray-900 placeholder:text-gray-400"
        />
      </div>

      <div className="rounded-3xl border border-gray-100 bg-white shadow-sm">
        {loading ? (
          <p className="p-8 text-center text-gray-500">Loading reviews...</p>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 p-12 text-center text-gray-500">
            <MessageSquareText className="text-gray-300" size={32} />
            No reviews found.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filtered.map((review) => (
              <div key={review._id} className="flex items-start justify-between gap-4 p-5">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-gray-900">{review.userName}</p>
                    <span className="flex items-center gap-0.5 text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          fill={i < review.rating ? "currentColor" : "none"}
                          className={i < review.rating ? "" : "text-gray-300"}
                        />
                      ))}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-gray-600">{review.comment}</p>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-400">
                    {review.productSlug ? (
                      <Link
                        href={`/product/${review.productSlug}`}
                        target="_blank"
                        className="font-medium text-[#A88442] hover:underline"
                      >
                        {review.productName}
                      </Link>
                    ) : (
                      <span>{review.productName}</span>
                    )}
                    <span>·</span>
                    <span>{new Date(review.createdAt).toLocaleDateString("en-GB")}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(review._id)}
                  className="shrink-0 rounded-lg bg-red-50 p-2.5 text-red-600 transition hover:bg-red-100"
                  title="Delete review"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
