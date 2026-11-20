import { Link, useParams } from "react-router-dom";
import PageHead from "../components/PageHead";
import Section from "../components/Section";
import { findGuide, guideCategories, guides } from "../content/guides";
import { site } from "../content";
import { usePageTitle } from "../hooks/usePageTitle";
import { Markdown, slugify } from "../lib/markdown";
import NotFound from "./NotFound";

export default function Guide() {
  const { slug } = useParams();
  const guide = findGuide(slug);
  usePageTitle(guide ? guide.title : "Guide not found");

  if (!guide) return <NotFound />;

  const category = guideCategories.find((c) => c.id === guide.category);
  const siblings = guides.filter((g) => g.category === guide.category);
  const at = siblings.findIndex((g) => g.slug === guide.slug);
  const prev = at > 0 ? siblings[at - 1] : null;
  const next = at >= 0 && at < siblings.length - 1 ? siblings[at + 1] : null;

  // "On this page" list for longer guides, built from the ## headings.
  const headings = [...guide.body.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim());
  const showContents = headings.length >= 3;

  return (
    <>
      <PageHead title={guide.title} eyebrow={category?.title}>
        {guide.summary}
      </PageHead>

      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-sm">
            <Link to="/guides">&larr; All guides</Link>
          </p>

          {showContents && (
            <nav aria-label="On this page" className="mb-6 rounded-xl border border-panel2 bg-panel px-5 py-4">
              <p className="eyebrow mb-2">On this page</p>
              <ul className="grid gap-1 sm:grid-cols-2">
                {headings.map((h) => (
                  <li key={h}>
                    <a href={`#${slugify(h)}`}>{h}</a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <article>
            <Markdown source={guide.body} />
          </article>

          {(prev || next) && (
            <nav aria-label="More guides" className="mt-10 grid gap-3 sm:grid-cols-2">
              {prev ? (
                <Link to={`/guides/${prev.slug}`} className="card no-underline hover:border-ember">
                  <span className="block text-sm text-muted">&larr; Previous</span>
                  <span className="font-bold text-ink">{prev.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link
                  to={`/guides/${next.slug}`}
                  className="card text-right no-underline hover:border-ember sm:col-start-2"
                >
                  <span className="block text-sm text-muted">Next &rarr;</span>
                  <span className="font-bold text-ink">{next.title}</span>
                </Link>
              )}
            </nav>
          )}

          <p className="note mt-8">
            Can't find your answer? Ask in our{" "}
            <a href={site.discordUrl} target="_blank" rel="noopener noreferrer">
              Discord
            </a>{" "}
            or open a ticket.
          </p>
        </div>
      </Section>
    </>
  );
}
