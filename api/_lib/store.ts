import { BlobPreconditionFailedError, get, put } from "@vercel/blob";

import type { CollectionName, Collections } from "../../src/cms/types.js";

const path = (name: CollectionName) => `cms/${name}.json`;

export type Loaded<K extends CollectionName> = {
  items: Collections[K];
  etag: string | null;
};

/** Reads one collection. `fresh` skips the CDN cache (admin reads);
 *  public reads go through the CDN and may be up to ~a minute old. */
export async function load<K extends CollectionName>(
  name: K,
  fresh = false,
): Promise<Loaded<K>> {
  const result = await get(path(name), { access: "public", useCache: !fresh });
  if (!result || !result.stream) return { items: [] as Collections[K], etag: null };
  const text = await new Response(result.stream).text();
  return {
    items: JSON.parse(text) as Collections[K],
    etag: result.blob.etag,
  };
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
      ...(etag ? { ifMatch: etag } : { allowOverwrite: false }),
    });
    return blob.etag;
  } catch (err) {
    if (err instanceof BlobPreconditionFailedError) throw new ConflictError();
    if (!etag && err instanceof Error && /already exists/i.test(err.message))
      throw new ConflictError();
    throw err;
  }
}
