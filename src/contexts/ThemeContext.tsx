import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { SeasonTheme } from '../types';
import { getCurrentSeason, seasonThemes } from '../themes/seasons';

export type SeasonName = 'spring' | 'summer' | 'fall' | 'winter';
export type TimeMode = 'day' | 'night';

interface ThemeContextType {
  theme: SeasonTheme;
  currentSeason: SeasonName;
  timeMode: TimeMode;
  isAutoSeason: boolean;
  setManualSeason: (season: SeasonName) => void;
  setAutoSeason: () => void;
  toggleTimeMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAutoSeason, setIsAutoSeason] = useState(true);
  const [currentSeason, setCurrentSeason] = useState<SeasonName>(getCurrentSeason().name as SeasonName);
  const [timeMode, setTimeMode] = useState<TimeMode>('day');
  const [theme, setTheme] = useState<SeasonTheme>(getCurrentSeason());

  // Update theme when season or time mode changes
  useEffect(() => {
    const baseTheme = seasonThemes[currentSeason];
    
    // Apply night mode adjustments
    if (timeMode === 'night') {
      setTheme({
        ...baseTheme,
        background: adjustForNight(baseTheme.background),
        cardBg: adjustCardForNight(baseTheme.cardBg),
        text: adjustTextForNight(baseTheme.text),
        textSecondary: adjustTextForNight(baseTheme.textSecondary),
      });
    } else {
      setTheme(baseTheme);
    }
  }, [currentSeason, timeMode]);

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

  const toggleTimeMode = () => {
    setTimeMode(prev => prev === 'day' ? 'night' : 'day');
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      currentSeason, 
      timeMode, 
      isAutoSeason,
      setManualSeason, 
      setAutoSeason,
      toggleTimeMode 
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

// Helper functions to adjust colors for night mode
function adjustForNight(gradient: string): string {
  // Darken the background gradient for night mode
  return gradient.replace(/\d+%\)/g, (match) => {
    const value = parseInt(match);
    return `${Math.max(10, value - 70)}%)`;
  });
}

function adjustCardForNight(_cardBg: string): string {
  // Make cards darker with more opacity
  return 'rgba(20, 20, 30, 0.85)';
}

function adjustTextForNight(_textColor: string): string {
  // Lighten text for better contrast on dark background
  return '#E0E0E0';
}
