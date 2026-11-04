// Runs after `vite build`. Makes the build work on GitHub Pages:
//  - 404.html is a copy of index.html, so opening a page directly
//    (e.g. /brindlewood/rules) loads the app instead of a GitHub 404 page.
//  - .nojekyll stops GitHub from running Jekyll over the files.
import { copyFileSync, writeFileSync, existsSync } from "node:fs";

const dist = new URL("../dist/", import.meta.url);

if (!existsSync(new URL("index.html", dist))) {
  console.error("dist/index.html not found. Did the build fail?");
  process.exit(1);
}

copyFileSync(new URL("index.html", dist), new URL("404.html", dist));
writeFileSync(new URL(".nojekyll", dist), "");
console.log("postbuild: created dist/404.html and dist/.nojekyll");
