import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";

// Used only at build time by scripts/postbuild.mjs to pre-render each page's HTML.
// "path" starts with a slash, for example "/" or "/guides/jobs".
export function render(path: string): string {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "");
  return renderToString(
    <StaticRouter location={basename + path} basename={basename}>
      <App />
    </StaticRouter>,
  );
}
