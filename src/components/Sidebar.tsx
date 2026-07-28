import React from 'react';
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
} from 'lucide-react';
import { ModuleType } from '../types';

interface SidebarProps {
  activeModule: ModuleType;
  onSelectModule: (module: ModuleType) => void;
  pendingTasksCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  onSelectModule,
  pendingTasksCount,
}) => {
  const mainNav = [
    { id: 'dashboard' as ModuleType, label: 'Master Dashboard', icon: LayoutDashboard },
    { id: 'guests' as ModuleType, label: 'Guest Profiles', icon: UserCheck },
    { id: 'staff_tasks' as ModuleType, label: 'Staff Task Dispatch', icon: CheckSquare, badge: pendingTasksCount },
    { id: 'reports' as ModuleType, label: 'Financial & Analytics', icon: BarChart3 },
  ];

  const amenityNav = [
    { id: 'accommodations' as ModuleType, label: 'Accommodations', icon: Hotel },
    { id: 'vip_lounge' as ModuleType, label: 'VIP Lounge', icon: Wine },
    { id: 'event_venue' as ModuleType, label: 'Event Venue', icon: CalendarHeart },
    { id: 'fitness_club' as ModuleType, label: 'Fitness Club', icon: Dumbbell },
    { id: 'movie_theater' as ModuleType, label: 'Movie Theater', icon: Film },
    { id: 'multipurpose_court' as ModuleType, label: 'Multipurpose Court', icon: Trophy },
    { id: 'conference_rooms' as ModuleType, label: 'Conference Rooms', icon: Users2 },
    { id: 'water_sports' as ModuleType, label: 'Water Sports', icon: Waves },
    { id: 'restaurants' as ModuleType, label: 'Restaurants', icon: Utensils },
    { id: 'cafe' as ModuleType, label: 'Cafe', icon: Coffee },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col shrink-0 min-h-[calc(100vh-61px)]">
      
      {/* OceanView Crest */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 via-amber-400 to-rose-500 flex items-center justify-center p-0.5 shadow-lg">
            <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
              <Waves className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <h2 className="font-bold text-white text-sm leading-tight">OceanView</h2>
            <p className="text-[11px] text-orange-400 italic">Country Club & Resort</p>
          </div>
        </div>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-6">
        
        {/* Operations Overview */}
        <div>
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
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
                      ? 'bg-gradient-to-r from-cyan-500/20 to-sky-500/10 text-cyan-400 border border-cyan-500/30 font-semibold'
                      : 'hover:bg-slate-800/80 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
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
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Amenities & Outlets
            </span>
            <span className="text-[9px] px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded-md">
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
                      ? 'bg-gradient-to-r from-cyan-500/20 to-amber-500/10 text-amber-300 border border-amber-500/30 font-semibold'
                      : 'hover:bg-slate-800/80 text-slate-300 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* AI & POS Launchers */}
        <div className="pt-2 border-t border-slate-800 space-y-1">
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
        </div>

      </div>

      {/* Footer Address Info */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/80 text-[11px] text-slate-400 space-y-1">
        <div className="flex items-center gap-1.5 text-slate-300">
          <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
          <span className="truncate">10 Sweds Free Ave, Sussex</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>+232-76-862043</span>
        </div>
      </div>

    </aside>
  );
};
