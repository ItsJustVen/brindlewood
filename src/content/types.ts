// Shapes of the JSON content files. If a JSON file has a typo or a missing
// field, the build fails with a clear message instead of publishing a broken page.

export interface SiteConfig {
  name: string;
  tagline: string;
  minecraftVersion: string;
  javaIp: string;
  discordUrl: string;
  storeUrl: string;
  mapUrl: string;
  /** Address of the forms Worker. Leave empty until it is set up. */
  formsUrl: string;
  /** Public Cloudflare Turnstile site key. Leave empty until it is set up. */
  turnstileSiteKey: string;
  serverStatus: { enabled: boolean; apiUrl: string };
}

export interface IconCard {
  icon: string;
  title: string;
  body: string;
}

export interface HomeContent {
  kingdomsHeading: string;
  kingdomsIntro: string;
  featuresHeading: string;
  features: IconCard[];
}

export interface Kingdom {
  id: string;
  name: string;
  corner: string;
  summary: string;
  description: string;
}

export interface RuleItem extends IconCard {
  note?: string;
}

export interface RulesContent {
  intro: string;
  items: RuleItem[];
  enforcement: { title: string; body: string };
  closing: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface StoreContent {
  intro: string;
  featuredHeading: string;
  featured: IconCard[];
  categoriesHeading: string;
  categories: { title: string; body: string }[];
  support: { title: string; paragraphs: string[] };
  footnote: string;
}

export interface PlayContent {
  intro: string;
  java: { title: string; steps: string[] };
  bedrock: { title: string; steps: string[]; note: string };
  gettingStartedHeading: string;
  gettingStarted: { title: string; body: string; to: string; linkText: string }[];
  faqHeading: string;
}

export interface Announcement {
  date: string;
  title: string;
  body: string;
}
