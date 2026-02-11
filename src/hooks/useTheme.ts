import { useState, useEffect, useCallback } from 'react';
import type { Theme } from '../types';
import { loadFromStorage, saveToStorage } from '../utils';

const STORAGE_KEY = 'hanzi-theme';

const getSystemTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

/**
 * Manages theme state with localStorage persistence and system preference detection.
 * Applies the data-theme attribute to the document root.
 */
export const useTheme = () => {
  const [theme, setThemeState] = useState<Theme>(
    () => loadFromStorage<Theme>(STORAGE_KEY, getSystemTheme()),
  );

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    saveToStorage(STORAGE_KEY, next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return { theme, toggleTheme } as const;
};
