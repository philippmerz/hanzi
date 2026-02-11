import { useState, useCallback, useMemo } from 'react';
import type { Collection } from '../types';
import { loadFromStorage, saveToStorage } from '../utils';

const STORAGE_KEY = 'hanzi-collections';

export const useCollections = (allCollections: readonly Collection[]) => {
  const [enabledIds, setEnabledIds] = useState<ReadonlySet<string>>(
    () => {
      const stored = loadFromStorage<string[]>(STORAGE_KEY, []);
      return stored.length > 0
        ? new Set(stored)
        : new Set(allCollections.map((c) => c.id));
    },
  );

  const toggle = useCallback(
    (collectionId: string) => {
      setEnabledIds((prev) => {
        const next = new Set(prev);
        if (next.has(collectionId)) {
          // Don't allow disabling all collections
          if (next.size > 1) {
            next.delete(collectionId);
          }
        } else {
          next.add(collectionId);
        }
        saveToStorage(STORAGE_KEY, [...next]);
        return next;
      });
    },
    [],
  );

  const isEnabled = useCallback(
    (collectionId: string) => enabledIds.has(collectionId),
    [enabledIds],
  );

  const sorted = useMemo(
    () => [...allCollections].sort((a, b) => a.order - b.order),
    [allCollections],
  );

  return { collections: sorted, enabledIds, toggle, isEnabled } as const;
};
