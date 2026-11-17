import Image from "next/image";
import Link from "next/link";
import { business } from "@/content/business";
import { CartLink } from "./cart-link";

const NAV = [
  { href: "/p/be-rich-notebook", label: "Дэвтэр" },
  { href: "/p/be-rich-notebook-10", label: "10-ын багц" },
  { href: "/#money-lab", label: "Тооцоолуур" },
  { href: "/journal", label: "Блог" },
  { href: "/info", label: "Хүргэлт" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40">
      <div className="bg-ink text-paper">
        <p className="wrap flex h-9 items-center justify-center gap-2 text-center text-[12.5px] font-medium">
          <span className="sticker hidden border-0 bg-hi px-2 py-0.5 text-[10.5px] text-ink shadow-none sm:inline-flex">−20%</span>
          <span>
            10 дэвтрийн багц <b className="text-hi">20% хямд</b>
            <span className="hidden sm:inline"> · УБ-д 48–72 цагт хүргэнэ</span>
          </span>
        </p>
      </div>
      <div className="border-b-[1.5px] border-ink bg-paper/90 backdrop-blur-xl">
        <div className="wrap flex h-16 items-center justify-between gap-4 md:h-[74px]">
          <Link href="/" className="group flex items-center gap-2.5" aria-label={`${business.name}, нүүр хуудас`}>
            <Image src="/brand/swan.png" alt="" width={300} height={260} priority className="h-10 w-auto transition duration-500 group-hover:-rotate-6 md:h-11" />
            <span className="leading-none">
              <span className="display block text-[19px] tracking-[0.12em] text-gold-3 md:text-[21px]">BE RICH</span>
              <span className="mt-0.5 block text-[9px] font-semibold tracking-[0.38em] text-gold">COMMUNITY</span>
            </span>
          </Link>
          <nav aria-label="Үндсэн цэс" className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="rounded-full px-4 py-2 text-[14.5px] font-semibold text-ink-2 transition hover:bg-hi hover:text-ink">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href={business.community} target="_blank" rel="noopener noreferrer" className="hidden rounded-full border-[1.5px] border-ink px-4 py-2 text-[13.5px] font-bold transition hover:bg-ink hover:text-paper sm:inline-block">
              Клубт нэгдэх
            </a>
            <CartLink />
          </div>
        </div>
        <nav aria-label="Үндсэн цэс" className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-2.5 lg:hidden">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="shrink-0 rounded-full border-[1.5px] border-ink/15 bg-sheet px-3.5 py-1.5 text-[13px] font-semibold text-ink-2">
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
