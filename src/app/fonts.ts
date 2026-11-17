import { Caveat, Inter_Tight, Montserrat_Alternates } from "next/font/google";

// All three carry Mongolian Ө ө Ү ү (cyrillic-ext), checked against the Google Fonts cmap.
export const display = Montserrat_Alternates({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--nf-display",
  display: "swap",
});
export const sans = Inter_Tight({ subsets: ["latin", "cyrillic", "cyrillic-ext"], weight: ["400", "500", "600", "700"], variable: "--nf-sans", display: "swap" });
/** Handwriting for notebook notes. */
export const hand = Caveat({ subsets: ["latin", "cyrillic", "cyrillic-ext"], weight: ["500", "700"], variable: "--nf-hand", display: "swap" });
