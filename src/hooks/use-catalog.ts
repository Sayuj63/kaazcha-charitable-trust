import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useRef } from "react";

/**
 * Catalogue data: seeds the collection once per session (idempotent on the
 * server) and subscribes to the live list.
 */
export function useCatalogItems() {
  const seeded = useRef(false);
  const seed = useMutation(api.catalog.seedCatalogIfEmpty);

  useEffect(() => {
    if (seeded.current) return;
    seeded.current = true;
    seed().catch(() => {
      // The catalogue still renders empty rather than crashing.
    });
  }, [seed]);

  const items = useQuery(api.catalog.list);

  return { items, isLoading: items === undefined };
}
