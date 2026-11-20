// Shapes of the JSON content files. If a JSON file has a typo or a missing
// field, the build fails with a clear message instead of publishing a broken page.

export interface SiteConfig {
  name: string;
  tagline: string;
  subtagline?: string;
  /** Bedrock players join by adding this friend account. */
  bedrockFriend?: string;
  minecraftVersion: string;
  javaIp: string;
  discordUrl: string;
  storeUrl: string;
  mapUrl: string;
  /** Address of the forms Worker. Leave empty until it is set up. */
  formsUrl: string;
  /** Public Cloudflare Turnstile site key. Leave empty until it is set up. */
  turnstileSiteKey: string;
  serverStatus: { enabled: boolean; apiUrl: string; /** Show the player count only at or above this number. */ minPlayersToShow?: number };
  discordStats: { enabled: boolean; apiUrl: string };
}

export interface IconCard {
  icon: string;
  title: string;
  body: string;
}

export interface HomeContent {
  hero: { eyebrow: string; headline: string; sub: string };
  join: {
    heading: string;
    java: string[];
    bedrock: string[];
    javaNote: string;
    bedrockNote: string;
    helpText: string;
  };
  trust: string[];
  worldHeading: string;
  worldIntro: string;
  world: { title: string; body: string; image: string; imageAlt: string; to?: string; linkText?: string }[];
  kingdomFacts?: { title: string; body: string }[];
  goodToKnowHeading: string;
  goodToKnow: { title: string; body: string }[];
  finalCta: { heading: string; body: string };
  heroImage: string;
  heroAlt: string;
  galleryHeading: string;
  gallery: { src: string; alt: string; caption: string }[];
  happening?: { title: string; body: string }[];
  highlights?: { title: string; body: string }[];
  freeLine?: string;
  newHere?: { text: string; linkText: string };
  leaderCta?: { title: string; body: string; linkText: string };
  kingdomsHeading: string;
  kingdomsIntro: string;
  featuresHeading: string;
  features: { title: string; body: string }[];
  aboutHeading: string;
  about: string[];
  since: string;
  staffHeading: string;
  staffIntro: string;
  staff: { role: string; names: string[] }[];
  staffImage?: string;
  staffImageAlt?: string;
  staffImageCaption?: string;
}

export interface Kingdom {
  id: string;
  name: string;
  corner: string;
  summary: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

export interface RuleItem extends IconCard {
  note?: string;
}

export interface RulesContent {
  intro: string;
  items: RuleItem[];
  enforcement: { title: string; body: string };
  ladder?: string[];
  ages?: string;
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
  introSub?: string;
  java: { title: string; steps: string[] };
  bedrock: { title: string; steps: string[]; note: string };
  firstHour?: { text: string; linkText: string };
  gettingStartedHeading: string;
  gettingStarted: { title: string; body: string; to: string; linkText: string }[];
  faqHeading: string;
  versionLine?: string;
  troubleHeading?: string;
  trouble?: { title: string; body: string; to?: string; linkText?: string }[];
}

export interface Announcement {
  date: string;
  title: string;
  body: string;
}
