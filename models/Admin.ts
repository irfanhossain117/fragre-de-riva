import { Schema, model, models } from "mongoose";

const AdminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["superadmin", "admin"],
      default: "admin",
    },

    permissions: {
      type: [String],
      default: [],
    },

    avatar: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
      default: null,
    },

    loginCount: {
      type: Number,
      default: 0,
    },

    refreshToken: {
      type: String,
      default: "",
    },

    // Future Security (OTP / 2FA)
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite in Next.js hot reload
const Admin = models.Admin || model("Admin", AdminSchema);

export default Admin;