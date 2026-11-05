// Guides are Markdown files in src/content/guides/. Each file starts with a small
// header, for example:
//
//   ---
//   title: Claiming Land
//   category: building
//   summary: How to protect your builds.
//   order: 10
//   ---
//   (the guide text)
//
// The file name becomes the web address: claiming-land.md -> /guides/claiming-land
// Categories live in guideCategories.json.

import categoriesJson from "./guideCategories.json";

export interface GuideCategory {
  id: string;
  title: string;
  blurb: string;
}

export interface Guide {
  slug: string;
  title: string;
  category: string;
  summary: string;
  order: number;
  updated: string;
  body: string;
}

export const guideCategories: GuideCategory[] = categoriesJson;

const files = import.meta.glob("./guides/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function parse(path: string, raw: string): Guide {
  const slug = path.replace(/^.*\//, "").replace(/\.md$/, "");
  const text = raw.replace(/\r\n?/g, "\n");
  const meta: Record<string, string> = {};
  let body = text;
  const m = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(text);
  if (m) {
    body = m[2];
    for (const line of m[1].split("\n")) {
      const kv = /^([A-Za-z_]+):\s*(.*)$/.exec(line);
      if (kv) meta[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, "");
    }
  }
  return {
    slug,
    title: meta.title || slug.replace(/-/g, " "),
    category: meta.category || "other",
    summary: meta.summary || "",
    order: Number(meta.order) || 999,
    updated: meta.updated || "",
    body: body.trim(),
  };
}

export const guides: Guide[] = Object.entries(files)
  .map(([path, raw]) => parse(path, raw))
  .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

export function findGuide(slug: string | undefined): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export interface PageDoc {
  title: string;
  summary: string;
  updated: string;
  body: string;
}

// Plain pages (privacy, terms) are Markdown files in src/content/pages/.
const pageFiles = import.meta.glob("./pages/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export function getPage(slug: string): PageDoc | undefined {
  const entry = Object.entries(pageFiles).find(([p]) => p.endsWith(`/${slug}.md`));
  if (!entry) return undefined;
  const g = parse(entry[0], entry[1]);
  return { title: g.title, summary: g.summary, updated: g.updated, body: g.body };
}
