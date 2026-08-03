import fs from "fs/promises";
import path from "path";

// Upload Directory Path
export const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "products");

// Ensure Upload Directory Exists
export async function ensureUploadDir() {
  try {
    await fs.access(UPLOAD_DIR);
  } catch {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  }
}

// Helper to save single file
export async function saveUploadedFile(file: File): Promise<string> {
  await ensureUploadDir();

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = path.extname(file.name) || ".jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
  const filePath = path.join(UPLOAD_DIR, filename);

  await fs.writeFile(filePath, buffer);
  return `/uploads/products/${filename}`;
}