import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { site } from "../content";
import { asset } from "../lib/text";

const links = [
  { to: "/play", label: "Play" },
  { to: "/kingdoms", label: "Kingdoms" },
  { to: "/guides", label: "Guides" },
  { to: "/rules", label: "Rules" },
  { to: "/store", label: "Store" },
];

const linkClass = "rounded-lg px-3 py-2 font-semibold no-underline hover:bg-panel2 hover:text-ink";

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-panel2 bg-deep/95 backdrop-blur">
      <div className="mx-auto flex w-[min(1100px,92%)] flex-wrap items-center justify-between gap-4 py-2">
        <Link
          to="/"
          className="flex items-center gap-3 font-display text-xl font-black text-ink no-underline hover:text-ink"
        >
          <img src={asset("logo-small.png")} alt="" width={40} height={40} className="h-10 w-10" />
          {site.name}
        </Link>

        <button
          type="button"
          className="rounded-lg border border-panel2 bg-panel px-3 py-1.5 text-xl text-ink md:hidden"
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
              className={({ isActive }) =>
                `${linkClass} ${isActive ? "bg-panel2 text-ember" : "text-ink"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} text-ink`}>
            Map<span aria-hidden="true"> &#8599;</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a
            href={site.discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-discord px-4 py-2 text-center font-extrabold text-white no-underline hover:bg-[#7a86ff] hover:text-white md:ml-1"
          >
            Discord
          </a>
        </nav>
      </div>
    </header>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="mb-2 font-body text-xs font-extrabold uppercase tracking-[0.16em] text-ink">{title}</h2>
      <ul className="grid gap-1">{children}</ul>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-8 border-t border-panel2 bg-deep py-10 text-sm text-muted">
      <div className="mx-auto w-[min(1100px,92%)]">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-2 flex items-center gap-3 font-display text-lg font-black text-ink">
              <img src={asset("logo-small.png")} alt="" width={36} height={36} className="h-9 w-9" />
              {site.name}
            </div>
            <p className="max-w-xs">A Kingdoms RPG for Java and Bedrock. Free to play, running since April 27, 2021.</p>
            <p className="mt-2">
              <code className="text-teal">{site.javaIp}</code>
            </p>
          </div>
          <FooterColumn title="Play">
            <li><Link to="/play">Getting started</Link></li>
            <li><Link to="/guides">Guides</Link></li>
            <li><Link to="/npcs">Find an NPC</Link></li>
            <li><Link to="/kingdoms">Kingdoms</Link></li>
          </FooterColumn>
          <FooterColumn title="Community">
            <li><a href={site.discordUrl} target="_blank" rel="noopener noreferrer">Discord</a></li>
            <li><a href={site.storeUrl} target="_blank" rel="noopener noreferrer">Store</a></li>
            <li><a href={site.mapUrl} target="_blank" rel="noopener noreferrer">Live map</a></li>
            <li><Link to="/news">News</Link></li>
            <li><Link to="/staff">Staff</Link></li>
          </FooterColumn>
          <FooterColumn title="Help">
            <li><Link to="/rules">Rules</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy">Privacy</Link></li>
            <li><Link to="/terms">Terms</Link></li>
          </FooterColumn>
        </div>
        <p className="mt-8 border-t border-panel2 pt-4 text-xs" suppressHydrationWarning>
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
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-ember focus:px-4 focus:py-2 focus:font-bold focus:text-[#1d1308]"
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
