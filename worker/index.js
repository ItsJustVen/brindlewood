// BrindleWood forms Worker.
// Receives a form from the website, checks it is from a human (Cloudflare Turnstile),
// and posts it to a private staff channel in Discord. Nothing is stored here.
//
// Secrets (set in Cloudflare, never in this file):
//   TURNSTILE_SECRET     the Turnstile secret key
//   DISCORD_WEBHOOK_URL  the webhook URL of the staff channel
// Settings (plain text):
//   ALLOWED_ORIGINS      comma separated, for example https://brindlewood.net
//   DISCORD_THREAD_ID    optional, the forum post (thread) to post into

const FORMS = {
  support: {
    label: "Support request",
    color: 0x2fd6d0,
    fields: {
      username: { label: "Minecraft username", max: 40, required: true, inline: true },
      platform: { label: "Platform", max: 20, required: true, inline: true, options: ["Java", "Bedrock"] },
      topic: { label: "Topic", max: 40, required: true, inline: true, options: ["Account or linking", "Store purchase", "Grief or rollback", "Something else"] },
      contact: { label: "Contact (Discord name)", max: 80, required: true, inline: true },
      message: { label: "Details", max: 1500, required: true },
    },
  },
  suggestion: {
    label: "Suggestion",
    color: 0x6fd36f,
    fields: {
      username: { label: "Minecraft username", max: 40, required: false, inline: true },
      contact: { label: "Contact (Discord name)", max: 80, required: false, inline: true },
      title: { label: "Idea", max: 100, required: true },
      message: { label: "Details", max: 1500, required: true },
    },
  },
  bug: {
    label: "Bug report",
    color: 0xef5350,
    fields: {
      username: { label: "Minecraft username", max: 40, required: true, inline: true },
      platform: { label: "Platform", max: 20, required: true, inline: true, options: ["Java", "Bedrock"] },
      contact: { label: "Contact (Discord name)", max: 80, required: false, inline: true },
      where: { label: "Where it happened", max: 150, required: false },
      message: { label: "What happened and how to repeat it", max: 1500, required: true },
    },
  },
  appeal: {
    label: "Ban appeal",
    color: 0xf5c542,
    fields: {
      username: { label: "Minecraft username", max: 40, required: true, inline: true },
      platform: { label: "Platform", max: 20, required: true, inline: true, options: ["Java", "Bedrock"] },
      contact: { label: "Contact (Discord name)", max: 80, required: true, inline: true },
      reason: { label: "What were you banned for?", max: 300, required: true },
      message: { label: "Why should we lift it?", max: 1500, required: true },
    },
  },
};

const REF_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function json(body, status, origin) {
  const headers = { "content-type": "application/json" };
  if (origin) {
    headers["access-control-allow-origin"] = origin;
    headers["vary"] = "origin";
  }
  return new Response(JSON.stringify(body), { status, headers });
}

function reference() {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return "BW-" + Array.from(bytes, (b) => REF_CHARS[b % REF_CHARS.length]).join("");
}

// Cleans one value. Returns the text, or null when it is not valid.
function clean(spec, value) {
  const text = typeof value === "string" ? value.replace(/\r\n?/g, "\n").trim() : "";
  if (!text) return spec.required ? null : "";
  if (text.length > spec.max) return null;
  if (spec.options && !spec.options.includes(text)) return null;
  return text;
}

export function validate(type, input) {
  const form = FORMS[type];
  if (!form) return { error: "Unknown form." };
  const values = {};
  for (const [key, spec] of Object.entries(form.fields)) {
    const v = clean(spec, input[key]);
    if (v === null) return { error: `Please check "${spec.label}".` };
    values[key] = v;
  }
  return { form, values };
}

export function buildMessage(type, form, values, ref) {
  const fields = [];
  let description = "";
  for (const [key, spec] of Object.entries(form.fields)) {
    const v = values[key];
    if (!v) continue;
    if (key === "message") {
      description = v;
    } else {
      fields.push({ name: spec.label, value: v.slice(0, 1000), inline: !!spec.inline });
    }
  }
  return {
    allowed_mentions: { parse: [] },
    embeds: [
      {
        title: `${form.label} (${ref})`,
        description: description.slice(0, 4000),
        color: form.color,
        fields,
        footer: { text: "Sent from brindlewood.net" },
        timestamp: new Date().toISOString(),
      },
    ],
  };
}

// The webhook belongs to a forum channel, so posts go into one thread (DISCORD_THREAD_ID).
export function webhookUrl(env) {
  const url = new URL(env.DISCORD_WEBHOOK_URL);
  if (env.DISCORD_THREAD_ID) url.searchParams.set("thread_id", env.DISCORD_THREAD_ID);
  return url.toString();
}

async function humanCheck(env, token, ip) {
  if (!token || typeof token !== "string") return false;
  const body = new FormData();
  body.append("secret", env.TURNSTILE_SECRET);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  const data = await res.json();
  return data.success === true;
}

export default {
  async fetch(request, env) {
    const allowed = (env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);
    const origin = request.headers.get("origin") || "";
    const okOrigin = allowed.includes(origin) ? origin : null;

    if (request.method === "OPTIONS") {
      if (!okOrigin) return new Response(null, { status: 403 });
      return new Response(null, {
        status: 204,
        headers: {
          "access-control-allow-origin": okOrigin,
          "access-control-allow-methods": "POST, OPTIONS",
          "access-control-allow-headers": "content-type",
          "access-control-max-age": "86400",
          vary: "origin",
        },
      });
    }

    if (request.method !== "POST") return json({ ok: false, error: "Not found." }, 404, okOrigin);
    if (!okOrigin) return json({ ok: false, error: "Not allowed." }, 403, null);

    let input;
    try {
      const raw = await request.text();
      if (raw.length > 12000) return json({ ok: false, error: "That is too long." }, 413, okOrigin);
      input = JSON.parse(raw);
    } catch {
      return json({ ok: false, error: "That did not look right. Please try again." }, 400, okOrigin);
    }
    if (!input || typeof input !== "object") {
      return json({ ok: false, error: "That did not look right. Please try again." }, 400, okOrigin);
    }

    // Hidden field that real people leave empty. Pretend it worked.
    if (input.website) return json({ ok: true, ref: reference() }, 200, okOrigin);

    const { form, values, error } = validate(input.type, input.fields && typeof input.fields === "object" ? input.fields : {});
    if (error) return json({ ok: false, error }, 400, okOrigin);

    let human = false;
    try {
      human = await humanCheck(env, input.token, request.headers.get("cf-connecting-ip"));
    } catch {
      return json({ ok: false, error: "We could not check that you are human. Please try again." }, 502, okOrigin);
    }
    if (!human) {
      return json({ ok: false, error: "The human check failed. Please refresh the page and try again." }, 400, okOrigin);
    }

    const ref = reference();
    let res;
    try {
      res = await fetch(webhookUrl(env), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(buildMessage(input.type, form, values, ref)),
      });
    } catch {
      return json({ ok: false, error: "We could not send that. Please try again soon, or use our Discord." }, 502, okOrigin);
    }
    if (!res.ok) {
      return json({ ok: false, error: "We could not send that. Please try again soon, or use our Discord." }, 502, okOrigin);
    }
    return json({ ok: true, ref }, 200, okOrigin);
  },
};
