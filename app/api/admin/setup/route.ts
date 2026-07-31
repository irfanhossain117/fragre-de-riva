import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function GET(req: Request) {
  try {
    // secret protection - .env এ SETUP_SECRET সেট করুন
    const secret = new URL(req.url).searchParams.get("secret");
    if (!process.env.SETUP_SECRET || secret !== process.env.SETUP_SECRET) {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    await connectDB();

    const email = process.env.ADMIN_EMAIL || "admin@fragre.com";
    const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD;

    if (!defaultPassword) {
      return NextResponse.json(
        { message: "ADMIN_DEFAULT_PASSWORD not set in env" },
        { status: 500 }
      );
    }

    const admin = await Admin.findOne({ email });
    if (admin) {
      return NextResponse.json({
        success: true,
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    await Admin.create({
      name: "Admin",
      email,
      password: hashedPassword,
    });

    return NextResponse.json({
      success: true,
      message: "Admin created successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}