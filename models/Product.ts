import { Schema, model, models } from "mongoose";

const VariantSchema = new Schema(
  {
    volume: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    _id: false,
  }
);

const ProductSchema = new Schema(
  {
    // =========================
    // Basic Information
    // =========================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    sku: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    // =========================
    // Description
    // =========================

    description: {
      type: String,
      default: "",
    },

    topNotes: {
      type: String,
      default: "",
    },

    heartNotes: {
      type: String,
      default: "",
    },

    baseNotes: {
      type: String,
      default: "",
    },

    // =========================
    // Images
    // =========================

    image: {
      type: String,
      default: "",
    },

    images: {
      type: [String],
      default: [],
    },

    // =========================
    // Pricing
    // =========================

    variants: {
      type: [VariantSchema],
      default: [],
    },

    totalStock: {
      type: Number,
      default: 0,
      min: 0,
    },

    // =========================
    // Homepage
    // =========================

    featured: {
      type: Boolean,
      default: false,
    },

    bestSeller: {
      type: Boolean,
      default: false,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },

    sortOrder: {
      type: Number,
      default: 0,
    },

    // =========================
    // SEO
    // =========================

    seoTitle: {
      type: String,
      default: "",
    },

    seoDescription: {
      type: String,
      default: "",
    },

    seoKeywords: {
      type: [String],
      default: [],
    },

    // =========================
    // Reviews
    // =========================

    rating: {
      type: Number,
      default: 5,
      min: 0,
      max: 5,
    },

    reviews: {
      type: Number,
      default: 0,
      min: 0,
    },

    // =========================
    // Admin
    // =========================

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// =========================
// Auto Thumbnail Image
// =========================

ProductSchema.pre("save", async function () {
  if ((!this.image || this.image === "") && this.images.length > 0) {
    this.image = this.images[0];
  }
});

// =========================
// Database Indexes
// =========================

ProductSchema.index({ slug: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ featured: 1 });
ProductSchema.index({ bestSeller: 1 });
ProductSchema.index({ isPublished: 1 });
ProductSchema.index({
  name: "text",
  description: "text",
});
const Product =
  models.Product || model("Product", ProductSchema);

export default Product;