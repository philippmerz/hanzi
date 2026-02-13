import { useState, useRef, useCallback, useEffect } from 'react';

interface Props {
  readonly index: number;
  readonly total: number;
  readonly learnedCount: number;
  readonly onGoTo: (index: number) => void;
}

export const Progress = ({ index, total, learnedCount, onGoTo }: Props) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const displayIndex = index + 1;

  const startEditing = useCallback(() => {
    if (total === 0) return;
    setDraft(String(displayIndex));
    setEditing(true);
  }, [displayIndex, total]);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const commit = useCallback(() => {
    setEditing(false);
    const parsed = parseInt(draft, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= total) {
      onGoTo(parsed - 1);
    }
  }, [draft, total, onGoTo]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        commit();
      } else if (e.key === 'Escape') {
        setEditing(false);
      }
      e.stopPropagation();
    },
    [commit],
  );

  return (
    <div className="progress">
      <span className="progress-position">
        {total > 0 ? (
          editing ? (
            <>
              <input
                ref={inputRef}
                className="progress-input"
                type="number"
                inputMode="numeric"
                min={1}
                max={total}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onBlur={commit}
                onKeyDown={handleKeyDown}
              />
              <span className="progress-separator"> / {total}</span>
            </>
          ) : (
            <span className="progress-clickable" onClick={startEditing}>
              {displayIndex} / {total}
            </span>
          )
        ) : (
          '—'
        )}
      </span>
      {learnedCount > 0 && (
        <span className="progress-learned">{learnedCount} learned</span>
      )}
    </div>
  );
};
