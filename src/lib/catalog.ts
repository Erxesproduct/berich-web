import data from "@/data/catalog.json";

export type Img = { src: string; w: number; h: number };
export type Photo = Img & { thumb: Img };

export type Product = {
  /** Zochil product id (kept for the erxes product code and old-URL redirects). */
  id: number;
  slug: string;
  /** The shop's own code from the product name, e.g. 12-1296-01. */
  code: string | null;
  name: string;
  subtitle: string;
  category: "notebook" | "wellness" | "gear";
  /** Selling price (the sale price when discounted). */
  price: number;
  /** Price before the discount, null when not discounted. */
  compareAt: number | null;
  /** Units in stock; null = not tracked; 0 = sold out. */
  stock: number | null;
  featured: boolean;
  /** Notebooks in a pack (the 10-notebook bundle). */
  pack: number | null;
  createdAt: string;
  /** The product's own text, one line each. */
  features: string[];
  images: Photo[];
};

export type Category = { id: Product["category"]; name: string; en: string; count: number };

export const products = data.products as Product[];
export const categories = data.categories as Category[];
export const banner = data.banner as Photo;
export const faq = data.faq as { q: string; a: string }[];
export const catalogUpdatedAt = data.updatedAt;

const bySlug = new Map(products.map((p) => [p.slug, p]));
export const getProduct = (slug: string) => bySlug.get(slug);
export const getCategory = (id: string) => categories.find((c) => c.id === id);

export const NOTEBOOK = getProduct("be-rich-notebook")!;
export const BUNDLE = getProduct("be-rich-notebook-10")!;

export const soldOut = (p: { stock: number | null }) => p.stock === 0;
export const lowStock = (p: { stock: number | null }) => p.stock != null && p.stock > 0 && p.stock <= 10;
export const onSale = (p: Pick<Product, "price" | "compareAt">) => p.compareAt != null && p.compareAt > p.price;
export const discount = (p: Pick<Product, "price" | "compareAt">) => (onSale(p) ? Math.round((1 - p.price / p.compareAt!) * 100) : 0);

/** The product a cart line points at (server side). */
export function resolveLine(slug: string) {
  const product = getProduct(slug);
  return product ? { product, price: product.price, stock: product.stock } : null;
}

/** erxes product code: BR-<zochil id>. */
export const sku = (p: Pick<Product, "id">) => `BR-${p.id}`;

export const summary = (p: Product) => [p.subtitle, ...p.features.slice(0, 2)].join(". ").replace(/\.\./g, ".").slice(0, 170);
