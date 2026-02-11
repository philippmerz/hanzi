import { useAppStateContext } from '../context';
import { ModeSwitch } from './ModeSwitch';

export const BottomBar = () => {
  const { mode, toggleMode, hasTestDeck } = useAppStateContext();

  const disabled = mode === 'learn' && !hasTestDeck;

  return (
    <footer className="bottom-bar">
      <ModeSwitch mode={mode} onToggle={toggleMode} disabled={disabled} />
    </footer>
  );
};
