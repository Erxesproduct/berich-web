import { readFileSync } from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

// Old Zochil URLs keep working: /products/<categoryId|null>/<productId> → /p/<slug>, /posts/<id> → /journal/<id>.
const catalog = JSON.parse(readFileSync(path.join(process.cwd(), "src", "data", "catalog.json"), "utf8")) as { products: { id: number; slug: string }[] };
const journal = JSON.parse(readFileSync(path.join(process.cwd(), "src", "data", "journal.json"), "utf8")) as { id: number }[];
const productRedirects = catalog.products.map((p) => ({ source: `/products/:category/${p.id}`, destination: `/p/${p.slug}`, permanent: true }));
const postRedirects = journal.map((p) => ({ source: `/posts/${p.id}`, destination: `/journal/${p.id}`, permanent: true }));

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Photos are pre-sized WebP (640 px thumbs, 1400 px large), so they are served as-is.
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: "/products", destination: "/#shop", permanent: true },
      ...productRedirects,
      { source: "/products/:category(\\d+|null)", destination: "/#shop", permanent: false },
      { source: "/category/:path*", destination: "/#shop", permanent: false },
      { source: "/saled-products", destination: "/#shop", permanent: true },
      { source: "/brands/:path*", destination: "/#shop", permanent: false },
      ...postRedirects,
      { source: "/posts", destination: "/journal", permanent: true },
      { source: "/posts/:path*", destination: "/journal", permanent: false },
      { source: "/shopping-cart", destination: "/cart", permanent: true },
      { source: "/checkout", destination: "/cart", permanent: true },
      { source: "/about", destination: "/info", permanent: true },
      { source: "/faq", destination: "/info#faq", permanent: true },
      { source: "/terms", destination: "/info#delivery", permanent: true },
      { source: "/contact", destination: "/info#contact", permanent: true },
      { source: "/videos", destination: "/journal", permanent: false },
      { source: "/accounts/:path*", destination: "/", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      { source: "/images/(.*)", headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }] },
    ];
  },
};

export default nextConfig;
