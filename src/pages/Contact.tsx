import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import PageHead from "../components/PageHead";
import Section from "../components/Section";
import { site } from "../content";
import { forms } from "../content/forms";
import { usePageTitle } from "../hooks/usePageTitle";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
  }
}

const SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

function loadTurnstile(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.turnstile) return resolve();
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT}"]`);
    const script = existing ?? document.createElement("script");
    script.addEventListener("load", () => resolve());
    script.addEventListener("error", () => reject(new Error("Turnstile did not load")));
    if (!existing) {
      script.src = SCRIPT;
      script.async = true;
      document.head.appendChild(script);
    }
  });
}

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "done"; ref: string } | { kind: "error"; message: string };

const inputClass =
  "w-full rounded-xl border border-steel bg-panel px-4 py-2.5 text-ink placeholder:text-muted";

export default function Contact() {
  usePageTitle("Contact and Support");
  const enabled = Boolean(site.formsUrl && site.turnstileSiteKey);
  const [formId, setFormId] = useState(forms[0].id);
  const [values, setValues] = useState<Record<string, string>>({});
  const [honey, setHoney] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const widget = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);

  const form = forms.find((f) => f.id === formId) ?? forms[0];

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    loadTurnstile()
      .then(() => {
        if (cancelled || !widget.current || !window.turnstile || widgetId.current) return;
        widgetId.current = window.turnstile.render(widget.current, {
          sitekey: site.turnstileSiteKey,
          callback: (t: string) => setToken(t),
          "expired-callback": () => setToken(""),
          "error-callback": () => setToken(""),
        });
      })
      .catch(() => setStatus({ kind: "error", message: "The human check could not load. Please refresh, or use our Discord." }));
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  function pick(id: string) {
    setFormId(id);
    setValues({});
    setStatus({ kind: "idle" });
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (status.kind === "sending") return;
    if (!token) {
      setStatus({ kind: "error", message: "Please complete the human check first." });
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch(site.formsUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ type: form.id, fields: values, token, website: honey }),
      });
      const data = (await res.json()) as { ok?: boolean; ref?: string; error?: string };
      if (data.ok && data.ref) {
        setStatus({ kind: "done", ref: data.ref });
        setValues({});
      } else {
        setStatus({ kind: "error", message: data.error ?? "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ kind: "error", message: "We could not reach the server. Please try again, or use our Discord." });
    }
    setToken("");
    if (window.turnstile) window.turnstile.reset(widgetId.current);
  }

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-1.5 text-sm font-bold ${
      active
        ? "border-teal bg-teal text-[#08202a]"
        : "border-steel bg-panel2 text-ink hover:border-teal hover:text-teal"
    }`;

  return (
    <>
      <PageHead title="Contact and Support">
        Send a message to the BrindleWood staff without leaving the website. For anything urgent,
        open a ticket in our Discord.
      </PageHead>

      <Section>
        {!enabled ? (
          <div className="card card-teal mx-auto max-w-xl text-center">
            <h2 className="text-xl font-bold">Forms are coming soon</h2>
            <p>
              For now, please open a ticket in our{" "}
              <a href={site.discordUrl} target="_blank" rel="noopener noreferrer">
                Discord
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="mx-auto max-w-2xl">
            <div className="mb-6 flex flex-wrap justify-center gap-2" role="group" aria-label="Choose a form">
              {forms.map((f) => (
                <button key={f.id} type="button" className={chip(f.id === formId)} onClick={() => pick(f.id)}>
                  {f.tab}
                </button>
              ))}
            </div>

            {status.kind === "done" ? (
              <div className="card card-teal text-center" role="status">
                <h2 className="text-xl font-bold">Thank you, we got it</h2>
                <p>
                  Your reference is <strong>{status.ref}</strong>. Staff will reply on Discord, so make sure
                  you are in our server and can receive messages from members.
                </p>
                <p className="mt-3">
                  <button type="button" className={chip(false)} onClick={() => setStatus({ kind: "idle" })}>
                    Send another
                  </button>
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="card card-teal" noValidate={false}>
                <h2 className="text-2xl font-bold">{form.title}</h2>
                <p className="mb-4">{form.intro}</p>

                <div className="grid gap-4">
                  {form.fields.map((f) => {
                    const id = `f-${form.id}-${f.key}`;
                    const value = values[f.key] ?? "";
                    const set = (v: string) => setValues((prev) => ({ ...prev, [f.key]: v }));
                    return (
                      <div key={f.key}>
                        <label htmlFor={id} className="mb-1 block font-bold text-ink">
                          {f.label}
                        </label>
                        {f.options ? (
                          <select
                            id={id}
                            required={f.required}
                            value={value}
                            onChange={(e) => set(e.target.value)}
                            className={inputClass}
                          >
                            <option value="">Choose one</option>
                            {f.options.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                        ) : f.long ? (
                          <textarea
                            id={id}
                            required={f.required}
                            maxLength={f.max}
                            rows={6}
                            value={value}
                            onChange={(e) => set(e.target.value)}
                            className={inputClass}
                          />
                        ) : (
                          <input
                            id={id}
                            type="text"
                            required={f.required}
                            maxLength={f.max}
                            value={value}
                            onChange={(e) => set(e.target.value)}
                            className={inputClass}
                          />
                        )}
                        {f.hint && <p className="mt-1 text-sm text-muted">{f.hint}</p>}
                      </div>
                    );
                  })}

                  {/* Hidden from people. Bots tend to fill it in. */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label>
                      Website
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honey}
                        onChange={(e) => setHoney(e.target.value)}
                      />
                    </label>
                  </div>

                  <div ref={widget} />

                  {status.kind === "error" && (
                    <p role="alert" className="font-bold text-[#ff8a80]">
                      {status.message}
                    </p>
                  )}

                  <div>
                    <button
                      type="submit"
                      disabled={status.kind === "sending"}
                      className="rounded-xl bg-teal px-6 py-2.5 font-extrabold text-[#08202a] hover:bg-[#7ff0eb] disabled:opacity-60"
                    >
                      {status.kind === "sending" ? "Sending..." : "Send"}
                    </button>
                  </div>
                </div>

                <p className="mt-4 text-sm text-muted">
                  We use what you send only to help you. See our <Link to="/privacy">Privacy Policy</Link>.
                </p>
              </form>
            )}
          </div>
        )}
      </Section>
    </>
  );
}
