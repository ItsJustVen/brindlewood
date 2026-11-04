import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// The site lives at https://itsjustven.github.io/brindlewood/ so assets need the
// "/brindlewood/" base path. If you later move to a custom domain such as
// https://brindlewood.net, build with VITE_BASE=/ (see README).
const base = process.env.VITE_BASE ?? "/brindlewood/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
});
