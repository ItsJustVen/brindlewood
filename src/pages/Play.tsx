import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { startEdition, type Edition } from "../components/ConnectBox";
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
  const [edition, setEdition] = useState<Edition>("java");
  useEffect(() => setEdition(startEdition()), []);
  usePageTitle("Getting Started");

  return (
    <>
      <PageHead title="Getting Started">
        {play.intro}
        {play.introSub && (
          <>
            <br />
            {play.introSub}
          </>
        )}
      </PageHead>

      <Section>
        <div className="mx-auto max-w-2xl">
          <div role="tablist" aria-label="Choose your edition" className="mb-4 flex justify-center gap-2">
            {(["java", "bedrock"] as Edition[]).map((id) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={edition === id}
                onClick={() => setEdition(id)}
                className={`cursor-pointer rounded-lg px-5 py-2 font-extrabold ${
                  edition === id ? "bg-teal text-[#08202a]" : "bg-panel text-ink hover:bg-panel2"
                }`}
              >
                {id === "java" ? "Java (PC)" : "Bedrock (console, mobile, Windows)"}
              </button>
            ))}
          </div>
          <div role="tabpanel" className="card">
            <h2 className="text-xl font-bold">{edition === "java" ? play.java.title : play.bedrock.title}</h2>
            <Steps steps={edition === "java" ? play.java.steps : play.bedrock.steps} />
            {edition === "bedrock" && <p className="note mt-4">{play.bedrock.note}</p>}
          </div>
          <div className="mt-6 text-center">
            {edition === "java" ? (
              <IpBox ip={site.javaIp} />
            ) : (
              <IpBox ip={site.bedrockFriend ?? ""} button="Copy name" />
            )}
          </div>
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
        {play.firstHour && (
          <p className="mt-5">
            {play.firstHour.text} <Link to="/guides/your-first-hour">{play.firstHour.linkText}</Link>
          </p>
        )}
      </Section>

      {play.trouble && (
        <Section title={play.troubleHeading}>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
            {play.trouble.map((x) => (
              <div key={x.title} className="card">
                <h3 className="text-lg font-bold">{x.title}</h3>
                <p>{x.body}</p>
                {x.to && x.linkText && (
                  <p>
                    {x.to === "discord" ? (
                      <a href={site.discordUrl} target="_blank" rel="noopener noreferrer">{x.linkText}</a>
                    ) : (
                      <Link to={x.to}>{x.linkText}</Link>
                    )}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

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
