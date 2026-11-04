import PageHead from "../components/PageHead";
import Section from "../components/Section";
import { site, store } from "../content";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Store() {
  usePageTitle("Store");

  return (
    <>
      <PageHead title="The BrindleWood Store">{store.intro}</PageHead>

      <Section title={store.featuredHeading}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
          {store.featured.map((f) => (
            <div key={f.title} className="card">
              <div aria-hidden="true" className="mb-1 text-3xl">{f.icon}</div>
              <h3 className="text-lg font-bold">{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <a className="btn btn-wood" href={site.storeUrl} target="_blank" rel="noopener noreferrer">
            Open the Store
          </a>
        </div>
      </Section>

      <Section title={store.categoriesHeading}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-5">
          {store.categories.map((c) => (
            <div key={c.title} className="card">
              <h3 className="text-lg font-bold">{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="card card-teal">
          <h2 className="text-xl font-bold">{store.support.title}</h2>
          {store.support.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <p className="mt-5 text-center text-sm text-muted">
          {store.footnote}{" "}
          <a href={site.storeUrl} target="_blank" rel="noopener noreferrer">
            Visit the store
          </a>
        </p>
      </Section>
    </>
  );
}
