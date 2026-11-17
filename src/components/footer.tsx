import Image from "next/image";
import Link from "next/link";
import { business } from "@/content/business";
import { products } from "@/lib/catalog";
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, UsersIcon } from "./icons";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-ink text-paper/75 md:mt-32">
      <div className="pointer-events-none absolute -top-40 -right-40 h-[480px] w-[480px] rounded-full border-[40px] border-gold/10" aria-hidden />
      <div className="wrap relative">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 py-14 md:flex-row md:items-end">
          <p className="display max-w-2xl text-4xl leading-[1.05] text-paper md:text-6xl">
            Мөнгөө хөтөл.
            <br />
            <span className="text-gold-2">Баян бай.</span>
          </p>
          <p className="hand max-w-xs text-[26px] text-hi">«{business.motto}»</p>
        </div>
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Image src="/brand/logo-cream.png" alt={business.name} width={272} height={389} className="h-28 w-auto" />
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed">{business.description}</p>
          </div>
          <div>
            <p className="kicker text-gold-2">Дэлгүүр</p>
            <ul className="mt-5 space-y-2.5 text-[14.5px]">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/p/${p.slug}`} className="transition hover:text-hi">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="kicker text-gold-2">Мэдээлэл</p>
            <ul className="mt-5 space-y-2.5 text-[14.5px]">
              {[
                ["/journal", "Блог"],
                ["/#money-lab", "Хадгаламжийн тооцоолуур"],
                ["/info#delivery", "Хүргэлт, төлбөр"],
                ["/info#faq", "Түгээмэл асуулт"],
                ["/cart", "Сагс"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="transition hover:text-hi">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="kicker text-gold-2">Холбоо барих</p>
            <ul className="mt-5 space-y-3 text-[14.5px]">
              <li>
                <a href={`tel:${business.phone.tel}`} className="flex items-center gap-2.5 transition hover:text-hi">
                  <PhoneIcon size={16} /> {business.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="flex items-center gap-2.5 break-all transition hover:text-hi">
                  <MailIcon size={16} /> {business.email}
                </a>
              </li>
              <li>
                <a href={business.community} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 transition hover:text-hi">
                  <UsersIcon size={16} /> Be Rich Club (Skool)
                </a>
              </li>
            </ul>
            <div className="mt-6 flex gap-2.5">
              {[
                { href: business.facebook, label: "Facebook", icon: <FacebookIcon size={18} /> },
                { href: business.instagram, label: "Instagram", icon: <InstagramIcon size={18} /> },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="grid h-11 w-11 place-items-center rounded-full bg-white/8 transition hover:bg-hi hover:text-ink">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 py-6 text-[12.5px] text-paper/50">
          <p>
            © {new Date().getFullYear()} {business.name} · since {business.since}
          </p>
          <p>QPay · Дансаар · И-баримт</p>
        </div>
      </div>
    </footer>
  );
}
