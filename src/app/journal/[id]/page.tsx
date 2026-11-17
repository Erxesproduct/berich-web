import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyBox } from "@/components/buy-box";
import { ArrowIcon, UsersIcon } from "@/components/icons";
import { Price } from "@/components/price";
import { business } from "@/content/business";
import { NOTEBOOK } from "@/lib/catalog";
import { formatDate } from "@/lib/format";
import { excerpt, getPost, minutes, posts } from "@/lib/journal";
import { absoluteUrl } from "@/lib/site-url";

export const dynamicParams = false;
export const generateStaticParams = () => posts.map((p) => ({ id: String(p.id) }));

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const p = getPost(Number((await params).id));
  if (!p) return {};
  return {
    title: p.title,
    description: excerpt(p, 160),
    alternates: { canonical: `/journal/${p.id}` },
    openGraph: { type: "article", title: p.title, description: excerpt(p, 160), images: [{ url: p.image.src, width: p.image.w, height: p.image.h }] },
  };
}

/** Links written as plain text in the posts (e.g. www.skool.com/...) become real links. */
function linkify(text: string) {
  const parts = text.split(/((?:https?:\/\/|www\.)[^\s]+)/g);
  return parts.map((s, k) =>
    /^(https?:\/\/|www\.)/.test(s) ? (
      <a key={k} href={s.startsWith("http") ? s : `https://${s}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold-3 underline decoration-hi decoration-4 underline-offset-4">
        {s}
      </a>
    ) : (
      s
    ),
  );
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const p = getPost(Number((await params).id));
  if (!p) notFound();
  const others = posts.filter((x) => x.id !== p.id);
  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    datePublished: p.date,
    image: absoluteUrl(p.image.src),
    author: { "@type": "Organization", name: business.name },
    mainEntityOfPage: absoluteUrl(`/journal/${p.id}`),
  };

  return (
    <article className="overflow-x-clip">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <div className="wrap grid gap-12 pt-8 md:pt-14 lg:grid-cols-[1fr_340px] lg:gap-16">
        <div className="min-w-0">
          <Link href="/journal" className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-mute hover:text-ink">
            <ArrowIcon size={15} className="rotate-180" /> Блог
          </Link>
          <p className="mt-6 text-[13.5px] font-semibold text-mute">
            {formatDate(p.date)} · {minutes(p)} минут унших
          </p>
          <h1 className="display rise mt-3 text-4xl leading-[1.05] md:text-6xl">{p.title}</h1>
          <div className="relative mt-10 max-w-md rotate-[-1.5deg] rounded-[22px] border-[1.5px] border-ink bg-sheet p-2.5 shadow-[8px_8px_0_var(--color-ink)]">
            <span className="tape -top-3 left-10 rotate-[-6deg]" aria-hidden />
            <div className="relative overflow-hidden rounded-[14px]" style={{ aspectRatio: `${p.image.w}/${p.image.h}` }}>
              <Image src={p.image.src} alt="" fill priority sizes="(min-width: 768px) 28rem, 92vw" className="object-cover" />
            </div>
          </div>
          <div className="prose-br mt-12 max-w-2xl">
            {p.paragraphs.map((t, k) => (
              <p key={k}>{linkify(t)}</p>
            ))}
          </div>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-32 lg:self-start">
          <div className="card p-5">
            <p className="hand text-[24px] text-gold-3">дэвтэртээ бичээрэй ✎</p>
            <Link href={`/p/${NOTEBOOK.slug}`} className="mt-3 flex items-center gap-3">
              <span className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl border-[1.5px] border-ink">
                <Image src={NOTEBOOK.images[0].thumb.src} alt="" fill sizes="64px" className="object-cover" />
              </span>
              <span className="min-w-0">
                <span className="display block text-lg leading-tight">{NOTEBOOK.name}</span>
                <Price p={NOTEBOOK} />
              </span>
            </Link>
            <div className="mt-4">
              <BuyBox slug={NOTEBOOK.slug} />
            </div>
          </div>
          <a href={business.community} target="_blank" rel="noopener noreferrer" className="group block rounded-[26px] border-[1.5px] border-ink bg-money p-5 text-paper shadow-[6px_6px_0_var(--color-ink)] transition hover:-translate-y-1">
            <UsersIcon size={22} className="text-hi" />
            <p className="display mt-3 text-xl">Be Rich Club</p>
            <p className="mt-1 text-[14px] text-paper/75">Хөрөнгө оруулалтаа хамт эхлүүлье: клубт нэгдэх.</p>
          </a>
        </aside>
      </div>

      {others.length > 0 && (
        <section className="wrap pt-24">
          <h2 className="display text-3xl">Цааш унших</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {others.map((o) => (
              <Link key={o.id} href={`/journal/${o.id}`} className="group flex items-center gap-4 rounded-[22px] border-[1.5px] border-ink bg-sheet p-3 shadow-[4px_4px_0_var(--color-ink)] transition hover:-translate-y-1">
                <span className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-cream">
                  <Image src={o.image.thumb.src} alt="" fill sizes="80px" className="object-cover" />
                </span>
                <span className="display min-w-0 text-lg leading-snug group-hover:text-gold-3">{o.title}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
