interface Props {
  readonly onClick: () => void;
}

export const HamburgerButton = ({ onClick }: Props) => (
  <button
    className="hamburger-button"
    onClick={onClick}
    type="button"
    aria-label="Open menu"
    title="Menu"
  >
    <span className="hamburger-bar" />
    <span className="hamburger-bar" />
    <span className="hamburger-bar" />
  </button>
);
