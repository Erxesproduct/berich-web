import Image from "next/image";
import Link from "next/link";
import { discount, lowStock, onSale, soldOut, type Product } from "@/lib/catalog";
import { QuickAdd } from "./buy-box";
import { Price } from "./price";

/** Product as a little polaroid with a sticker. */
export function ProductCard({ p, tilt = 0 }: { p: Product; tilt?: number }) {
  return (
    <article className="group relative">
      <Link href={`/p/${p.slug}`} className="block rounded-[22px] border-[1.5px] border-ink bg-sheet p-2.5 shadow-[5px_5px_0_var(--color-ink)] transition duration-300 group-hover:-translate-y-1 group-hover:rotate-0 group-hover:shadow-[8px_9px_0_var(--color-ink)]" style={{ rotate: `${tilt}deg` }}>
        <span className="relative block aspect-square overflow-hidden rounded-[15px] bg-cream">
          <Image src={p.images[0].thumb.src} alt={p.name} fill sizes="(min-width: 1024px) 24vw, 46vw" className={`transition duration-700 group-hover:scale-105 ${p.images[0].w > p.images[0].h * 1.1 ? "object-contain" : "object-cover"}`} />
          {onSale(p) && <span className="sticker absolute top-2.5 left-2.5 rotate-[-8deg] bg-pink px-2.5 py-0.5 text-[12px] text-white">−{discount(p)}%</span>}
          {soldOut(p) ? (
            <span className="sticker absolute right-2.5 bottom-2.5 bg-ink px-2.5 py-0.5 text-[11px] text-paper">Дууссан</span>
          ) : (
            lowStock(p) && <span className="sticker absolute right-2.5 bottom-2.5 bg-hi px-2.5 py-0.5 text-[11px] text-ink">{p.stock} үлдсэн</span>
          )}
        </span>
        <span className="block px-1.5 pt-3 pb-1">
          <span className="display block text-[17px] leading-tight md:text-lg">{p.name}</span>
          <span className="mt-1 line-clamp-2 block text-[12.5px] leading-snug text-mute">{p.subtitle}</span>
        </span>
      </Link>
      <div className="mt-4 flex items-center justify-between gap-2 px-1">
        <Price p={p} />
        <QuickAdd slug={p.slug} name={p.name} />
      </div>
    </article>
  );
}
