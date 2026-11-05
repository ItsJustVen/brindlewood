// Run with: node worker/test.mjs
import assert from "node:assert/strict";
import worker, { validate } from "./index.js";

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
console.log("worker tests passed");
