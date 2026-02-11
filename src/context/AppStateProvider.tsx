import { type ReactNode, useCallback, useEffect, useMemo, useRef } from 'react';
import { characters, collections } from '../data';
import {
  useAppMode,
  useCharacterNav,
  useLearnSession,
  useReveal,
  useKeyboard,
  useCollections,
  useIdleHint,
  useSidebar,
} from '../hooks';
import { useThemeContext } from './ThemeContext';
import { AppStateContext } from './AppStateContext';

interface Props {
  readonly children: ReactNode;
}

export const AppStateProvider = ({ children }: Props) => {
  const { toggleTheme } = useThemeContext();
  const { mode, toggleMode } = useAppMode('learn');
  const { collections: sortedCollections, enabledIds, toggle: toggleCollection, isEnabled } =
    useCollections(collections);

  // Filter characters by enabled collections
  const filteredCharacters = useMemo(
    () => characters.filter((c) => enabledIds.has(c.collection)),
    [enabledIds],
  );

  const { learnedCount, markLearned, clearSession, testDeck, hasTestDeck } =
    useLearnSession(filteredCharacters);
  const { revealed, reveal, hide } = useReveal();
  const { isOpen: sidebarOpen, open: openSidebar, close: closeSidebar } = useSidebar();

  const activeCharacters = mode === 'learn' ? filteredCharacters : testDeck;
  const nav = useCharacterNav(activeCharacters);

  // Remember learn-mode index so it survives round-trips to test mode
  const learnIndexRef = useRef(0);

  // Idle hint for test mode — resets on character change or reveal
  const { showHint, dismiss: dismissHint } = useIdleHint([nav.index, mode, revealed]);

  // Mark character as learned when viewing in learn mode
  useEffect(() => {
    if (mode === 'learn' && nav.current) {
      markLearned(nav.current.id);
    }
  }, [mode, nav.current?.id, markLearned]);

  // Persist learn index while browsing in learn mode
  useEffect(() => {
    if (mode === 'learn') {
      learnIndexRef.current = nav.index;
    }
  }, [mode, nav.index]);

  // Hide translation when navigating to a new character
  useEffect(() => {
    hide();
  }, [nav.index, mode, hide]);

  // Restore saved index when switching back to learn, reset for test
  useEffect(() => {
    if (mode === 'learn') {
      nav.goTo(learnIndexRef.current);
    } else {
      nav.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // Reset navigation when collection filter changes
  useEffect(() => {
    learnIndexRef.current = 0;
    nav.reset();
  }, [enabledIds, nav.reset]);

  const handleToggleMode = useCallback(() => {
    if (mode === 'learn' || hasTestDeck) {
      toggleMode();
    }
  }, [mode, hasTestDeck, toggleMode]);

  const handleNext = useCallback(() => {
    if (nav.canGoNext) nav.next();
  }, [nav]);

  const handlePrev = useCallback(() => {
    if (nav.canGoPrev) nav.prev();
  }, [nav]);

  const handleReveal = useCallback(() => {
    reveal();
    dismissHint();
  }, [reveal, dismissHint]);

  useKeyboard(
    useMemo(
      () => ({
        onNext: handleNext,
        onPrev: handlePrev,
        onReveal: handleReveal,
        onToggleMode: handleToggleMode,
        onToggleTheme: toggleTheme,
      }),
      [handleNext, handlePrev, handleReveal, handleToggleMode, toggleTheme],
    ),
  );

  const value = useMemo(
    () => ({
      mode,
      toggleMode: handleToggleMode,
      current: nav.current,
      index: nav.index,
      total: nav.total,
      canGoNext: nav.canGoNext,
      canGoPrev: nav.canGoPrev,
      next: handleNext,
      prev: handlePrev,
      revealed,
      reveal: handleReveal,
      showHint,
      learnedCount,
      hasTestDeck,
      clearSession,
      collections: sortedCollections,
      isCollectionEnabled: isEnabled,
      toggleCollection,
      sidebarOpen,
      openSidebar,
      closeSidebar,
    }),
    [
      mode, handleToggleMode,
      nav.current, nav.index, nav.total, nav.canGoNext, nav.canGoPrev,
      handleNext, handlePrev,
      revealed, handleReveal, showHint,
      learnedCount, hasTestDeck, clearSession,
      sortedCollections, isEnabled, toggleCollection,
      sidebarOpen, openSidebar, closeSidebar,
    ],
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};
