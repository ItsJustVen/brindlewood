import { Link } from "react-router-dom";
import JoinPanel from "../components/JoinPanel";
import Section from "../components/Section";
import { announcements, home, kingdoms, site } from "../content";
import { useDiscordStats } from "../hooks/useDiscordStats";
import { usePageTitle } from "../hooks/usePageTitle";
import { useServerStatus } from "../hooks/useServerStatus";
import { asset } from "../lib/text";

export default function Home() {
  usePageTitle();
  const discord = useDiscordStats();
  const status = useServerStatus();
  const latest = [...announcements].sort((a, b) => b.date.localeCompare(a.date))[0];

  // Only ever show good news: a player count once it is a healthy number, never "0 online".
  const min = site.serverStatus.minPlayersToShow ?? 1;
  const live = status.state === "online" && status.players >= min ? `${status.players} adventuring now` : null;

  return (
    <>
      {/* Hero: one headline, one thing to do (join). */}
      <section className="relative overflow-hidden border-b border-panel2">
        <img
          src={asset(home.heroImage)}
          alt={home.heroAlt}
          width={1600}
          height={900}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(18,22,31,0.94) 0%, rgba(18,22,31,0.78) 45%, rgba(18,22,31,0.35) 100%), linear-gradient(to bottom, rgba(18,22,31,0) 70%, #12161f 100%)",
          }}
        />
        <div className="relative mx-auto grid w-[min(1100px,92%)] items-center gap-8 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:py-20">
          <div>
            <p className="eyebrow mb-3">{home.hero.eyebrow}</p>
            <h1 className="text-4xl font-black sm:text-5xl lg:text-6xl">
              {home.hero.headline}
              <span className="sr-only"> {site.name} Kingdoms RPG Minecraft Server</span>
            </h1>
            <p className="mt-4 max-w-lg text-lg text-ink/90">{home.hero.sub}</p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-sm font-bold text-muted">
              {home.trust.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ember" />
                  {t}
                </li>
              ))}
              {live && (
                <li role="status" className="flex items-center gap-2 text-ink">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-green-400" />
                  {live}
                </li>
              )}
            </ul>
          </div>
          <JoinPanel />
        </div>
      </section>

      {/* What you'll do: four short rows, each with a real screenshot. */}
      <Section title={home.worldHeading} intro={home.worldIntro}>
        <div className="grid gap-12 sm:gap-16">
          {home.world.map((row, i) =>
            "layout" in row && row.layout === "banner" ? (
              <div key={row.title} className="relative overflow-hidden rounded-xl border border-panel2">
                <img
                  src={asset(row.image)}
                  alt={row.imageAlt}
                  loading="lazy"
                  className="h-[360px] w-full object-cover sm:h-[420px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 md:max-w-2xl">
                  <h3 className="text-2xl font-bold sm:text-3xl">{row.title}</h3>
                  <p className="mt-2 text-ink/90">{row.body}</p>
                  {row.to && row.linkText && (
                    <p className="mt-3 font-bold">
                      <Link to={row.to}>{row.linkText} &rarr;</Link>
                    </p>
                  )}
                </div>
              </div>
            ) : (
            <div key={row.title} className="grid items-center gap-6 md:grid-cols-2 md:gap-10">
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <img
                  src={asset(row.image)}
                  alt={row.imageAlt}
                  loading="lazy"
                  className="mx-auto h-auto max-h-[420px] w-full rounded-lg border border-panel2 bg-deep object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold sm:text-3xl">{row.title}</h3>
                <p className="mt-3 text-muted">{row.body}</p>
                {row.to && row.linkText && (
                  <p className="mt-3 font-bold">
                    <Link to={row.to}>{row.linkText} &rarr;</Link>
                  </p>
                )}
              </div>
            </div>
            ),
          )}
        </div>
      </Section>

      {/* Small practical facts, as plain text rather than more cards. */}
      <Section title={home.goodToKnowHeading}>
        <div className="grid gap-x-10 gap-y-6 md:grid-cols-3">
          {home.goodToKnow.map((g) => (
            <div key={g.title} className="border-t border-ember/50 pt-3">
              <h3 className="text-lg font-bold">{g.title}</h3>
              <p className="mt-1 text-sm text-muted">{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title={home.kingdomsHeading} intro={home.kingdomsIntro}>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {kingdoms.map((k) => (
            <Link
              key={k.id}
              to={`/kingdoms#${k.id}`}
              className="group relative block aspect-[4/3] overflow-hidden rounded-lg border border-panel2 no-underline"
            >
              {k.image && (
                <img
                  src={asset(k.image)}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(11,14,21,0.92) 0%, rgba(11,14,21,0) 60%)" }}
              />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <span className="eyebrow block">{k.corner}</span>
                <span className="font-display text-lg font-bold text-ink sm:text-xl">{k.name}</span>
              </div>
            </Link>
          ))}
        </div>
        {home.leaderCta && (
          <p className="mt-4 text-muted">
            Rosewood and Subterra have no leader yet.{" "}
            <a href={site.discordUrl} target="_blank" rel="noopener noreferrer">
              {home.leaderCta.linkText}
            </a>{" "}
            to lead one.
          </p>
        )}
      </Section>

      <Section>
        <div className="rounded-2xl border border-panel2 bg-panel px-6 py-10 text-center sm:px-10">
          <h2 className="text-3xl font-bold">{home.finalCta.heading}</h2>
          <p className="mx-auto mt-2 max-w-md text-muted">{home.finalCta.body}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link className="btn btn-primary" to="/play">
              Step-by-step guide
            </Link>
            <a className="btn btn-discord" href={site.discordUrl} target="_blank" rel="noopener noreferrer">
              Join the Discord
            </a>
          </div>
          <p className="mt-5 text-sm text-muted">
            {discord && <>{discord.members} members in our Discord</>}
            {discord && latest && <span> · </span>}
            {latest && (
              <>
                Latest: {latest.title} ({latest.date}) · <Link to="/news">News and patch notes</Link>
              </>
            )}
          </p>
        </div>
      </Section>
    </>
  );
}
