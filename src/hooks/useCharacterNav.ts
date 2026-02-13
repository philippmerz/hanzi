import { useState, useCallback, useMemo } from 'react';
import type { Character } from '../types';
import { clamp } from '../utils';

export const useCharacterNav = (characters: readonly Character[], initialIndex = 0) => {
  const [index, setIndex] = useState(initialIndex);

  const safeIndex = useMemo(
    () => clamp(index, 0, Math.max(characters.length - 1, 0)),
    [index, characters.length],
  );

  const current = useMemo(
    () => characters[safeIndex] ?? null,
    [characters, safeIndex],
  );

  const canGoNext = safeIndex < characters.length - 1;
  const canGoPrev = safeIndex > 0;

  const next = useCallback(() => {
    setIndex((i) => Math.min(i + 1, characters.length - 1));
  }, [characters.length]);

  const prev = useCallback(() => {
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  const goTo = useCallback(
    (target: number) => {
      setIndex(clamp(target, 0, characters.length - 1));
    },
    [characters.length],
  );

  const reset = useCallback(() => {
    setIndex(0);
  }, []);

  return {
    current,
    index: safeIndex,
    total: characters.length,
    canGoNext,
    canGoPrev,
    next,
    prev,
    goTo,
    reset,
  } as const;
};
