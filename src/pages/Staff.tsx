import { Link } from "react-router-dom";
import PageHead from "../components/PageHead";
import Section from "../components/Section";
import { home } from "../content";
import { usePageTitle } from "../hooks/usePageTitle";
import { asset } from "../lib/text";

export default function Staff() {
  usePageTitle("About and Staff");
  return (
    <>
      <PageHead title={home.staffHeading} eyebrow={home.since}>
        {home.staffIntro}
      </PageHead>

      <Section title={home.aboutHeading}>
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="grid gap-4 text-muted">
            {home.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {home.staffImage && (
            <figure>
              <img
                src={asset(home.staffImage)}
                alt={home.staffImageAlt ?? ""}
                width={1600}
                height={900}
                loading="lazy"
                className="aspect-video w-full rounded-lg border border-panel2 object-cover"
              />
              {home.staffImageCaption && (
                <figcaption className="mt-1.5 text-sm text-muted">{home.staffImageCaption}</figcaption>
              )}
            </figure>
          )}
        </div>
      </Section>

      <Section title="The team">
        <dl className="grid gap-x-12 gap-y-6 sm:grid-cols-2">
          {home.staff.map((group) => (
            <div key={group.role} className="border-t border-ember/50 pt-3">
              <dt className="eyebrow">{group.role}</dt>
              <dd className="mt-1 text-lg font-bold">{group.names.join(", ")}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 text-muted">
          Need help? Open a ticket in our Discord. See <Link to="/contact">Contact</Link>.
        </p>
      </Section>
    </>
  );
}
