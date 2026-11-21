import { Link } from "react-router-dom";
import PageHead from "../components/PageHead";
import Section from "../components/Section";
import { galleries } from "../content/galleries";
import { usePageTitle } from "../hooks/usePageTitle";
import { asset } from "../lib/text";

export default function Galleries() {
  usePageTitle("Gallery");
  return (
    <>
      <PageHead title="Gallery" eyebrow="Pictures">
        Custom items, tool skins and screenshots from around BrindleWood.
      </PageHead>
      <Section>
        <ul className="grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {galleries.map((g) => (
            <li key={g.slug}>
              <Link
                to={`/gallery/${g.slug}`}
                className="card block h-full no-underline hover:border-ember"
              >
                {g.style === "photos" && g.cover && (
                  <img
                    src={asset(g.cover)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="mb-3 aspect-video w-full rounded-lg object-cover"
                  />
                )}
                {g.style === "icons" && g.preview.length > 0 && (
                  <span className="mb-3 grid grid-cols-4 gap-2 rounded-lg bg-deep p-3" aria-hidden="true">
                    {g.preview.slice(0, 8).map((src) => (
                      <img
                        key={src}
                        src={asset(src)}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="h-12 w-12"
                        style={{ imageRendering: "pixelated" }}
                      />
                    ))}
                  </span>
                )}
                <span className="block text-xl font-bold text-ink">{g.title}</span>
                <span className="mt-1 block text-sm text-muted">{g.summary}</span>
                <span className="mt-2 block text-sm font-bold text-ember">{g.count} pictures</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
