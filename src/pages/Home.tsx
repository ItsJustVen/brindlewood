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
      <section className="px-4 pb-10 pt-14 text-center">
        <img
          src={asset("logo.png")}
          alt="BrindleWood castle logo"
          width={320}
          height={320}
          className="mx-auto w-[min(320px,70vw)] motion-safe:animate-float drop-shadow-[0_0_30px_rgba(47,214,208,0.35)]"
        />
        <h1 className="mb-2 text-5xl font-black sm:text-6xl">{site.name}</h1>
        <p className="mx-auto mb-6 max-w-xl text-lg text-muted">{site.tagline}</p>

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
      </section>

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
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-5">
          {kingdoms.map((k) => (
            <div key={k.id} className="card card-teal">
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
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-5">
          {home.features.map((f) => (
            <div key={f.title} className="card">
              <div aria-hidden="true" className="mb-1 text-3xl">{f.icon}</div>
              <h3 className="text-lg font-bold">{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
