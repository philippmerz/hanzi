import { useState, useCallback } from 'react';
import type { AppMode } from '../types';

export const useAppMode = (initialMode: AppMode = 'learn') => {
  const [mode, setMode] = useState<AppMode>(initialMode);

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === 'learn' ? 'test' : 'learn'));
  }, []);

  return { mode, toggleMode } as const;
};
