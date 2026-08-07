import { NextResponse } from "next/server";
import { ensureUploadDir, UPLOAD_DIR } from "@/lib/upload";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export async function POST(req: Request) {
  try {
    await ensureUploadDir();

    const data = await req.formData();
    const file = data.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded." },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "Only JPG, PNG and WEBP images are allowed." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: "Maximum file size is 5MB." },
        { status: 400 }
      );
    }

    const extension = path.extname(file.name) || ".jpg";
    const filename = crypto.randomUUID() + extension;

    const bytes = await file.arrayBuffer();
    const filePath = path.join(UPLOAD_DIR, filename);

    await fs.writeFile(filePath, Buffer.from(bytes));

    return NextResponse.json({
      success: true,
      url: `/uploads/products/${filename}`,
    });
  } catch (error: any) {
    console.error("UPLOAD ERROR DETAILS:", error);

    // ব্রাউজারে আসল এরর মেসেজ পাঠানোর জন্য যাতে সাথে সাথে ধরতে পারেন
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Upload failed due to server error.",
      },
      { status: 500 }
    );
  }
}