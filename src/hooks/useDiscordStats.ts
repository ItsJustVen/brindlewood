import { useEffect, useState } from "react";
import { site } from "../content";

export type DiscordStats = { members: number; online: number } | null;

/**
 * Optional live Discord member counts from Discord's public invite lookup.
 * No secrets are involved. If the request fails, is slow, or is disabled in
 * site.json, this returns null and nothing is shown.
 */
export function useDiscordStats(): DiscordStats {
  const [stats, setStats] = useState<DiscordStats>(null);

  useEffect(() => {
    if (!site.discordStats.enabled) return;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);

    fetch(site.discordStats.apiUrl, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Discord request failed: ${res.status}`);
        return res.json() as Promise<{
          approximate_member_count?: number;
          approximate_presence_count?: number;
        }>;
      })
      .then((data) => {
        const members = data.approximate_member_count;
        const online = data.approximate_presence_count;
        if (typeof members === "number" && members > 0) {
          setStats({ members, online: typeof online === "number" ? online : 0 });
        }
      })
      .catch(() => setStats(null))
      .finally(() => window.clearTimeout(timeout));

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, []);

  return stats;
}
