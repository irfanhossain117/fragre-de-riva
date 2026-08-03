import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  const { pathname } = req.nextUrl;

  // ১. যদি ইউজার ইতিমধ্যে /admin/login পেজে থাকে এবং তার কাছে Valid Token থাকে,
  // তবে তাকে সরাসরি Dashboard-এ পাঠিয়ে দেওয়া হবে।
  if (pathname === "/admin/login") {
    if (token && verifyToken(token)) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // ২. যদি অন্য যেকোনো /admin রাউটে ঢোকার চেষ্টা করে কিন্তু Valid Token না থাকে,
  // তবে তাকে Login পেজে রিডাইরেক্ট করা হবে।
  if (!token || !verifyToken(token)) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

// ৩. এই Middleware শুধুমাত্র /admin এবং এর ভেতরের পেজগুলোতে কাজ করবে
export const config = {
  matcher: ["/admin/:path*"],
};