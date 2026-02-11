interface Props {
  readonly hanzi: string;
  readonly clickable: boolean;
  readonly onClick?: () => void;
}

export const HanziDisplay = ({ hanzi, clickable, onClick }: Props) => (
  <div
    className={`hanzi-display ${clickable ? 'hanzi-display--clickable' : ''}`}
    aria-label={`Chinese character: ${hanzi}`}
    onClick={clickable ? onClick : undefined}
    role={clickable ? 'button' : undefined}
    tabIndex={clickable ? 0 : undefined}
    onKeyDown={
      clickable
        ? (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClick?.();
            }
          }
        : undefined
    }
  >
    {hanzi}
  </div>
);
