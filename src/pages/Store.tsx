import PageHead from "../components/PageHead";
import Section from "../components/Section";
import { site, store } from "../content";
import { usePageTitle } from "../hooks/usePageTitle";
import { RichText } from "../lib/text";

export default function Store() {
  usePageTitle("Store");

  return (
    <>
      <PageHead title="The BrindleWood Store" eyebrow="Support the server">
        {store.intro}
      </PageHead>

      {/* Trust first: what buying does and does not get you. */}
      <Section title={store.support.title}>
        <div className="grid max-w-3xl gap-4 text-muted">
          {store.support.paragraphs.map((p) => (
            <p key={p}>
              <RichText text={p} />
            </p>
          ))}
        </div>
      </Section>

      <Section title={store.featuredHeading}>
        <div className="grid gap-x-10 gap-y-6 md:grid-cols-3">
          {store.featured.map((f) => (
            <div key={f.title} className="border-t border-ember/50 pt-3">
              <h3 className="text-xl font-bold">{f.title}</h3>
              <p className="mt-1 text-muted">{f.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <a className="btn btn-primary" href={site.storeUrl} target="_blank" rel="noopener noreferrer">
            Open the store
          </a>
        </div>
      </Section>

      <Section title={store.categoriesHeading}>
        <dl className="grid gap-x-12 gap-y-4 sm:grid-cols-2">
          {store.categories.map((c) => (
            <div key={c.title} className="border-b border-panel2 pb-3">
              <dt className="font-bold">{c.title}</dt>
              <dd className="text-sm text-muted">{c.body}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 max-w-3xl text-sm text-muted">
          {store.footnote}{" "}
          <a href={site.storeUrl} target="_blank" rel="noopener noreferrer">
            Visit the store
          </a>
        </p>
      </Section>
    </>
  );
}
