import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/tools", "/api", "/sign-in", "/sign-up"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
