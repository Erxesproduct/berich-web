import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyBox } from "@/components/buy-box";
import { ArrowIcon, CheckIcon, CoinIcon, ReceiptIcon, TruckIcon } from "@/components/icons";
import { NotebookTour } from "@/components/notebook-tour";
import { Price } from "@/components/price";
import { ProductCard } from "@/components/product-card";
import { business } from "@/content/business";
import { BUNDLE, getCategory, getProduct, lowStock, NOTEBOOK, products, sku, soldOut, summary } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { absoluteUrl } from "@/lib/site-url";

export const dynamicParams = false;
export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return {
    title: p.name,
    description: summary(p),
    alternates: { canonical: `/p/${p.slug}` },
    openGraph: { title: p.name, description: summary(p), images: [{ url: p.images[0].src, width: p.images[0].w, height: p.images[0].h }] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const c = getCategory(p.category)!;
  const isNotebook = p.category === "notebook";
  const more = products.filter((x) => x.slug !== p.slug);
  const perBook = Math.round(BUNDLE.price / (BUNDLE.pack ?? 10));

  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    sku: sku(p),
    image: p.images.map((m) => absoluteUrl(m.src)),
    description: summary(p),
    brand: { "@type": "Brand", name: business.name },
    offers: {
      "@type": "Offer",
      price: p.price,
      priceCurrency: "MNT",
      availability: soldOut(p) ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      url: absoluteUrl(`/p/${p.slug}`),
    },
  };

  return (
    <div className="overflow-x-clip">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <div className="wrap pt-6 md:pt-10">
        <nav aria-label="Зам" className="flex flex-wrap items-center gap-2 text-[13px] font-semibold text-mute">
          <Link href="/" className="hover:text-ink">
            Нүүр
          </Link>
          <span aria-hidden>/</span>
          <Link href="/#shop" className="hover:text-ink">
            {c.name}
          </Link>
        </nav>

        <div className="mt-6 grid gap-12 md:grid-cols-[1fr_1fr] md:gap-14 lg:gap-20">
          <div className="relative">
            <div className="relative rotate-[-1.5deg] rounded-[26px] border-[1.5px] border-ink bg-sheet p-3 shadow-[10px_10px_0_var(--color-ink)]">
              <span className="tape -top-3 left-12 rotate-[-5deg]" aria-hidden />
              <div className="relative overflow-hidden rounded-[18px] bg-cream" style={{ aspectRatio: `${Math.max(p.images[0].w / p.images[0].h, 0.8)}` }}>
                <Image src={p.images[0].src} alt={p.name} fill priority sizes="(min-width: 768px) 46vw, 92vw" className="object-cover" />
              </div>
            </div>
            {p.compareAt && <span className="sticker absolute -top-3 -right-2 rotate-[12deg] bg-pink px-4 py-2 text-[20px] text-white md:-right-5">−{Math.round((1 - p.price / p.compareAt) * 100)}%</span>}
            {isNotebook && <p className="hand absolute -bottom-10 left-6 rotate-[-3deg] text-[24px] text-gold-3">{p.pack ? `${p.pack} дэвтэр, нэг бүр нь ${formatPrice(perBook)} ✦` : "B5 · зөөлөн хавтас ✎"}</p>}
          </div>

          <div className="min-w-0 pt-4 md:pt-2">
            <p className="kicker text-gold-3">{c.name}</p>
            <h1 className="display mt-3 text-[2.6rem] leading-[1.02] md:text-6xl">{p.name}</h1>
            <p className="mt-3 text-[17px] text-ink-2">{p.subtitle}</p>

            <div className="mt-7 flex flex-wrap items-center gap-4 border-y-[1.5px] border-dashed border-ink/25 py-5">
              <Price p={p} large />
              {lowStock(p) && <span className="sticker bg-hi px-3 py-1 text-[12.5px]">Ердөө {p.stock} үлдсэн</span>}
            </div>

            <div className="mt-6">
              <BuyBox slug={p.slug} tone={p.pack ? "gold" : "ink"} />
            </div>

            {p.features.length > 0 && (
              <section className="ruled mt-9 rounded-[22px] border-[1.5px] border-ink/15 p-5 pl-14">
                <h2 className="hand text-[28px] text-gold-3">Юу байна?</h2>
                <ul className="mt-2 space-y-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-[15.5px] leading-[30px]">
                      <CheckIcon size={16} className="mt-[7px] shrink-0 text-gold" />
                      {f}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {p.slug === NOTEBOOK.slug && (
              <Link href={`/p/${BUNDLE.slug}`} className="group mt-6 flex items-center gap-4 rounded-[22px] border-[1.5px] border-ink bg-gold p-4 pr-5 text-ink shadow-[5px_5px_0_var(--color-ink)] transition hover:-translate-y-0.5">
                <span className="display grid h-14 w-14 shrink-0 place-items-center rounded-full border-[1.5px] border-ink bg-hi text-lg">×10</span>
                <span className="min-w-0 flex-1 text-[14.5px] leading-snug">
                  <b className="display block text-[17px]">10-ын багц: −20%</b>
                  Нэг дэвтэр {formatPrice(perBook)}, нийт {formatPrice(BUNDLE.price)}
                </span>
                <ArrowIcon size={20} className="shrink-0 transition group-hover:translate-x-1" />
              </Link>
            )}
            {p.slug === BUNDLE.slug && (
              <p className="mt-6 rounded-[22px] border-[1.5px] border-dashed border-ink/30 p-4 text-[14.5px] leading-relaxed text-ink-2">
                10 дэвтрийг тус тусад нь авбал {formatPrice(NOTEBOOK.price * 10)}, багцаар <b className="text-ink">{formatPrice(BUNDLE.price)}</b>: {formatPrice(NOTEBOOK.price * 10 - BUNDLE.price)} хэмнэнэ.{" "}
                <Link href={`/p/${NOTEBOOK.slug}`} className="font-bold text-gold-3 underline underline-offset-2">
                  Дэвтрийн тухай
                </Link>
              </p>
            )}

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { icon: <TruckIcon size={20} />, t: "48–72 цагт", d: "УБ, тойргийн дотор" },
                { icon: <CoinIcon size={20} />, t: "QPay, данс", d: business.rules.payment },
                { icon: <ReceiptIcon size={20} />, t: "И-баримт", d: "Хувь хүн, байгууллага" },
              ].map((s) => (
                <div key={s.t} className="rounded-2xl bg-cream p-3.5">
                  <span className="text-gold-3">{s.icon}</span>
                  <p className="mt-1.5 text-[14px] font-bold">{s.t}</p>
                  <p className="text-[12.5px] leading-snug text-ink-2">{s.d}</p>
                </div>
              ))}
            </div>
            {p.code && <p className="mt-5 text-[12px] text-mute">Барааны код: {p.code}</p>}
          </div>
        </div>
      </div>

      {isNotebook && (
        <section className="mt-24 border-y-[1.5px] border-ink bg-cream py-20 md:mt-32 md:py-24">
          <div className="wrap">
            <p className="kicker text-gold-3">Дэвтэр дотор</p>
            <h2 className="display mt-3 text-4xl md:text-5xl">
              Хуудас бүр <span className="hl">нэг зорилготой.</span>
            </h2>
            <div className="mt-12">
              <NotebookTour />
            </div>
          </div>
        </section>
      )}

      <section className="wrap pt-24">
        <h2 className="display text-3xl md:text-4xl">Мөн үзээрэй</h2>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-8 lg:grid-cols-3">
          {more.map((x, k) => (
            <ProductCard key={x.slug} p={x} tilt={k % 2 ? 1.5 : -1.5} />
          ))}
        </div>
      </section>
    </div>
  );
}
