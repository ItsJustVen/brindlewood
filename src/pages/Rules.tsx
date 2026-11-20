import PageHead from "../components/PageHead";
import Section from "../components/Section";
import { rules } from "../content";
import { usePageTitle } from "../hooks/usePageTitle";
import { RichText } from "../lib/text";

export default function Rules() {
  usePageTitle("Server Rules");

  return (
    <>
      <PageHead title="Server Rules" eyebrow="Discord and Minecraft">
        <RichText text={rules.intro} />
      </PageHead>

      <Section>
        <ol className="grid gap-x-12 gap-y-7 md:grid-cols-2">
          {rules.items.map((r, i) => (
            <li key={r.title} className="flex gap-4">
              <span
                aria-hidden="true"
                className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ember/70 font-display text-sm font-black text-ember"
              >
                {i + 1}
              </span>
              <div>
                <h2 className="text-xl font-bold">{r.title}</h2>
                <p className="mt-1 text-muted">{r.body}</p>
                {r.note && (
                  <p className="note mt-3">
                    <RichText text={r.note} />
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section title={rules.enforcement.title}>
        {rules.ladder && (
          <ol className="mb-5 grid max-w-3xl gap-3 sm:grid-cols-3">
            {rules.ladder.map((step, i) => (
              <li key={step} className="rounded-lg border border-panel2 bg-panel px-4 py-3">
                <span className="eyebrow block">Step {i + 1}</span>
                <span className="font-bold">{step}</span>
              </li>
            ))}
          </ol>
        )}
        <p className="max-w-3xl text-muted">{rules.enforcement.body}</p>
      </Section>

      {rules.ages && (
        <Section title="Ages">
          <p className="max-w-3xl text-sm text-muted">
            <RichText text={rules.ages} />
          </p>
        </Section>
      )}

      <Section>
        <p className="text-lg">
          <RichText text={rules.closing} />
        </p>
      </Section>
    </>
  );
}
