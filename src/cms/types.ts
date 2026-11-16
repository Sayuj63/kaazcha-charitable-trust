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

export type Collections = {
  people: Person[];
  magazines: Magazine[];
  articles: Article[];
  albums: Album[];
};

export type CollectionName = keyof Collections;

export const COLLECTIONS: CollectionName[] = [
  "people",
  "magazines",
  "articles",
  "albums",
];

export function isCollection(value: unknown): value is CollectionName {
  return COLLECTIONS.some((c) => c === value);
}

/** Canonical address printed in QR codes. */
export const SITE_ORIGIN = "https://www.kaazchacharitabletrust.com";

export function personUrl(slug: string) {
  return `${SITE_ORIGIN}/people/${slug}`;
}
