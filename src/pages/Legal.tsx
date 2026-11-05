import PageHead from "../components/PageHead";
import Section from "../components/Section";
import { getPage } from "../content/guides";
import { usePageTitle } from "../hooks/usePageTitle";
import { Markdown } from "../lib/markdown";
import NotFound from "./NotFound";

export default function Legal({ slug }: { slug: "privacy" | "terms" }) {
  const doc = getPage(slug);
  usePageTitle(doc?.title);
  if (!doc) return <NotFound />;
  return (
    <>
      <PageHead title={doc.title}>{doc.summary}</PageHead>
      <Section>
        <div className="mx-auto max-w-3xl">
          <article className="card">
            <Markdown source={doc.body} />
          </article>
          {doc.updated && <p className="mt-4 text-center text-sm text-muted">Last updated {doc.updated}</p>}
        </div>
      </Section>
    </>
  );
}
