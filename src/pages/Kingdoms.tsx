import { Link } from "react-router-dom";
import PageHead from "../components/PageHead";
import Section from "../components/Section";
import { home, kingdoms, site } from "../content";
import { usePageTitle } from "../hooks/usePageTitle";
import { asset } from "../lib/text";

/** Descriptions end with "Leader: Name." when a kingdom has one. Split it out so it can be a badge. */
function splitLeader(description: string): { text: string; leader: string | null } {
  const m = /\s*Leader:\s*([^.]+)\.?\s*$/.exec(description);
  return m ? { text: description.slice(0, m.index).trim(), leader: m[1].trim() } : { text: description, leader: null };
}

export default function Kingdoms() {
  usePageTitle("The Four Kingdoms");

  return (
    <>
      <PageHead title="The Four Kingdoms" eyebrow="One in each corner of the map">
        Two are settled and two are waiting for a founder. Your kingdom is wherever you settle, and you can move later.
      </PageHead>

      <Section>
        <div className="grid gap-14 sm:gap-20">
          {kingdoms.map((k, i) => {
            const { text, leader } = splitLeader(k.description);
            return (
              <article
                key={k.id}
                id={k.id}
                className="grid scroll-mt-24 items-center gap-6 md:grid-cols-2 md:gap-10"
              >
                {k.image && (
                  <img
                    src={asset(k.image)}
                    alt={k.imageAlt ?? ""}
                    loading={i === 0 ? "eager" : "lazy"}
                    className={`aspect-video w-full rounded-lg border border-panel2 object-cover ${i % 2 === 1 ? "md:order-2" : ""}`}
                  />
                )}
                <div>
                  <p className="eyebrow">{k.corner}</p>
                  <h2 className="mt-1 text-3xl font-bold">{k.name}</h2>
                  <p className="mt-2 inline-block rounded-full border border-ember/50 px-3 py-0.5 text-sm font-bold text-ember">
                    {leader ? `Led by ${leader}` : "Needs a leader"}
                  </p>
                  <p className="mt-3 text-muted">{text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {home.kingdomFacts && (
        <Section title="How kingdoms work">
          <div className="grid gap-x-10 gap-y-6 md:grid-cols-2">
            {home.kingdomFacts.map((f) => (
              <div key={f.title} className="border-t border-ember/50 pt-3">
                <h3 className="text-lg font-bold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted">{f.body}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {home.leaderCta && (
        <Section>
          <div className="rounded-2xl border border-panel2 bg-panel px-6 py-10 sm:px-10">
            <h2 className="text-3xl font-bold">{home.leaderCta.title}</h2>
            <p className="mt-2 max-w-2xl text-muted">{home.leaderCta.body}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="btn btn-primary" href={site.discordUrl} target="_blank" rel="noopener noreferrer">
                {home.leaderCta.linkText}
              </a>
              <Link className="btn btn-ghost" to="/play">
                New here? Start with Getting Started
              </Link>
            </div>
          </div>
        </Section>
      )}
    </>
  );
}
