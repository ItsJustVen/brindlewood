import PageHead from "../components/PageHead";
import Section from "../components/Section";
import { announcements, site } from "../content";
import { usePageTitle } from "../hooks/usePageTitle";

export default function News() {
  usePageTitle("News and Patch Notes");
  const posts = [...announcements].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHead title="News and Patch Notes">What's new on BrindleWood, newest first. The same posts appear in #patch-notes on our Discord.</PageHead>
      <Section>
        {posts.length === 0 ? (
          <p className="text-muted">
            No posts yet. Patch notes show up here as soon as we post them in{" "}
            <a href={site.discordUrl} target="_blank" rel="noopener noreferrer">our Discord</a>.
          </p>
        ) : (
          <div className="grid gap-4">
            {posts.map((a) => (
              <article key={`${a.date}-${a.title}`} className="card card-teal">
                <p className="text-sm font-bold uppercase tracking-widest text-steel">{a.date}</p>
                <h2 className="text-xl font-bold">{a.title}</h2>
                <p className="whitespace-pre-line">{a.body}</p>
              </article>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
