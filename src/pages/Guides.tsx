import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHead from "../components/PageHead";
import Section from "../components/Section";
import { guideCategories, guides } from "../content/guides";
import { usePageTitle } from "../hooks/usePageTitle";

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
    `rounded-full border px-4 py-1.5 text-sm font-bold ${
      active
        ? "border-teal bg-teal text-[#08202a]"
        : "border-steel bg-panel2 text-ink hover:border-teal hover:text-teal"
    }`;

  return (
    <>
      <PageHead title="Guides">
        Everything you need to know about BrindleWood, from your first ten minutes to dungeons,
        guilds and the economy.
      </PageHead>

      <Section>
        <p className="mb-6 text-center">
          Looking for someone in Aldoria? <Link to="/npcs">Find an NPC</Link>, with a map.
        </p>

        <div className="mx-auto mb-6 max-w-xl">
          <label htmlFor="guide-search" className="sr-only">
            Search guides
          </label>
          <input
            id="guide-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides: try “claim”, “races” or “coins”"
            className="w-full rounded-xl border border-steel bg-panel px-4 py-3 text-ink placeholder:text-muted"
          />
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by topic">
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
          <p className="text-center text-muted">
            No guides match that search. Try a shorter word, or ask in our Discord.
          </p>
        )}

        {guideCategories.map((c) => {
          const items = shown.filter((g) => g.category === c.id);
          if (items.length === 0) return null;
          return (
            <div key={c.id} className="mb-10">
              <h2 className="text-2xl font-bold text-teal">{c.title}</h2>
              <p className="mb-4 text-muted">{c.blurb}</p>
              <ul className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
                {items.map((g) => (
                  <li key={g.slug} className="card card-teal">
                    <h3 className="text-lg font-bold">
                      <Link to={`/guides/${g.slug}`} className="no-underline hover:underline">
                        {g.title}
                      </Link>
                    </h3>
                    {g.summary && <p>{g.summary}</p>}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </Section>
    </>
  );
}
