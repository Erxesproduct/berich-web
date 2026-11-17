"use client";

import Link from "next/link";
import { cartCount, useCart } from "@/lib/cart";
import { BagIcon } from "./icons";

export function CartLink() {
  const n = cartCount(useCart());
  return (
    <Link href="/cart" className="relative grid h-11 w-11 place-items-center rounded-full bg-ink text-paper transition hover:-translate-y-0.5 hover:bg-gold-3" aria-label={n ? `Сагс, ${n} бараа` : "Сагс"}>
      <BagIcon size={20} />
      {n > 0 && <span className="tnum pop absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full border-2 border-paper bg-hi px-1 text-[11px] font-bold text-ink">{n}</span>}
    </Link>
  );
}
