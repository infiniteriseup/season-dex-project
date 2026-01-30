import React from 'react';
import { useTheme, type SeasonName } from '../contexts/ThemeContext';

export const ThemeControls: React.FC = () => {
  const { currentSeason, timeMode, isAutoSeason, setManualSeason, setAutoSeason, toggleTimeMode, theme } = useTheme();

  const seasons: { name: SeasonName; icon: string; label: string }[] = [
    { name: 'spring', icon: '🌸', label: 'Spring' },
    { name: 'summer', icon: '☀️', label: 'Summer' },
    { name: 'fall', icon: '🍂', label: 'Fall' },
    { name: 'winter', icon: '❄️', label: 'Winter' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        flexWrap: 'wrap',
      }}
    >
      {/* Season Selector */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          background: theme.cardBg,
          padding: '0.25rem',
          borderRadius: '12px',
          border: `1px solid ${theme.border}`,
        }}
      >
        {seasons.map((season) => (
          <button
            key={season.name}
            onClick={() => setManualSeason(season.name)}
            title={season.label}
            style={{
              padding: '0.4rem 0.6rem',
              background: currentSeason === season.name ? theme.gradient : 'transparent',
              color: currentSeason === season.name ? 'white' : theme.textSecondary,
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1.2rem',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '36px',
              minHeight: '36px',
            }}
            onMouseOver={(e) => {
              if (currentSeason !== season.name) {
                e.currentTarget.style.background = theme.primary + '20';
              }
            }}
            onMouseOut={(e) => {
              if (currentSeason !== season.name) {
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            {season.icon}
          </button>
        ))}
        
        {/* Auto Season Button */}
        <button
          onClick={setAutoSeason}
          title="Auto Season"
          style={{
            padding: '0.4rem 0.6rem',
            background: isAutoSeason ? theme.accent : 'transparent',
            color: isAutoSeason ? 'white' : theme.textSecondary,
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '36px',
            minHeight: '36px',
            fontWeight: 'bold',
          }}
          onMouseOver={(e) => {
            if (!isAutoSeason) {
              e.currentTarget.style.background = theme.accent + '40';
            }
          }}
          onMouseOut={(e) => {
            if (!isAutoSeason) {
              e.currentTarget.style.background = 'transparent';
            }
          }}
        >
          🔄
        </button>
      </div>

      {/* Day/Night Toggle */}
      <button
        onClick={toggleTimeMode}
        title={timeMode === 'day' ? 'Switch to Night' : 'Switch to Day'}
        style={{
          padding: '0.4rem 0.8rem',
          background: theme.cardBg,
          border: `1px solid ${theme.border}`,
          borderRadius: '12px',
          cursor: 'pointer',
          fontSize: '1.2rem',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          minHeight: '36px',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = theme.primary + '20';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = theme.cardBg;
        }}
      >
        <span style={{ transition: 'transform 0.3s ease' }}>
          {timeMode === 'day' ? '☀️' : '🌙'}
        </span>
        <span
          style={{
            fontSize: '0.75rem',
            color: theme.textSecondary,
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          {timeMode === 'day' ? 'Day' : 'Night'}
        </span>
      </button>
    </div>
  );
};
