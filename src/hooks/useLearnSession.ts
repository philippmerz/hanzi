import { useState, useCallback, useMemo } from 'react';
import type { Character } from '../types';
import { shuffle, loadFromStorage, saveToStorage } from '../utils';

const STORAGE_KEY = 'hanzi-learned';

export const useLearnSession = (allCharacters: readonly Character[]) => {
  const [learnedIds, setLearnedIds] = useState<ReadonlySet<string>>(
    () => new Set(loadFromStorage<string[]>(STORAGE_KEY, [])),
  );

  const persistIds = (ids: ReadonlySet<string>) => {
    saveToStorage(STORAGE_KEY, [...ids]);
  };

  const markLearned = useCallback((id: string) => {
    setLearnedIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      persistIds(next);
      return next;
    });
  }, []);

  const clearSession = useCallback(() => {
    const empty = new Set<string>();
    setLearnedIds(empty);
    persistIds(empty);
  }, []);

  const learnedCount = learnedIds.size;

  const testDeck = useMemo(
    () =>
      shuffle(
        allCharacters.filter((c) => learnedIds.has(c.id)),
      ),
    [allCharacters, learnedIds],
  );

  const hasTestDeck = testDeck.length > 0;

  return {
    learnedIds,
    learnedCount,
    markLearned,
    clearSession,
    testDeck,
    hasTestDeck,
  } as const;
};
