"use client";

import { useState, useEffect } from "react";
import Toast from "./ui/Toast";

type Review = {
  _id: string;
  productId: number;
  rating: number;
  comment: string;
  userName: string;
  createdAt: string;
};

type Props = {
  productId: number;
};

export default function ProductReviews({ productId }: Props) {
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const [userName, setUserName] = useState("");
  const [ratingInput, setRatingInput] = useState(5);
  const [commentInput, setCommentInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(`/api/reviews?productId=${productId}`);
        const data = await res.json();
        if (data.success) {
          setReviewsList(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    }
    fetchReviews();
  }, [productId]);

  const totalReviewsCount = reviewsList.length;
  const averageRating =
    reviewsList.length > 0
      ? (
          reviewsList.reduce((acc, item) => acc + item.rating, 0) /
          reviewsList.length
        ).toFixed(1)
      : null;

  async function handleAddReview(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          rating: Number(ratingInput),
          comment: commentInput,
          userName,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setReviewsList([data.data, ...reviewsList]);
        setUserName("");
        setCommentInput("");
        setRatingInput(5);
        setToastMessage("Review added successfully!");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
      } else {
        alert(data.error || "Failed to submit review");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-white py-20 px-6">
      <Toast show={showToast} message={toastMessage} />

      <div className="max-w-2xl mx-auto text-center">
        {/* Eyebrow + Heading — matches "About This Fragrance" styling */}
        <p className="uppercase tracking-[0.4em] text-[#A88442] text-sm mb-4">
          Customer Reviews
        </p>
        <h3 className="text-4xl md:text-5xl font-serif text-[#A88442] mb-4">
          What Our Customers Say
        </h3>

        {averageRating && (
          <div className="flex items-center justify-center gap-2 mb-12">
            <span className="text-yellow-500 text-lg">⭐⭐⭐⭐⭐</span>
            <span className="text-gray-600 text-sm">
              {averageRating} ({totalReviewsCount} Reviews)
            </span>
          </div>
        )}

        {/* Leave a Review Form */}
        <form
          onSubmit={handleAddReview}
          className="bg-[#F8F4EE] p-8 rounded-2xl mb-12 space-y-4 text-left"
        >
          <h4 className="font-semibold text-lg text-[#2B241A] text-center mb-2">
            Leave a Review
          </h4>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg p-2.5 bg-white text-[#2B241A]"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Rating</label>
            <select
              value={ratingInput}
              onChange={(e) => setRatingInput(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg p-2.5 bg-white text-[#2B241A]"
            >
              <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
              <option value="4">⭐⭐⭐⭐ (4/5)</option>
              <option value="3">⭐⭐⭐ (3/5)</option>
              <option value="2">⭐⭐ (2/5)</option>
              <option value="1">⭐ (1/5)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Your Feedback
            </label>
            <textarea
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              required
              rows={3}
              placeholder="Write your review here..."
              className="w-full border border-gray-300 rounded-lg p-2.5 bg-white text-[#2B241A]"
            />
          </div>

          <div className="pt-2 text-center">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-[#A88442] px-8 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>

        {/* Reviews List */}
        <div className="space-y-4 text-left">
          {reviewsList.length === 0 ? (
            <p className="text-center italic text-gray-500">
              No reviews yet. Be the first to review this product!
            </p>
          ) : (
            reviewsList.map((rev) => (
              <div
                key={rev._id}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h5 className="font-semibold text-[#2B241A]">
                    {rev.userName}
                  </h5>
                  <span className="text-sm text-yellow-500">
                    {"⭐".repeat(rev.rating)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{rev.comment}</p>
                <span className="mt-2 block text-xs text-gray-400">
                  {new Date(rev.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
