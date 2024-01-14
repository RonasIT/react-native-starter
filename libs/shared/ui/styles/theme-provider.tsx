import { GluestackUIProvider } from '@gluestack-ui/themed';
import { noop } from 'lodash';
import React, { ReactElement, createContext, useState } from 'react';
import { config } from 'gluestack/gluestack-ui.config';

interface ThemeProviderProps {
  children: React.ReactNode;
}

type AppTheme = 'light' | 'dark';

export const AppThemeContext = createContext<{
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
    }>({
      theme: 'light',
      onToggleTheme: noop
    });

export function AppThemeProvider({ children }: ThemeProviderProps): ReactElement {
  const [theme, setTheme] = useState<AppTheme>('dark');

  const handleToggleTheme = (): void => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <AppThemeContext.Provider
      value={{
        theme,
        onToggleTheme: handleToggleTheme
      }}>
      <GluestackUIProvider config={config}>{children}</GluestackUIProvider>
    </AppThemeContext.Provider>
  );
}
