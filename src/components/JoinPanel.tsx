import { useEffect, useState } from "react";
import { home, site } from "../content";
import { RichText } from "../lib/text";
import { startEdition, type Edition } from "./ConnectBox";
import IpBox from "./IpBox";

/**
 * The "join in three steps" card. Starts on the tab that matches the visitor's
 * device (phones and consoles are almost always Bedrock) and shows exactly one
 * address with a copy button, so a stranger can join without reading anything else.
 */
export default function JoinPanel() {
  const [edition, setEdition] = useState<Edition>("java");
  useEffect(() => setEdition(startEdition()), []);

  const steps = edition === "java" ? home.join.java : home.join.bedrock;
  const note = edition === "java" ? home.join.javaNote : home.join.bedrockNote;

  const tab = (id: Edition, label: string) => (
    <button
      type="button"
      role="tab"
      aria-selected={edition === id}
      onClick={() => setEdition(id)}
      className={`flex-1 cursor-pointer rounded-lg px-4 py-2 font-extrabold ${
        edition === id ? "bg-ember text-[#1d1308]" : "text-ink hover:bg-panel2"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="rounded-2xl border border-panel2 bg-night/90 p-5 shadow-2xl backdrop-blur sm:p-6">
      <h2 className="mb-3 text-xl font-bold">{home.join.heading}</h2>

      <div role="tablist" aria-label="Choose your edition" className="mb-4 flex gap-1 rounded-xl bg-deep p-1">
        {tab("java", "Java (PC)")}
        {tab("bedrock", "Bedrock")}
      </div>

      <div role="tabpanel">
        <ol className="mb-4 grid gap-2.5">
          {steps.map((step, i) => (
            <li key={step} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-ember/70 text-sm font-extrabold text-ember"
              >
                {i + 1}
              </span>
              <span>
                <RichText text={step} />
              </span>
            </li>
          ))}
        </ol>

        {edition === "java" ? (
          <IpBox ip={site.javaIp} wide />
        ) : (
          <IpBox ip={site.bedrockFriend ?? ""} button="Copy name" wide />
        )}
        <p className="text-sm text-muted">{note}</p>
        <p className="mt-2 text-sm text-muted">
          {home.join.helpText}{" "}
          <a href={site.discordUrl} target="_blank" rel="noopener noreferrer">
            Join the Discord
          </a>
        </p>
      </div>
    </div>
  );
}
