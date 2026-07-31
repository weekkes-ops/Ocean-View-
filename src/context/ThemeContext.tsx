import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeMode } from '../types';

interface ThemeConfig {
  name: string;
  description: string;
  icon: string;
  badgeBg: string;
  bgClass: string;
  cardBgClass: string;
  borderClass: string;
  textPrimaryClass: string;
  textSecondaryClass: string;
  accentGradient: string;
  headerBgClass: string;
  sidebarBgClass: string;
}

export const THEMES: Record<ThemeMode, ThemeConfig> = {
  light_luxury: {
    name: 'Light Pearl Luxury',
    description: 'Clean, elegant off-white canvas with navy & gold accents',
    icon: '✨',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
    bgClass: 'bg-slate-100 text-slate-900',
    cardBgClass: 'bg-white',
    borderClass: 'border-slate-200',
    textPrimaryClass: 'text-slate-900',
    textSecondaryClass: 'text-slate-600',
    accentGradient: 'from-amber-500 via-sky-600 to-cyan-600',
    headerBgClass: 'bg-white border-b border-slate-200 text-slate-900',
    sidebarBgClass: 'bg-slate-900 text-white',
  },
  ocean_teal: {
    name: 'Ocean Coast Teal',
    description: 'Vibrant maritime coastal theme with deep cyan & sky tones',
    icon: '🌊',
    badgeBg: 'bg-cyan-950 text-cyan-300 border-cyan-800',
    bgClass: 'bg-slate-950 text-slate-100',
    cardBgClass: 'bg-slate-900/90',
    borderClass: 'border-cyan-900/70',
    textPrimaryClass: 'text-white',
    textSecondaryClass: 'text-cyan-200/80',
    accentGradient: 'from-cyan-400 via-teal-400 to-sky-400',
    headerBgClass: 'bg-slate-900 border-b border-cyan-800/80 text-white',
    sidebarBgClass: 'bg-slate-900 text-white',
  },
  emerald_gold: {
    name: 'Emerald Gold Resort',
    description: 'Rich tropical retreat theme with emerald green & luxury gold',
    icon: '💎',
    badgeBg: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    bgClass: 'bg-slate-950 text-slate-100',
    cardBgClass: 'bg-slate-900/90',
    borderClass: 'border-emerald-900/70',
    textPrimaryClass: 'text-white',
    textSecondaryClass: 'text-emerald-200/80',
    accentGradient: 'from-emerald-400 via-amber-400 to-yellow-400',
    headerBgClass: 'bg-slate-900 border-b border-emerald-800/80 text-white',
    sidebarBgClass: 'bg-slate-900 text-white',
  },
  midnight_slate: {
    name: 'Midnight Obsidian Slate',
    description: 'Sleek ultra-dark VIP executive dashboard theme',
    icon: '🌙',
    badgeBg: 'bg-slate-800 text-slate-300 border-slate-700',
    bgClass: 'bg-slate-950 text-slate-100',
    cardBgClass: 'bg-slate-900',
    borderClass: 'border-slate-800',
    textPrimaryClass: 'text-white',
    textSecondaryClass: 'text-slate-400',
    accentGradient: 'from-cyan-400 via-sky-300 to-orange-400',
    headerBgClass: 'bg-slate-900 border-b border-slate-800 text-white',
    sidebarBgClass: 'bg-slate-900 text-white',
  },
};

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  config: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light_luxury',
  setTheme: () => {},
  config: THEMES.light_luxury,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('oceanview_theme');
    return (saved as ThemeMode) || 'light_luxury';
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem('oceanview_theme', newTheme);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-light_luxury', 'theme-ocean_teal', 'theme-emerald_gold', 'theme-midnight_slate');
    root.classList.add(`theme-${theme}`);
    if (theme === 'light_luxury') {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, config: THEMES[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
