import Image from "next/image";
import Link from "next/link";
import { BuyBox } from "@/components/buy-box";
import { HabitTracker } from "@/components/habit-tracker";
import { ArrowIcon, CheckIcon, CoinIcon, FacebookIcon, InstagramIcon, ReceiptIcon, TruckIcon, UsersIcon } from "@/components/icons";
import { NotebookTour } from "@/components/notebook-tour";
import { Price } from "@/components/price";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { SavingsLab } from "@/components/savings-lab";
import { business } from "@/content/business";
import { banner, BUNDLE, NOTEBOOK, products } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { excerpt, minutes, posts } from "@/lib/journal";
import { absoluteUrl } from "@/lib/site-url";

const TICKER = [
  ["▲", "Орлого", "text-mint"],
  ["▼", "Зарлага", "text-blush"],
  ["▲", "Хадгаламж", "text-mint"],
  ["▲", "Хөрөнгө оруулалт", "text-mint"],
  ["★", "Сарын дүгнэлт", "text-hi"],
  ["★", "Жилийн дүгнэлт", "text-hi"],
  ["◎", "Тэрбумын газрын зураг", "text-gold-2"],
  ["✎", "Зорилгын стикер", "text-blush"],
] as const;

export default function Home() {
  const others = products.filter((p) => p.category !== "notebook");
  const perBook = Math.round(BUNDLE.price / (BUNDLE.pack ?? 10));
  const bundleSaves = NOTEBOOK.price * (BUNDLE.pack ?? 10) - BUNDLE.price;
  const ld = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: business.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/brand/logo.png"),
    email: business.email,
    telephone: business.phone.tel,
    sameAs: [business.facebook, business.instagram, business.community],
  };

  return (
    <div className="overflow-x-clip">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />

      {/* hero */}
      <section className="relative">
        <div className="wrap relative grid items-center gap-12 pt-10 pb-16 md:pt-16 md:pb-24 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
          <div className="relative z-10">
            <span className="sticker wobble rise bg-hi px-4 py-1.5 text-[13px]" style={{ "--r": "-5deg" } as React.CSSProperties}>
              since {business.since} ✦
            </span>
            <p className="kicker rise mt-6 text-gold-3">Хувийн санхүүгийн дэвтэр</p>
            <h1 className="display rise mt-3 text-[3.3rem] leading-[0.95] sm:text-7xl lg:text-[5.6rem]">
              Мөнгөө <span className="hl hl-in">хөтөл.</span>
              <br />
              Баян <span className="text-gold">бай.</span>
            </h1>
            <p className="rise mt-6 max-w-lg text-[17.5px] leading-relaxed text-ink-2">
              Орлого, зарлага, хадгаламж, хөрөнгө оруулалтаа тус тусад нь бичиж, сар, жилээ дүгнэ. Тэрбумын багцын замаа нэг дэвтэрт зур.
            </p>
            <div className="rise mt-8 flex flex-wrap gap-3">
              <Link href={`/p/${NOTEBOOK.slug}`} className="btn btn-ink">
                Дэвтэр авах · {formatPrice(NOTEBOOK.price)} <ArrowIcon size={18} />
              </Link>
              <Link href={`/p/${BUNDLE.slug}`} className="btn btn-line">
                10-ын багц −20%
              </Link>
            </div>
            <ul className="rise mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[14px] font-semibold text-ink-2">
              {["B5, зөөлөн хавтас", "48–72 цагт хүргэнэ", "QPay · данс · и-баримт"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <CheckIcon size={15} className="text-gold" /> {t}
                </li>
              ))}
            </ul>
          </div>

          {/* collage: the shop's own banner, the notebook as a polaroid, notes in the margin */}
          <div className="relative mx-auto w-full max-w-[620px] pb-16 sm:pb-10">
            <div className="relative rotate-[2.5deg] rounded-[22px] border-[1.5px] border-ink bg-sheet p-2.5 shadow-[10px_10px_0_var(--color-ink)]">
              <span className="tape -top-3 left-10 rotate-[-6deg]" aria-hidden />
              <span className="tape -top-3 right-10 rotate-[7deg]" aria-hidden />
              <div className="relative aspect-[1640/924] overflow-hidden rounded-[14px]">
                <Image src={banner.src} alt="Хувийн санхүүгийн Be rich дэвтэр" fill priority sizes="(min-width: 1024px) 46vw, 92vw" className="object-cover" />
              </div>
            </div>
            <Link href={`/p/${NOTEBOOK.slug}`} className="group absolute -bottom-2 -left-2 w-[42%] rotate-[-7deg] rounded-[16px] border-[1.5px] border-ink bg-sheet p-2 pb-3 shadow-[6px_6px_0_var(--color-ink)] transition hover:rotate-[-3deg] sm:-left-6">
              <span className="relative block aspect-[4/5] overflow-hidden rounded-[10px]">
                <Image src={NOTEBOOK.images[0].thumb.src} alt={NOTEBOOK.name} fill sizes="240px" className="object-cover transition duration-700 group-hover:scale-105" />
              </span>
              <span className="hand mt-1.5 block text-center text-[19px] leading-none sm:text-[22px]">миний дэвтэр ♡</span>
            </Link>
            <span className="sticker absolute top-[38%] -right-1 rotate-[10deg] bg-pink px-3 py-1.5 text-[14px] text-white sm:-right-4">−{Math.round((1 - NOTEBOOK.price / NOTEBOOK.compareAt!) * 100)}%</span>
            <p className="hand absolute right-2 -bottom-14 max-w-[52%] rotate-[-3deg] text-right text-[22px] leading-tight text-gold-3 sm:right-6 sm:text-[26px]">
              орой бүр 10 минут
              <svg viewBox="0 0 80 40" className="ml-auto h-8 w-16 text-gold-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M74 6c-14 22-38 30-64 26M10 32l9-8M10 32l11 4" />
              </svg>
            </p>
            {[
              ["top-[-14px] left-[44%]", "0s", 26],
              ["top-[62%] right-[-10px]", "1.4s", 20],
              ["bottom-[18%] left-[38%]", "2.4s", 18],
            ].map(([pos, d, s], k) => (
              <span key={k} className={`coin absolute ${pos} grid place-items-center rounded-full border-[1.5px] border-ink bg-gold-2 p-1.5 text-ink shadow-[2px_2px_0_var(--color-ink)]`} style={{ "--d": d } as React.CSSProperties} aria-hidden>
                <CoinIcon size={Number(s)} />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* money ticker */}
      <div className="relative -rotate-1 border-y-[1.5px] border-ink bg-ink py-3.5 text-paper" aria-hidden>
        <div className="ticker">
          {[0, 1].map((r) => (
            <div key={r} className="flex shrink-0">
              {TICKER.map(([s, t, c]) => (
                <span key={t + r} className="display flex items-center gap-2 px-6 text-[17px] whitespace-nowrap md:text-xl">
                  <span className={c}>{s}</span>
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* inside the notebook */}
      <section className="wrap pt-24 md:pt-32">
        <Reveal className="max-w-2xl">
          <p className="kicker text-gold-3">Дэвтэр дотор</p>
          <h2 className="display mt-3 text-4xl leading-[1.05] md:text-6xl">
            Мөнгө бүр <span className="hl">өөрийн хуудастай.</span>
          </h2>
        </Reveal>
        <Reveal className="mt-12">
          <NotebookTour />
        </Reveal>
      </section>

      {/* shop */}
      <section className="wrap pt-24 md:pt-32" id="shop">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker text-gold-3">Дэлгүүр</p>
            <h2 className="display mt-3 text-4xl md:text-6xl">Авах уу?</h2>
          </div>
          <p className="hand max-w-xs text-[24px] leading-tight text-pink">10-ыг авбал нэг бүр нь {formatPrice(perBook)} ✦</p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* the notebook */}
          <Reveal className="card relative grid gap-6 overflow-hidden p-4 md:grid-cols-[0.9fr_1.1fr] md:p-6">
            <Link href={`/p/${NOTEBOOK.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-[18px] bg-cream">
              <Image src={NOTEBOOK.images[0].src} alt={NOTEBOOK.name} fill sizes="(min-width: 1024px) 26vw, 90vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <span className="sticker absolute top-3 left-3 rotate-[-6deg] bg-hi px-3 py-1 text-[12.5px]">Бестселлер</span>
            </Link>
            <div className="flex flex-col">
              <p className="kicker text-gold-3">{NOTEBOOK.subtitle}</p>
              <Link href={`/p/${NOTEBOOK.slug}`} className="display mt-2 text-3xl leading-tight hover:text-gold-3 md:text-4xl">
                {NOTEBOOK.name}
              </Link>
              <ul className="mt-5 space-y-2.5">
                {NOTEBOOK.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-[15px] leading-snug">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-hi">
                      <CheckIcon size={12} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <Price p={NOTEBOOK} large />
                <div className="mt-5">
                  <BuyBox slug={NOTEBOOK.slug} />
                </div>
              </div>
            </div>
          </Reveal>

          {/* the bundle */}
          <Reveal delay={120} className="relative flex flex-col overflow-hidden rounded-[26px] border-[1.5px] border-ink bg-gold p-4 text-white shadow-[6px_6px_0_var(--color-ink)] md:p-6">
            <Link href={`/p/${BUNDLE.slug}`} className="group relative block aspect-[3/2] overflow-hidden rounded-[18px] border-[1.5px] border-ink bg-sheet">
              <Image src={BUNDLE.images[0].src} alt={BUNDLE.name} fill sizes="(min-width: 1024px) 34vw, 90vw" className="object-cover transition duration-700 group-hover:scale-105" />
            </Link>
            <p className="kicker mt-6 text-ink/70">Хамт олон, гэр бүлээрээ</p>
            <Link href={`/p/${BUNDLE.slug}`} className="display mt-1 text-3xl leading-tight text-ink hover:text-sheet">
              {BUNDLE.name}
            </Link>
            <dl className="tnum mt-5 grid grid-cols-3 gap-2 text-ink">
              {[
                ["Нийт", formatPrice(BUNDLE.price)],
                ["1 дэвтэр", formatPrice(perBook)],
                ["Хэмнэлт", formatPrice(bundleSaves)],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-sheet/90 p-2.5 text-center">
                  <dt className="text-[11px] font-semibold text-ink-2">{k}</dt>
                  <dd className="display text-[15px] md:text-[17px]">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-2 text-[12px] text-ink/70">Хэмнэлтийг 10 дэвтрийг тус тусад нь {formatPrice(NOTEBOOK.price)}-өөр авахтай харьцуулав.</p>
            <div className="mt-auto pt-6">
              <BuyBox slug={BUNDLE.slug} label="Багц сагслах" tone="hi" />
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-8 lg:grid-cols-4">
          <Reveal className="col-span-2 flex flex-col justify-center lg:pr-6">
            <p className="kicker text-gold-3">Бусад</p>
            <p className="display mt-2 text-3xl leading-tight">Контент, эрүүл мэндэд</p>
            <p className="mt-3 max-w-sm text-[15px] text-ink-2">Be rich дэлгүүрт мөн сельфи хөл, лийрийн охь бий.</p>
          </Reveal>
          {others.map((p, k) => (
            <Reveal key={p.slug} delay={k * 90}>
              <ProductCard p={p} tilt={k % 2 ? 1.5 : -1.5} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* money lab */}
      <section id="money-lab" className="relative mt-24 scroll-mt-28 border-y-[1.5px] border-ink bg-cream py-20 md:mt-32 md:py-28">
        <div className="wrap">
          <Reveal className="grid items-end gap-6 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="kicker text-gold-3">Мөнгөний лаборатори</p>
              <h2 className="display mt-3 text-4xl leading-[1.05] md:text-6xl">
                Өдөр бүр хадгалвал <span className="hl">хэд болох вэ?</span>
              </h2>
            </div>
            <p className="hand text-[24px] leading-tight text-gold-3 md:text-right">
              «Өдөр бүр татуулдаг хадгаламжийн ачаар гэр бүлээрээ аялаад ирсэн»
              <Link href="/journal/49267" className="mt-1 block text-[18px] text-pink underline decoration-2 underline-offset-4">
                постыг унших →
              </Link>
            </p>
          </Reveal>
          <Reveal className="mt-12">
            <SavingsLab />
          </Reveal>
          <Reveal className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <HabitTracker />
            <div className="lg:pl-6">
              <p className="display text-3xl leading-tight">
                1 сар бүртгээд үз. <span className="text-gold-3">Өөрөө өөртөө дүгнэлт хийж чадна.</span>
              </p>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-2">Орой бүр 10 минут: тухайн өдрийн орлого, зарлага, хадгалж хураасан мөнгөө бүртгээд өөртөө дүгнэлт хий.</p>
              <Link href="/journal/49084" className="mt-5 inline-flex items-center gap-2 font-bold underline decoration-hi decoration-4 underline-offset-4 hover:text-gold-3">
                Хувийн санхүүгээ хөтлөхийн давуу тал <ArrowIcon size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* club */}
      <section className="wrap pt-24 md:pt-32">
        <Reveal className="relative grid overflow-hidden rounded-[32px] border-[1.5px] border-ink bg-money text-paper shadow-[8px_8px_0_var(--color-ink)] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative p-7 md:p-12">
            <div className="spin-slow pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full border-2 border-dashed border-white/15" aria-hidden />
            <p className="kicker text-mint">Be Rich Club</p>
            <h2 className="display mt-3 text-4xl leading-[1.05] md:text-5xl">
              Ганцаараа биш, <span className="text-hi">клубээрээ</span> баяжъя.
            </h2>
            <p className="mt-5 max-w-lg text-[16.5px] leading-relaxed text-paper/80">
              «Хөрөнгө оруулагч болно гэдэг нь сэтгэлгээний шилжилт хийж байна гэсэн үг.» {business.founder.name}, {business.founder.role.toLowerCase()}, санхүүгийн дадал, хөрөнгө оруулалтын талаар клубтээ хуваалцдаг.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={business.community} target="_blank" rel="noopener noreferrer" className="btn btn-hi">
                <UsersIcon size={18} /> Клубт нэгдэх
              </a>
              <a href={business.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-line text-paper">
                <InstagramIcon size={18} /> Instagram
              </a>
              <a href={business.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-line text-paper">
                <FacebookIcon size={18} /> Facebook
              </a>
            </div>
          </div>
          <div className="relative min-h-80 bg-money-2 p-7 md:p-10">
            <div className="relative mx-auto max-w-[300px] rotate-[3deg] rounded-[18px] border-[1.5px] border-ink bg-sheet p-2 pb-4 text-ink shadow-[6px_6px_0_var(--color-ink)]">
              <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[-3deg]" aria-hidden />
              <span className="relative block aspect-[4/5] overflow-hidden rounded-[12px]">
                <Image src={posts.find((p) => p.id === 49084)!.image.thumb.src} alt="Be rich дэвтэр хөтөлж буй нь" fill sizes="300px" className="object-cover" />
              </span>
              <span className="hand mt-2 block text-center text-[24px]">дэвтэр хөтлөх цаг ✎</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* journal */}
      <section className="wrap pt-24 md:pt-32">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker text-gold-3">Блог</p>
            <h2 className="display mt-3 text-4xl md:text-6xl">Мөнгөний тэмдэглэл</h2>
          </div>
          <Link href="/journal" className="inline-flex items-center gap-2 font-bold underline decoration-hi decoration-4 underline-offset-4">
            Бүгдийг унших <ArrowIcon size={16} />
          </Link>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((p, k) => (
            <Reveal key={p.id} delay={k * 90}>
              <Link href={`/journal/${p.id}`} className="group block h-full rounded-[24px] border-[1.5px] border-ink bg-sheet p-3 shadow-[5px_5px_0_var(--color-ink)] transition hover:-translate-y-1 hover:shadow-[7px_8px_0_var(--color-ink)]">
                <span className="relative block aspect-[4/3] overflow-hidden rounded-[16px] bg-cream">
                  <Image src={p.image.thumb.src} alt="" fill sizes="(min-width: 768px) 30vw, 92vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <span className="sticker absolute top-3 left-3 bg-hi px-2.5 py-0.5 text-[11.5px]">{minutes(p)} мин</span>
                </span>
                <span className="block px-2 pt-4 pb-2">
                  <span className="display block text-xl leading-snug group-hover:text-gold-3">{p.title}</span>
                  <span className="mt-2 line-clamp-3 block text-[14px] leading-relaxed text-ink-2">{excerpt(p)}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* service */}
      <section className="wrap pt-24 md:pt-32">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: <TruckIcon size={22} />, t: "48–72 цагт хүргэнэ", d: `${business.rules.delivery} ${business.zone}`, bg: "bg-mint" },
            { icon: <CoinIcon size={22} />, t: "QPay, дансаар", d: `Захиалгаа баталгаажуулаад төлнө. ${business.rules.payment}`, bg: "bg-hi" },
            { icon: <ReceiptIcon size={22} />, t: "И-баримт", d: business.rules.ebarimt, bg: "bg-blush" },
          ].map((s, k) => (
            <Reveal key={s.t} delay={k * 80} className="card p-6">
              <span className={`grid h-12 w-12 place-items-center rounded-2xl border-[1.5px] border-ink ${s.bg}`}>{s.icon}</span>
              <p className="display mt-4 text-xl">{s.t}</p>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
