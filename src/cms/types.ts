/** Shapes stored by the CMS (Vercel Blob JSON documents under `cms/`).
 *  Shared by the public site, the admin and the `/api` functions. */

export type Localized = { en: string; ml: string };

/** A personality with a printed QR code. The QR encodes
 *  `${SITE_ORIGIN}/people/<slug>`; old slugs stay in `aliases` so a printed
 *  code keeps working even if the slug is changed later. */
export type Person = {
  id: string;
  slug: string;
  aliases: string[];
  name: Localized;
  /** Free text, e.g. "1945 – 2024". */
  years: string;
  /** Short line under the name, e.g. "Actor". */
  role: Localized;
  /** Paragraphs separated by blank lines; `_text_` or `*text*` is italic. */
  bio: Localized;
  image?: string;
  /** Shown under the portrait, e.g. "Photo: …, CC BY-SA 3.0". */
  imageCredit?: string;
  published: boolean;
  createdAt: number;
  updatedAt: number;
};

export type Magazine = {
  id: string;
  title: Localized;
  edition: Localized;
  cover?: string;
  /** Where "Reach us to purchase" points (e.g. an order form). */
  purchaseUrl?: string;
};

export type Article = {
  id: string;
  title: Localized;
  source: Localized;
  cover?: string;
  url?: string;
};

export type Photo = { src: string; thumb?: string };

export type Album = {
  id: string;
  /** Matches a seminar slug so the seminar shows the album's cover. */
  slug: string;
  title: Localized;
  date: Localized;
  /** Full album elsewhere, when the site only shows a selection. */
  moreUrl?: string;
  photos: Photo[];
};

/** A seminar under Newsletter & Media → Seminars: a short summary and up to
 *  two images (typically the poster and the programme schedule). */
export type Seminar = {
  id: string;
  title: Localized;
  date: Localized;
  summary: Localized;
  poster?: string;
  schedule?: string;
};

export type EventContact = { name: Localized; phone: string };

/** An event with its own page at `/events/<slug>`. The top-most event with
 *  `showInBar` is promoted in the announcement bar on every page. */
export type SiteEvent = {
  id: string;
  slug: string;
  showInBar: boolean;
  /** Scrolling text in the announcement bar. */
  marquee: Localized;
  series: Localized;
  /** English gloss of a Malayalam series name (optional). */
  seriesMeaning?: string;
  /** e.g. "Eedu 5" — shown before the title. */
  chapter: Localized;
  title: Localized;
  intro: Localized;
  welcome: Localized;
  date: Localized;
  time: Localized;
  venue: Localized;
  registerUrl?: string;
  poster?: string;
  contacts: EventContact[];
};

export type Collections = {
  people: Person[];
  magazines: Magazine[];
  articles: Article[];
  albums: Album[];
  events: SiteEvent[];
  seminars: Seminar[];
};

export type CollectionName = keyof Collections;

export const COLLECTIONS: CollectionName[] = [
  "people",
  "magazines",
  "articles",
  "albums",
  "events",
  "seminars",
];

export function isCollection(value: unknown): value is CollectionName {
  return COLLECTIONS.some((c) => c === value);
}

/** Canonical address printed in QR codes. */
export const SITE_ORIGIN = "https://www.kaazchacharitabletrust.com";

export function personUrl(slug: string) {
  return `${SITE_ORIGIN}/people/${slug}`;
}
