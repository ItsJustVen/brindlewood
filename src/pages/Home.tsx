import { Link } from "react-router-dom";
import IpBox from "../components/IpBox";
import Section from "../components/Section";
import ServerStatus from "../components/ServerStatus";
import { announcements, home, kingdoms, site } from "../content";
import { usePageTitle } from "../hooks/usePageTitle";
import { asset } from "../lib/text";

export default function Home() {
  usePageTitle();
  const latest = [...announcements].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <>
      <section className="pb-10 text-center">
        <div className="relative h-[42vh] max-h-[480px] min-h-[240px] overflow-hidden">
          <img
            src={asset(home.heroImage)}
            alt={home.heroAlt}
            width={1600}
            height={877}
            className="h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(20,27,43,0) 40%, rgba(20,27,43,0.85) 85%, #141b2b 100%)" }}
          />
          <h1 className="absolute inset-x-0 bottom-3 px-4 text-4xl font-black sm:text-6xl">{site.name}</h1>
        </div>
        <div className="px-4">
        <p className="mx-auto mb-6 mt-3 max-w-xl text-lg text-muted">{site.tagline}</p>

        <ServerStatus />
        <div>
          <IpBox ip={site.javaIp} />
        </div>
        <p className="text-sm text-muted">
          Java &amp; Bedrock supported. <Link to="/play">See how to join</Link>
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <a className="btn btn-discord" href={site.discordUrl} target="_blank" rel="noopener noreferrer">
            Join our Discord
          </a>
          <a className="btn btn-wood" href={site.storeUrl} target="_blank" rel="noopener noreferrer">
            Visit the Store
          </a>
        </div>
        </div>
      </section>

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
        <Section title="Announcements">
          <div className="grid gap-4">
            {latest.map((a) => (
              <article key={`${a.date}-${a.title}`} className="card card-teal">
                <p className="text-sm font-bold uppercase tracking-widest text-steel">{a.date}</p>
                <h3 className="text-xl font-bold">{a.title}</h3>
                <p>{a.body}</p>
              </article>
            ))}
          </div>
        </Section>
      )}

      <Section title={home.kingdomsHeading} intro={home.kingdomsIntro}>
        <div className="grid gap-4 sm:grid-cols-2">
          {kingdoms.map((k) => (
            <div key={k.id} className="card">
              <span className="text-xs font-extrabold uppercase tracking-widest text-steel">{k.corner}</span>
              <h3 className="text-xl font-bold">{k.name}</h3>
              <p>{k.summary}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link className="btn btn-primary" to="/kingdoms">
            Explore the Kingdoms
          </Link>
        </div>
      </Section>

      <Section title={home.featuresHeading}>
        <div className="grid gap-x-12 gap-y-7 sm:grid-cols-2">
          {home.features.map((f) => (
            <div key={f.title} className="border-l-2 border-wood pl-4">
              <h3 className="text-lg font-bold">{f.title}</h3>
              <p className="mt-1 text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {home.staff.length > 0 && (
        <Section title={home.staffHeading} intro={home.staffIntro}>
          <dl className="grid gap-x-12 gap-y-5 sm:grid-cols-2">
            {home.staff.map((group) => (
              <div key={group.role} className="border-l-2 border-wood pl-4">
                <dt className="text-xs font-extrabold uppercase tracking-widest text-steel">{group.role}</dt>
                <dd className="mt-1 font-bold">{group.names.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Section>
      )}
    </>
  );
}
