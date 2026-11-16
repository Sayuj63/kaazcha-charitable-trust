import { useCallback, useEffect, useMemo, useState } from "react";

import { AdminError, adminApi } from "@/cms/client";
import type { CollectionName, Collections } from "@/cms/types";

const unsaved = new Set<CollectionName>();

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
        const data = await adminApi.save(name, payload, etag);
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
    [name, items, etag, handle],
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
