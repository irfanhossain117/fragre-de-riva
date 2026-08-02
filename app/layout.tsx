import type { Metadata } from "next";
import "./globals.css";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { CouponProvider } from "./context/CouponContext";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Fragré de Riva | Premium Fragrances in Bangladesh",

  description:
    "Discover luxury fragrances crafted for presence. Premium perfumes for men and women. Fast delivery across Bangladesh.",

  keywords: [
    "Perfume",
    "Fragrance",
    "Bangladesh",
    "Luxury Perfume",
    "Fragré de Riva",
    "Men Perfume",
    "Women Perfume",
  ],

  authors: [
    {
      name: "Fragré de Riva",
    },
  ],

  creator: "Fragré de Riva",

  metadataBase: new URL("http://localhost:3000"),

  openGraph: {
    title: "Fragré de Riva | Premium Fragrances",

    description:
      "Luxury Fragrances Crafted For Presence.",

    url: "http://localhost:3000",

    siteName: "Fragré de Riva",

    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Fragré de Riva",
      },
    ],

    locale: "en_US",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Fragré de Riva | Premium Fragrances",

    description:
      "Luxury Fragrances Crafted For Presence.",

    images: ["/og.jpg"],
  },

  icons: {
    icon: "/products/logo.png",
    shortcut: "/products/logo.png",
    apple: "/products/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CouponProvider>
          <WishlistProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </WishlistProvider>
        </CouponProvider>
        <Analytics />
      </body>
    </html>
  );
}