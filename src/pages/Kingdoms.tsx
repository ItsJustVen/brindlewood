import { Link } from "react-router-dom";
import PageHead from "../components/PageHead";
import Section from "../components/Section";
import { home, kingdoms, site } from "../content";
import { usePageTitle } from "../hooks/usePageTitle";
import { asset } from "../lib/text";

export default function Kingdoms() {
  usePageTitle("The Four Kingdoms");

  return (
    <>
      <PageHead title="The Four Kingdoms">
        One kingdom in each corner of the map. Two are settled, and two are waiting for a founder.
      </PageHead>

      <Section>
        <div className="grid gap-5 sm:grid-cols-2">
          {kingdoms.map((k) => (
            <article key={k.id} id={k.id} className="card card-teal">
              <span className="text-xs font-extrabold uppercase tracking-widest text-steel">{k.corner}</span>
              <h2 className="text-2xl font-bold">{k.name}</h2>
              <p>{k.description}</p>
              {k.image && (
                <img
                  src={asset(k.image)}
                  alt={k.imageAlt ?? ""}
                  loading="lazy"
                  width={1600}
                  height={791}
                  className="mt-4 aspect-video w-full rounded-md object-cover"
                />
              )}
            </article>
          ))}
        </div>
        {home.leaderCta && (
          <div className="card card-teal mt-8">
            <h2 className="text-2xl font-bold">{home.leaderCta.title}</h2>
            <p>{home.leaderCta.body}</p>
            <a className="btn btn-discord" href={site.discordUrl} target="_blank" rel="noopener noreferrer">
              {home.leaderCta.linkText}
            </a>
          </div>
        )}
        <div className="mt-8 text-center">
          <Link className="btn btn-primary" to="/play">
            Ready to Join?
          </Link>
        </div>
      </Section>
    </>
  );
}
