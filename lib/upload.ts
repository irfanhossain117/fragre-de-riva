import fs from "fs";
import path from "path";

const DEFAULT_UPLOAD_DIR = path.join(
  process.cwd(),
  "public",
  "uploads",
  "products"
);

/**
 * Upload directory
 *
 * Priority:
 * 1. process.env.UPLOAD_DIR
 * 2. Local default folder
 */
export const UPLOAD_DIR =
  process.env.UPLOAD_DIR || DEFAULT_UPLOAD_DIR;

/**
 * Create upload directory if it doesn't exist.
 */
export function ensureUploadDir(): void {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, {
      recursive: true,
    });
  }
}