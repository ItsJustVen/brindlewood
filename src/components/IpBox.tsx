import { useState } from "react";

export default function IpBox({
  ip,
  button = "Copy IP",
  wide = false,
}: {
  ip: string;
  button?: string;
  /** Stretch to fill the width of its container. */
  wide?: boolean;
}) {
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
    <div className={wide ? "block" : "inline-block"}>
      <div className={`${wide ? "flex" : "inline-flex"} overflow-hidden rounded-xl border border-ember/60 bg-deep`}>
        <code className="flex-1 px-4 py-3 text-lg font-extrabold tracking-wide text-ember sm:text-xl">{ip}</code>
        <button
          type="button"
          onClick={copy}
          className="cursor-pointer bg-ember px-5 font-extrabold text-[#1d1308] hover:bg-[#f0bb70]"
        >
          {button}
        </button>
      </div>
      <p role="status" aria-live="polite" className="mt-1 h-5 text-sm text-ember">
        {message}
      </p>
    </div>
  );
}
