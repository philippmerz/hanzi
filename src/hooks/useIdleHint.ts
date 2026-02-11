import { useState, useEffect, useCallback } from 'react';

const HINT_DELAY_MS = 30_000;

export const useIdleHint = (resetDeps: readonly unknown[]) => {
  const [showHint, setShowHint] = useState(false);

  const dismiss = useCallback(() => setShowHint(false), []);

  useEffect(() => {
    setShowHint(false);
    const timer = setTimeout(() => setShowHint(true), HINT_DELAY_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, resetDeps);

  return { showHint, dismiss } as const;
};
