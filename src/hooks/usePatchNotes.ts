import { useEffect, useState } from "react";
import { site } from "../content";

export type PatchNote = { id: string; date: string; text: string };

/**
 * Discord posts use single line breaks. The guide renderer joins those into one
 * paragraph, so put a blank line between ordinary lines and leave lists alone.
 */
export function discordToMarkdown(text: string): string {
  const special = /^\s*([-*•]\s|\d+[.)]\s|#{1,3}\s|>|\|)/;
  const lines = text.split("\n");
  const out: string[] = [];
  lines.forEach((line, i) => {
    out.push(line);
    const next = lines[i + 1];
    if (next === undefined || !line.trim() || !next.trim()) return;
    if (!(special.test(line) && special.test(next))) out.push("");
  });
  return out.join("\n");
}

/**
 * Optional: the latest posts from the Discord #patch-notes channel, served by
 * our Cloudflare Worker. If the Worker is not set up or the request fails, this
 * returns an empty list and nothing is shown.
 */
export function usePatchNotes(): PatchNote[] {
  const [notes, setNotes] = useState<PatchNote[]>([]);

  useEffect(() => {
    if (!site.formsUrl) return;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);

    fetch(`${site.formsUrl.replace(/\/$/, "")}/patch-notes`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Patch notes request failed: ${res.status}`);
        return res.json() as Promise<{ notes?: PatchNote[] }>;
      })
      .then((data) => {
        const list = Array.isArray(data.notes) ? data.notes : [];
        setNotes(
          list.filter(
            (n) => n && typeof n.id === "string" && typeof n.text === "string" && n.text.trim() !== "",
          ),
        );
      })
      .catch(() => setNotes([]))
      .finally(() => window.clearTimeout(timeout));

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, []);

  return notes;
}
