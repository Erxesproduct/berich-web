"use client";

import { useEffect, useState } from "react";
import { CheckIcon } from "./icons";

const KEY = "berich.habit.v1";
const DAYS = 30;
const CHEER = ["Эхэлцгээе!", "Сайн эхлэл!", "Дадал бүрэлдэж байна", "Хагас нь боллоо!", "Бараг хүрлээ", "30 хоног! Баян бай 🎉"];

/**
 * «Орой бүр 10 минут»: the shop's own suggestion to record the day's income, spending and savings every evening
 * for a month. A 30-day board the visitor ticks; kept only in this browser.
 */
export function HabitTracker() {
  const [done, setDone] = useState<number[]>([]);

  useEffect(() => {
    try {
      const v = JSON.parse(localStorage.getItem(KEY) ?? "[]");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- read once after hydration
      if (Array.isArray(v)) setDone(v.filter((n) => Number.isInteger(n) && n >= 1 && n <= DAYS));
    } catch {
      /* storage blocked */
    }
  }, []);

  const toggle = (d: number) => {
    const next = done.includes(d) ? done.filter((x) => x !== d) : [...done, d];
    setDone(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage blocked: still works for this visit */
    }
  };

  // current streak: consecutive ticked days ending at the highest ticked day
  const top = Math.max(0, ...done);
  let streak = 0;
  for (let d = top; d >= 1 && done.includes(d); d--) streak++;
  const pct = Math.round((done.length / DAYS) * 100);
  // 0 days → first line, all 30 → last line, in between → the four middle lines
  const cheer = CHEER[done.length === 0 ? 0 : done.length >= DAYS ? 5 : 1 + Math.floor((done.length / DAYS) * 4)];

  return (
    <div className="card relative p-5 md:p-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="kicker text-gold-3">30 хоногийн сорил</p>
          <p className="display mt-1 text-2xl">Орой бүр 10 минут</p>
        </div>
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 44 44" className="h-14 w-14 -rotate-90" aria-hidden>
            <circle cx="22" cy="22" r="18" fill="none" stroke="var(--color-cream)" strokeWidth="6" />
            <circle cx="22" cy="22" r="18" fill="none" stroke="var(--color-gold)" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${(pct / 100) * 113.1} 113.1`} className="transition-all duration-500" />
          </svg>
          <p className="tnum text-[13px] leading-tight text-ink-2" aria-live="polite">
            <b className="display block text-xl text-ink">
              {done.length}/{DAYS}
            </b>
            дараалал: {streak}
          </p>
        </div>
      </div>
      <ol className="mt-5 grid grid-cols-6 gap-2 sm:grid-cols-10">
        {Array.from({ length: DAYS }, (_, k) => k + 1).map((d) => {
          const on = done.includes(d);
          return (
            <li key={d}>
              <button
                type="button"
                aria-pressed={on}
                aria-label={`${d}-р өдөр${on ? ", бичсэн" : ""}`}
                onClick={() => toggle(d)}
                className={`tnum grid aspect-square w-full place-items-center rounded-xl border-[1.5px] text-[13px] font-bold transition duration-200 ${on ? "rotate-[-4deg] border-ink bg-hi shadow-[2px_2px_0_var(--color-ink)]" : "border-ink/15 bg-paper text-ink-2 hover:border-ink"}`}
              >
                {on ? <CheckIcon size={16} /> : d}
              </button>
            </li>
          );
        })}
      </ol>
      <p className="hand mt-4 text-[24px] text-pink">{cheer}</p>
      <p className="mt-1 text-[13px] text-mute">Тухайн өдрийн орлого, зарлага, хадгалсан мөнгөө дэвтэртээ бичээд энд тэмдэглээрэй. Зөвхөн таны төхөөрөмжид хадгалагдана.</p>
    </div>
  );
}
