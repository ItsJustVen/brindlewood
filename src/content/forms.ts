// The website forms. The keys and limits match worker/index.js, so change both together.
export interface FormField {
  key: string;
  label: string;
  required: boolean;
  max: number;
  options?: string[];
  long?: boolean;
  hint?: string;
}

export interface FormDef {
  id: string;
  tab: string;
  title: string;
  intro: string;
  fields: FormField[];
}

const username: FormField = { key: "username", label: "Minecraft username", required: true, max: 40, hint: "Bedrock players: include the BR_ prefix." };
const platform: FormField = { key: "platform", label: "Platform", required: true, max: 20, options: ["Java", "Bedrock"] };

export const forms: FormDef[] = [
  {
    id: "support",
    tab: "Support",
    title: "Get help",
    intro: "Account or linking trouble, store purchases, rollbacks and anything else. Staff reply on Discord.",
    fields: [
      username,
      platform,
      { key: "topic", label: "Topic", required: true, max: 40, options: ["Account or linking", "Store purchase", "Grief or rollback", "Something else"] },
      { key: "contact", label: "Your Discord name", required: true, max: 80, hint: "So staff can message you back." },
      { key: "message", label: "Details", required: true, max: 1500, long: true, hint: "What happened, and where? Include coordinates, times and order numbers if you have them." },
    ],
  },
  {
    id: "suggestion",
    tab: "Suggestion",
    title: "Share an idea",
    intro: "Got an idea to make BrindleWood better? We read every one.",
    fields: [
      { key: "username", label: "Minecraft username (optional)", required: false, max: 40 },
      { key: "contact", label: "Your Discord name (optional)", required: false, max: 80 },
      { key: "title", label: "Your idea in a few words", required: true, max: 100 },
      { key: "message", label: "Details", required: true, max: 1500, long: true },
    ],
  },
  {
    id: "bug",
    tab: "Bug report",
    title: "Report a bug",
    intro: "Something broken? Tell us how to see it for ourselves.",
    fields: [
      username,
      platform,
      { key: "contact", label: "Your Discord name (optional)", required: false, max: 80 },
      { key: "where", label: "Where it happened (optional)", required: false, max: 150, hint: "A place, a command or a menu." },
      { key: "message", label: "What happened and how to repeat it", required: true, max: 1500, long: true },
    ],
  },
  {
    id: "appeal",
    tab: "Ban appeal",
    title: "Appeal a ban",
    intro: "Be honest and polite. Staff review every appeal and reply on Discord.",
    fields: [
      username,
      platform,
      { key: "contact", label: "Your Discord name", required: true, max: 80, hint: "So staff can message you back." },
      { key: "reason", label: "What were you banned for?", required: true, max: 300 },
      { key: "message", label: "Why should we lift the ban?", required: true, max: 1500, long: true },
    ],
  },
];
