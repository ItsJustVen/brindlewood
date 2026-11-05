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
  const related = guides.filter((g) => g.category === guide.category && g.slug !== guide.slug);

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

          {related.length > 0 && (
            <div className="mt-8">
              <h2 className="mb-3 text-xl font-bold text-teal">More in {category?.title}</h2>
              <ul className="flex flex-wrap gap-2">
                {related.map((g) => (
                  <li key={g.slug}>
                    <Link
                      to={`/guides/${g.slug}`}
                      className="block rounded-lg border border-steel bg-panel2 px-3 py-1.5 text-sm font-semibold text-ink no-underline hover:border-teal hover:text-teal"
                    >
                      {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="note mt-8">
            Still stuck? Ask in our{" "}
            <a href={site.discordUrl} target="_blank" rel="noopener noreferrer">
              Discord
            </a>
            , our team and players are happy to help.
          </p>
        </div>
      </Section>
    </>
  );
}
