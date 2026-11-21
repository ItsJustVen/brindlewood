// Galleries are Markdown files in src/content/galleries/. Each file starts with a header:
//
//   ---
//   title: Tool Skins
//   summary: One line shown on the Gallery page.
//   order: 1
//   cover: "/screens/skins/celestial-sword.png"   (picture on the Gallery page card)
//   guide: tool-skins                             (optional: the matching guide)
//   style: icons                                  (icons = small item pictures, photos = screenshots)
//   ---
//
// Under it, one picture per line: ![Name](/screens/skins/file.png)
// Use "## Heading" lines to split a gallery into groups.
// The file name becomes the web address: tool-skins.md -> /gallery/tool-skins

export interface Gallery {
  slug: string;
  title: string;
  summary: string;
  order: number;
  cover: string;
  guide: string;
  style: "icons" | "photos";
  count: number;
  body: string;
}

const files = import.meta.glob("./galleries/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function parse(path: string, raw: string): Gallery {
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
    summary: meta.summary || "",
    order: Number(meta.order) || 999,
    cover: meta.cover || "",
    guide: meta.guide || "",
    style: meta.style === "photos" ? "photos" : "icons",
    count: (body.match(/^!\[/gm) || []).length,
    body: body.trim(),
  };
}

export const galleries: Gallery[] = Object.entries(files)
  .map(([path, raw]) => parse(path, raw))
  .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

export function findGallery(slug: string | undefined): Gallery | undefined {
  return galleries.find((g) => g.slug === slug);
}
