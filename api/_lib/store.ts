import { del, get, list, put } from "@vercel/blob";

import type { CollectionName, Collections } from "../../src/cms/types.js";

/** Storage layout
 *
 *  cms/<name>.json           what the public site reads (CDN-cached, ≤ ~1 min old)
 *  cms/<name>/v-<ms>-<r>.json one immutable file per save — what the admin reads
 *
 *  Public Blob stores serve reads through the CDN (the SDK's `useCache: false`
 *  only applies to private stores), so re-reading a file that was just
 *  overwritten can return the old copy for up to a minute. Each version file
 *  is written once at a new address, so it can never be stale, and `list()`
 *  (an API call, not the CDN) always shows the newest. The version's pathname
 *  is the token the admin sends back, so concurrent saves are detected. */

const fixedPath = (name: CollectionName) => `cms/${name}.json`;
const versionPrefix = (name: CollectionName) => `cms/${name}/v-`;
const KEEP_VERSIONS = 20;

export type Loaded<K extends CollectionName> = {
  items: Collections[K];
  /** Pathname of the version the items came from; null before the first save. */
  etag: string | null;
};

async function versions(name: CollectionName) {
  const found = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: versionPrefix(name), cursor, limit: 1000 });
    found.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  // `v-<13-digit ms>-…` sorts chronologically as text; newest first.
  return found.sort((a, b) => b.pathname.localeCompare(a.pathname));
}

async function readJson(url: string) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Blob read failed (${r.status})`);
  return r.json();
}

/** Public read: the CDN-cached copy (may be up to ~a minute old). */
export async function loadPublic<K extends CollectionName>(name: K): Promise<Collections[K]> {
  const result = await get(fixedPath(name), { access: "public" });
  if (!result || !result.stream) return [] as Collections[K];
  return JSON.parse(await new Response(result.stream).text()) as Collections[K];
}

/** Admin read: always the latest saved version. */
export async function load<K extends CollectionName>(name: K): Promise<Loaded<K>> {
  const [latest] = await versions(name);
  if (latest) {
    return { items: (await readJson(latest.url)) as Collections[K], etag: latest.pathname };
  }
  // Before the first versioned save: start from the published file.
  return { items: await loadPublic(name), etag: null };
}

export class ConflictError extends Error {}

/** Saves a new version. `etag` must be the version the edits started from;
 *  if someone saved since, ConflictError is thrown and nothing is written. */
export async function save<K extends CollectionName>(
  name: K,
  items: Collections[K],
  etag: string | null,
) {
  const existing = await versions(name);
  if ((existing[0]?.pathname ?? null) !== etag) throw new ConflictError();

  const body = JSON.stringify(items);
  const stamp = String(Date.now()).padStart(13, "0");
  const random = Math.random().toString(36).slice(2, 8);
  const version = await put(`${versionPrefix(name)}${stamp}-${random}.json`, body, {
    access: "public",
    contentType: "application/json; charset=utf-8",
    addRandomSuffix: false,
    cacheControlMaxAge: 60 * 60 * 24 * 365, // never changes
  });
  await put(fixedPath(name), body, {
    access: "public",
    contentType: "application/json; charset=utf-8",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });

  // Keep the most recent versions as a backup history; drop the rest.
  const old = existing.slice(KEEP_VERSIONS - 1).map((b) => b.url);
  if (old.length) await del(old).catch(() => undefined);

  return version.pathname;
}
