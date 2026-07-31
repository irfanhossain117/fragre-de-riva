import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const { pathname } = req.nextUrl;

  // login page always allowed
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // protect all admin routes
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/admin/login", req.url)
      );
    }

    try {
      jwt.verify(token, JWT_SECRET);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(
        new URL("/admin/login", req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};