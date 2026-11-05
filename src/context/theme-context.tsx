import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  getAppTheme,
  type AppTheme,
} from '@/constants/theme';

type ThemeContextValue = {
  isDark: boolean;
  toggleTheme: (value: boolean) => void;
  colors: AppTheme;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const value = useMemo<ThemeContextValue>(() => {
    return {
      isDark,
      toggleTheme: setIsDark,
      colors: getAppTheme(isDark),
    };
  }, [isDark]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return context;
}