"use client";

import Link from "next/link";
import { useState } from "react";
import { cart, maxQty, useCart } from "@/lib/cart";
import { ArrowIcon, CheckIcon, MinusIcon, PlusIcon } from "./icons";

/** Quantity stepper + add to cart. */
export function BuyBox({ slug, label = "Сагсанд хийх", tone = "ink" }: { slug: string; label?: string; tone?: "ink" | "gold" | "hi" }) {
  const cap = maxQty(slug);
  const inCart = useCart().find((i) => i.slug === slug)?.qty ?? 0;
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (cap <= 0) return <p className="rounded-2xl bg-cream p-4 text-[15px] text-ink-2">Одоогоор дууссан. Дахин ирэх эсэхийг утсаар лавлана уу.</p>;

  const room = Math.max(0, cap - inCart);
  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <div className="flex h-[54px] items-center rounded-full border-[1.5px] border-ink bg-sheet text-ink">
          <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-12 w-12 place-items-center rounded-full hover:bg-cream" aria-label="Цөөлөх">
            <MinusIcon size={18} />
          </button>
          <span className="tnum w-8 text-center text-lg font-bold" aria-live="polite">
            {qty}
          </span>
          <button type="button" onClick={() => setQty(Math.min(Math.max(1, room), qty + 1))} disabled={qty >= room} className="grid h-12 w-12 place-items-center rounded-full hover:bg-cream disabled:opacity-35" aria-label="Нэмэх">
            <PlusIcon size={18} />
          </button>
        </div>
        <button
          type="button"
          disabled={room === 0}
          onClick={() => {
            cart.add(slug, qty);
            setAdded(true);
            setQty(1);
            setTimeout(() => setAdded(false), 2000);
          }}
          className={`btn btn-${tone} min-w-48 flex-1 disabled:opacity-50`}
        >
          {added ? (
            <span className="pop inline-flex items-center gap-2">
              <CheckIcon size={18} /> Сагсанд нэмэгдлээ
            </span>
          ) : room === 0 ? (
            "Үлдэгдэл бүгд сагсанд байна"
          ) : (
            label
          )}
        </button>
      </div>
      {inCart > 0 && (
        <Link href="/cart" className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-bold text-gold-3 underline decoration-hi decoration-4 underline-offset-4 hover:text-ink">
          Сагсанд {inCart} ширхэг байна: захиалах <ArrowIcon size={16} />
        </Link>
      )}
    </div>
  );
}

/** Round «+» on cards. */
export function QuickAdd({ slug, name }: { slug: string; name: string }) {
  const [added, setAdded] = useState(false);
  if (maxQty(slug) <= 0) return null;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        cart.add(slug);
        setAdded(true);
        setTimeout(() => setAdded(false), 1400);
      }}
      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border-[1.5px] border-ink transition duration-300 ${added ? "bg-hi" : "bg-sheet hover:-translate-y-0.5 hover:bg-ink hover:text-paper"}`}
      aria-label={`${name}: сагсанд нэмэх`}
    >
      {added ? <CheckIcon size={18} /> : <PlusIcon size={18} />}
      <span className="sr-only" aria-live="polite">
        {added ? "Сагсанд нэмэгдлээ" : ""}
      </span>
    </button>
  );
}
