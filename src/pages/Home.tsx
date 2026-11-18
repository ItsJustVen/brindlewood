import { Link } from "react-router-dom";
import ConnectBox from "../components/ConnectBox";
import Section from "../components/Section";
import ServerStatus from "../components/ServerStatus";
import { announcements, home, kingdoms, site } from "../content";
import { useDiscordStats } from "../hooks/useDiscordStats";
import { usePageTitle } from "../hooks/usePageTitle";
import { asset } from "../lib/text";

export default function Home() {
  usePageTitle();
  const discord = useDiscordStats();
  const latest = [...announcements].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <>
      <section className="pb-10 text-center">
        <div className="relative h-[42vh] max-h-[480px] min-h-[240px] overflow-hidden">
          <img
            src={asset(home.heroImage)}
            alt={home.heroAlt}
            width={1600}
            height={900}
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(20,27,43,0) 40%, rgba(20,27,43,0.85) 85%, #141b2b 100%)" }}
          />
          <h1 className="absolute inset-x-0 bottom-3 px-4 text-4xl font-black sm:text-6xl">
            {site.name}
            <span className="sr-only"> Kingdoms RPG Minecraft Server</span>
          </h1>
        </div>
        <div className="px-4">
        <p className="mx-auto mt-3 max-w-xl text-xl font-bold">{site.tagline}</p>
        {site.subtagline && <p className="mx-auto mt-1 max-w-xl text-muted">{site.subtagline}</p>}
        <div className="mb-5" />

        <ServerStatus discordOnline={discord?.online} />
        <ConnectBox />
        {home.freeLine && <p className="mt-1 text-sm text-muted">{home.freeLine}</p>}

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link className="btn btn-primary" to="/play">
            How to Join
          </Link>
          <a className="btn btn-discord" href={site.discordUrl} target="_blank" rel="noopener noreferrer">
            Join our Discord
          </a>
        </div>
        <p className="mt-4 text-sm">
          <a href={site.storeUrl} target="_blank" rel="noopener noreferrer">Visit the Store</a>
        </p>
        </div>
      </section>

      {home.highlights && (
        <Section>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {home.highlights.map((h) => (
              <div key={h.title} className="border-l-2 border-wood pl-4">
                <h2 className="text-lg font-bold">{h.title}</h2>
                <p className="mt-1 text-sm text-muted">{h.body}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section title={home.galleryHeading}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {home.gallery.map((g) => (
            <figure key={g.src}>
              <img
                src={asset(g.src)}
                alt={g.alt}
                loading="lazy"
                width={1600}
                height={900}
                className="aspect-video w-full rounded-lg border border-panel2 object-cover"
              />
              <figcaption className="mt-1.5 text-sm text-muted">{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {latest.length > 0 && (
        <Section>
          <p>
            <span className="font-bold uppercase tracking-widest text-steel">Latest: </span>
            {latest[0].title} <span className="text-muted">({latest[0].date})</span>{" "}
            <Link to="/news">All news and patch notes</Link>
          </p>
        </Section>
      )}

      <Section title={home.kingdomsHeading} intro={home.kingdomsIntro}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kingdoms.map((k) => (
            <div key={k.id} className="card">
              <span className="text-xs font-extrabold uppercase tracking-widest text-steel">{k.corner}</span>
              <h3 className="text-xl font-bold">{k.name}</h3>
              <p>{k.summary}</p>
            </div>
          ))}
        </div>
        {home.leaderCta && (
          <p className="mt-4 text-muted">
            Rosewood and Subterra have no leader yet.{" "}
            <a href={site.discordUrl} target="_blank" rel="noopener noreferrer">{home.leaderCta.linkText}</a> to lead one.
          </p>
        )}
        <div className="mt-6 text-center">
          <Link className="btn btn-primary" to="/kingdoms">
            Explore the Kingdoms
          </Link>
        </div>
      </Section>

      <Section>
        <p className="min-h-6 text-sm font-bold">
          {home.since}
          {discord && (
            <>
              <span className="text-muted"> · </span>
              {discord.members} Discord members
              {discord.online > 0 && (
                <>
                  <span className="text-muted"> · </span>
                  {discord.online} online now
                </>
              )}
            </>
          )}
        </p>
      </Section>
    </>
  );
}
