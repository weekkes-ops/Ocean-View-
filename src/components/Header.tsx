import React, { useState } from 'react';
import { Logo } from './Logo';
import {
  Sun,
  Phone,
  MapPin,
  Sparkles,
  CreditCard,
  Bell,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  Compass,
  Palette,
  Check,
  Layout,
  Maximize2,
  Grid,
  Menu,
  ChevronDown,
  LayoutDashboard,
  Package,
  BookOpen,
  UserCheck,
  CheckSquare,
  BarChart3,
  Hotel,
  Wine,
  CalendarHeart,
  Dumbbell,
  Film,
  Trophy,
  Users2,
  Waves,
  Utensils,
  Coffee,
  Settings,
} from 'lucide-react';
import { ResortSummaryStats, ThemeMode, LayoutStyle, LayoutDensity, ModuleType } from '../types';
import { useTheme, THEMES } from '../context/ThemeContext';

interface HeaderProps {
  stats: ResortSummaryStats;
  onOpenPOS: () => void;
  onOpenAI: () => void;
  onOpenInfo: () => void;
  onSearch: (query: string) => void;
  activeModule?: ModuleType;
  onSelectModule?: (module: ModuleType) => void;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  onOpenPOS,
  onOpenAI,
  onOpenInfo,
  onSearch,
  activeModule = 'dashboard',
  onSelectModule,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [customizerTab, setCustomizerTab] = useState<'color' | 'layout' | 'density'>('color');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const {
    theme,
    setTheme,
    layoutStyle,
    setLayoutStyle,
    layoutDensity,
    setLayoutDensity,
    config,
  } = useTheme();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const topNavItems = [
    { id: 'dashboard' as ModuleType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'accommodations' as ModuleType, label: 'Rooms & Villas', icon: Hotel },
    { id: 'inventory' as ModuleType, label: 'Inventory', icon: Package },
    { id: 'guests' as ModuleType, label: 'Guests', icon: UserCheck },
    { id: 'staff_tasks' as ModuleType, label: 'Staff Tasks', icon: CheckSquare },
    { id: 'reports' as ModuleType, label: 'Analytics', icon: BarChart3 },
    { id: 'vip_lounge' as ModuleType, label: 'VIP Lounge', icon: Wine },
    { id: 'water_sports' as ModuleType, label: 'Water Sports', icon: Waves },
    { id: 'restaurants' as ModuleType, label: 'Dining', icon: Utensils },
    { id: 'settings' as ModuleType, label: 'Settings', icon: Settings },
  ];

  return (
    <header className={`${config.headerBgClass} sticky top-0 z-30 transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col gap-3">
          
          {/* Top Bar Row */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            
            {/* Brand & Address Quick Banner */}
            <div className="flex items-center justify-between lg:justify-start gap-4">
              <div className="flex items-center gap-3 cursor-pointer" onClick={onOpenInfo}>
                <Logo size="md" variant={theme === 'light_luxury' ? 'light' : 'dark'} />
                <div className={`border-l pl-3 hidden sm:block ${config.borderClass}`}>
                  <div className="flex items-center gap-3 text-xs opacity-80">
                    <span className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                      <MapPin className="w-3 h-3 text-orange-400" /> 10 Sweds Free Ave, Sussex Village
                    </span>
                    <span className="hidden md:inline-flex items-center gap-1 hover:text-cyan-400 transition-colors">
                      <Phone className="w-3 h-3 text-cyan-400" /> +232-76-862043
                    </span>
                  </div>
                </div>
              </div>

              {/* Weather & Conditions Ticker */}
              <div className="hidden xl:flex items-center gap-3 px-3 py-1.5 bg-black/20 rounded-lg border border-white/10 text-xs">
                <Sun className="w-4 h-4 text-amber-400 animate-pulse" />
                <div>
                  <span className="font-semibold">29°C</span> Sunny | Sussex Coast
                </div>
                <div className="h-3 w-px bg-white/20" />
                <div className="flex items-center gap-1 text-emerald-400">
                  <Compass className="w-3 h-3" /> Calm Sea (12kt)
                </div>
              </div>

              {/* Mobile Layout Switcher Toggle */}
              {layoutStyle === 'top_navigation' && onSelectModule && (
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 rounded-lg bg-black/20 text-white border border-white/10"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Search, Occupancy & Quick Action Buttons */}
            <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap justify-between lg:justify-end">
              
              {/* Global Search */}
              <div className="relative w-full sm:w-56">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search rooms, guests, items..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full bg-slate-900/40 border border-slate-700/60 rounded-lg pl-9 pr-3 py-1.5 text-xs text-current placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              {/* Occupancy Badge */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-cyan-950/40 border border-cyan-800/40 rounded-lg text-xs">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="opacity-80">Occupancy:</span>
                <span className="font-bold text-cyan-400">{stats.occupancyRate}%</span>
                <span className="opacity-60 text-[11px]">({stats.occupiedRooms}/{stats.totalRooms})</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenPOS}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs rounded-lg shadow-md transition-all active:scale-95"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Express POS</span>
                </button>

                <button
                  onClick={onOpenAI}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white font-semibold text-xs rounded-lg shadow-md shadow-orange-500/20 transition-all active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">AI Assistant</span>
                  <span className="sm:hidden">AI</span>
                </button>

                {/* System Layout & Color Customizer Button */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowThemePicker(!showThemePicker);
                      setShowNotifications(false);
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-700 rounded-lg text-slate-100 transition-all text-xs border border-slate-700 font-medium shadow-sm"
                    title="Customize System Layout Style & Colors"
                  >
                    <Palette className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="hidden sm:inline font-semibold">{config.icon} Style & Colors</span>
                    <ChevronDown className="w-3 h-3 opacity-60" />
                  </button>

                  {/* System Style & Colors Panel Dropdown */}
                  {showThemePicker && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 text-white border border-slate-700 rounded-2xl shadow-2xl p-4 z-50 text-xs space-y-3">
                      
                      {/* Header */}
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <Palette className="w-4 h-4 text-cyan-400" />
                          <h3 className="font-bold text-white text-sm">Layout & Color Customizer</h3>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                          System Active
                        </span>
                      </div>

                      {/* Customizer Sub-Tabs */}
                      <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 gap-1">
                        <button
                          onClick={() => setCustomizerTab('color')}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            customizerTab === 'color'
                              ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          🎨 Color Schemes
                        </button>
                        <button
                          onClick={() => setCustomizerTab('layout')}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            customizerTab === 'layout'
                              ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          📐 Layout Style
                        </button>
                        <button
                          onClick={() => setCustomizerTab('density')}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            customizerTab === 'density'
                              ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          🔍 Density
                        </button>
                      </div>

                      {/* TAB 1: Color Themes */}
                      {customizerTab === 'color' && (
                        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                          <p className="text-[11px] text-slate-400 font-medium">Select background & brand palette:</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {(Object.keys(THEMES) as ThemeMode[]).map((key) => {
                              const item = THEMES[key];
                              const isSelected = theme === key;
                              return (
                                <button
                                  key={key}
                                  onClick={() => setTheme(key)}
                                  className={`text-left p-2.5 rounded-xl border transition-all flex flex-col justify-between gap-2 ${
                                    isSelected
                                      ? 'bg-cyan-950/90 border-cyan-500 text-white font-bold ring-2 ring-cyan-500/30'
                                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                      <span>{item.icon}</span>
                                      <span className="font-bold text-xs truncate max-w-[100px]">{item.name.split(' ')[0]}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <div
                                        className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                                        style={{ backgroundColor: item.swatchPrimary }}
                                      />
                                      <div
                                        className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                                        style={{ backgroundColor: item.swatchSecondary }}
                                      />
                                    </div>
                                  </div>
                                  <p className="text-[10px] text-slate-400 font-normal leading-tight line-clamp-2">
                                    {item.description}
                                  </p>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* TAB 2: Layout Style */}
                      {customizerTab === 'layout' && (
                        <div className="space-y-2">
                          <p className="text-[11px] text-slate-400 font-medium">Choose primary navigation arrangement:</p>
                          <div className="space-y-2">
                            {[
                              {
                                id: 'expanded_sidebar' as LayoutStyle,
                                title: 'Full Left Sidebar Navigation',
                                desc: 'Classic multi-section sidebar with module groups, badges & crest header',
                                icon: Layout,
                              },
                              {
                                id: 'compact_sidebar' as LayoutStyle,
                                title: 'Compact Icon Rail Sidebar',
                                desc: 'Slim icon-only sidebar rail for maximum main screen real estate',
                                icon: Grid,
                              },
                              {
                                id: 'top_navigation' as LayoutStyle,
                                title: 'Top Horizontal Navbar Layout',
                                desc: 'Clean top horizontal bar navigation for widescreen executive view',
                                icon: Maximize2,
                              },
                            ].map((item) => {
                              const Icon = item.icon;
                              const isSelected = layoutStyle === item.id;
                              return (
                                <button
                                  key={item.id}
                                  onClick={() => setLayoutStyle(item.id)}
                                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start gap-3 ${
                                    isSelected
                                      ? 'bg-cyan-950/90 border-cyan-500 text-white font-bold ring-2 ring-cyan-500/30'
                                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                                  }`}
                                >
                                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                                    <Icon className="w-4 h-4" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <span className="font-bold text-xs">{item.title}</span>
                                      {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-normal mt-0.5">{item.desc}</p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* TAB 3: Density */}
                      {customizerTab === 'density' && (
                        <div className="space-y-2">
                          <p className="text-[11px] text-slate-400 font-medium">Select component spacing & visual padding:</p>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { id: 'compact' as LayoutDensity, label: 'Compact', desc: 'Tight data grid' },
                              { id: 'comfortable' as LayoutDensity, label: 'Comfortable', desc: 'Balanced default' },
                              { id: 'spacious' as LayoutDensity, label: 'Spacious', desc: 'Roomy luxury' },
                            ].map((item) => {
                              const isSelected = layoutDensity === item.id;
                              return (
                                <button
                                  key={item.id}
                                  onClick={() => setLayoutDensity(item.id)}
                                  className={`p-3 rounded-xl border text-center transition-all ${
                                    isSelected
                                      ? 'bg-cyan-950/90 border-cyan-500 text-white font-bold ring-2 ring-cyan-500/30'
                                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                                  }`}
                                >
                                  <div className="font-bold text-xs">{item.label}</div>
                                  <div className="text-[9px] text-slate-400 mt-1">{item.desc}</div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                    </div>
                  )}
                </div>

                {/* Notifications bell */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowNotifications(!showNotifications);
                      setShowThemePicker(false);
                    }}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white relative transition-colors"
                    title="Notifications"
                  >
                    <Bell className="w-4 h-4" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-slate-900" />
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-3 z-50 text-xs text-white">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800 font-semibold text-slate-200">
                        <span>Resort Notifications</span>
                        <span className="text-cyan-400 text-[10px]">3 New</span>
                      </div>
                      <div className="space-y-2 mt-2">
                        <div className="p-2 bg-slate-950/60 rounded-lg border border-slate-800 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-slate-200 font-medium">Villa 01 VIP Arrival Complete</p>
                            <p className="text-slate-400 text-[10px]">Dr. Samuel Cole checked in at 13:45</p>
                          </div>
                        </div>
                        <div className="p-2 bg-slate-950/60 rounded-lg border border-slate-800 flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-slate-200 font-medium">Water Sports High Demand</p>
                            <p className="text-slate-400 text-[10px]">4 Jet Skis currently in use on Sussex Bay</p>
                          </div>
                        </div>
                        <div className="p-2 bg-slate-950/60 rounded-lg border border-slate-800 flex items-start gap-2">
                          <Clock className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-slate-200 font-medium">Upcoming Sunset Wedding Event</p>
                            <p className="text-slate-400 text-[10px]">Beachfront Lawn setup begins at 15:00</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>

          {/* Top Horizontal Bar Navigation (When layoutStyle === 'top_navigation') */}
          {layoutStyle === 'top_navigation' && onSelectModule && (
            <div className={`pt-2 border-t border-white/10 ${mobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {topNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeModule === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectModule(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                        isActive
                          ? 'bg-cyan-500 text-white shadow-md'
                          : 'bg-black/20 hover:bg-white/10 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};
