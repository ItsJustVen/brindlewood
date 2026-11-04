import { useServerStatus } from "../hooks/useServerStatus";

/** Small "Online: 12 players" pill. Renders nothing if the status API is unavailable. */
export default function ServerStatus() {
  const status = useServerStatus();
  if (status.state === "unavailable") return null;

  const dot =
    status.state === "online"
      ? "bg-green-400 shadow-[0_0_8px_#4ade80]"
      : status.state === "offline"
        ? "bg-red-400"
        : "bg-muted";

  const text =
    status.state === "loading"
      ? "Checking server..."
      : status.state === "offline"
        ? "Server is currently offline"
        : `Online: ${status.players} player${status.players === 1 ? "" : "s"} adventuring`;

  return (
    <div
      role="status"
      className="mb-4 inline-flex items-center gap-2 rounded-full border border-panel2 bg-panel px-4 py-1.5 text-sm font-bold"
    >
      <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${dot}`} />
      {text}
    </div>
  );
}
