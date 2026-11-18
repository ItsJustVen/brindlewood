import PageHead from "../components/PageHead";
import Section from "../components/Section";
import { rules } from "../content";
import { usePageTitle } from "../hooks/usePageTitle";
import { RichText } from "../lib/text";

export default function Rules() {
  usePageTitle("Server Rules");

  return (
    <>
      <PageHead title="Server Rules">
        <RichText text={rules.intro} />
      </PageHead>

      <Section>
        <ol className="grid gap-6">
          {rules.items.map((r, i) => (
            <li key={r.title} className="border-l-2 border-wood pl-4">
              <h2 className="text-lg font-bold">
                {i + 1}. {r.title}
              </h2>
              <p className="text-muted">{r.body}</p>
              {r.note && (
                <p className="note mt-3">
                  <RichText text={r.note} />
                </p>
              )}
            </li>
          ))}
        </ol>

        <div className="card mt-6">
          <h2 className="text-lg font-bold">{rules.enforcement.title}</h2>
          <p>{rules.enforcement.body}</p>
        </div>

        {rules.ages && (
          <div className="card mt-6">
            <h2 className="text-lg font-bold">Ages</h2>
            <p><RichText text={rules.ages} /></p>
          </div>
        )}

        <p className="mt-8 text-center text-lg">
          <RichText text={rules.closing} />
        </p>
      </Section>
    </>
  );
}
