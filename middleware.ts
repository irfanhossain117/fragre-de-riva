import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

// এই API রুটগুলোর নির্দিষ্ট মেথডে admin login (admin_token cookie) বাধ্যতামূলক।
// GET সবসময় public থাকে (storefront-এর জন্য দরকার), শুধু write-operation গুলো protect করা হচ্ছে।
const PROTECTED_API_RULES: { prefix: string; methods: string[] | "all" }[] = [
  { prefix: "/api/admin", methods: "all" },
  { prefix: "/api/products", methods: ["POST", "PUT", "PATCH", "DELETE"] },
  { prefix: "/api/settings", methods: ["PUT"] },
  { prefix: "/api/upload", methods: ["POST"] },
];

async function hasValidAdminToken(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return false;
  const payload = await verifyToken(token);
  return !!payload;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // =========================
  // 1. Admin dashboard PAGES (/admin/*)
  //    আগে এখানে hostname দেখে (fragrederiva.shop হলে) পুরো auth check bypass হয়ে যেত,
  //    যার ফলে main domain থেকে সরাসরি /admin/dashboard এ কোনো login ছাড়াই ঢোকা যেত।
  //    সেই bypass বাদ দিয়ে domain নির্বিশেষে সবসময় login check করা হচ্ছে।
  // =========================
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      if (await hasValidAdminToken(req)) {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }
      return NextResponse.next();
    }

    if (!(await hasValidAdminToken(req))) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    return NextResponse.next();
  }

  // =========================
  // 2. Admin-only API routes
  //    আগে এই routeগুলোর কোনো auth check ছিলই না — যে কেউ সরাসরি fetch/curl দিয়ে
  //    product create/update/delete, settings/password change, orders/customers data,
  //    বা Cloudinary upload করতে পারত।
  // =========================
  // Login (to obtain the token) এবং setup (secret-key protected, first-admin creation)
  // এই দুটো route কে আলাদা করে বাদ দিতে হবে, নাহলে কেউই কখনো লগইন করতে পারবে না।
  const isAuthBootstrapRoute =
    pathname === "/api/admin/login" || pathname === "/api/admin/setup";

  const rule = isAuthBootstrapRoute
    ? undefined
    : PROTECTED_API_RULES.find((r) => pathname.startsWith(r.prefix));

  if (rule && (rule.methods === "all" || rule.methods.includes(req.method))) {
    if (!(await hasValidAdminToken(req))) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please log in as admin." },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/products/:path*",
    "/api/settings/:path*",
    "/api/upload/:path*",
  ],
};
