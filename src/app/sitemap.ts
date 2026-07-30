import type { MetadataRoute } from "next";

import { sitePages } from "@/lib/pages";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitePages.map((page) => ({
    url: `${siteConfig.url}${page.path === "/" ? "" : page.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: page.key === "home" ? 1 : 0.8,
  }));
}
