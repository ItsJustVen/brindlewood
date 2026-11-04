import { useEffect, useState } from "react";
import { site } from "../content";

export type ServerStatus =
  | { state: "loading" }
  | { state: "online"; players: number }
  | { state: "offline" }
  | { state: "unavailable" };

/**
 * Optional live status from a free public API. The site works fine without it:
 * if the request fails (or status is disabled in site.json) nothing is shown.
 */
export function useServerStatus(): ServerStatus {
  const [status, setStatus] = useState<ServerStatus>(
    site.serverStatus.enabled ? { state: "loading" } : { state: "unavailable" },
  );

  useEffect(() => {
    if (!site.serverStatus.enabled) return;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);

    fetch(`${site.serverStatus.apiUrl}${encodeURIComponent(site.javaIp)}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Status request failed: ${res.status}`);
        return res.json() as Promise<{ online?: boolean; players?: { online?: number } }>;
      })
      .then((data) => {
        if (data.online) setStatus({ state: "online", players: data.players?.online ?? 0 });
        else setStatus({ state: "offline" });
      })
      .catch(() => setStatus({ state: "unavailable" }))
      .finally(() => window.clearTimeout(timeout));

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, []);

  return status;
}
