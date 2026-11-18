import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/cinzel/500.css";
import "@fontsource/cinzel/700.css";
import "@fontsource/cinzel/900.css";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/600.css";
import "@fontsource/nunito/800.css";
import "./index.css";
import App from "./App";

// BASE_URL is "/brindlewood/" on GitHub Pages and "/" on a custom domain.
const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Pages are pre-rendered at build time, so hydrate when there is already HTML inside.
// 404.html has an empty root, so it renders from scratch.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
