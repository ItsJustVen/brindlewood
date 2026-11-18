// Copies recent #patch-notes posts from Discord into src/content/announcements.json.
// Needs two environment variables (set as GitHub secrets, see README):
//   DISCORD_BOT_TOKEN  and  PATCHNOTES_CHANNEL_ID
// If either is missing the script does nothing, so the site is never affected.
// Handles normal text posts and bot embeds. New posts are added to the list and old ones are kept.
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const token = process.env.DISCORD_BOT_TOKEN;
const channel = process.env.PATCHNOTES_CHANNEL_ID;
if (!token || !channel) {
  console.log("Patch notes: secrets not set, skipping.");
  process.exit(0);
}

const res = await fetch(`https://discord.com/api/v10/channels/${channel}/messages?limit=30`, {
  headers: { Authorization: `Bot ${token}` },
});
if (!res.ok) {
  console.error(`Patch notes: Discord answered ${res.status}. Leaving the site unchanged.`);
  process.exit(0);
}
const messages = await res.json();

// Plain text only: remove pings, channel links, links and Discord formatting.
const clean = (s) =>
  s
    .replace(/<@[!&]?\d+>|<#\d+>|@everyone|@here/g, "")
    .replace(/<a?:\w+:\d+>/g, "")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[*_~`>|]/g, "")
    .replace(/^#{1,3}\s*/gm, "")
    .replace(/[ \t]+/g, " ")
    .trim();

// The text of a post: its message text, or the title, description and fields of its first embed.
function textOf(m) {
  if ((m.content || "").trim()) return m.content;
  const e = (m.embeds || [])[0];
  if (!e) return "";
  const parts = [e.title, e.description];
  for (const f of e.fields || []) parts.push(f.name, f.value);
  return parts.filter(Boolean).join("\n");
}

// The date in US Eastern time, so a post made at 8 PM on the 16th is dated the 16th.
const day = (iso) => new Date(iso).toLocaleDateString("en-CA", { timeZone: "America/New_York" });

const found = [];
for (const m of messages) {
  const lines = clean(textOf(m)).split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) continue;
  const title = lines[0].slice(0, 90);
  let body = lines.slice(1).join("\n");
  if (body.length > 1800) body = body.slice(0, 1797).replace(/\s+\S*$/, "") + "...";
  if (!body) body = "See #patch-notes in our Discord for the details.";
  found.push({ date: day(m.timestamp), title, body });
}
if (found.length === 0) {
  console.log("Patch notes: no text post found.");
  process.exit(0);
}

const file = new URL("../src/content/announcements.json", import.meta.url);
const existing = existsSync(file) ? JSON.parse(readFileSync(file, "utf8") || "[]") : [];
const key = (a) => `${a.date}|${a.title}`;
const seen = new Set(existing.map(key));
const merged = [...existing, ...found.filter((a) => !seen.has(key(a)))]
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 40);
const next = JSON.stringify(merged, null, 2) + "\n";
if (!existsSync(file) || readFileSync(file, "utf8") !== next) {
  writeFileSync(file, next);
  console.log(`Patch notes: now ${merged.length} posts, newest "${merged[0].title}".`);
} else {
  console.log("Patch notes: already up to date.");
}
