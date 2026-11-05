import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHead from "../components/PageHead";
import Section from "../components/Section";
import { npcCategories, npcs, type Npc } from "../content/npcs";
import { usePageTitle } from "../hooks/usePageTitle";

// Map bounds, in blocks. North is up (smaller z), east is right (bigger x).
const X_MIN = -670;
const X_MAX = 150;
const Z_MIN = -230;
const Z_MAX = 630;
const W = X_MAX - X_MIN;
const H = Z_MAX - Z_MIN;

const colorOf = (id: string) => npcCategories.find((c) => c.id === id)?.color ?? "#a8b2c7";
const coords = (n: Npc) => `${n.x}, ${n.y}, ${n.z}`;

export default function Npcs() {
  usePageTitle("Find an NPC");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const q = query.trim().toLowerCase();
  const shown = useMemo(
    () =>
      npcs.filter((n) => {
        if (category !== "all" && n.category !== category) return false;
        if (!q) return true;
        const cat = npcCategories.find((c) => c.id === n.category)?.label ?? "";
        return `${n.name} ${cat} ${n.guide.replace(/-/g, " ")}`.toLowerCase().includes(q);
      }),
    [q, category],
  );

  const selected = npcs.find((n) => n.id === selectedId) ?? null;

  const chip = (active: boolean) =>
    `rounded-full border px-3 py-1 text-sm font-bold ${
      active
        ? "border-teal bg-teal text-[#08202a]"
        : "border-steel bg-panel2 text-ink hover:border-teal hover:text-teal"
    }`;

  function select(n: Npc) {
    setSelectedId(n.id);
    setCopied(false);
  }

  async function copy(n: Npc) {
    try {
      await navigator.clipboard.writeText(coords(n));
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const gridX: number[] = [];
  for (let x = -600; x <= 100; x += 100) gridX.push(x);
  const gridZ: number[] = [];
  for (let z = -200; z <= 600; z += 100) gridZ.push(z);

  return (
    <>
      <PageHead title="Find an NPC">
        Search for any NPC in Aldoria, the spawn world. Click one to see its coordinates, then use
        F3 in game to walk to it.
      </PageHead>

      <Section>
        <div className="mx-auto mb-4 max-w-xl">
          <label htmlFor="npc-search" className="sr-only">
            Search NPCs
          </label>
          <input
            id="npc-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search: try “banker”, “miner” or “rewards”"
            className="w-full rounded-xl border border-steel bg-panel px-4 py-3 text-ink placeholder:text-muted"
          />
        </div>

        <div className="mb-6 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by type">
          <button type="button" className={chip(category === "all")} onClick={() => setCategory("all")}>
            All
          </button>
          {npcCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              className={chip(category === c.id)}
              onClick={() => setCategory(c.id)}
            >
              <span
                aria-hidden="true"
                className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: c.color }}
              />
              {c.label}
            </button>
          ))}
        </div>

        {selected && (
          <div className="card card-teal mb-6" aria-live="polite">
            <h2 className="text-xl font-bold">{selected.name}</h2>
            <p>
              Coordinates (x, y, z): <strong>{coords(selected)}</strong>
            </p>
            <p className="mt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="rounded-lg border border-steel bg-panel2 px-3 py-1 text-sm font-bold text-ink hover:border-teal hover:text-teal"
                onClick={() => copy(selected)}
              >
                {copied ? "Copied!" : "Copy coordinates"}
              </button>
              <Link to={`/guides/${selected.guide}`}>Read the guide</Link>
            </p>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]">
          <div className="rounded-xl border border-panel2 bg-panel p-3">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              role="img"
              aria-label="Map of NPC positions in Aldoria. The list next to it has the same NPCs."
              className="mx-auto h-auto w-full max-w-[560px]"
            >
              <rect x="0" y="0" width={W} height={H} fill="#0e1420" />
              {gridX.map((x) => (
                <g key={`gx${x}`}>
                  <line x1={x - X_MIN} y1="0" x2={x - X_MIN} y2={H} stroke="#2a3550" strokeWidth="1" />
                  <text x={x - X_MIN + 3} y={H - 6} fill="#a8b2c7" fontSize="14">
                    {x}
                  </text>
                </g>
              ))}
              {gridZ.map((z) => (
                <g key={`gz${z}`}>
                  <line x1="0" y1={z - Z_MIN} x2={W} y2={z - Z_MIN} stroke="#2a3550" strokeWidth="1" />
                  <text x="4" y={z - Z_MIN - 4} fill="#a8b2c7" fontSize="14">
                    {z}
                  </text>
                </g>
              ))}
              <text x={W - 28} y="22" fill="#e6e8ee" fontSize="18" fontWeight="700">
                N ↑
              </text>
              {shown.map((n) => {
                const on = n.id === selectedId;
                return (
                  <g
                    key={n.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`${n.name}, ${coords(n)}`}
                    className="cursor-pointer"
                    onClick={() => select(n)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        select(n);
                      }
                    }}
                  >
                    <title>{`${n.name} (${coords(n)})`}</title>
                    <circle
                      cx={n.x - X_MIN}
                      cy={n.z - Z_MIN}
                      r={on ? 12 : 7}
                      fill={colorOf(n.category)}
                      stroke={on ? "#ffffff" : "#0e1420"}
                      strokeWidth={on ? 3 : 1.5}
                    />
                  </g>
                );
              })}
            </svg>
            <p className="mt-2 text-center text-sm text-muted">
              A simple map with no terrain, so you can see where things are. North is up. For the real
              world, open the <a href="https://map.brindlewood.net" target="_blank" rel="noopener noreferrer">Live Map</a>.
            </p>
          </div>

          <div>
            <p className="mb-2 text-sm text-muted">
              {shown.length} {shown.length === 1 ? "NPC" : "NPCs"}
            </p>
            {shown.length === 0 && (
              <p className="text-muted">Nothing matches that search. Try a shorter word.</p>
            )}
            <ul className="max-h-[640px] space-y-2 overflow-y-auto pr-1">
              {shown.map((n) => (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={() => select(n)}
                    aria-pressed={n.id === selectedId}
                    className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left ${
                      n.id === selectedId
                        ? "border-teal bg-panel2"
                        : "border-panel2 bg-panel hover:border-teal"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="h-3 w-3 shrink-0 rounded-full"
                      style={{ backgroundColor: colorOf(n.category) }}
                    />
                    <span className="flex-1 font-bold text-ink">{n.name}</span>
                    <span className="text-sm text-muted">{coords(n)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
