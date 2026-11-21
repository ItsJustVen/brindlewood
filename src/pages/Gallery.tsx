import { Link, useParams } from "react-router-dom";
import PageHead from "../components/PageHead";
import Section from "../components/Section";
import { findGallery } from "../content/galleries";
import { usePageTitle } from "../hooks/usePageTitle";
import { Markdown, slugify } from "../lib/markdown";
import NotFound from "./NotFound";

export default function Gallery() {
  const { slug } = useParams();
  const gallery = findGallery(slug);
  usePageTitle(gallery ? `${gallery.title} Gallery` : "Gallery not found");

  if (!gallery) return <NotFound />;

  // Jump links to each group, built from the headings.
  const headings = [...gallery.body.matchAll(/^###?\s+(.+)$/gm)].map((m) => m[1].trim());

  return (
    <>
      <PageHead title={gallery.title} eyebrow="Gallery">
        {gallery.summary}
      </PageHead>
      <Section>
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-sm">
            <Link to="/gallery">&larr; All galleries</Link>
            {gallery.guide && (
              <>
                {" "}
                &middot; <Link to={`/guides/${gallery.guide}`}>Read the guide</Link>
              </>
            )}
          </p>

          {headings.length >= 2 && (
            <nav aria-label="Jump to" className="mb-6 flex flex-wrap gap-2">
              {headings.map((h) => (
                <a
                  key={h}
                  href={`#${slugify(h)}`}
                  className="rounded-full border border-panel2 bg-panel px-4 py-1.5 text-sm font-bold no-underline hover:border-ember"
                >
                  {h}
                </a>
              ))}
            </nav>
          )}

          <article>
            <Markdown source={gallery.body} photos={gallery.style === "photos"} />
          </article>
        </div>
      </Section>
    </>
  );
}
