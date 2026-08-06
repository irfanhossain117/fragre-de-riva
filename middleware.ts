import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  const { pathname } = req.nextUrl;

  // 1. Jodi user /admin/login-e thake ebong tar kache Valid Token thake, dashboard-e pathabe
  if (pathname === "/admin/login") {
    if (token && (await verifyToken(token))) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // 2. Jodi onnanno /admin route-e thake ebong Valid Token na thake, login page-e pathabe
  if (!token || !(await verifyToken(token))) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
