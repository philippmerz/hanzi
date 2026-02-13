import { useThemeContext, useAppStateContext } from '../context';
import { HamburgerButton } from './HamburgerButton';
import { Sidebar } from './Sidebar';
import { Progress } from './Progress';

export const TopBar = () => {
  const { theme, toggleTheme } = useThemeContext();
  const {
    openSidebar,
    sidebarOpen,
    closeSidebar,
    clearSession,
    index,
    total,
    learnedCount,
    goTo,
    collections,
    isCollectionEnabled,
    toggleCollection,
  } = useAppStateContext();

  return (
    <>
      <header className="top-bar">
        <HamburgerButton onClick={openSidebar} />
        <Progress index={index} total={total} learnedCount={learnedCount} onGoTo={goTo} />
        <div className="top-bar-spacer" />
      </header>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        theme={theme}
        onToggleTheme={toggleTheme}
        onNewSession={clearSession}
        collections={collections}
        isCollectionEnabled={isCollectionEnabled}
        onToggleCollection={toggleCollection}
      />
    </>
  );
};
