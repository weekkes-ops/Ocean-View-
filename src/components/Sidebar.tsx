import React from 'react';
import { Logo } from './Logo';
import {
  LayoutDashboard,
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
  UserCheck,
  CheckSquare,
  BarChart3,
  Sparkles,
  CreditCard,
  MapPin,
  Phone,
  BookOpen,
  Package,
  Settings,
} from 'lucide-react';
import { ModuleType } from '../types';
import { useTheme } from '../context/ThemeContext';

interface SidebarProps {
  activeModule: ModuleType;
  onSelectModule: (module: ModuleType) => void;
  pendingTasksCount: number;
  lowStockCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  onSelectModule,
  pendingTasksCount,
  lowStockCount = 0,
}) => {
  const { layoutStyle, config, theme } = useTheme();

  interface NavItem {
    id: ModuleType;
    label: string;
    icon: any;
    badge?: number;
  }

  const mainNav: NavItem[] = [
    { id: 'dashboard', label: 'Master Dashboard', icon: LayoutDashboard },
    { id: 'inventory', label: 'Stock & Inventory', icon: Package, badge: lowStockCount > 0 ? lowStockCount : undefined },
    { id: 'proposal', label: 'Project Proposal', icon: BookOpen },
    { id: 'guests', label: 'Guest Profiles', icon: UserCheck },
    { id: 'staff_tasks', label: 'Staff Task Dispatch', icon: CheckSquare, badge: pendingTasksCount },
    { id: 'reports', label: 'Financial & Analytics', icon: BarChart3 },
  ];

  const amenityNav: NavItem[] = [
    { id: 'accommodations', label: 'Accommodations', icon: Hotel },
    { id: 'vip_lounge', label: 'VIP Lounge', icon: Wine },
    { id: 'event_venue', label: 'Event Venue', icon: CalendarHeart },
    { id: 'fitness_club', label: 'Fitness Club', icon: Dumbbell },
    { id: 'movie_theater', label: 'Movie Theater', icon: Film },
    { id: 'multipurpose_court', label: 'Multipurpose Court', icon: Trophy },
    { id: 'conference_rooms', label: 'Conference Rooms', icon: Users2 },
    { id: 'water_sports', label: 'Water Sports', icon: Waves },
    { id: 'restaurants', label: 'Restaurants', icon: Utensils },
    { id: 'cafe', label: 'Cafe', icon: Coffee },
  ];

  // Top navigation mode hides sidebar completely on desktop for full width view
  if (layoutStyle === 'top_navigation') {
    return null;
  }

  // Compact Rail View Mode
  if (layoutStyle === 'compact_sidebar') {
    return (
      <aside className={`w-20 ${config.sidebarBgClass} flex flex-col items-center py-4 border-r shrink-0 min-h-[calc(100vh-61px)] transition-all duration-200 z-20`}>
        {/* Compact Logo */}
        <div className="mb-6 cursor-pointer" title="OceanView Country Club & Resort">
          <Logo size="sm" showText={false} variant={theme === 'light_luxury' ? 'light' : 'dark'} />
        </div>

        {/* Rail Icons */}
        <div className="flex-1 w-full flex flex-col items-center gap-2 overflow-y-auto px-2 scrollbar-none">
          {[...mainNav, ...amenityNav].map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectModule(item.id)}
                title={item.label}
                className={`relative p-3 rounded-xl transition-all flex flex-col items-center justify-center group ${
                  isActive
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30 font-bold scale-105'
                    : 'hover:bg-white/10 opacity-70 hover:opacity-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.badge ? (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold bg-orange-500 text-white flex items-center justify-center shadow">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-col items-center gap-2">
          <button
            onClick={() => onSelectModule('ai_assistant')}
            title="AI Assistant"
            className="p-3 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 hover:bg-orange-500/30 transition-all"
          >
            <Sparkles className="w-5 h-5" />
          </button>
          <button
            onClick={() => onSelectModule('settings')}
            title="Settings & Themes"
            className={`p-3 rounded-xl transition-all ${
              activeModule === 'settings' ? 'bg-cyan-500 text-white font-bold' : 'hover:bg-white/10 opacity-70 hover:opacity-100'
            }`}
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </aside>
    );
  }

  // Expanded Standard Sidebar Mode
  return (
    <aside className={`w-64 ${config.sidebarBgClass} border-r border-slate-800 flex flex-col shrink-0 min-h-[calc(100vh-61px)] transition-all duration-200 z-20`}>
      
      {/* OceanView Crest */}
      <div className="p-4 border-b border-white/10 bg-black/10">
        <Logo size="md" variant={theme === 'light_luxury' ? 'light' : 'dark'} />
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-6">
        
        {/* Operations Overview */}
        <div>
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider opacity-60">
            Resort Operations
          </div>
          <div className="space-y-1">
            {mainNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectModule(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? config.navActiveBg
                      : 'hover:bg-white/10 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'opacity-70'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge ? (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* 10 Core Amenities */}
        <div>
          <div className="px-3 mb-2 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">
              Amenities & Outlets
            </span>
            <span className="text-[9px] px-1.5 py-0.5 bg-black/20 rounded-md opacity-70">
              10 Outlets
            </span>
          </div>
          <div className="space-y-1">
            {amenityNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectModule(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? config.navActiveBg
                      : 'hover:bg-white/10 opacity-80 hover:opacity-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'opacity-70'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* AI & POS Launchers */}
        <div className="pt-2 border-t border-white/10 space-y-1">
          <button
            onClick={() => onSelectModule('ai_assistant')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeModule === 'ai_assistant'
                ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                : 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-orange-400 hover:from-amber-500/20 hover:to-orange-500/20 border border-orange-500/20'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>AI Operations Assistant</span>
            </div>
          </button>

          <button
            onClick={() => onSelectModule('pos_terminal')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeModule === 'pos_terminal'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-emerald-950/30 text-emerald-400 hover:bg-emerald-900/40 border border-emerald-800/40'
            }`}
          >
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>POS Sales Terminal</span>
            </div>
          </button>

          <button
            onClick={() => onSelectModule('settings')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeModule === 'settings'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'bg-black/20 opacity-80 hover:opacity-100 border border-white/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-cyan-400" />
              <span>Settings & Themes</span>
            </div>
          </button>
        </div>

      </div>

      {/* Footer Address Info */}
      <div className="p-3 border-t border-white/10 bg-black/20 text-[11px] opacity-70 space-y-1">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
          <span className="truncate">10 Sweds Free Ave, Sussex</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>+232-76-862043</span>
        </div>
      </div>

    </aside>
  );
};
