import data from "@/data/journal.json";
import type { Photo } from "./catalog";

/** The shop's posts from Zochil, word for word. */
export type Post = { id: number; title: string; date: string; image: Photo; paragraphs: string[] };

export const posts = data as Post[];
export const getPost = (id: number) => posts.find((p) => p.id === id);

/** First paragraph, shortened, for cards and meta descriptions. */
export const excerpt = (p: Post, n = 150) => {
  const t = p.paragraphs[0] ?? "";
  return t.length > n ? t.slice(0, n - 1).replace(/\s+\S*$/, "") + "…" : t;
};

/** Rough reading time: 180 words a minute, at least one. */
export const minutes = (p: Post) => Math.max(1, Math.round(p.paragraphs.join(" ").split(/\s+/).length / 180));
