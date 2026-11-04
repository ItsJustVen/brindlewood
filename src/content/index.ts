import siteJson from "./site.json";
import homeJson from "./home.json";
import kingdomsJson from "./kingdoms.json";
import rulesJson from "./rules.json";
import faqJson from "./faq.json";
import storeJson from "./store.json";
import playJson from "./play.json";
import announcementsJson from "./announcements.json";
import type {
  Announcement,
  FaqItem,
  HomeContent,
  Kingdom,
  PlayContent,
  RulesContent,
  SiteConfig,
  StoreContent,
} from "./types";

export const site: SiteConfig = siteJson;
export const home: HomeContent = homeJson;
export const kingdoms: Kingdom[] = kingdomsJson;
export const rules: RulesContent = rulesJson;
export const faq: FaqItem[] = faqJson;
export const store: StoreContent = storeJson;
export const play: PlayContent = playJson;
export const announcements: Announcement[] = announcementsJson;
