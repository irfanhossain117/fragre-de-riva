import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://fragrederiva.shop"; // Replace with your actual base URL

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },

    sitemap: `${baseUrl}/sitemap.xml`,
  };
}