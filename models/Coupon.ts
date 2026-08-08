import { Schema, model, models } from "mongoose";

const CouponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["percent", "fixed"],
      required: true,
    },

    value: {
      type: Number,
      required: true,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // Optional: minimum order subtotal required for the coupon to apply
    minOrderAmount: {
      type: Number,
      default: 0,
    },

    // Optional expiry date; if not set, the coupon never expires
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default models.Coupon || model("Coupon", CouponSchema);
