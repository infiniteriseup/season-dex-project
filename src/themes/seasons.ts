import type { SeasonTheme } from '../types';

export const seasonThemes: Record<string, SeasonTheme> = {
  spring: {
    name: 'spring',
    primary: '#7EC8E3',
    secondary: '#98D8C8',
    accent: '#FFB6C1',
    background: 'linear-gradient(135deg, #E8F5E9 0%, #FFF9C4 100%)',
    cardBg: 'rgba(255, 255, 255, 0.9)',
    text: '#2E7D32',
    textSecondary: '#558B2F',
    border: '#A5D6A7',
    gradient: 'linear-gradient(135deg, #7EC8E3 0%, #98D8C8 50%, #FFB6C1 100%)',
  },
  summer: {
    name: 'summer',
    primary: '#FFD54F',
    secondary: '#FF7043',
    accent: '#42A5F5',
    background: 'linear-gradient(135deg, #FFF9C4 0%, #FFECB3 100%)',
    cardBg: 'rgba(255, 255, 255, 0.95)',
    text: '#E65100',
    textSecondary: '#F57C00',
    border: '#FFB74D',
    gradient: 'linear-gradient(135deg, #FFD54F 0%, #FF7043 50%, #42A5F5 100%)',
  },
  fall: {
    name: 'fall',
    primary: '#FF8A65',
    secondary: '#D4A574',
    accent: '#8D6E63',
    background: 'linear-gradient(135deg, #FFCCBC 0%, #FFAB91 100%)',
    cardBg: 'rgba(255, 248, 240, 0.95)',
    text: '#5D4037',
    textSecondary: '#6D4C41',
    border: '#BCAAA4',
    gradient: 'linear-gradient(135deg, #FF8A65 0%, #D4A574 50%, #8D6E63 100%)',
  },
  winter: {
    name: 'winter',
    primary: '#64B5F6',
    secondary: '#90CAF9',
    accent: '#B39DDB',
    background: 'linear-gradient(135deg, #E3F2FD 0%, #F3E5F5 100%)',
    cardBg: 'rgba(255, 255, 255, 0.92)',
    text: '#1565C0',
    textSecondary: '#1976D2',
    border: '#BBDEFB',
    gradient: 'linear-gradient(135deg, #64B5F6 0%, #90CAF9 50%, #B39DDB 100%)',
  },
};

export const getCurrentSeason = (): SeasonTheme => {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();

  // Spring: March 20 - June 20
  if ((month === 2 && day >= 20) || month === 3 || month === 4 || (month === 5 && day <= 20)) {
    return seasonThemes.spring;
  }
  // Summer: June 21 - September 22
  if ((month === 5 && day >= 21) || month === 6 || month === 7 || (month === 8 && day <= 22)) {
    return seasonThemes.summer;
  }
  // Fall: September 23 - December 20
  if ((month === 8 && day >= 23) || month === 9 || month === 10 || (month === 11 && day <= 20)) {
    return seasonThemes.fall;
  }
  // Winter: December 21 - March 19
  return seasonThemes.winter;
};
