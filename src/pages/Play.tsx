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
    <ol className="grid gap-3">
      {steps.map((step, i) => (
        <li key={step} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-ember/70 text-sm font-extrabold text-ember"
          >
            {i + 1}
          </span>
          <span className="pt-0.5">
            <RichText text={step} />
          </span>
        </li>
      ))}
    </ol>
  );
}

function ContentLink({ to, children }: { to: string; children: string }) {
  return to === "discord" ? (
    <a href={site.discordUrl} target="_blank" rel="noopener noreferrer">
      {children} &rarr;
    </a>
  ) : (
    <Link to={to}>{children} &rarr;</Link>
  );
}

export default function Play() {
  const [edition, setEdition] = useState<Edition>("java");
  useEffect(() => setEdition(startEdition()), []);
  usePageTitle("Getting Started");

  const tab = (id: Edition, label: string) => (
    <button
      type="button"
      role="tab"
      aria-selected={edition === id}
      onClick={() => setEdition(id)}
      className={`flex-1 cursor-pointer rounded-lg px-4 py-2.5 font-extrabold ${
        edition === id ? "bg-ember text-[#1d1308]" : "text-ink hover:bg-panel2"
      }`}
    >
      {label}
    </button>
  );

  return (
    <>
      <PageHead title="Getting Started" eyebrow="Join BrindleWood">
        {play.intro} {play.introSub}
      </PageHead>

      {/* 1. Join */}
      <Section title="1. Join the server">
        <div className="mx-auto max-w-2xl">
          <div role="tablist" aria-label="Choose your edition" className="mb-5 flex gap-1 rounded-xl bg-deep p-1">
            {tab("java", "Java (PC)")}
            {tab("bedrock", "Bedrock (console, mobile, Windows)")}
          </div>
          <div role="tabpanel" className="rounded-2xl border border-panel2 bg-panel p-5 sm:p-7">
            <h3 className="mb-4 text-xl font-bold">{edition === "java" ? play.java.title : play.bedrock.title}</h3>
            <Steps steps={edition === "java" ? play.java.steps : play.bedrock.steps} />
            <div className="mt-6">
              {edition === "java" ? (
                <IpBox ip={site.javaIp} wide />
              ) : (
                <IpBox ip={site.bedrockFriend ?? ""} button="Copy name" wide />
              )}
            </div>
            {edition === "bedrock" && <p className="note mt-3">{play.bedrock.note}</p>}
          </div>
        </div>
      </Section>

      {/* 2. First session */}
      <Section title="2. Your first session" intro="You don't have to do everything at once. This order works well.">
        <ol className="grid gap-0 border-l border-ember/40 pl-6 sm:pl-8">
          {play.gettingStarted.map((g) => (
            <li key={g.title} className="relative pb-8 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute -left-[1.95rem] top-1.5 h-3 w-3 rounded-full bg-ember sm:-left-[2.45rem]"
              />
              <h3 className="text-xl font-bold">{g.title.replace(/^\d+\.\s*/, "")}</h3>
              <p className="mt-1 max-w-2xl text-muted">
                <RichText text={g.body} />
              </p>
              <p className="mt-1 font-bold">
                <ContentLink to={g.to}>{g.linkText}</ContentLink>
              </p>
            </li>
          ))}
        </ol>
        {play.firstHour && (
          <p className="mt-6 text-muted">
            {play.firstHour.text} <Link to="/guides/your-first-hour">{play.firstHour.linkText}</Link>
          </p>
        )}
      </Section>

      {/* 3. Trouble */}
      {play.trouble && (
        <Section title={play.troubleHeading}>
          <div className="grid gap-x-10 gap-y-6 md:grid-cols-3">
            {play.trouble.map((x) => (
              <div key={x.title} className="border-t border-ember/50 pt-3">
                <h3 className="text-lg font-bold">{x.title}</h3>
                <p className="mt-1 text-sm text-muted">{x.body}</p>
                {x.to && x.linkText && (
                  <p className="mt-2 text-sm font-bold">
                    <ContentLink to={x.to}>{x.linkText}</ContentLink>
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* 4. FAQ */}
      <Section title={play.faqHeading}>
        <div className="grid max-w-3xl gap-2">
          {faq.map((item) => (
            <details key={item.q} className="rounded-xl border border-panel2 bg-panel px-4 py-3 open:border-ember/40">
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
