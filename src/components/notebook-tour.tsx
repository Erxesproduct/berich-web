"use client";

import { useState } from "react";
import { CoinIcon, PenIcon, SparkIcon, TargetIcon, TrendIcon } from "./icons";

/**
 * The notebook's parts, as its description lists them: income, spending, savings and investments kept apart,
 * the monthly and yearly review, the «billion portfolio» map and the goal-board stickers. The pages drawn here
 * are handwritten examples (marked «жишээ»), not scans of the notebook.
 */
type Row = [string, string];
const PARTS: { id: string; tab: string; title: string; text: string; icon: React.ReactNode; rows?: Row[]; note: string; tone: string }[] = [
  {
    id: "income",
    tab: "Орлого",
    title: "Орлогоо тус тусад нь",
    text: "Цалин, нэмэлт орлого, хүү, ногдол ашиг: хаанаас хэд орж ирснийг өдөр бүр тэмдэглэнэ.",
    icon: <TrendIcon size={18} />,
    rows: [
      ["Цалин", "+ ……"],
      ["Нэмэлт ажил", "+ ……"],
      ["Хадгаламжийн хүү", "+ ……"],
    ],
    note: "орой бүр 10 минут",
    tone: "bg-mint",
  },
  {
    id: "spend",
    tab: "Зарлага",
    title: "Зарлага хаашаа явснаа хар",
    text: "Хоол хүнс, унаа тээвэр, амьдрал ахуй: зайлшгүй зардал ч бүртгэгдэхээрээ ухаалаг шийдвэр гаргахад тусална.",
    icon: <CoinIcon size={18} />,
    rows: [
      ["Хоол хүнс", "− ……"],
      ["Унаа тээвэр", "− ……"],
      ["Амьдрал ахуй", "− ……"],
    ],
    note: "өөртөө дүгнэлт хий",
    tone: "bg-blush",
  },
  {
    id: "save",
    tab: "Хадгаламж",
    title: "Хадгалсан мөнгө өсөхийг хар",
    text: "Өдөр бүр татуулдаг, зорилготой хадгаламжаа дэвтэртээ бичиж, дадлаа бэхжүүл.",
    icon: <TargetIcon size={18} />,
    rows: [
      ["Зорилго: аялал", "✓"],
      ["Өнөөдөр", "+ ……"],
      ["Нийт", "……"],
    ],
    note: "дараа жилийн аялалд!",
    tone: "bg-hi",
  },
  {
    id: "invest",
    tab: "Хөрөнгө оруулалт",
    title: "Хувьцаа, бонд, өгөөж",
    text: "«Бараа авъя биш, хувьцаа авъя» гэдэг шинэ өнцөг. Хөрөнгө оруулалт, түүний өгөөжийг тусад нь хөтөл.",
    icon: <TrendIcon size={18} />,
    rows: [
      ["Хувьцаа", "……"],
      ["Бонд", "……"],
      ["Өгөөж, хүү", "+ ……"],
    ],
    note: "пассив орлого ↑",
    tone: "bg-mint",
  },
  {
    id: "review",
    tab: "Сар, жилийн дүгнэлт",
    title: "Сарын болон жилийн дүгнэлт",
    text: "1 сар, 1 улирлын туршид бүртгээд үзээрэй: юунд их зарцуулж, хэр хадгалснаа өөрөө харж дүгнэнэ.",
    icon: <PenIcon size={18} />,
    rows: [
      ["Орлого", "……"],
      ["Зарлага", "……"],
      ["Хадгалсан", "……"],
    ],
    note: "би чадна!",
    tone: "bg-cream",
  },
  {
    id: "billion",
    tab: "Тэрбумын газрын зураг",
    title: "Тэрбумын багц бүрдүүлэх газрын зураг",
    text: "Өнөөдөр, 5 жилийн дараа, 10 жилийн дараа: зорьсон багцдаа хүрэх замаа алхам алхмаар зурна.",
    icon: <SparkIcon size={18} />,
    note: "5 жил · 10 жил",
    tone: "bg-kraft",
  },
  {
    id: "goals",
    tab: "Зорилгын стикер",
    title: "Зорилгын самбар наадаг стикер",
    text: "Мөрөөдлөө нүдэнд харагдах газар наа: дэвтэрт зорилгын самбарын стикер дагалдана.",
    icon: <TargetIcon size={18} />,
    note: "мөрөөдлөө биелүүл",
    tone: "bg-blush",
  },
];

export function NotebookTour() {
  const [i, setI] = useState(0);
  const p = PARTS[i];
  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div>
        <div role="tablist" aria-label="Дэвтэр дотор" className="flex flex-wrap gap-2">
          {PARTS.map((x, k) => (
            <button
              key={x.id}
              role="tab"
              type="button"
              id={`tab-${x.id}`}
              aria-selected={k === i}
              aria-controls="tour-panel"
              onClick={() => setI(k)}
              className="flex items-center gap-2 rounded-full border-[1.5px] border-ink/20 bg-sheet px-4 py-2 text-[14px] font-semibold transition hover:border-ink aria-selected:border-ink aria-selected:bg-ink aria-selected:text-paper"
            >
              {x.icon}
              {x.tab}
            </button>
          ))}
        </div>
        <div className="mt-8 min-h-40" aria-live="polite">
          <p className="kicker text-gold-3">
            {String(i + 1).padStart(2, "0")} / {String(PARTS.length).padStart(2, "0")}
          </p>
          <h3 key={p.id} className="display pop mt-2 text-3xl leading-tight md:text-4xl">
            {p.title}
          </h3>
          <p className="mt-3 max-w-md text-[16.5px] leading-relaxed text-ink-2">{p.text}</p>
        </div>
      </div>

      {/* an open notebook spread with a handwritten example on the right page */}
      <div id="tour-panel" role="tabpanel" aria-labelledby={`tab-${p.id}`} className="relative">
        <div className="relative mx-auto grid max-w-xl grid-cols-2 overflow-hidden rounded-[18px] border-[1.5px] border-ink bg-kraft p-2 shadow-[8px_8px_0_var(--color-ink)] md:p-3">
          <div className="grid-paper relative rounded-l-[10px] border-r border-ink/15 p-4 md:p-6">
            <span className={`sticker ${p.tone} px-3 py-1 text-[12px] text-ink`}>{p.tab}</span>
            <p className="hand mt-6 text-[26px] text-gold-3 md:text-[30px]">{p.title.split(" ").slice(0, 3).join(" ")}</p>
            <div className="mt-6 space-y-2" aria-hidden>
              {[72, 54, 86, 40].map((w, k) => (
                <span key={k} className="block h-2 rounded-full bg-ink/8" style={{ width: `${w}%` }} />
              ))}
            </div>
            <span className="absolute bottom-3 left-4 text-[10px] font-semibold tracking-widest text-mute uppercase">жишээ</span>
          </div>
          <div className="ruled relative rounded-r-[10px] p-4 pl-12 md:p-6 md:pl-14">
            {p.rows ? (
              <ul key={p.id} className="hand space-y-[6px] text-[22px] leading-[26px] text-ink md:text-[24px]">
                {p.rows.map(([a, b], k) => (
                  <li key={a} className="pop flex justify-between gap-2" style={{ animationDelay: `${k * 90}ms` }}>
                    <span>{a}</span>
                    <span className="text-gold-3">{b}</span>
                  </li>
                ))}
              </ul>
            ) : p.id === "billion" ? (
              <svg key={p.id} viewBox="0 0 200 170" className="pop h-auto w-full" aria-hidden>
                <path d="M12 150 C 50 140, 40 100, 80 98 S 120 70, 140 52 S 170 30, 188 18" fill="none" stroke="var(--color-ink)" strokeWidth="2.4" strokeDasharray="6 6" strokeLinecap="round" />
                {[
                  [12, 150, "өнөөдөр"],
                  [80, 98, "5 жил"],
                  [140, 52, "10 жил"],
                ].map(([x, y, t]) => (
                  <g key={String(t)}>
                    <circle cx={Number(x)} cy={Number(y)} r="7" fill="var(--color-hi)" stroke="var(--color-ink)" strokeWidth="2" />
                    <text x={Number(x) + 10} y={Number(y) + 16} fontFamily="var(--font-hand)" fontSize="17" fill="var(--color-ink)">
                      {t}
                    </text>
                  </g>
                ))}
                <text x="150" y="16" fontFamily="var(--font-display)" fontWeight="800" fontSize="15" fill="var(--color-gold-3)">
                  1 тэрбум
                </text>
              </svg>
            ) : (
              <div key={p.id} className="flex flex-wrap gap-2">
                {["Байр", "Аялал", "Хувьцаа", "Машин", "Сургууль", "Бизнес"].map((t, k) => (
                  <span key={t} className={`sticker pop px-3 py-1 text-[13px] ${["bg-hi", "bg-blush", "bg-mint", "bg-kraft"][k % 4]}`} style={{ rotate: `${(k % 2 ? 1 : -1) * (3 + k)}deg`, animationDelay: `${k * 70}ms` }}>
                    {t}
                  </span>
                ))}
              </div>
            )}
            <p className="hand absolute right-4 bottom-3 rotate-[-4deg] text-[20px] text-pink">{p.note} ✎</p>
          </div>
          {/* spiral rings */}
          <div className="pointer-events-none absolute top-4 bottom-4 left-1/2 flex -translate-x-1/2 flex-col justify-between" aria-hidden>
            {Array.from({ length: 9 }, (_, k) => (
              <span key={k} className="block h-2.5 w-5 rounded-full border-2 border-ink/60 bg-paper" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
