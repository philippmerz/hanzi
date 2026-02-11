interface Props {
  readonly canGoPrev: boolean;
  readonly canGoNext: boolean;
  readonly onPrev: () => void;
  readonly onNext: () => void;
}

export const NavZones = ({ canGoPrev, canGoNext, onPrev, onNext }: Props) => (
  <>
    <div
      className={`nav-zone nav-zone--left ${canGoPrev ? '' : 'nav-zone--disabled'}`}
      onClick={canGoPrev ? onPrev : undefined}
      role="button"
      aria-label="Previous character"
      tabIndex={-1}
    >
      <span className="nav-zone-arrow">←</span>
    </div>
    <div
      className={`nav-zone nav-zone--right ${canGoNext ? '' : 'nav-zone--disabled'}`}
      onClick={canGoNext ? onNext : undefined}
      role="button"
      aria-label="Next character"
      tabIndex={-1}
    >
      <span className="nav-zone-arrow">→</span>
    </div>
  </>
);
