import { BlobNotFoundError, BlobPreconditionFailedError, get, head, put } from "@vercel/blob";

import type { CollectionName, Collections } from "../../src/cms/types.js";

const path = (name: CollectionName) => `cms/${name}.json`;

export type Loaded<K extends CollectionName> = {
  items: Collections[K];
  etag: string | null;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Blob serves larger JSON compressed with a weak ETag (`W/"…"`); `ifMatch`
 *  needs the strong form, so normalise it. */
const strong = (etag: string) => etag.replace(/^W\//, "");

async function storedEtag(name: CollectionName) {
  try {
    return strong((await head(path(name))).etag);
  } catch (err) {
    if (err instanceof BlobNotFoundError) return null;
    throw err;
  }
}

/** Reads one collection. `fresh` skips the CDN cache (admin reads) and checks
 *  the content against the stored ETag, so a save never starts from a stale
 *  or half-propagated copy. Public reads go through the CDN (~a minute old).
 *  A collection that exists but can't be read throws — it is never treated
 *  as empty, which would let a save wipe it. */
export async function load<K extends CollectionName>(
  name: K,
  fresh = false,
): Promise<Loaded<K>> {
  for (let attempt = 0; attempt < 4; attempt++) {
    if (attempt > 0) await sleep(250 * attempt);
    const result = await get(path(name), { access: "public", useCache: !fresh });
    if (!result || !result.stream) {
      if ((await storedEtag(name)) === null) return { items: [] as Collections[K], etag: null };
      continue; // exists but not readable yet — retry
    }
    const text = await new Response(result.stream).text();
    const etag = strong(result.blob.etag);
    if (fresh && (await storedEtag(name)) !== etag) continue; // changed mid-read
    return { items: JSON.parse(text) as Collections[K], etag };
  }
  throw new Error(`Could not read ${name}; please try again`);
}

export class ConflictError extends Error {}

/** Writes a collection. `etag` must match what was loaded, so two editors
 *  can't silently overwrite each other; pass null for a first write. */
export async function save<K extends CollectionName>(
  name: K,
  items: Collections[K],
  etag: string | null,
) {
  try {
    const blob = await put(path(name), JSON.stringify(items), {
      access: "public",
      contentType: "application/json; charset=utf-8",
      addRandomSuffix: false,
      cacheControlMaxAge: 60,
      ...(etag ? { ifMatch: strong(etag) } : { allowOverwrite: false }),
    });
    return strong(blob.etag);
  } catch (err) {
    if (err instanceof BlobPreconditionFailedError) throw new ConflictError();
    if (!etag && err instanceof Error && /already exists/i.test(err.message))
      throw new ConflictError();
    throw err;
  }
}
