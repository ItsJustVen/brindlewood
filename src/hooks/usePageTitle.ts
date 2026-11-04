import { useEffect } from "react";
import { site } from "../content";

/** Sets the browser tab title, e.g. "Rules | BrindleWood". */
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title
      ? `${title} | ${site.name}`
      : `${site.name} | Kingdoms RPG Minecraft Server`;
  }, [title]);
}
