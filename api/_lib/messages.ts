import { copy, del, list, put } from "@vercel/blob";

/** Contact-form messages. Each message is its own write-once file, so
 *  messages arriving together never overwrite each other and nothing is read
 *  back from a stale CDN copy (archiving moves it to a new path).
 *
 *  messages/inbox/<ms>-<rand>.json    new
 *  messages/archive/<ms>-<rand>.json  archived */

export type Folder = "inbox" | "archive";

export type StoredMessage = {
  name: string;
  email: string;
  phone?: string;
  organisation?: string;
  interest?: string;
  subject?: string;
  message: string;
  lang?: string;
  receivedAt: number;
};

const prefix = (folder: Folder) => `messages/${folder}/`;

export async function storeMessage(m: StoredMessage) {
  const stamp = String(m.receivedAt).padStart(13, "0");
  const random = Math.random().toString(36).slice(2, 10);
  await put(`${prefix("inbox")}${stamp}-${random}.json`, JSON.stringify(m), {
    access: "public",
    contentType: "application/json; charset=utf-8",
    addRandomSuffix: true, // unguessable URL
    cacheControlMaxAge: 60 * 60 * 24 * 365,
  });
}

export async function listMessages(folder: Folder, max = 300) {
  const blobs = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: prefix(folder), cursor, limit: 1000 });
    blobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  blobs.sort((a, b) => b.pathname.localeCompare(a.pathname)); // newest first
  const shown = blobs.slice(0, max);
  const items = await Promise.all(
    shown.map(async (b) => {
      try {
        const r = await fetch(b.url);
        return { id: b.url, ...((await r.json()) as StoredMessage) };
      } catch {
        return null;
      }
    }),
  );
  return { total: blobs.length, items: items.filter(Boolean) };
}

function assertOurs(url: string, folder?: Folder) {
  const path = new URL(url).pathname.slice(1);
  if (!path.startsWith("messages/")) throw new Error("Not a message");
  if (folder && !path.startsWith(prefix(folder))) throw new Error("Wrong folder");
  return path;
}

/** Moves a message between inbox and archive. */
export async function moveMessage(url: string, to: Folder) {
  const from: Folder = to === "archive" ? "inbox" : "archive";
  const path = assertOurs(url, from);
  const name = path.slice(prefix(from).length);
  await copy(url, `${prefix(to)}${name}`, {
    access: "public",
    addRandomSuffix: false,
    cacheControlMaxAge: 60 * 60 * 24 * 365,
  });
  await del(url);
}

export async function deleteMessage(url: string) {
  assertOurs(url);
  await del(url);
}
