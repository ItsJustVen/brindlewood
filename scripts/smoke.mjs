// Smoke test for the PRODUCTION build (dist/). Run after `npm run build`.
// Checks the things that usually break on GitHub Pages: asset paths, the
// 404.html fallback used for direct links, and that referenced files exist.
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const base = process.env.VITE_BASE ?? "/brindlewood/";
const dist = new URL("../dist/", import.meta.url).pathname;
const errors = [];
const fail = (msg) => errors.push(msg);

const read = (name) => (existsSync(join(dist, name)) ? readFileSync(join(dist, name), "utf8") : null);

const index = read("index.html");
const notFound = read("404.html");
if (!index) fail("dist/index.html is missing");
if (!notFound) fail("dist/404.html is missing (direct links to pages would 404)");
if (index && notFound && index !== notFound) fail("dist/404.html differs from index.html");
if (!existsSync(join(dist, ".nojekyll"))) fail("dist/.nojekyll is missing");
const guideDir = new URL("../src/content/guides/", import.meta.url).pathname;
const guideRoutes = existsSync(guideDir)
  ? readdirSync(guideDir).filter((f) => f.endsWith(".md")).map((f) => `guides/${f.replace(/\.md$/, "")}`)
  : [];
for (const route of ["play", "kingdoms", "rules", "store", "guides", "npcs", "privacy", "terms", ...guideRoutes]) {
  const page = read(`${route}/index.html`);
  if (!page) fail(`dist/${route}/index.html is missing (direct link to /${route} would not load)`);
  else if (index && page !== index) fail(`dist/${route}/index.html differs from index.html`);
}

if (index) {
  // Every asset URL in the HTML must start with the base path and point at a real file.
  const refs = [...index.matchAll(/(?:src|href)="([^"]+)"/g)].map((m) => m[1]);
  const local = refs.filter((r) => r.startsWith("/") && !r.startsWith("//"));
  if (local.length === 0) fail("No local asset references found in index.html");
  for (const ref of local) {
    if (!ref.startsWith(base)) {
      fail(`Asset path "${ref}" does not start with base "${base}"`);
      continue;
    }
    const file = join(dist, ref.slice(base.length));
    if (!existsSync(file)) fail(`Referenced file is missing from dist: ${ref}`);
  }
  if (!/<script[^>]+type="module"/.test(index)) fail("index.html has no module script");
}

for (const f of ["logo.png", "favicon.png"]) {
  if (!existsSync(join(dist, f))) fail(`dist/${f} is missing`);
}

const assets = existsSync(join(dist, "assets")) ? readdirSync(join(dist, "assets")) : [];
if (!assets.some((f) => f.endsWith(".js"))) fail("No JavaScript bundle in dist/assets");
if (!assets.some((f) => f.endsWith(".css"))) fail("No CSS bundle in dist/assets");

// The bundle should contain the real content and must not contain obvious secrets.
const js = assets
  .filter((f) => f.endsWith(".js"))
  .map((f) => readFileSync(join(dist, "assets", f), "utf8"))
  .join("\n");
for (const needle of ["rpg.brindlewood.net", "Peacefield", "Be Respectful"]) {
  if (!js.includes(needle)) fail(`Expected content "${needle}" not found in the JS bundle`);
}
if (/(?:api[_-]?key|secret|token)\s*[:=]\s*["'][A-Za-z0-9_\-]{16,}["']/i.test(js)) {
  fail("Bundle may contain a secret or token");
}

if (errors.length) {
  console.error("Smoke test FAILED:\n - " + errors.join("\n - "));
  process.exit(1);
}
console.log(`Smoke test passed (base "${base}", ${assets.length} bundled assets).`);
