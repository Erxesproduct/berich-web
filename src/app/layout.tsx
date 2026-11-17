import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { business } from "@/content/business";
import { banner } from "@/lib/catalog";
import { siteUrl } from "@/lib/site-url";
import { display, hand, sans } from "./fonts";
import "./globals.css";

const description = "Be rich хувийн санхүүгийн дэвтэр: орлого, зарлага, хадгаламж, хөрөнгө оруулалтаа хөтөлж, сар, жилээ дүгнэ. 10 дэвтрийн багц 20% хямд. Улаанбаатарт хүргэнэ.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${business.name}: хувийн санхүүгийн дэвтэр`, template: `%s · ${business.name}` },
  description,
  openGraph: { type: "website", locale: "mn_MN", siteName: business.name, description, images: [{ url: banner.src, width: banner.w, height: banner.h }] },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#22190f" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="mn" className={`${display.variable} ${sans.variable} ${hand.variable}`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
          Үндсэн агуулга руу
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
