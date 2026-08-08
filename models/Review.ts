import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  // Product's _id একটা MongoDB ObjectId string (যেমন "65b2a1f8e4a1234567890abc"), Number নয়।
  productId: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  userName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Review || mongoose.model("Review", reviewSchema);
