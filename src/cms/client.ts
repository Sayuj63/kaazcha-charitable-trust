import { useEffect, useState } from "react";

import type {
  Album,
  Article,
  CollectionName,
  Collections,
  Magazine,
  Person,
} from "./types";

export type MediaData = {
  magazines: Magazine[];
  articles: Article[];
  albums: Album[];
};

type Status<T> =
  | { state: "loading" }
  | { state: "error" }
  | { state: "missing" }
  | { state: "ready"; data: T };

let mediaCache: Promise<MediaData> | null = null;

function fetchMedia() {
  mediaCache ??= fetch("/api/public?c=media").then((r) => {
    if (!r.ok) throw new Error(String(r.status));
    return r.json() as Promise<MediaData>;
  });
  mediaCache.catch(() => (mediaCache = null));
  return mediaCache;
}

/** Magazines, newsletters and gallery albums from the CMS. */
export function useMedia() {
  const [status, setStatus] = useState<Status<MediaData>>({ state: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let live = true;
    fetchMedia()
      .then((data) => live && setStatus({ state: "ready", data }))
      .catch(() => live && setStatus({ state: "error" }));
    return () => {
      live = false;
    };
  }, [attempt]);

  const retry = () => {
    setStatus({ state: "loading" });
    setAttempt((n) => n + 1);
  };
  return { status, retry };
}

export function usePerson(slug: string | undefined) {
  const [status, setStatus] = useState<Status<Person>>({ state: "loading" });

  useEffect(() => {
    if (!slug) return setStatus({ state: "missing" });
    let live = true;
    setStatus({ state: "loading" });
    fetch(`/api/public?c=person&slug=${encodeURIComponent(slug)}`)
      .then(async (r) => {
        if (!live) return;
        if (r.status === 404) return setStatus({ state: "missing" });
        if (!r.ok) throw new Error(String(r.status));
        const { person } = (await r.json()) as { person: Person };
        setStatus({ state: "ready", data: person });
      })
      .catch(() => live && setStatus({ state: "error" }));
    return () => {
      live = false;
    };
  }, [slug]);

  return status;
}

/* ---------- admin ---------- */

export class AdminError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function admin<T>(body: Record<string, unknown>): Promise<T> {
  const r = await fetch("/api/admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
  const data = (await r.json().catch(() => ({}))) as T & { error?: string };
  if (!r.ok) throw new AdminError(data.error ?? `Request failed (${r.status})`, r.status);
  return data;
}

export const adminApi = {
  login: (username: string, password: string) =>
    admin<{ ok: true }>({ action: "login", username, password }),
  logout: () => admin<{ ok: true }>({ action: "logout" }),
  me: () => admin<{ ok: true }>({ action: "me" }),
  load: <K extends CollectionName>(collection: K) =>
    admin<{ items: Collections[K]; etag: string | null }>({
      action: "load",
      collection,
    }),
  save: <K extends CollectionName>(
    collection: K,
    items: Collections[K],
    etag: string | null,
  ) =>
    admin<{ etag: string; items: Collections[K] }>({
      action: "save",
      collection,
      items,
      etag,
    }),
};

export function newId() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 16);
}

export function slugify(text: string) {
  return text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
