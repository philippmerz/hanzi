import { useEffect } from 'react';

interface KeyboardActions {
  readonly onNext: () => void;
  readonly onPrev: () => void;
  readonly onReveal: () => void;
  readonly onToggleMode: () => void;
  readonly onToggleTheme: () => void;
}

const keyActionMap: Record<string, keyof KeyboardActions> = {
  ArrowRight: 'onNext',
  ArrowLeft: 'onPrev',
  ' ': 'onReveal',
  Enter: 'onReveal',
  m: 'onToggleMode',
  t: 'onToggleTheme',
};

export const useKeyboard = (actions: KeyboardActions) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const actionName = keyActionMap[e.key];
      if (actionName) {
        e.preventDefault();
        actions[actionName]();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [actions]);
};
