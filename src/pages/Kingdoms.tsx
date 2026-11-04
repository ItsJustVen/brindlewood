import { Link } from "react-router-dom";
import PageHead from "../components/PageHead";
import Section from "../components/Section";
import { kingdoms } from "../content";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Kingdoms() {
  usePageTitle("The Four Kingdoms");

  return (
    <>
      <PageHead title="The Four Kingdoms">
        One kingdom in each corner of the world. Choose where your story begins.
      </PageHead>

      <Section>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
          {kingdoms.map((k) => (
            <article key={k.id} id={k.id} className="card card-teal">
              <span className="text-xs font-extrabold uppercase tracking-widest text-steel">{k.corner}</span>
              <h2 className="text-2xl font-bold">{k.name}</h2>
              <p>{k.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link className="btn btn-primary" to="/play">
            Ready to Join?
          </Link>
        </div>
      </Section>
    </>
  );
}
