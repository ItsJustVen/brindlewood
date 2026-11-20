import { Link, useParams } from "react-router-dom";
import PageHead from "../components/PageHead";
import Section from "../components/Section";
import { findGuide, guideCategories, guides } from "../content/guides";
import { site } from "../content";
import { usePageTitle } from "../hooks/usePageTitle";
import { Markdown } from "../lib/markdown";
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

  return (
    <>
      <PageHead title={guide.title}>{guide.summary}</PageHead>

      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-sm">
            <Link to="/guides">&larr; All guides</Link>
            {category && <span className="text-muted"> &middot; {category.title}</span>}
          </p>

          <article className="card">
            <Markdown source={guide.body} />
          </article>

          {(prev || next) && (
            <nav aria-label="More guides" className="mt-8 grid gap-3 sm:grid-cols-2">
              {prev ? (
                <Link
                  to={`/guides/${prev.slug}`}
                  className="card card-teal no-underline hover:border-ember"
                >
                  <span className="block text-sm text-muted">&larr; Previous</span>
                  <span className="font-bold text-ink">{prev.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link
                  to={`/guides/${next.slug}`}
                  className="card card-teal text-right no-underline hover:border-ember sm:col-start-2"
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
