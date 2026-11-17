import { discount, onSale, type Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";

export function Price({ p, large }: { p: Pick<Product, "price" | "compareAt">; large?: boolean }) {
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
      <span className={`display tnum ${large ? "text-4xl md:text-5xl" : "text-[19px]"}`}>{formatPrice(p.price)}</span>
      {onSale(p) && (
        <>
          <s className={`tnum text-mute ${large ? "text-lg" : "text-[13px]"}`}>{formatPrice(p.compareAt!)}</s>
          <span className={`sticker border-2 bg-pink px-2 text-white ${large ? "py-1 text-[13px]" : "py-0.5 text-[11px]"}`}>−{discount(p)}%</span>
        </>
      )}
    </span>
  );
}
