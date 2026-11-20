import PageHead from "../components/PageHead";
import Section from "../components/Section";
import { announcements, site } from "../content";
import { usePageTitle } from "../hooks/usePageTitle";

export default function News() {
  usePageTitle("News and Patch Notes");
  const posts = [...announcements].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHead title="News and Patch Notes" eyebrow="What's new">
        Newest first. The same posts appear in #patch-notes on our Discord.
      </PageHead>
      <Section>
        {posts.length === 0 ? (
          <p className="text-muted">
            No posts yet. Patch notes show up here as soon as we post them in{" "}
            <a href={site.discordUrl} target="_blank" rel="noopener noreferrer">our Discord</a>.
          </p>
        ) : (
          <div className="grid max-w-3xl gap-3">
            {posts.map((a, i) => (
              <details
                key={`${a.date}-${a.title}`}
                open={i === 0}
                className="rounded-xl border border-panel2 bg-panel px-5 py-4 open:border-ember/40"
              >
                <summary className="cursor-pointer">
                  <span className="eyebrow mr-3">{a.date}</span>
                  <span className="text-lg font-extrabold">{a.title}</span>
                </summary>
                <p className="mt-3 whitespace-pre-line text-muted">{a.body}</p>
              </details>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
