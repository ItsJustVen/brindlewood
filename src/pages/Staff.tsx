import { Link } from "react-router-dom";
import PageHead from "../components/PageHead";
import Section from "../components/Section";
import { home } from "../content";
import { usePageTitle } from "../hooks/usePageTitle";
import { asset } from "../lib/text";

export default function Staff() {
  usePageTitle("Staff");
  return (
    <>
      <PageHead title={home.staffHeading}>{home.staffIntro}</PageHead>
      <Section>
        {home.staffImage && (
          <figure className="mb-6 max-w-2xl">
            <img
              src={asset(home.staffImage)}
              alt={home.staffImageAlt ?? ""}
              width={1600}
              height={900}
              className="aspect-video w-full rounded-lg border border-panel2 object-cover"
            />
            {home.staffImageCaption && <figcaption className="mt-1.5 text-sm text-muted">{home.staffImageCaption}</figcaption>}
          </figure>
        )}
        <dl className="grid gap-x-12 gap-y-5 sm:grid-cols-2">
          {home.staff.map((group) => (
            <div key={group.role} className="border-l-2 border-wood pl-4">
              <dt className="text-xs font-extrabold uppercase tracking-widest text-steel">{group.role}</dt>
              <dd className="mt-1 font-bold">{group.names.join(", ")}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-muted">Need help? Open a ticket in our Discord. See <Link to="/contact">Contact</Link>.</p>
      </Section>
    </>
  );
}
