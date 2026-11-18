import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { site } from "../content";
import IpBox from "./IpBox";

export type Edition = "java" | "bedrock";

// Phones, tablets and consoles are almost always Bedrock, so start on that tab for them.
export function startEdition(): Edition {
  const ua = typeof navigator === "undefined" ? "" : navigator.userAgent;
  return /Android|iPhone|iPad|iPod|Xbox|PlayStation|Nintendo/i.test(ua) ? "bedrock" : "java";
}

export default function ConnectBox() {
  const [edition, setEdition] = useState<Edition>("java");
  useEffect(() => setEdition(startEdition()), []);
  const tab = (id: Edition, label: string) => (
    <button
      type="button"
      role="tab"
      aria-selected={edition === id}
      onClick={() => setEdition(id)}
      className={`cursor-pointer rounded-lg px-5 py-2 font-extrabold ${
        edition === id ? "bg-teal text-[#08202a]" : "bg-panel text-ink hover:bg-panel2"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <div role="tablist" aria-label="Choose your edition" className="mb-3 flex justify-center gap-2">
        {tab("java", "Java")}
        {tab("bedrock", "Bedrock")}
      </div>
      <div role="tabpanel">
        {edition === "java" ? (
          <>
            <IpBox ip={site.javaIp} />
            <p className="text-sm text-muted">Minecraft {site.minecraftVersion}. Add it as a server and join.</p>
          </>
        ) : (
          <>
            <IpBox ip={site.bedrockFriend ?? ""} button="Copy name" />
            <p className="text-sm text-muted">
              Add this friend on Xbox, console or mobile, then join through their game. No address needed.{" "}
              <Link to="/play">Step by step</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
