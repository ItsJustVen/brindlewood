// Runs after `vite build`. Makes the build work on GitHub Pages:
//  - Each page route gets its own copy of index.html (e.g. dist/rules/index.html),
//    so opening /brindlewood/rules directly is a normal page load (HTTP 200).
//  - 404.html is a copy of index.html, so any other unknown address still loads the
//    app, which then shows its own "Lost in the Woods" page.
//  - .nojekyll stops GitHub from running Jekyll over the files.
//
// When you add a new page to src/App.tsx, add its path to ROUTES below.
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";

// Every guide in src/content/guides/ gets its own page automatically.
const SITE = "https://brindlewood.net";

// Reads title / summary / updated from a guide's header.
function guideMeta(slug) {
  const raw = readFileSync(new URL(`../src/content/guides/${slug}.md`, import.meta.url), "utf8").replace(/\r\n?/g, "\n");
  const m = /^---\n([\s\S]*?)\n---/.exec(raw);
  const meta = {};
  if (m) {
    for (const line of m[1].split("\n")) {
      const kv = /^([A-Za-z_]+):\s*(.*)$/.exec(line);
      if (kv) meta[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, "");
    }
  }
  return { slug, title: meta.title || slug, summary: meta.summary || "", updated: meta.updated || "" };
}

// Every guide in src/content/guides/ gets its own page automatically.
const guideSlugs = readdirSync(new URL("../src/content/guides/", import.meta.url))
  .filter((f) => f.endsWith(".md"))
  .map((f) => f.replace(/\.md$/, ""));
const guideList = guideSlugs.map(guideMeta);

// Page title and description for link previews and search results.
// When you add a page, add a line here as well as in ROUTES.
const PAGES = {
  play: ["Getting Started", "How to join BrindleWood on Java or Bedrock, and what to do in your first ten minutes."],
  kingdoms: ["Kingdoms", "The four kingdoms of BrindleWood and who leads them."],
  rules: ["Rules", "The rules of BrindleWood, and what happens when they are broken."],
  store: ["Store", "Ranks, keys, races and cosmetics. What the BrindleWood store sells and what it never will."],
  guides: ["Guides", "Everything you need to know about BrindleWood, from your first ten minutes to dungeons, guilds and the economy."],
  staff: ["Staff", "Meet the BrindleWood staff team and find out how to get help."],
  news: ["News and Patch Notes", "What is new on BrindleWood: patch notes, new content and changes, newest first."],
  npcs: ["Find an NPC", "A map of every NPC in Aldoria, with coordinates."],
  contact: ["Contact", "How to reach the BrindleWood team."],
  privacy: ["Privacy Policy", "What BrindleWood collects and how it is used."],
  terms: ["Terms of Service", "The terms for playing on BrindleWood and buying from its store."],
};

// Guides that were merged into another one. The old address still works and sends visitors on.
const REDIRECTS = {
  "guides/coins": "guides/money-vs-coins",
  "guides/boosters": "guides/coinshop",
  "guides/pets-and-mounts": "guides/cosmetics",
};

const ROUTES = [...Object.keys(PAGES), ...guideSlugs.map((slug) => `guides/${slug}`)];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function pageHtml(html, route) {
  let title;
  let desc;
  if (PAGES[route]) [title, desc] = PAGES[route];
  else {
    const g = guideList.find((x) => `guides/${x.slug}` === route);
    if (g) {
      title = g.title;
      desc = g.summary;
    }
  }
  if (!title) return html;
  const full = `${title} | BrindleWood`;
  const url = `${SITE}/${route}`;
  const set = (re, value) => {
    if (!re.test(html)) throw new Error(`postbuild: tag not found in index.html: ${re}`);
    html = html.replace(re, value);
  };
  set(/<title>[^<]*<\/title>/, `<title>${esc(full)}</title>`);
  set(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${esc(desc)}$2`);
  set(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(full)}" />`);
  set(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${esc(desc)}$2`);
  html = html.replace("</head>", `    <link rel="canonical" href="${url}" />\n    <meta property="og:url" content="${url}" />\n  </head>`);
  return html;
}

const dist = new URL("../dist/", import.meta.url);

if (!existsSync(new URL("index.html", dist))) {
  console.error("dist/index.html not found. Did the build fail?");
  process.exit(1);
}

const baseHtml = readFileSync(new URL("index.html", dist), "utf8");

// Pre-render every page to HTML (built by `vite build --ssr`), so visitors and search
// engines get real content before any JavaScript runs. The browser then hydrates it.
const { render } = await import(new URL("../dist-ssr/entry-server.js", import.meta.url));
const ROOT = '<div id="root"></div>';
if (!baseHtml.includes(ROOT)) throw new Error("postbuild: empty root div not found in index.html");
const withContent = (html, path) => html.replace(ROOT, () => `<div id="root">${render(path)}</div>`);

for (const route of ROUTES) {
  const dir = new URL(`${route}/`, dist);
  mkdirSync(dir, { recursive: true });
  writeFileSync(new URL("index.html", dir), withContent(pageHtml(baseHtml, route), `/${route}`));
}

for (const [from, to] of Object.entries(REDIRECTS)) {
  const dir = new URL(`${from}/`, dist);
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    new URL("index.html", dir),
    `<!doctype html><html lang="en"><head><meta charset="UTF-8" /><title>Moved | BrindleWood</title><meta name="robots" content="noindex" /><link rel="canonical" href="${SITE}/${to}" /><meta http-equiv="refresh" content="0; url=/${to}" /></head><body><p>This page moved to <a href="/${to}">${SITE}/${to}</a>.</p></body></html>\n`,
  );
}

// Sitemap and robots.txt so search engines find every page.
const urls = [
  `  <url><loc>${SITE}/</loc></url>`,
  ...ROUTES.map((r) => {
    const g = guideList.find((x) => `guides/${x.slug}` === r);
    const last = g && /^\d{4}-\d{2}-\d{2}$/.test(g.updated) ? `<lastmod>${g.updated}</lastmod>` : "";
    return `  <url><loc>${SITE}/${r}</loc>${last}</url>`;
  }),
];
writeFileSync(
  new URL("sitemap.xml", dist),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
);
writeFileSync(new URL("robots.txt", dist), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

// 404.html keeps the empty shell, so unknown addresses render the app's own "not found" page.
writeFileSync(new URL("404.html", dist), baseHtml);
writeFileSync(new URL("index.html", dist), withContent(baseHtml, "/"));
writeFileSync(new URL(".nojekyll", dist), "");
console.log(`postbuild: created ${ROUTES.length} route pages, sitemap.xml, robots.txt, dist/404.html and dist/.nojekyll`);
