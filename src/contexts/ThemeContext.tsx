import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { SeasonTheme } from '../types';
import { getCurrentSeason, seasonThemes } from '../themes/seasons';

export type SeasonName = 'spring' | 'summer' | 'fall' | 'winter';

interface ThemeContextType {
  theme: SeasonTheme;
  currentSeason: SeasonName;
  isAutoSeason: boolean;
  setManualSeason: (season: SeasonName) => void;
  setAutoSeason: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAutoSeason, setIsAutoSeason] = useState(true);
  const [currentSeason, setCurrentSeason] = useState<SeasonName>(getCurrentSeason().name as SeasonName);
  const [theme, setTheme] = useState<SeasonTheme>(getCurrentSeason());

  // Update theme when season changes (always day mode)
  useEffect(() => {
    const baseTheme = seasonThemes[currentSeason];
    setTheme(baseTheme);
  }, [currentSeason]);

  // Auto-update season every hour if auto mode is enabled
  useEffect(() => {
    if (!isAutoSeason) return;

    const updateSeason = () => {
      const newSeason = getCurrentSeason();
      setCurrentSeason(newSeason.name as SeasonName);
    };

    const interval = setInterval(updateSeason, 3600000);
    return () => clearInterval(interval);
  }, [isAutoSeason]);

  const setManualSeason = (season: SeasonName) => {
    setIsAutoSeason(false);
    setCurrentSeason(season);
  };

  const setAutoSeason = () => {
    setIsAutoSeason(true);
    const newSeason = getCurrentSeason();
    setCurrentSeason(newSeason.name as SeasonName);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      currentSeason, 
      isAutoSeason,
      setManualSeason, 
      setAutoSeason,
    }}>
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
