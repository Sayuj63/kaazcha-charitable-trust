/** Newsletter & Media folders. Magazines, Newsletters and the Media Library
 *  are edited in the admin CMS (see src/cms). Seminars still live here; a
 *  seminar shows the cover of the Media Library album with the same `slug`.
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
