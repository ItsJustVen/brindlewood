import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { site } from "../content";
import { asset } from "../lib/text";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/play", label: "How to Play" },
  { to: "/kingdoms", label: "Kingdoms" },
  { to: "/guides", label: "Guides" },
  { to: "/rules", label: "Rules" },
  { to: "/store", label: "Store" },
];

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-wood bg-deep/95 backdrop-blur">
      <div className="mx-auto flex w-[min(1100px,92%)] flex-wrap items-center justify-between gap-4 py-2">
        <Link
          to="/"
          className="flex items-center gap-3 font-display text-xl font-black text-ink no-underline hover:text-ink"
        >
          <img src={asset("logo.png")} alt="" width={44} height={44} className="h-11 w-11" />
          {site.name}
        </Link>

        <button
          type="button"
          className="rounded-lg border border-steel bg-panel2 px-3 py-1.5 text-xl text-ink md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>

        <nav
          id="main-nav"
          aria-label="Main"
          className={`${open ? "flex" : "hidden"} w-full flex-col gap-1 pb-2 md:flex md:w-auto md:flex-row md:items-center md:pb-0`}
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 font-semibold no-underline hover:bg-panel2 hover:text-teal ${
                  isActive ? "bg-panel2 text-teal" : "text-ink"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href={site.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-3 py-2 font-semibold text-ink no-underline hover:bg-panel2 hover:text-teal"
          >
            Live Map
          </a>
          <a
            href={site.discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-teal px-3 py-2 text-center font-extrabold text-[#08202a] no-underline hover:bg-[#7ff0eb] hover:text-[#08202a]"
          >
            Join Discord
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-8 border-t-2 border-wood bg-deep py-8 text-center text-sm text-muted">
      <div className="mx-auto w-[min(1100px,92%)]">
        <img src={asset("logo.png")} alt="" width={56} height={56} className="mx-auto mb-2 h-14 w-14 opacity-90" />
        <nav aria-label="Footer" className="mb-3 flex flex-wrap justify-center gap-x-5 gap-y-1">
          <a href={site.discordUrl} target="_blank" rel="noopener noreferrer">Discord</a>
          <a href={site.storeUrl} target="_blank" rel="noopener noreferrer">Store</a>
          <a href={site.mapUrl} target="_blank" rel="noopener noreferrer">Live Map</a>
          <Link to="/rules">Rules</Link>
          <Link to="/play">How to Play</Link>
          <Link to="/guides">Guides</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </nav>
        <p>
          &copy; {new Date().getFullYear()} {site.name}. Not an official Minecraft product. Not
          approved by or associated with Mojang or Microsoft.
        </p>
      </div>
    </footer>
  );
}

export default function Layout() {
  const { pathname } = useLocation();

  // Start each page at the top when navigating.
  useEffect(() => window.scrollTo(0, 0), [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-teal focus:px-4 focus:py-2 focus:font-bold focus:text-[#08202a]"
      >
        Skip to content
      </a>
      <Header />
      <main id="content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
