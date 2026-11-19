import { useCallback, useEffect, useMemo, useState } from "react";

import { AdminError, adminApi } from "@/cms/client";
import type { CollectionName, Collections } from "@/cms/types";

const unsaved = new Set<CollectionName>();

type WithId = { id: string };

/** Three-way merge by id: items added or edited in `draft` (relative to
 *  `base`) win, items deleted from `draft` are removed, and everything else
 *  comes from `latest`. */
export function mergeEdits<T extends WithId>(base: T[], draft: T[], latest: T[]): T[] {
  const baseJson = new Map(base.map((i) => [i.id, JSON.stringify(i)]));
  const draftIds = new Set(draft.map((i) => i.id));
  const changed = new Map(
    draft.filter((i) => baseJson.get(i.id) !== JSON.stringify(i)).map((i) => [i.id, i]),
  );
  const removed = new Set(base.filter((i) => !draftIds.has(i.id)).map((i) => i.id));
  const latestIds = new Set(latest.map((i) => i.id));
  const added = [...changed.values()].filter((i) => !latestIds.has(i.id) && !baseJson.has(i.id));
  return [
    ...added,
    ...latest.filter((i) => !removed.has(i.id)).map((i) => changed.get(i.id) ?? i),
  ];
}

/** True while any open editor has edits that aren't saved yet. */
export function hasUnsaved() {
  return unsaved.size > 0;
}

if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", (e) => {
    if (hasUnsaved()) e.preventDefault();
  });
}

/** Loads one CMS collection into an editable draft and saves it back with
 *  the ETag it was loaded at, so concurrent edits are refused, not lost. */
export function useCollection<K extends CollectionName>(
  name: K,
  onSignedOut: () => void,
) {
  const [items, setItems] = useState<Collections[K] | null>(null);
  const [savedJson, setSavedJson] = useState("");
  const [etag, setEtag] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handle = useCallback(
    (err: unknown) => {
      if (err instanceof AdminError && err.status === 401) onSignedOut();
      setError(err instanceof Error ? err.message : "Something went wrong");
    },
    [onSignedOut],
  );

  const reload = useCallback(async () => {
    setError(null);
    try {
      const data = await adminApi.load(name);
      setItems(data.items);
      setSavedJson(JSON.stringify(data.items));
      setEtag(data.etag);
    } catch (err) {
      handle(err);
    }
  }, [name, handle]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const save = useCallback(
    async (next?: Collections[K]) => {
      const payload = next ?? items;
      if (!payload) return false;
      setSaving(true);
      setError(null);
      try {
        let data;
        try {
          data = await adminApi.save(name, payload, etag);
        } catch (err) {
          if (!(err instanceof AdminError && err.status === 409)) throw err;
          // Someone saved in between: re-apply only our edits onto their
          // version instead of making the user retype everything.
          const latest = await adminApi.load(name);
          const merged = mergeEdits<{ id: string }>(JSON.parse(savedJson || "[]"), payload as { id: string }[], latest.items as { id: string }[]);
          data = await adminApi.save(name, merged as Collections[K], latest.etag);
        }
        setItems(data.items);
        setSavedJson(JSON.stringify(data.items));
        setEtag(data.etag);
        return true;
      } catch (err) {
        handle(err);
        return false;
      } finally {
        setSaving(false);
      }
    },
    [name, items, etag, savedJson, handle],
  );

  const dirty = useMemo(
    () => items !== null && JSON.stringify(items) !== savedJson,
    [items, savedJson],
  );

  useEffect(() => {
    if (dirty) unsaved.add(name);
    else unsaved.delete(name);
    return () => {
      unsaved.delete(name);
    };
  }, [dirty, name]);

  const saved = useMemo(
    () => (savedJson ? (JSON.parse(savedJson) as Collections[K]) : null),
    [savedJson],
  );

  return { items, setItems, saved, dirty, saving, error, setError, save, reload };
}
