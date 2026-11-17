"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { formatPrice } from "@/lib/format";

const DAILY = [1000, 3000, 5000, 10000, 20000];
const DAYS_PER_MONTH = 365 / 12;

/** Saving a fixed amount every day, interest added monthly. Returns the balance at the end of each year. */
function project(daily: number, years: number, rate: number) {
  const monthly = daily * DAYS_PER_MONTH;
  const r = rate / 100 / 12;
  let bal = 0;
  let paid = 0;
  const out: { year: number; paid: number; total: number }[] = [];
  for (let m = 1; m <= years * 12; m++) {
    bal = bal * (1 + r) + monthly;
    paid += monthly;
    if (m % 12 === 0) out.push({ year: m / 12, paid, total: bal });
  }
  return out;
}

/** Counts up to a number when it changes. */
function useCount(target: number) {
  const [v, setV] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / 600);
      const e = 1 - Math.pow(1 - k, 3);
      setV(a + (target - a) * e);
      if (k < 1) raf = requestAnimationFrame(tick);
      else from.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return Math.round(v);
}

export function SavingsLab() {
  const [daily, setDaily] = useState(5000);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(10);
  const rows = useMemo(() => project(daily, years, rate), [daily, years, rate]);
  const last = rows[rows.length - 1];
  const total = useCount(Math.round(last.total));
  const interest = Math.round(last.total - last.paid);
  const max = last.total;

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="card p-5 md:p-8">
        <p className="kicker text-gold-3">1 · Өдөрт хэдийг хадгалах вэ?</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {DAILY.map((d) => (
            <button key={d} type="button" aria-pressed={daily === d} onClick={() => setDaily(d)} className="tnum rounded-full border-[1.5px] border-ink/20 bg-paper px-4 py-2 text-[15px] font-bold transition hover:border-ink aria-pressed:border-ink aria-pressed:bg-hi">
              {formatPrice(d)}
            </button>
          ))}
        </div>
        <label className="mt-4 block">
          <span className="sr-only">Өдөрт хадгалах дүн</span>
          <input type="range" min={500} max={50000} step={500} value={daily} onChange={(e) => setDaily(+e.target.value)} className="range" style={{ "--p": `${((daily - 500) / 49500) * 100}%` } as React.CSSProperties} />
        </label>
        <p className="tnum mt-2 text-[14px] text-ink-2">
          Өдөрт <b className="text-ink">{formatPrice(daily)}</b> ≈ сард {formatPrice(Math.round(daily * DAYS_PER_MONTH))}
        </p>

        <p className="kicker mt-8 text-gold-3">2 · Хэдэн жил?</p>
        <label className="mt-4 block">
          <span className="sr-only">Хугацаа, жилээр</span>
          <input type="range" min={1} max={10} step={1} value={years} onChange={(e) => setYears(+e.target.value)} className="range" style={{ "--p": `${((years - 1) / 9) * 100}%` } as React.CSSProperties} />
        </label>
        <p className="tnum mt-2 text-[14px] text-ink-2">
          <b className="text-ink">{years} жил</b> ({years * 365} өдөр)
        </p>

        <p className="kicker mt-8 text-gold-3">3 · Жилийн хүү (жишээ)</p>
        <label className="mt-4 block">
          <span className="sr-only">Жилийн хүү, хувиар</span>
          <input type="range" min={0} max={20} step={0.5} value={rate} onChange={(e) => setRate(+e.target.value)} className="range" style={{ "--p": `${(rate / 20) * 100}%` } as React.CSSProperties} />
        </label>
        <p className="tnum mt-2 text-[14px] text-ink-2">
          <b className="text-ink">{rate}%</b> · сар бүр хүү нэмэгдэнэ гэж тооцов
        </p>
      </div>

      <div className="relative overflow-hidden rounded-[26px] border-[1.5px] border-ink bg-money p-5 text-paper shadow-[6px_6px_0_var(--color-ink)] md:p-8">
        <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full border-[26px] border-white/5" aria-hidden />
        <p className="kicker relative text-mint">{years} жилийн дараа</p>
        <p className="display tnum relative mt-2 text-[44px] leading-none text-hi md:text-6xl" aria-live="polite">
          {formatPrice(total)}
        </p>
        <div className="tnum relative mt-5 grid grid-cols-2 gap-3 text-[14px]">
          <div className="rounded-2xl bg-white/8 p-3">
            <span className="block text-paper/60">Таны хадгалсан</span>
            <b className="text-[17px]">{formatPrice(Math.round(last.paid))}</b>
          </div>
          <div className="rounded-2xl bg-white/8 p-3">
            <span className="block text-paper/60">Хүүгийн өгөөж</span>
            <b className="text-[17px] text-hi">+{formatPrice(interest)}</b>
          </div>
        </div>
        {/* yearly bars: what you put in (cream) and what interest added (lime) */}
        <div className="relative mt-7 flex h-44 items-end gap-1.5 md:gap-2.5" role="img" aria-label={`Жил бүрийн үлдэгдэл: ${rows.map((r) => `${r.year} жил ${formatPrice(Math.round(r.total))}`).join(", ")}`}>
          {rows.map((r) => (
            <div key={r.year} className="flex h-full flex-1 flex-col justify-end">
              <div className="rounded-t-md bg-hi transition-all duration-500" style={{ height: `${((r.total - r.paid) / max) * 100}%` }} />
              <div className="bg-paper/85 transition-all duration-500" style={{ height: `${(r.paid / max) * 100}%` }} />
              <span className="tnum mt-1.5 text-center text-[11px] text-paper/60">{r.year}</span>
            </div>
          ))}
        </div>
        <p className="relative mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-paper/70">
          <span className="flex items-center gap-1.5">
            <i className="h-2.5 w-2.5 rounded-sm bg-paper/85" /> хадгалсан
          </span>
          <span className="flex items-center gap-1.5">
            <i className="h-2.5 w-2.5 rounded-sm bg-hi" /> хүү
          </span>
          <span>· жил</span>
        </p>
        <p className="relative mt-5 border-t border-white/10 pt-4 text-[12px] leading-relaxed text-paper/55">
          Энгийн тооцоо. Банк бүрийн хүү, нөхцөл өөр, татвар тооцоогүй. Санхүүгийн зөвлөгөө биш.
        </p>
      </div>
    </div>
  );
}
