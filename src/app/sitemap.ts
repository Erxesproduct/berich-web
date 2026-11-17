import type { MetadataRoute } from "next";
import { catalogUpdatedAt, products } from "@/lib/catalog";
import { posts } from "@/lib/journal";
import { absoluteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(catalogUpdatedAt);
  return [
    { url: absoluteUrl("/"), lastModified, priority: 1 },
    ...products.map((p) => ({ url: absoluteUrl(`/p/${p.slug}`), lastModified, priority: p.category === "notebook" ? 0.9 : 0.6 })),
    { url: absoluteUrl("/journal"), lastModified, priority: 0.6 },
    ...posts.map((p) => ({ url: absoluteUrl(`/journal/${p.id}`), lastModified: new Date(p.date), priority: 0.5 })),
    { url: absoluteUrl("/info"), lastModified, priority: 0.5 },
  ];
}
