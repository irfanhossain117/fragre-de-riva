import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  const { pathname } = req.nextUrl;

  // 1. Jodi user /admin/login-e thake ebong tar kache cookie (token) thake, tahoke soraSori dashboard-e pathiye debe
  if (pathname === "/admin/login") {
    if (token) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // 2. Jodi onnanno /admin page-gulate (dashboard, products, etc.) jete chay kintu token na thake, tahole login page-e pathabe
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};