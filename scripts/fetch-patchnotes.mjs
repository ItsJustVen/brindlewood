// Copies the newest #patch-notes post from Discord into src/content/announcements.json.
// Needs two environment variables (set as GitHub secrets, see README):
//   DISCORD_BOT_TOKEN  and  PATCHNOTES_CHANNEL_ID
// If either is missing the script does nothing, so the site is never affected.
import { readFileSync, writeFileSync } from "node:fs";

const token = process.env.DISCORD_BOT_TOKEN;
const channel = process.env.PATCHNOTES_CHANNEL_ID;
if (!token || !channel) {
  console.log("Patch notes: secrets not set, skipping.");
  process.exit(0);
}

const res = await fetch(`https://discord.com/api/v10/channels/${channel}/messages?limit=5`, {
  headers: { Authorization: `Bot ${token}` },
});
if (!res.ok) {
  console.error(`Patch notes: Discord answered ${res.status}. Leaving the site unchanged.`);
  process.exit(0);
}
const messages = await res.json();
const post = messages.find((m) => (m.content || "").trim().length > 0);
if (!post) {
  console.log("Patch notes: no text post found.");
  process.exit(0);
}

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

const lines = clean(post.content).split("\n").map((l) => l.trim()).filter(Boolean);
if (lines.length === 0) process.exit(0);
const title = lines[0].slice(0, 90);
let body = lines.slice(1).join(" ");
if (body.length > 500) body = body.slice(0, 497).replace(/\s+\S*$/, "") + "...";
if (!body) body = "See #patch-notes in our Discord for the details.";

const entry = { date: post.timestamp.slice(0, 10), title, body };
const file = new URL("../src/content/announcements.json", import.meta.url);
const next = JSON.stringify([entry], null, 2) + "\n";
if (readFileSync(file, "utf8") !== next) {
  writeFileSync(file, next);
  console.log(`Patch notes: updated to "${title}".`);
} else {
  console.log("Patch notes: already up to date.");
}
