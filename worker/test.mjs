// Run with: node worker/test.mjs
import assert from "node:assert/strict";
import worker, { validate, webhookUrl } from "./index.js";

const env = { TURNSTILE_SECRET: "s", DISCORD_WEBHOOK_URL: "https://discord.test/hook", ALLOWED_ORIGINS: "https://brindlewood.net" };
let sent = [];
let humanOk = true;
let discordOk = true;
globalThis.fetch = async (url, init) => {
  if (String(url).includes("siteverify")) return new Response(JSON.stringify({ success: humanOk }));
  sent.push(JSON.parse(init.body));
  return new Response(null, { status: discordOk ? 204 : 500 });
};

const call = (body, origin = "https://brindlewood.net", method = "POST") =>
  worker.fetch(new Request("https://forms.test/", { method, headers: { origin, "content-type": "application/json" }, body: method === "POST" ? JSON.stringify(body) : undefined }), env);

const good = { type: "support", token: "t", fields: { username: "Steve", platform: "Java", topic: "Store purchase", contact: "steve#1", message: "Hello @everyone" } };

let r = await call(good);
assert.equal(r.status, 200);
let j = await r.json();
assert.ok(j.ok && /^BW-[A-Z2-9]{6}$/.test(j.ref));
assert.equal(sent.length, 1);
assert.deepEqual(sent[0].allowed_mentions, { parse: [] });
assert.ok(sent[0].embeds[0].title.includes(j.ref));
assert.equal(sent[0].embeds[0].description, "Hello @everyone");

r = await call(good, "https://evil.example");
assert.equal(r.status, 403);
assert.equal(sent.length, 1);

r = await call(null, "https://brindlewood.net", "OPTIONS");
assert.equal(r.status, 204);
assert.equal(r.headers.get("access-control-allow-origin"), "https://brindlewood.net");

r = await call({ ...good, fields: { ...good.fields, platform: "Console" } });
assert.equal(r.status, 400);
r = await call({ ...good, fields: { ...good.fields, message: "x".repeat(1501) } });
assert.equal(r.status, 400);
r = await call({ ...good, fields: { ...good.fields, username: "" } });
assert.equal(r.status, 400);
r = await call({ ...good, type: "nope" });
assert.equal(r.status, 400);

humanOk = false;
r = await call(good);
assert.equal(r.status, 400);
assert.equal(sent.length, 1);
humanOk = true;

r = await call({ ...good, website: "spam" });
assert.equal((await r.json()).ok, true);
assert.equal(sent.length, 1);

discordOk = false;
r = await call(good);
assert.equal(r.status, 502);
discordOk = true;

r = await call({ type: "bug", token: "t", fields: { username: "A", platform: "Bedrock", message: "boom" } });
assert.equal(r.status, 200);
assert.equal(validate("suggestion", { title: "x", message: "y" }).error, undefined);
assert.ok(validate("appeal", { username: "A" }).error);
assert.equal(webhookUrl({ DISCORD_WEBHOOK_URL: "https://discord.test/hook" }), "https://discord.test/hook");
assert.equal(webhookUrl({ DISCORD_WEBHOOK_URL: "https://discord.test/hook", DISCORD_THREAD_ID: "123" }), "https://discord.test/hook?thread_id=123");
console.log("worker tests passed");

// Patch notes
{
  const { cleanNote, pickNotes } = await import("./index.js");
  assert.equal(cleanNote("Hi <@123> <@&9> <#55> <:pog:77> @everyone  \n\n\n\nBye"), "Hi\n\nBye");
  assert.equal(cleanNote(null), "");
  const msgs = [
    { id: "3", type: 7, content: "joined" },
    { id: "2", type: 0, content: "", embeds: [{ title: "v2", description: "Fixed graves" }], timestamp: "2026-11-16T00:00:00Z" },
    { id: "1", type: 0, content: "**v1** <@1>", timestamp: "2026-11-15T00:00:00Z" },
  ];
  assert.deepEqual(pickNotes(msgs), [
    { id: "2", date: "2026-11-16T00:00:00Z", text: "v2\n\nFixed graves" },
    { id: "1", date: "2026-11-15T00:00:00Z", text: "**v1**" },
  ]);
  const get = (e) => worker.fetch(new Request("https://forms.test/patch-notes", { headers: { origin: "https://brindlewood.net" } }), e);
  let res = await get(env);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true, notes: [] });
  let asked = null;
  globalThis.fetch = async (url, init) => { asked = { url: String(url), auth: init.headers.authorization }; return new Response(JSON.stringify(msgs)); };
  res = await get({ ...env, DISCORD_BOT_TOKEN: "tok", PATCH_NOTES_CHANNEL_ID: "42" });
  const body = await res.json();
  assert.equal(body.notes.length, 2);
  assert.ok(asked.url.includes("/channels/42/messages") && asked.auth === "Bot tok");
  assert.equal(res.headers.get("access-control-allow-origin"), "https://brindlewood.net");
  assert.ok(!JSON.stringify(body).includes("tok"));
  globalThis.fetch = async () => new Response("nope", { status: 403 });
  res = await get({ ...env, DISCORD_BOT_TOKEN: "tok", PATCH_NOTES_CHANNEL_ID: "42" });
  assert.deepEqual(await res.json(), { ok: true, notes: [] });
  res = await worker.fetch(new Request("https://forms.test/other", { headers: { origin: "https://brindlewood.net" } }), env);
  assert.equal(res.status, 404);
  console.log("patch notes tests passed");
}
