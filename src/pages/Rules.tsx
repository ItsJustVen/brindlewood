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
        <ul className="grid gap-3">
          {rules.items.map((r) => (
            <li
              key={r.title}
              className="relative rounded-xl border border-panel2 border-l-4 border-l-teal bg-panel py-4 pl-[4.25rem] pr-4"
            >
              <span
                aria-hidden="true"
                className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-lg bg-panel2 text-2xl"
              >
                {r.icon}
              </span>
              <h2 className="text-lg font-bold text-teal">{r.title}</h2>
              <p className="text-muted">{r.body}</p>
              {r.note && (
                <p className="note mt-3">
                  <RichText text={r.note} />
                </p>
              )}
            </li>
          ))}
        </ul>

        <div className="card mt-6">
          <h2 className="text-lg font-bold">{rules.enforcement.title}</h2>
          <p>{rules.enforcement.body}</p>
        </div>

        <p className="mt-8 text-center text-lg">
          <RichText text={rules.closing} />
        </p>
      </Section>
    </>
  );
}
