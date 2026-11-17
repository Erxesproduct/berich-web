import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { formatDate } from "@/lib/format";
import { excerpt, minutes, posts } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Блог: мөнгөний тэмдэглэл",
  description: "Хувийн санхүү, хадгаламж, хөрөнгө оруулалтын тухай Be rich-ийн тэмдэглэлүүд.",
  alternates: { canonical: "/journal" },
};

export default function Journal() {
  const [first, ...rest] = posts;
  return (
    <div className="wrap pt-10 md:pt-16">
      <p className="kicker rise text-gold-3">Блог</p>
      <h1 className="display rise mt-3 text-5xl leading-[1] md:text-7xl">
        Мөнгөний <span className="hl hl-in">тэмдэглэл</span>
      </h1>

      <Link href={`/journal/${first.id}`} className="group mt-12 grid gap-6 rounded-[28px] border-[1.5px] border-ink bg-sheet p-3 shadow-[8px_8px_0_var(--color-ink)] transition hover:-translate-y-1 md:grid-cols-[1fr_1.1fr] md:p-4">
        <span className="relative block aspect-[4/3] overflow-hidden rounded-[20px] bg-cream md:aspect-auto md:min-h-80">
          <Image src={first.image.src} alt="" fill priority sizes="(min-width: 768px) 45vw, 92vw" className="object-cover transition duration-700 group-hover:scale-105" />
        </span>
        <span className="flex flex-col justify-center p-3 md:p-6">
          <span className="flex flex-wrap items-center gap-2 text-[13px] font-semibold text-mute">
            <span className="sticker bg-hi px-2.5 py-0.5 text-[11.5px] text-ink">Шинэ</span>
            {formatDate(first.date)} · {minutes(first)} мин
          </span>
          <span className="display mt-4 block text-3xl leading-tight group-hover:text-gold-3 md:text-4xl">{first.title}</span>
          <span className="mt-4 block text-[16px] leading-relaxed text-ink-2">{excerpt(first, 260)}</span>
          <span className="mt-6 inline-flex items-center gap-2 font-bold">
            Унших <ArrowIcon size={16} className="transition group-hover:translate-x-1" />
          </span>
        </span>
      </Link>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {rest.map((p, k) => (
          <Link key={p.id} href={`/journal/${p.id}`} className="group grid grid-cols-[120px_1fr] gap-4 rounded-[24px] border-[1.5px] border-ink bg-sheet p-3 shadow-[5px_5px_0_var(--color-ink)] transition hover:-translate-y-1 sm:grid-cols-[170px_1fr]" style={{ rotate: `${k % 2 ? 0.6 : -0.6}deg` }}>
            <span className="relative block aspect-[3/4] overflow-hidden rounded-[16px] bg-cream">
              <Image src={p.image.thumb.src} alt="" fill sizes="170px" className="object-cover transition duration-700 group-hover:scale-105" />
            </span>
            <span className="flex min-w-0 flex-col py-1 pr-2">
              <span className="text-[12.5px] font-semibold text-mute">
                {formatDate(p.date)} · {minutes(p)} мин
              </span>
              <span className="display mt-2 block text-xl leading-snug group-hover:text-gold-3">{p.title}</span>
              <span className="mt-2 line-clamp-4 text-[14px] leading-relaxed text-ink-2">{excerpt(p, 200)}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
