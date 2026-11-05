import npcsJson from "./npcs.json";

// NPC positions come from the server's NPC list (all in the spawn world, Aldoria).
// Coordinates are whole blocks and can be about one block off.
export interface Npc {
  id: string;
  name: string;
  category: string;
  guide: string;
  x: number;
  y: number;
  z: number;
}

export interface NpcCategory {
  id: string;
  label: string;
  color: string;
}

export const npcCategories: NpcCategory[] = [
  { id: "services", label: "Spawn services", color: "#2fd6d0" },
  { id: "ranks", label: "Ranks", color: "#f5c542" },
  { id: "jobs", label: "Jobs", color: "#6fd36f" },
  { id: "banking", label: "Banks", color: "#e8a33d" },
  { id: "delivery", label: "Couriers", color: "#c792ea" },
  { id: "crafting", label: "Crafting", color: "#ff8a65" },
  { id: "shops", label: "Shops", color: "#5b9cff" },
  { id: "travel", label: "Travel", color: "#4dd0e1" },
  { id: "stables", label: "Horse stables", color: "#b57a52" },
  { id: "land", label: "Landlord", color: "#9ccc65" },
  { id: "dungeons", label: "Dungeons", color: "#ef5350" },
  { id: "bounties", label: "Bounties", color: "#f06292" },
  { id: "guards", label: "Guards", color: "#a8b2c7" },
];

export const npcs: Npc[] = npcsJson;
