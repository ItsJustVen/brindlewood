import { Link } from "react-router-dom";
import IpBox from "../components/IpBox";
import PageHead from "../components/PageHead";
import Section from "../components/Section";
import { faq, play, site } from "../content";
import { usePageTitle } from "../hooks/usePageTitle";
import { RichText } from "../lib/text";

function Steps({ steps }: { steps: string[] }) {
  return (
    <ol className="mt-4 grid gap-3">
      {steps.map((step, i) => (
        <li
          key={i}
          className="relative rounded-xl border border-panel2 bg-panel py-3 pl-14 pr-4"
        >
          <span
            aria-hidden="true"
            className="absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-lg bg-teal font-display font-black text-[#08202a]"
          >
            {i + 1}
          </span>
          <RichText text={step} />
        </li>
      ))}
    </ol>
  );
}

export default function Play() {
  usePageTitle("How to Play");

  return (
    <>
      <PageHead title="How to Play">{play.intro}</PageHead>

      <Section>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
          <div className="card">
            <h2 className="text-xl font-bold">{play.java.title}</h2>
            <Steps steps={play.java.steps} />
          </div>
          <div className="card">
            <h2 className="text-xl font-bold">{play.bedrock.title}</h2>
            <Steps steps={play.bedrock.steps} />
            <p className="note mt-4">{play.bedrock.note}</p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <IpBox ip={site.javaIp} />
        </div>
      </Section>

      <Section title={play.gettingStartedHeading}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
          {play.gettingStarted.map((g) => (
            <div key={g.title} className="card">
              <h3 className="text-lg font-bold">{g.title}</h3>
              <p>{g.body}</p>
              <p>
                {g.to === "discord" ? (
                  <a href={site.discordUrl} target="_blank" rel="noopener noreferrer">
                    {g.linkText}
                  </a>
                ) : (
                  <Link to={g.to}>{g.linkText}</Link>
                )}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title={play.faqHeading}>
        <div className="grid gap-3">
          {faq.map((item) => (
            <details key={item.q} className="rounded-xl border border-panel2 bg-panel px-4 py-3">
              <summary className="cursor-pointer font-extrabold">{item.q}</summary>
              <p className="mt-2 text-muted">
                <RichText text={item.a} />
              </p>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}
