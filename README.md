# BrindleWood Website

The official BrindleWood site. A fully static React + TypeScript + Vite + Tailwind site hosted on GitHub Pages. There is no server and no database, and no secrets live in this code.

Live site: https://itsjustven.github.io/brindlewood/

## Editing content (no coding needed)

All the words on the site live in `src/content/`. Edit a file on GitHub (pencil icon), commit to `main`, and the site rebuilds and publishes itself in about a minute.

| File | What it controls |
| --- | --- |
| `site.json` | Server IPs, Bedrock port, Minecraft version, Discord and store links, live status on/off |
| `kingdoms.json` | The four kingdoms (name, corner, short summary, full description) |
| `rules.json` | The rules page (each rule has an icon, title, text, and optional note) |
| `faq.json` | FAQ questions and answers on the How to Play page |
| `store.json` | Store page text (items and prices are on Tebex, not here) |
| `play.json` | How to Play steps for Java and Bedrock |
| `home.json` | Home page headings and feature cards |
| `announcements.json` | News on the home page. Add items like `{ "date": "2026-11-05", "title": "Hello", "body": "Text" }`. Empty means the section is hidden |

Tips:
- Wrap text in `**double asterisks**` to make it bold.
- In `faq.json` and `play.json` you can write `{javaIp}`, `{bedrockIp}`, `{bedrockPort}`, or `{minecraftVersion}` and it fills in from `site.json`.
- A typo in a JSON file makes the build fail, and the previous version of the site stays online until it's fixed. Check the **Actions** tab on GitHub to see the result.

## One-time GitHub setup

In the repo go to **Settings → Pages** and set **Source** to **GitHub Actions**.

## How publishing works

`.github/workflows/deploy.yml` runs on every push. It installs, type-checks, builds, and smoke-tests the production build. Only pushes to `main` get published.

## Working on it locally

Requires Node 20.19 or newer.

```
npm install
npm run dev        # development server
npm run build      # production build (type-check + build + 404.html fallback)
npm run smoke      # checks the production build in dist/
npm run preview    # serve the production build locally
```

## GitHub Pages notes

- **Base path:** `vite.config.ts` uses `/brindlewood/`. For a custom domain (for example `brindlewood.net`), build with `VITE_BASE=/` and add the domain in Settings → Pages.
- **Direct links:** the build copies `index.html` to `404.html` so opening `/brindlewood/rules` directly works.
- **Security:** never put API keys, Discord bot tokens, or database credentials in this repo. Anything that needs them must run on a separate secure service.

## Adding more later

Pages live in `src/pages/` and are listed in `src/App.tsx` and the nav in `src/components/Layout.tsx`. Future integrations (Discord bot, Tebex, player stats, staff tools) should be optional modules that call an external API, like `src/hooks/useServerStatus.ts` does. The site works without them.
