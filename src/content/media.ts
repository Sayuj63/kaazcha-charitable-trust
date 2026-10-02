/** Content for the four Newsletter & Media folders. Lists are newest first.
 *
 *  - Seminars and Media Library albums share a `slug`; photos placed in
 *    `src/assets/gallery/<slug>/` appear in that album automatically and the
 *    first one becomes the cover for both. Optional smaller copies with the
 *    same file names in `<slug>/thumbs/` are used for the photo grid.
 *  - Magazines: put the PDF in `public/magazines/` and set `file`.
 *  - Newsletters: set `url` to the published article.
 *
 *  Entries marked PLACEHOLDER still need real details from the trust. */

import type { Language } from "@/i18n/translations";

export type Localized = Record<Language, string>;

export const FOLDER_KEYS = [
  "seminars",
  "magazines",
  "newsletters",
  "library",
] as const;
export type FolderKey = (typeof FOLDER_KEYS)[number];

export function isFolderKey(value: string | undefined): value is FolderKey {
  return FOLDER_KEYS.some((key) => key === value);
}

export type Seminar = {
  slug: string;
  title: Localized;
  date: Localized;
  description: Localized;
};

export type Magazine = {
  slug: string;
  title: Localized;
  edition: Localized;
  cover?: string;
  file?: string;
};

export type Article = {
  slug: string;
  title: Localized;
  source: Localized;
  cover?: string;
  url?: string;
};

export type Album = {
  slug: string;
  title: Localized;
  date: Localized;
  /** Full album elsewhere, when the site only shows a selection. */
  moreUrl?: string;
};

export type Photo = { src: string; thumb: string };

const EVENTS = {
  naathonatha: {
    slug: "naathonatha",
    title: { en: "Naathonatha", ml: "നതോന്നത" },
    date: { en: "24th August, 2026", ml: "2026 ഓഗസ്റ്റ് 24" },
  },
  niranam: {
    slug: "niranam-nelkinda-naakada",
    title: {
      en: "Niranam Nelkinda Naakada",
      ml: "നിരണം · നെൽക്കിണ്ട · നാക്കട",
    },
    date: { en: "18th July, 2026", ml: "2026 ജൂലൈ 18" },
  },
  thiruvallavaazhu: {
    slug: "thiruvallavaazhu",
    title: { en: "Thiruvallavaazhu", ml: "തിരുവല്ലവാഴ്" },
    date: { en: "27th June, 2026", ml: "2026 ജൂൺ 27" },
  },
} as const;

// PLACEHOLDER descriptions — replace with the seminar write-ups.
export const SEMINARS: Seminar[] = [
  {
    ...EVENTS.naathonatha,
    description: {
      en: "A Kaazcha seminar held on 24th August, 2026. The full report on the speakers, themes and discussions will be published here soon.",
      ml: "2026 ഓഗസ്റ്റ് 24-ന് നടന്ന കാഴ്ച സെമിനാർ. പ്രഭാഷകർ, വിഷയങ്ങൾ, ചർച്ചകൾ എന്നിവയെക്കുറിച്ചുള്ള വിശദമായ റിപ്പോർട്ട് ഉടൻ ഇവിടെ പ്രസിദ്ധീകരിക്കും.",
    },
  },
  {
    ...EVENTS.niranam,
    description: {
      en: "Exploring the layers of Kerala's history, culture and memory. The full report on the speakers, themes and discussions will be published here soon.",
      ml: "കേരളത്തിന്റെ ചരിത്രത്തിന്റെയും സംസ്കാരത്തിന്റെയും ഓർമ്മയുടെയും അടരുകൾ തേടി. പ്രഭാഷകർ, വിഷയങ്ങൾ, ചർച്ചകൾ എന്നിവയെക്കുറിച്ചുള്ള വിശദമായ റിപ്പോർട്ട് ഉടൻ ഇവിടെ പ്രസിദ്ധീകരിക്കും.",
    },
  },
  {
    ...EVENTS.thiruvallavaazhu,
    description: {
      en: "A Kaazcha seminar held on 27th June, 2026. The full report on the speakers, themes and discussions will be published here soon.",
      ml: "2026 ജൂൺ 27-ന് നടന്ന കാഴ്ച സെമിനാർ. പ്രഭാഷകർ, വിഷയങ്ങൾ, ചർച്ചകൾ എന്നിവയെക്കുറിച്ചുള്ള വിശദമായ റിപ്പോർട്ട് ഉടൻ ഇവിടെ പ്രസിദ്ധീകരിക്കും.",
    },
  },
];

export const MAGAZINES: Magazine[] = [
  {
    slug: "insight-vol01-issue01",
    title: { en: "Insight", ml: "Insight" },
    edition: {
      en: "VOLUME 1 — July to September, 2026",
      ml: "വാല്യം 1 — ജൂലൈ മുതൽ സെപ്റ്റംബർ, 2026",
    },
    cover: "/magazines/insight-vol01-issue01-cover.jpg",
    file: "/magazines/insight-vol01-issue01-thiruvallavaazhu.pdf",
  },
];

// PLACEHOLDER articles — replace with real titles, outlets and links.
const ARTICLE_TITLE: Localized = {
  en: "Article title",
  ml: "ലേഖനത്തിന്റെ തലക്കെട്ട്",
};
const MEDIA_HOUSE: Localized = {
  en: "Media house name",
  ml: "മാധ്യമ സ്ഥാപനത്തിന്റെ പേര്",
};

export const ARTICLES: Article[] = [
  { slug: "article-1", title: ARTICLE_TITLE, source: MEDIA_HOUSE },
  { slug: "article-2", title: ARTICLE_TITLE, source: MEDIA_HOUSE },
  { slug: "article-3", title: ARTICLE_TITLE, source: MEDIA_HOUSE },
];

export const ALBUMS: Album[] = [
  {
    ...EVENTS.naathonatha,
    moreUrl:
      "https://drive.google.com/drive/folders/1UZqbubUj97pjYiOa8UnIiwA5wT_-o7qI",
  },
  EVENTS.niranam,
  EVENTS.thiruvallavaazhu,
];

export const FOLDER_COUNTS: Record<FolderKey, number> = {
  seminars: SEMINARS.length,
  magazines: MAGAZINES.length,
  newsletters: ARTICLES.length,
  library: ALBUMS.length,
};

const galleryFiles = import.meta.glob<string>(
  "/src/assets/gallery/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true, query: "?url", import: "default" },
);
const galleryThumbs = import.meta.glob<string>(
  "/src/assets/gallery/*/thumbs/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true, query: "?url", import: "default" },
);

/** Photos for an album, sorted by file name (1, 2, … 10). */
export function albumPhotos(slug: string): Photo[] {
  const prefix = `/src/assets/gallery/${slug}/`;
  return Object.entries(galleryFiles)
    .filter(([path]) => path.startsWith(prefix))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([path, src]) => ({
      src,
      thumb: galleryThumbs[path.replace(prefix, `${prefix}thumbs/`)] ?? src,
    }));
}
