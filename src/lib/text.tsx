import { Fragment } from "react";
import { site } from "../content";

/** Prefix a path in /public (like "logo.png") with the site's base path. */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

/** Replace {tokens} in content text with values from site.json. */
export function fill(text: string): string {
  const values: Record<string, string> = {
    javaIp: site.javaIp,
    minecraftVersion: site.minecraftVersion,
    name: site.name,
  };
  return text.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}

/** Renders text with **bold** sections and {tokens} filled in. */
export function RichText({ text }: { text: string }) {
  const parts = fill(text).split("**");
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}
