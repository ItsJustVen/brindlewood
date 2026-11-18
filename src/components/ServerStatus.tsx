import { site } from "../content";
import { useServerStatus } from "../hooks/useServerStatus";

/**
 * Small status line under the tagline. It only ever shows confirmed good news:
 * "N adventuring now" when at least one player is online, "Server online" when
 * the server is up with nobody on, and nothing at all while loading, offline or
 * if the status API fails. The wrapper always reserves the pill's height so the
 * page below does not jump.
 */
export default function ServerStatus({ discordOnline = 0 }: { discordOnline?: number }) {
  const status = useServerStatus();

  // A tiny player count makes a server look empty, so only show it once it is a healthy number.
  const min = site.serverStatus.minPlayersToShow ?? 1;
  const base =
    status.state === "online" ? (status.players >= min ? `${status.players} adventuring now` : "Server online") : null;
  const text = base && discordOnline > 0 ? `${base} · ${discordOnline} online in Discord` : base;

  return (
    <div className="mb-4 flex min-h-[2.125rem] justify-center">
      {text && (
        <div
          role="status"
          className="inline-flex items-center gap-2 py-1.5 text-sm font-bold text-muted"
        >
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-green-400" />
          {text}
        </div>
      )}
    </div>
  );
}
