import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { SeasonTheme } from '../types';
import { getCurrentSeason } from '../themes/seasons';

interface ThemeContextType {
  theme: SeasonTheme;
  setTheme: (theme: SeasonTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<SeasonTheme>(getCurrentSeason());

  useEffect(() => {
    // Update theme every hour to catch season changes
    const interval = setInterval(() => {
      setTheme(getCurrentSeason());
    }, 3600000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
