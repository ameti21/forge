import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides";
import { toolPages } from "@/lib/tool-pages";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Omit lastModified where no content revision date is tracked. A rebuild
  // does not mean the page content changed.
  const core: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/pricing"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/guides"), changeFrequency: "weekly", priority: 0.8 },
  ];

  const tools: MetadataRoute.Sitemap = toolPages.map((tool) => ({
    url: absoluteUrl(`/${tool.slug}`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const articles: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: absoluteUrl(`/guides/${guide.slug}`),
    lastModified: new Date(guide.datePublished),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...core, ...tools, ...articles];
}
