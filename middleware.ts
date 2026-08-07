import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const hostname = req.headers.get("host") || "";
  const { pathname } = req.nextUrl;

  // 1. Jodi keu main domain (www.fragrederiva.shop ba fragrederiva.shop) theke /admin-e dhuke, tahole kisu na kore bypass/ignore kore dibe
  if (hostname.includes("fragrederiva.shop") && !hostname.startsWith("admin.")) {
    return NextResponse.next();
  }

  // 2. Shudhu "admin.fragrederiva.shop" er khetre nicher admin protection logic kaj korbe
  const token = req.cookies.get("admin_token")?.value;

  // Jodi user /admin/login-e thake ebong tar kache Valid Token thake, dashboard-e pathabe
  if (pathname === "/admin/login") {
    if (token && (await verifyToken(token))) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // Jodi onnanno /admin route-e thake ebong Valid Token na thake, login page-e pathabe
  if (!token || !(await verifyToken(token))) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};