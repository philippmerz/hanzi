import { useState, useCallback } from 'react';

export const useReveal = () => {
  const [revealed, setRevealed] = useState(false);

  const reveal = useCallback(() => setRevealed(true), []);
  const hide = useCallback(() => setRevealed(false), []);

  return { revealed, reveal, hide } as const;
};
