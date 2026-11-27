/** Newsletter & Media folders. Their content (seminars, magazines,
 *  newsletters, Media Library albums) is edited in the admin CMS (src/cms). */

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
