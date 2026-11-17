import type { Metadata } from "next";
import { Checkout } from "@/components/checkout";

export const metadata: Metadata = { title: "Сагс", robots: { index: false } };

export default function CartPage() {
  return (
    <div className="wrap pt-10 md:pt-14">
      <p className="kicker text-gold-3">Захиалга</p>
      <h1 className="display mt-3 text-5xl md:text-6xl">
        Таны <span className="hl">сагс</span>
      </h1>
      <div className="mt-10">
        <Checkout />
      </div>
    </div>
  );
}
