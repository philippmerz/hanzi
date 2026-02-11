import type { ReactNode } from 'react';
import { useTheme } from '../hooks';
import { ThemeContext } from './ThemeContext';

interface Props {
  readonly children: ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
