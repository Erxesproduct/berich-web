import type { Metadata } from "next";
import { CoinIcon, FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, ReceiptIcon, TruckIcon, UsersIcon } from "@/components/icons";
import { business } from "@/content/business";
import { BUNDLE, faq, NOTEBOOK } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Хүргэлт, төлбөр, асуулт",
  description: `Улаанбаатарт ${business.zone} Төлбөр баталгаажснаас хойш 48–72 цагт хүргэнэ. QPay, дансаар төлж, и-баримт авна.`,
  alternates: { canonical: "/info" },
};

const d = business.delivery[0];

// The shop's own FAQ first, then its rules put as questions.
const QA = [
  ...faq,
  { q: "Хэзээ хүргэх вэ?", a: business.rules.delivery },
  { q: "Хаашаа хүргэдэг вэ?", a: business.zone },
  { q: "Хүргэлт хэд вэ?", a: `${formatPrice(d.fee)}. ${formatPrice(d.freeOver)}-өөс дээш захиалгад үнэгүй.` },
  { q: "Төлбөрөө буцааж авч болох уу?", a: business.rules.payment },
  { q: "Дэвтэр ямар хэмжээтэй вэ?", a: NOTEBOOK.features.join(" ") },
  { q: "Багцад хэдэн дэвтэр байдаг вэ?", a: `${BUNDLE.pack} ширхэг. Багцын үнэ ${formatPrice(BUNDLE.price)}, нэг дэвтэр ${formatPrice(Math.round(BUNDLE.price / (BUNDLE.pack ?? 10)))} болно.` },
];

export default function Info() {
  return (
    <div className="wrap pt-10 md:pt-16">
      <p className="kicker rise text-gold-3">Мэдээлэл</p>
      <h1 className="display rise mt-3 text-5xl leading-[1] md:text-7xl">
        Хүргэлт, <span className="hl hl-in">төлбөр</span>
      </h1>

      <section id="delivery" className="mt-12 grid scroll-mt-32 gap-5 md:grid-cols-3">
        <div className="card p-6 md:col-span-2">
          <span className="grid h-12 w-12 place-items-center rounded-2xl border-[1.5px] border-ink bg-mint">
            <TruckIcon size={22} />
          </span>
          <h2 className="display mt-4 text-2xl">Улаанбаатарт хүргэнэ</h2>
          <p className="mt-2 text-[15.5px] leading-relaxed text-ink-2">
            {business.rules.delivery} {business.zone}
          </p>
          <dl className="tnum mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-cream p-4">
              <dt className="text-[13px] font-semibold text-ink-2">Хүргэлтийн төлбөр</dt>
              <dd className="display text-2xl">{formatPrice(d.fee)}</dd>
            </div>
            <div className="rounded-2xl bg-hi p-4">
              <dt className="text-[13px] font-semibold text-ink-2">{formatPrice(d.freeOver)}-өөс дээш</dt>
              <dd className="display text-2xl">Үнэгүй</dd>
            </div>
          </dl>
        </div>
        <div className="card p-6">
          <span className="grid h-12 w-12 place-items-center rounded-2xl border-[1.5px] border-ink bg-hi">
            <CoinIcon size={22} />
          </span>
          <h2 className="display mt-4 text-2xl">Төлбөр</h2>
          <ul className="mt-3 space-y-2 text-[15px]">
            {business.payments.map((m) => (
              <li key={m.id}>
                <b>{m.name}</b> <span className="text-ink-2">· {m.note}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-2xl bg-blush px-4 py-3 text-[14px] font-semibold">{business.rules.payment}</p>
        </div>
        <div className="card p-6 md:col-span-3">
          <div className="flex flex-wrap items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border-[1.5px] border-ink bg-blush">
              <ReceiptIcon size={22} />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="display text-2xl">И-баримт</h2>
              <p className="mt-1 text-[15.5px] text-ink-2">{business.rules.ebarimt}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="mt-20 scroll-mt-32">
        <h2 className="display text-4xl md:text-5xl">Түгээмэл асуулт</h2>
        <div className="mt-8 divide-y-[1.5px] divide-dashed divide-ink/20 border-y-[1.5px] border-ink">
          {QA.map((x) => (
            <details key={x.q} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[17px] font-bold [&::-webkit-details-marker]:hidden">
                {x.q}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-[1.5px] border-ink text-lg transition group-open:rotate-45 group-open:bg-hi" aria-hidden>
                  +
                </span>
              </summary>
              <p className="max-w-3xl pb-5 text-[15.5px] leading-relaxed text-ink-2">{x.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="contact" className="mt-20 scroll-mt-32">
        <h2 className="display text-4xl md:text-5xl">Холбоо барих</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: `tel:${business.phone.tel}`, icon: <PhoneIcon size={20} />, t: business.phone.display, s: "Утас" },
            { href: `mailto:${business.email}`, icon: <MailIcon size={20} />, t: business.email, s: "Имэйл" },
            { href: business.instagram, icon: <InstagramIcon size={20} />, t: "@be.rich.boloroo", s: "Instagram" },
            { href: business.facebook, icon: <FacebookIcon size={20} />, t: "Be Rich Club - Bolortuya", s: "Facebook" },
            { href: business.community, icon: <UsersIcon size={20} />, t: "skool.com/berichcommunity", s: "Клуб" },
          ].map((c) => (
            <a key={c.s} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-center gap-3 rounded-[20px] border-[1.5px] border-ink bg-sheet p-4 shadow-[4px_4px_0_var(--color-ink)] transition hover:-translate-y-0.5 hover:bg-hi">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cream">{c.icon}</span>
              <span className="min-w-0">
                <span className="block text-[12px] font-semibold text-mute">{c.s}</span>
                <span className="block truncate font-bold">{c.t}</span>
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
