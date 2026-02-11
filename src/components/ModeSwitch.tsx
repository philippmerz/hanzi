import type { AppMode } from '../types';

interface Props {
  readonly mode: AppMode;
  readonly onToggle: () => void;
  readonly disabled: boolean;
}

export const ModeSwitch = ({ mode, onToggle, disabled }: Props) => {
  const isTest = mode === 'test';

  return (
    <div
      className={`mode-switch ${disabled ? 'mode-switch--disabled' : ''}`}
      title={
        disabled
          ? 'View some characters first'
          : `Switch to ${isTest ? 'learn' : 'test'} mode [m]`
      }
    >
      <span className={`mode-switch-label ${!isTest ? 'mode-switch-label--active' : ''}`}>
        learn
      </span>
      <button
        className={`mode-switch-track ${isTest ? 'mode-switch-track--on' : ''}`}
        onClick={onToggle}
        disabled={disabled}
        type="button"
        role="switch"
        aria-checked={isTest}
        aria-label={`Mode: ${mode}`}
      >
        <span className="mode-switch-thumb" />
      </button>
      <span className={`mode-switch-label ${isTest ? 'mode-switch-label--active' : ''}`}>
        test
      </span>
    </div>
  );
};
