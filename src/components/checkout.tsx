"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { business, deliveryFee, deliveryOption, type DeliveryId } from "@/content/business";
import { cart, cartSubtotal, maxQty, useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { resolveLine } from "@/lib/lite";
import type { OrderErrors, PaymentMethod } from "@/lib/orders/schema";
import { CheckIcon, MinusIcon, PenIcon, PhoneIcon, PlusIcon, TrashIcon } from "./icons";

type Done = { payment: PaymentMethod; reference: string; total: number; deliveryFee: number; lines: { name: string; qty: number; total: number }[] };

const field = "mt-1.5 w-full rounded-2xl border-[1.5px] border-ink/20 bg-paper px-4 py-3 text-[15.5px] outline-none transition focus:border-ink focus:bg-white aria-invalid:border-pink aria-invalid:bg-blush/40";

export function Checkout() {
  const items = useCart();
  const delivery: DeliveryId = "ub";
  const [payment, setPayment] = useState<PaymentMethod>("qpay");
  const [receiptType, setReceiptType] = useState<"person" | "company">("person");
  const [errors, setErrors] = useState<OrderErrors>({});
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [done, setDone] = useState<Done | null>(null);

  const lines = items.flatMap((i) => {
    const l = resolveLine(i.slug);
    return l ? [{ ...i, line: l }] : [];
  });
  const subtotal = cartSubtotal(items);
  const fee = deliveryFee(delivery, subtotal);
  const total = subtotal + fee;
  const zone = deliveryOption(delivery);

  if (done) return <Receipt done={done} />;

  if (!lines.length)
    return (
      <div className="card mx-auto max-w-lg px-8 py-14 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border-[1.5px] border-ink bg-hi">
          <PenIcon size={26} />
        </span>
        <p className="display mt-5 text-3xl">Сагс хоосон байна</p>
        <p className="hand mt-2 text-[24px] text-gold-3">эхний алхам: дэвтэр ✎</p>
        <Link href="/p/be-rich-notebook" className="btn btn-ink mt-7">
          Дэвтэр үзэх
        </Link>
      </div>
    );

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    setNotice(null);
    setErrors({});
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.get("name"),
          phone: f.get("phone"),
          email: f.get("email"),
          delivery,
          address: f.get("address") ?? "",
          payment,
          receiptType,
          regNo: f.get("regNo") ?? "",
          note: f.get("note"),
          website: f.get("website"),
          items: items.map(({ slug, qty }) => ({ slug, qty })),
        }),
      });
      const json = await res.json().catch(() => null);
      if (res.ok && json?.ok) {
        setDone({ payment, reference: json.reference, total: json.total ?? total, deliveryFee: json.deliveryFee ?? fee, lines: lines.map((l) => ({ name: l.line.product.n, qty: l.qty, total: l.line.price * l.qty })) });
        cart.clear();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (res.status === 422 && json?.errors) {
        setErrors(json.errors);
        setNotice("Мэдээллээ шалгаад дахин оролдоно уу.");
      } else if (json?.error === "not_configured") {
        setNotice(`Онлайн захиалгын систем тохируулагдаж байна. Захиалгаа ${business.phone.display} дугаарт утсаар өгнө үү (лавлах код ${json.reference}, нийт ${formatPrice(json.total ?? total)}).`);
      } else {
        setNotice(`Захиалга илгээхэд алдаа гарлаа. Дахин оролдох эсвэл ${business.phone.display} дугаарт залгана уу.`);
      }
    } catch {
      setNotice("Интернэт холболтоо шалгаад дахин оролдоно уу.");
    } finally {
      setBusy(false);
    }
  }

  const err = (k: keyof OrderErrors) => errors[k] && <p className="mt-1.5 text-[13.5px] font-bold text-pink">{errors[k]}</p>;
  const step = (n: number, t: string) => (
    <h2 className="flex items-center gap-3">
      <span className="display grid h-9 w-9 place-items-center rounded-full border-[1.5px] border-ink bg-hi text-[15px]">{n}</span>
      <span className="display text-2xl">{t}</span>
    </h2>
  );

  return (
    <form onSubmit={submit} noValidate className="grid gap-8 lg:grid-cols-[1.35fr_1fr]">
      <div className="space-y-6">
        <section className="card overflow-hidden">
          <ul className="divide-y-[1.5px] divide-dashed divide-ink/15">
            {lines.map(({ slug, qty, line }) => (
              <li key={slug} className="flex gap-4 p-4 md:p-5">
                <Link href={`/p/${slug}`} className="relative h-24 w-20 shrink-0 overflow-hidden rounded-2xl border-[1.5px] border-ink bg-cream">
                  <Image src={line.product.t} alt="" fill sizes="80px" className="object-cover" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <Link href={`/p/${slug}`} className="display text-lg leading-snug hover:text-gold-3">
                    {line.product.n}
                  </Link>
                  <span className="tnum text-[13px] text-mute">{formatPrice(line.price)} / ш</span>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
                    <div className="flex items-center rounded-full border-[1.5px] border-ink">
                      <button type="button" onClick={() => cart.setQty(slug, qty - 1)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-cream" aria-label="Цөөлөх">
                        <MinusIcon size={16} />
                      </button>
                      <span className="tnum w-7 text-center text-sm font-bold">{qty}</span>
                      <button type="button" onClick={() => cart.setQty(slug, qty + 1)} disabled={qty >= maxQty(slug)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-cream disabled:opacity-35" aria-label="Нэмэх">
                        <PlusIcon size={16} />
                      </button>
                    </div>
                    <span className="display tnum">{formatPrice(line.price * qty)}</span>
                    <button type="button" onClick={() => cart.setQty(slug, 0)} className="grid h-9 w-9 place-items-center rounded-full text-mute hover:bg-blush hover:text-ink" aria-label={`${line.product.n}: хасах`}>
                      <TrashIcon size={17} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="card p-5 md:p-7">
          {step(1, "Захиалагч")}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-[14px] font-bold">
              Нэр
              <input name="name" autoComplete="name" required aria-invalid={!!errors.name} className={field} />
              {err("name")}
            </label>
            <label className="text-[14px] font-bold">
              Утас
              <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="99112233" required aria-invalid={!!errors.phone} className={field} />
              {err("phone")}
            </label>
            <label className="text-[14px] font-bold sm:col-span-2">
              Имэйл <span className="font-normal text-mute">(заавал биш)</span>
              <input name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} className={field} />
              {err("email")}
            </label>
          </div>
          <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        </section>

        <section className="card p-5 md:p-7">
          {step(2, "Хүргэлт")}
          <div className="mt-5 rounded-2xl bg-cream p-4">
            <p className="flex items-center justify-between gap-2 font-bold">
              {zone.name}
              <span className="tnum text-gold-3">{fee ? formatPrice(fee) : "Үнэгүй"}</span>
            </p>
            <p className="mt-1 text-[13.5px] leading-snug text-ink-2">{zone.note}</p>
            <p className="mt-2 text-[12.5px] text-mute">{business.zone}</p>
          </div>
          <label className="mt-4 block text-[14px] font-bold">
            Хаяг
            <textarea name="address" rows={2} required aria-invalid={!!errors.address} placeholder="Дүүрэг, хороо, байр, орц, давхар, тоот" className={field} />
            {err("address")}
          </label>
        </section>

        <section className="card p-5 md:p-7">
          {step(3, "И-баримт, тайлбар")}
          <div className="mt-5 flex gap-2" role="radiogroup" aria-label="И-баримтын төрөл">
            {(
              [
                ["person", "Хувь хүн"],
                ["company", "Байгууллага"],
              ] as const
            ).map(([id, label]) => (
              <button key={id} type="button" role="radio" aria-checked={receiptType === id} onClick={() => setReceiptType(id)} className="rounded-full border-[1.5px] border-ink/20 px-5 py-2 text-[14.5px] font-bold aria-checked:border-ink aria-checked:bg-ink aria-checked:text-paper">
                {label}
              </button>
            ))}
          </div>
          {receiptType === "company" ? (
            <label className="mt-4 block text-[14px] font-bold">
              Байгууллагын регистр
              <input name="regNo" inputMode="numeric" maxLength={7} placeholder="1234567" aria-invalid={!!errors.regNo} className={field} />
              {err("regNo")}
            </label>
          ) : (
            <p className="mt-3 text-[13.5px] text-mute">И-баримтыг таны утасны дугаараар бүртгэнэ.</p>
          )}
          <label className="mt-5 block text-[14px] font-bold">
            Нэмэлт тайлбар <span className="font-normal text-mute">(хүргэх цаг, бэлгийн мэндчилгээ гэх мэт)</span>
            <textarea name="note" rows={2} className={field} />
          </label>
        </section>
      </div>

      <aside className="lg:sticky lg:top-32 lg:self-start">
        <div className="relative overflow-hidden rounded-[28px] border-[1.5px] border-ink bg-money p-6 text-paper shadow-[8px_8px_0_var(--color-ink)] md:p-8">
          <div className="pointer-events-none absolute -top-16 -right-16 h-52 w-52 rounded-full border-[24px] border-white/5" aria-hidden />
          <h2 className="display relative text-3xl">Төлөх дүн</h2>
          <dl className="tnum relative mt-5 space-y-2.5 text-[15.5px]">
            <div className="flex justify-between">
              <dt className="text-paper/65">Барааны дүн</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-paper/65">Хүргэлт</dt>
              <dd>{fee ? formatPrice(fee) : <span className="font-bold text-hi">Үнэгүй</span>}</dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-white/15 pt-3">
              <dt className="font-bold">Нийт</dt>
              <dd className="display text-3xl text-hi">{formatPrice(total)}</dd>
            </div>
          </dl>
          <fieldset className="relative mt-6">
            <legend className="kicker text-[10px] text-paper/60">Төлбөр</legend>
            <div className="mt-3 space-y-2" role="radiogroup" aria-label="Төлбөрийн хэлбэр">
              {business.payments.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  role="radio"
                  aria-checked={payment === m.id}
                  onClick={() => setPayment(m.id)}
                  className="flex w-full items-center gap-3 rounded-2xl bg-white/6 p-3 text-left ring-1 ring-white/10 transition hover:bg-white/10 aria-checked:bg-white/12 aria-checked:ring-hi"
                >
                  <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-full ring-2 ${payment === m.id ? "ring-hi" : "ring-white/40"}`}>{payment === m.id && <span className="h-2 w-2 rounded-full bg-hi" />}</span>
                  <span className="min-w-0">
                    <span className="block text-[14px] font-bold">{m.name}</span>
                    <span className="block text-[12px] leading-snug text-paper/60">{m.note}</span>
                  </span>
                </button>
              ))}
            </div>
            {errors.payment && <p className="mt-2 text-[13px] font-bold text-hi">{errors.payment}</p>}
          </fieldset>
          <p className="relative mt-4 text-[12.5px] text-paper/60">{business.rules.payment}</p>
          {notice && (
            <p role="alert" className="relative mt-4 rounded-2xl bg-hi px-4 py-3 text-[14px] font-semibold text-ink">
              {notice}
            </p>
          )}
          {errors.items && <p className="relative mt-3 text-[14px] font-bold text-hi">{errors.items}</p>}
          <button type="submit" disabled={busy} className="btn btn-hi relative mt-6 h-14 w-full text-[16px] disabled:cursor-wait disabled:opacity-60">
            {busy ? "Илгээж байна…" : "Захиалга өгөх"}
          </button>
          <a href={`tel:${business.phone.tel}`} className="relative mt-4 flex items-center gap-2 text-[14px] font-semibold text-paper/75 hover:text-hi">
            <PhoneIcon size={16} /> Асуух зүйл байвал: {business.phone.display}
          </a>
        </div>
      </aside>
    </form>
  );
}

function Receipt({ done }: { done: Done }) {
  return (
    <div className="mx-auto max-w-lg">
      <div className="ruled pop rounded-[28px] border-[1.5px] border-ink p-8 pl-14 shadow-[8px_8px_0_var(--color-ink)]">
        <span className="grid h-14 w-14 place-items-center rounded-full border-[1.5px] border-ink bg-hi">
          <CheckIcon size={28} />
        </span>
        <h2 className="display mt-5 text-4xl">Захиалга хүлээн авлаа</h2>
        <p className="mt-2 text-ink-2">
          Захиалгын код: <b className="tnum text-ink">{done.reference}</b>
        </p>
        <ul className="tnum mt-6 space-y-2 text-[15px]">
          {done.lines.map((l) => (
            <li key={l.name} className="flex justify-between gap-4">
              <span className="text-ink-2">
                {l.name} × {l.qty}
              </span>
              <span>{formatPrice(l.total)}</span>
            </li>
          ))}
          <li className="flex justify-between gap-4">
            <span className="text-ink-2">Хүргэлт</span>
            <span>{done.deliveryFee ? formatPrice(done.deliveryFee) : "Үнэгүй"}</span>
          </li>
          <li className="flex justify-between gap-4 border-t-[1.5px] border-ink pt-3 text-lg font-bold">
            <span>Нийт</span>
            <span>{formatPrice(done.total)}</span>
          </li>
        </ul>
        <p className="mt-6 text-[14.5px] leading-relaxed text-ink-2">
          {done.payment === "qpay" ? "QPay нэхэмжлэлийг таны утсанд илгээнэ." : "Дансны мэдээллийг таны утсанд илгээнэ."} {business.rules.delivery} {business.rules.ebarimt}
        </p>
        <p className="hand mt-4 text-[26px] text-pink">баян болох замд амжилт ✦</p>
        <Link href="/" className="btn btn-ink mt-6">
          Нүүр хуудас
        </Link>
      </div>
    </div>
  );
}
