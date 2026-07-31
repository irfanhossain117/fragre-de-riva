import fs from "fs";
import path from "path";

export const UPLOAD_DIR =
  process.env.NODE_ENV === "development"
    ? path.join(process.cwd(), "public", "uploads", "products")
    : "/mnt/storage/perfume-server/uploads/products";

export function ensureUploadDir() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, {
      recursive: true,
    });
  }
}