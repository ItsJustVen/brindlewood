// Runs after `vite build`. Makes the build work on GitHub Pages:
//  - Each page route gets its own copy of index.html (e.g. dist/rules/index.html),
//    so opening /brindlewood/rules directly is a normal page load (HTTP 200).
//  - 404.html is a copy of index.html, so any other unknown address still loads the
//    app, which then shows its own "Lost in the Woods" page.
//  - .nojekyll stops GitHub from running Jekyll over the files.
//
// When you add a new page to src/App.tsx, add its path to ROUTES below.
import { copyFileSync, existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";

// Every guide in src/content/guides/ gets its own page automatically.
const guideSlugs = readdirSync(new URL("../src/content/guides/", import.meta.url))
  .filter((f) => f.endsWith(".md"))
  .map((f) => f.replace(/\.md$/, ""));

const ROUTES = [
  "play",
  "kingdoms",
  "rules",
  "store",
  "guides",
  "npcs",
  "contact",
  "privacy",
  "terms",
  ...guideSlugs.map((slug) => `guides/${slug}`),
];

const dist = new URL("../dist/", import.meta.url);

if (!existsSync(new URL("index.html", dist))) {
  console.error("dist/index.html not found. Did the build fail?");
  process.exit(1);
}

for (const route of ROUTES) {
  const dir = new URL(`${route}/`, dist);
  mkdirSync(dir, { recursive: true });
  copyFileSync(new URL("index.html", dist), new URL("index.html", dir));
}

copyFileSync(new URL("index.html", dist), new URL("404.html", dist));
writeFileSync(new URL(".nojekyll", dist), "");
console.log(`postbuild: created ${ROUTES.length} route pages, dist/404.html and dist/.nojekyll`);
