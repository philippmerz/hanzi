import { createContext, useContext } from 'react';
import type { Character, AppMode, Collection } from '../types';

interface AppStateContextValue {
  // Mode
  readonly mode: AppMode;
  readonly toggleMode: () => void;

  // Navigation
  readonly current: Character | null;
  readonly index: number;
  readonly total: number;
  readonly canGoNext: boolean;
  readonly canGoPrev: boolean;
  readonly next: () => void;
  readonly prev: () => void;
  readonly goTo: (index: number) => void;

  // Reveal (test mode)
  readonly revealed: boolean;
  readonly reveal: () => void;

  // Idle hint (test mode)
  readonly showHint: boolean;

  // Learn session
  readonly learnedCount: number;
  readonly hasTestDeck: boolean;
  readonly clearSession: () => void;

  // Collections
  readonly collections: readonly Collection[];
  readonly isCollectionEnabled: (id: string) => boolean;
  readonly toggleCollection: (id: string) => void;

  // Sidebar
  readonly sidebarOpen: boolean;
  readonly openSidebar: () => void;
  readonly closeSidebar: () => void;
}

export const AppStateContext = createContext<AppStateContextValue | null>(null);

export const useAppStateContext = (): AppStateContextValue => {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error('useAppStateContext must be used within AppStateProvider');
  }
  return ctx;
};
