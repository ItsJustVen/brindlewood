import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { fill } from "./text";

// A tiny, safe Markdown renderer for guides. It builds React elements (never raw
// HTML), so pasted text cannot inject scripts.
// Supported: ## / ### headings, paragraphs, - bullet lists, 1. numbered lists,
// > notes, | tables |, --- rules, **bold**, *italic*, `code`, [links](url).

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function safeHref(href: string): string | null {
  if (href.startsWith("/") && !href.startsWith("//")) return href;
  if (/^https?:\/\//i.test(href) || /^mailto:/i.test(href)) return href;
  return null;
}

const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\)|\*[^*\s][^*]*\*)/g;

export function Inline({ text }: { text: string }) {
  const parts = fill(text).split(INLINE);
  return (
    <>
      {parts.map((p, i) => {
        if (!p) return null;
        if (p.startsWith("**") && p.endsWith("**") && p.length > 4)
          return <strong key={i}>{p.slice(2, -2)}</strong>;
        if (p.startsWith("`") && p.endsWith("`") && p.length > 2)
          return (
            <code key={i} className="rounded bg-panel2 px-1.5 py-0.5 text-[0.92em] text-teal">
              {p.slice(1, -1)}
            </code>
          );
        const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(p);
        if (link) {
          const href = safeHref(link[2]);
          if (!href) return <Fragment key={i}>{link[1]}</Fragment>;
          if (href.startsWith("/")) return <Link key={i} to={href}>{link[1]}</Link>;
          return (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer">
              {link[1]}
            </a>
          );
        }
        if (p.startsWith("*") && p.endsWith("*") && p.length > 2)
          return <em key={i}>{p.slice(1, -1)}</em>;
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}

const BULLET = /^\s*[-*•]\s+(.*)$/;
const NUMBERED = /^\s*\d+[.)]\s+(.*)$/;
const TABLE_ROW = /^\s*\|.*\|\s*$/;
const TABLE_SEP = /^\s*\|[\s:|-]+\|\s*$/;

function cells(line: string): string[] {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
}

export function Markdown({ source }: { source: string }) {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const out: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    const heading = /^(#{1,3})\s+(.*)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2].trim();
      const id = slugify(text);
      out.push(
        level >= 3 ? (
          <h3 key={key++} id={id} className="mb-2 mt-6 text-xl font-bold">
            <Inline text={text} />
          </h3>
        ) : (
          <h2 key={key++} id={id} className="mb-3 mt-8 text-2xl font-bold text-teal">
            <Inline text={text} />
          </h2>
        ),
      );
      i++;
      continue;
    }

    if (/^---+\s*$/.test(line)) {
      out.push(<hr key={key++} className="my-6 border-panel2" />);
      i++;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      out.push(
        <p key={key++} className="note my-4">
          <Inline text={buf.join(" ")} />
        </p>,
      );
      continue;
    }

    if (TABLE_ROW.test(line) && i + 1 < lines.length && TABLE_SEP.test(lines[i + 1])) {
      const head = cells(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && TABLE_ROW.test(lines[i])) {
        rows.push(cells(lines[i]));
        i++;
      }
      out.push(
        <div key={key++} className="my-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr>
                {head.map((h, c) => (
                  <th key={c} className="border-b-2 border-wood px-3 py-2 font-bold text-teal">
                    <Inline text={h} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri} className="border-b border-panel2">
                  {r.map((c, ci) => (
                    <td key={ci} className="px-3 py-2 align-top text-muted">
                      <Inline text={c} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    if (BULLET.test(line) || NUMBERED.test(line)) {
      const ordered = NUMBERED.test(line) && !BULLET.test(line);
      const re = ordered ? NUMBERED : BULLET;
      const items: string[] = [];
      while (i < lines.length && re.test(lines[i])) {
        items.push((re.exec(lines[i]) as RegExpExecArray)[1]);
        i++;
      }
      const children = items.map((t, n) => (
        <li key={n}>
          <Inline text={t} />
        </li>
      ));
      out.push(
        ordered ? (
          <ol key={key++} className="my-3 list-decimal space-y-1 pl-6 text-muted">
            {children}
          </ol>
        ) : (
          <ul key={key++} className="my-3 list-disc space-y-1 pl-6 text-muted">
            {children}
          </ul>
        ),
      );
      continue;
    }

    const buf: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,3})\s+/.test(lines[i]) &&
      !/^>\s?/.test(lines[i]) &&
      !BULLET.test(lines[i]) &&
      !NUMBERED.test(lines[i]) &&
      !/^---+\s*$/.test(lines[i]) &&
      !(TABLE_ROW.test(lines[i]) && i + 1 < lines.length && TABLE_SEP.test(lines[i + 1]))
    ) {
      buf.push(lines[i].trim());
      i++;
    }
    out.push(
      <p key={key++} className="my-3 text-muted">
        <Inline text={buf.join(" ")} />
      </p>,
    );
  }

  return <div className="guide-body">{out}</div>;
}
