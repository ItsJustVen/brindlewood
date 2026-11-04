import { useState } from "react";

export default function IpBox({ ip }: { ip: string }) {
  const [message, setMessage] = useState("");

  async function copy() {
    try {
      await navigator.clipboard.writeText(ip);
      setMessage(`Copied ${ip}`);
    } catch {
      setMessage("Couldn't copy. Please copy it manually.");
    }
    window.setTimeout(() => setMessage(""), 2500);
  }

  return (
    <div className="inline-block">
      <div className="inline-flex overflow-hidden rounded-xl border-2 border-steel bg-deep">
        <code className="px-4 py-3 text-lg font-extrabold tracking-wide text-teal sm:text-xl">{ip}</code>
        <button
          type="button"
          onClick={copy}
          className="cursor-pointer border-l-2 border-steel bg-panel2 px-4 font-extrabold text-ink hover:bg-steel"
        >
          Copy IP
        </button>
      </div>
      <p role="status" aria-live="polite" className="mt-1 h-5 text-sm text-teal">
        {message}
      </p>
    </div>
  );
}
