import { useServerStatus } from "../hooks/useServerStatus";

/**
 * Small status pill under the tagline. It only ever shows confirmed good news:
 * "N adventuring now" when at least one player is online, "Server online" when
 * the server is up with nobody on, and nothing at all while loading, offline or
 * if the status API fails. The wrapper always reserves the pill's height so the
 * page below does not jump.
 */
export default function ServerStatus() {
  const status = useServerStatus();

  const text =
    status.state === "online"
      ? status.players > 0
        ? `${status.players} adventuring now`
        : "Server online"
      : null;

  return (
    <div className="mb-4 flex min-h-[2.125rem] justify-center">
      {text && (
        <div
          role="status"
          className="inline-flex items-center gap-2 rounded-full border border-panel2 bg-panel px-4 py-1.5 text-sm font-bold"
        >
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]" />
          {text}
        </div>
      )}
    </div>
  );
}
