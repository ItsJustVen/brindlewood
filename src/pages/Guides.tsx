import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHead from "../components/PageHead";
import Section from "../components/Section";
import { guideCategories, guides } from "../content/guides";
import { usePageTitle } from "../hooks/usePageTitle";

const startHere = [
  { slug: "your-first-hour", title: "Your First Hour", text: "Join, pick a race, earn and claim, in order." },
  { slug: "the-world", title: "The World", text: "Where you spawn and how the world is laid out." },
  { slug: "choosing-your-race", title: "Choosing Your Race", text: "Your first big choice. It can't be changed later." },
  { slug: "claiming-land", title: "Claiming Land", text: "Protect your builds before you start." },
  { slug: "free-rewards", title: "Free Rewards", text: "Money, coins and keys just for playing." },
];

const terms: [string, string][] = [
  ["Aldoria", "The spawn world, with the NPCs, dungeons and the AFK Pond."],
  ["Playworld", "The main survival world, where you can claim land."],
  ["Money ($) and coins", "Two separate currencies. See Money vs Coins."],
  ["Kingdom", "One of the four regions of the map. Each is run as a guild by its leader."],
  ["Guild", "A group of players who play and level together."],
  ["Grave", "What a death leaves behind. Your items wait in it for 7 days."],
];

export default function Guides() {
  usePageTitle("Guides");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const q = query.trim().toLowerCase();
  const shown = useMemo(
    () =>
      guides.filter(
        (g) =>
          (category === "all" || g.category === category) &&
          (!q || `${g.title} ${g.summary} ${g.body}`.toLowerCase().includes(q)),
      ),
    [q, category],
  );

  const chip = (active: boolean) =>
    `cursor-pointer rounded-full border px-4 py-1.5 text-sm font-bold ${
      active
        ? "border-ember bg-ember text-[#1d1308]"
        : "border-panel2 bg-panel text-ink hover:border-ember hover:text-ember"
    }`;

  const showStart = !q && category === "all";

  return (
    <>
      <PageHead title="Guides" eyebrow={`${guides.length} guides`}>
        Everything about BrindleWood, from your first ten minutes to dungeons, guilds and the economy.
      </PageHead>

      <Section>
        <div className="mb-4 max-w-xl">
          <label htmlFor="guide-search" className="sr-only">
            Search guides
          </label>
          <input
            id="guide-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides: try “claim”, “races” or “coins”"
            className="w-full rounded-xl border border-panel2 bg-panel px-4 py-3 text-ink placeholder:text-muted"
          />
        </div>

        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
          <button type="button" className={chip(category === "all")} onClick={() => setCategory("all")}>
            All
          </button>
          {guideCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              className={chip(category === c.id)}
              onClick={() => setCategory(c.id)}
            >
              {c.title}
            </button>
          ))}
        </div>

        {shown.length === 0 && (
          <p className="text-muted">No guides match that search. Try a shorter word, or ask in our Discord.</p>
        )}

        {showStart && (
          <div className="mb-12 rounded-2xl border border-ember/40 bg-panel p-5 sm:p-7">
            <h2 className="text-2xl font-bold">New? Start here</h2>
            <ol className="mt-4 grid gap-3 sm:grid-cols-2">
              {startHere.map((s, i) => (
                <li key={s.slug} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-ember/70 text-sm font-extrabold text-ember"
                  >
                    {i + 1}
                  </span>
                  <span>
                    <Link to={`/guides/${s.slug}`} className="font-bold">
                      {s.title}
                    </Link>
                    <span className="block text-sm text-muted">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {guideCategories.map((c) => {
          const items = shown.filter((g) => g.category === c.id);
          if (items.length === 0) return null;
          return (
            <div key={c.id} className="mb-10">
              <h2 className="text-2xl font-bold">{c.title}</h2>
              <p className="mb-3 text-sm text-muted">{c.blurb}</p>
              <ul className="grid gap-x-10 border-t border-panel2 md:grid-cols-2">
                {items.map((g) => (
                  <li key={g.slug} className="border-b border-panel2 py-2.5">
                    <Link to={`/guides/${g.slug}`} className="font-bold">
                      {g.title}
                    </Link>
                    {g.summary && <span className="block text-sm text-muted">{g.summary}</span>}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        <p className="mt-2 text-muted">
          Looking for someone in Aldoria? <Link to="/npcs">Find an NPC</Link>, with a map.
        </p>

        {showStart && (
          <details className="mt-6 max-w-3xl rounded-xl border border-panel2 bg-panel px-4 py-3">
            <summary className="cursor-pointer font-bold">Key terms</summary>
            <dl className="mt-3 space-y-2 text-muted">
              {terms.map(([k, v]) => (
                <div key={k}>
                  <dt className="inline font-bold text-ink">{k}: </dt>
                  <dd className="inline">{v}</dd>
                </div>
              ))}
            </dl>
          </details>
        )}
      </Section>
    </>
  );
}
