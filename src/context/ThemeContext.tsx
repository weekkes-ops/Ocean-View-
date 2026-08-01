import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeMode, LayoutStyle, LayoutDensity } from '../types';

export interface ThemeConfig {
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
  navActiveBg: string;
  swatchPrimary: string;
  swatchSecondary: string;
}

export const THEMES: Record<ThemeMode, ThemeConfig> = {
  light_luxury: {
    name: 'White Pearl Luxury',
    description: 'Clean light background with navy & gold accents',
    icon: '✨',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    bgClass: 'bg-slate-50 text-slate-900',
    cardBgClass: 'bg-white border-slate-200 shadow-sm',
    borderClass: 'border-slate-200',
    textPrimaryClass: 'text-slate-900',
    textSecondaryClass: 'text-slate-600',
    accentGradient: 'from-amber-500 via-sky-600 to-cyan-600',
    headerBgClass: 'bg-white border-b border-slate-200 text-slate-900 shadow-sm',
    sidebarBgClass: 'bg-slate-900 text-white',
    navActiveBg: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
    swatchPrimary: '#f8fafc',
    swatchSecondary: '#0f172a',
  },
  ocean_teal: {
    name: 'Ocean Coast Teal',
    description: 'Maritime resort layout with deep cyan & sky blue tones',
    icon: '🌊',
    badgeBg: 'bg-cyan-950 text-cyan-300 border-cyan-800',
    bgClass: 'bg-slate-950 text-slate-100',
    cardBgClass: 'bg-slate-900/90 border-cyan-900/40',
    borderClass: 'border-cyan-900/70',
    textPrimaryClass: 'text-white',
    textSecondaryClass: 'text-cyan-200/80',
    accentGradient: 'from-cyan-400 via-teal-400 to-sky-400',
    headerBgClass: 'bg-slate-900 border-b border-cyan-800/80 text-white',
    sidebarBgClass: 'bg-slate-950 text-white border-r border-cyan-950',
    navActiveBg: 'bg-gradient-to-r from-cyan-500/20 to-teal-500/20 text-cyan-300 border border-cyan-500/40',
    swatchPrimary: '#083344',
    swatchSecondary: '#22d3ee',
  },
  emerald_gold: {
    name: 'Emerald Gold Resort',
    description: 'Tropical retreat theme with emerald green & royal gold',
    icon: '💎',
    badgeBg: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    bgClass: 'bg-slate-950 text-slate-100',
    cardBgClass: 'bg-slate-900/90 border-emerald-900/40',
    borderClass: 'border-emerald-900/70',
    textPrimaryClass: 'text-white',
    textSecondaryClass: 'text-emerald-200/80',
    accentGradient: 'from-emerald-400 via-amber-400 to-yellow-400',
    headerBgClass: 'bg-slate-900 border-b border-emerald-800/80 text-white',
    sidebarBgClass: 'bg-slate-950 text-white border-r border-emerald-950',
    navActiveBg: 'bg-gradient-to-r from-emerald-500/20 to-amber-500/20 text-emerald-300 border border-emerald-500/40',
    swatchPrimary: '#064e3b',
    swatchSecondary: '#fbbf24',
  },
  midnight_slate: {
    name: 'Midnight Obsidian Slate',
    description: 'Sleek ultra-dark VIP executive dashboard theme',
    icon: '🌙',
    badgeBg: 'bg-slate-800 text-slate-300 border-slate-700',
    bgClass: 'bg-slate-950 text-slate-100',
    cardBgClass: 'bg-slate-900 border-slate-800',
    borderClass: 'border-slate-800',
    textPrimaryClass: 'text-white',
    textSecondaryClass: 'text-slate-400',
    accentGradient: 'from-cyan-400 via-sky-300 to-orange-400',
    headerBgClass: 'bg-slate-900 border-b border-slate-800 text-white',
    sidebarBgClass: 'bg-slate-900 text-white border-r border-slate-800',
    navActiveBg: 'bg-slate-800 text-cyan-400 border border-slate-700',
    swatchPrimary: '#020617',
    swatchSecondary: '#38bdf8',
  },
  sunset_coral: {
    name: 'Sunset Coral & Warm Amber',
    description: 'Warm glowing resort sunset with rose coral & amber gold',
    icon: '🌅',
    badgeBg: 'bg-rose-950 text-rose-300 border-rose-800',
    bgClass: 'bg-slate-950 text-slate-100',
    cardBgClass: 'bg-slate-900/90 border-rose-900/30',
    borderClass: 'border-rose-900/50',
    textPrimaryClass: 'text-white',
    textSecondaryClass: 'text-orange-200/80',
    accentGradient: 'from-rose-500 via-orange-400 to-amber-400',
    headerBgClass: 'bg-slate-900 border-b border-rose-900/60 text-white',
    sidebarBgClass: 'bg-slate-950 text-white border-r border-rose-950',
    navActiveBg: 'bg-gradient-to-r from-rose-500/20 to-orange-500/20 text-orange-300 border border-orange-500/40',
    swatchPrimary: '#4c0519',
    swatchSecondary: '#fb923c',
  },
  cobalt_sapphire: {
    name: 'Royal Cobalt & Sapphire',
    description: 'Sophisticated executive royal navy & bright blue palette',
    icon: '🔱',
    badgeBg: 'bg-blue-950 text-blue-300 border-blue-800',
    bgClass: 'bg-slate-950 text-slate-100',
    cardBgClass: 'bg-slate-900/90 border-blue-900/40',
    borderClass: 'border-blue-900/60',
    textPrimaryClass: 'text-white',
    textSecondaryClass: 'text-blue-200/80',
    accentGradient: 'from-blue-500 via-indigo-400 to-cyan-400',
    headerBgClass: 'bg-slate-900 border-b border-blue-800/80 text-white',
    sidebarBgClass: 'bg-slate-950 text-white border-r border-blue-950',
    navActiveBg: 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 border border-blue-500/40',
    swatchPrimary: '#172554',
    swatchSecondary: '#60a5fa',
  },
};

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  layoutStyle: LayoutStyle;
  setLayoutStyle: (layoutStyle: LayoutStyle) => void;
  layoutDensity: LayoutDensity;
  setLayoutDensity: (density: LayoutDensity) => void;
  config: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light_luxury',
  setTheme: () => {},
  layoutStyle: 'expanded_sidebar',
  setLayoutStyle: () => {},
  layoutDensity: 'comfortable',
  setLayoutDensity: () => {},
  config: THEMES.light_luxury,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('oceanview_theme') as ThemeMode;
    return saved && THEMES[saved] ? saved : 'light_luxury';
  });

  const [layoutStyle, setLayoutStyleState] = useState<LayoutStyle>(() => {
    const saved = localStorage.getItem('oceanview_layout_style') as LayoutStyle;
    return saved || 'expanded_sidebar';
  });

  const [layoutDensity, setLayoutDensityState] = useState<LayoutDensity>(() => {
    const saved = localStorage.getItem('oceanview_layout_density') as LayoutDensity;
    return saved || 'comfortable';
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem('oceanview_theme', newTheme);
  };

  const setLayoutStyle = (newStyle: LayoutStyle) => {
    setLayoutStyleState(newStyle);
    localStorage.setItem('oceanview_layout_style', newStyle);
  };

  const setLayoutDensity = (newDensity: LayoutDensity) => {
    setLayoutDensityState(newDensity);
    localStorage.setItem('oceanview_layout_density', newDensity);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(
      'theme-light_luxury',
      'theme-ocean_teal',
      'theme-emerald_gold',
      'theme-midnight_slate',
      'theme-sunset_coral',
      'theme-cobalt_sapphire'
    );
    root.classList.add(`theme-${theme}`);
    if (theme === 'light_luxury') {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        layoutStyle,
        setLayoutStyle,
        layoutDensity,
        setLayoutDensity,
        config: THEMES[theme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
