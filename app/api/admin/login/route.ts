import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function POST(req: Request) {
  try {
    if (!process.env.JWT_SECRET) {
      return NextResponse.json(
        { message: "Server misconfigured" },
        { status: 500 }
      );
    }

    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password required" },
        { status: 400 }
      );
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const matched = await bcrypt.compare(password, admin.password);
    if (!matched) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set("admin_token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
});

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}