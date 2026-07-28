import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  Users,
  Hotel,
  Waves,
  CheckSquare,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Calendar,
  Utensils,
  Plus,
  RefreshCw,
  Wine,
  Film,
  Trophy,
  Users2,
  Coffee,
  ChevronRight,
  Sun,
  ShieldCheck,
} from 'lucide-react';
import { ResortSummaryStats, ModuleType } from '../types';

interface DashboardViewProps {
  stats: ResortSummaryStats;
  onNavigate: (module: ModuleType) => void;
  onOpenPOS: () => void;
  onOpenAI: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  stats,
  onNavigate,
  onOpenPOS,
  onOpenAI,
}) => {
  const [insights, setInsights] = useState<string[]>([]);
  const [loadingInsights, setLoadingInsights] = useState(false);

  const fetchInsights = async () => {
    setLoadingInsights(true);
    try {
      const res = await fetch('/api/gemini/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resortStats: stats, activeMonth: 'July 2026 Peak Season' }),
      });
      const data = await res.json();
      if (data.insights && Array.isArray(data.insights)) {
        setInsights(data.insights);
      }
    } catch {
      setInsights([
        'Occupancy rate is high at 88%. Recommend dynamic pricing (+15%) on Presidential Oceanfront Villa for upcoming weekend.',
        'Water Sports demand peaking around 14:00. Pre-assign Jet Ski WaveRunners 01-04 to minimize guest waiting times.',
        'VIP Lounge champagne sales are up 35% this week. Ensure Dom Pérignon Vintage stock is replenished.',
      ]);
    } finally {
      setLoadingInsights(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const amenitiesGrid = [
    { name: 'Accommodations', status: '88% Occupied (5/9)', color: 'text-cyan-400 bg-cyan-950/50 border-cyan-800/50', icon: Hotel, module: 'accommodations' as ModuleType },
    { name: 'VIP Lounge', status: '2 Tables Occupied, 1 Reserved', color: 'text-amber-400 bg-amber-950/50 border-amber-800/50', icon: Wine, module: 'vip_lounge' as ModuleType },
    { name: 'Event Venue', status: '3 Events Scheduled This Week', color: 'text-rose-400 bg-rose-950/50 border-rose-800/50', icon: Calendar, module: 'event_venue' as ModuleType },
    { name: 'Fitness Club', status: '3 Sessions Today (24 Enrolled)', color: 'text-emerald-400 bg-emerald-950/50 border-emerald-800/50', icon: TrendingUp, module: 'fitness_club' as ModuleType },
    { name: 'Movie Theater', status: '2 Screenings (97 Seats Booked)', color: 'text-purple-400 bg-purple-950/50 border-purple-800/50', icon: Film, module: 'movie_theater' as ModuleType },
    { name: 'Multipurpose Court', status: 'Tennis & Volleyball Booked', color: 'text-yellow-400 bg-yellow-950/50 border-yellow-800/50', icon: Trophy, module: 'multipurpose_court' as ModuleType },
    { name: 'Conference Rooms', status: '2 Corporate Events Confirmed', color: 'text-sky-400 bg-sky-950/50 border-sky-800/50', icon: Users2, module: 'conference_rooms' as ModuleType },
    { name: 'Water Sports', status: '7 Active Equipment Rentals', color: 'text-teal-400 bg-teal-950/50 border-teal-800/50', icon: Waves, module: 'water_sports' as ModuleType },
    { name: 'Restaurants', status: 'Fine Dining & Grill Open', color: 'text-orange-400 bg-orange-950/50 border-orange-800/50', icon: Utensils, module: 'restaurants' as ModuleType },
    { name: 'Cafe', status: '2 Active Orders in Queue', color: 'text-amber-300 bg-amber-950/40 border-amber-800/40', icon: Coffee, module: 'cafe' as ModuleType },
  ];

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-cyan-950 border border-slate-800 p-6 shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-cyan-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                Sussex Village, Sierra Leone
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Sun className="w-3.5 h-3.5 text-amber-400" /> Live Operations Mode
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              OceanView Country Club & Resort
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1">
              Full-spectrum management console covering Accommodations, Water Sports, VIP Lounge, Events, Dining & Sports.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAI}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask Aura AI</span>
            </button>
            <button
              onClick={onOpenPOS}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>POS Sale</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Revenue */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg hover:border-emerald-500/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Today's Revenue</span>
            <div className="p-2 bg-emerald-950/60 text-emerald-400 rounded-xl border border-emerald-800/40">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">${stats.todayRevenue.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-2 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" /> +14.2% vs yesterday
          </div>
        </div>

        {/* Occupancy */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg hover:border-cyan-500/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Resort Occupancy</span>
            <div className="p-2 bg-cyan-950/60 text-cyan-400 rounded-xl border border-cyan-800/40">
              <Hotel className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">{stats.occupancyRate}%</div>
          <div className="text-[11px] text-cyan-300 mt-2 font-medium">
            {stats.occupiedRooms} of {stats.totalRooms} Units Occupied
          </div>
        </div>

        {/* Active Guests */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg hover:border-sky-500/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Active Guests</span>
            <div className="p-2 bg-sky-950/60 text-sky-400 rounded-xl border border-sky-800/40">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">{stats.activeGuestsCount}</div>
          <div className="text-[11px] text-slate-400 mt-2 font-medium">
            In-House Guests & Day Passes
          </div>
        </div>

        {/* Water Sports */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg hover:border-teal-500/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Water Sports Active</span>
            <div className="p-2 bg-teal-950/60 text-teal-400 rounded-xl border border-teal-800/40">
              <Waves className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">{stats.waterSportsActiveRentals} Rentals</div>
          <div className="text-[11px] text-teal-300 mt-2 font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Green Weather Flag
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg hover:border-orange-500/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Pending Staff Tasks</span>
            <div className="p-2 bg-orange-950/60 text-orange-400 rounded-xl border border-orange-800/40">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">{stats.pendingTasksCount} Tasks</div>
          <div className="text-[11px] text-orange-400 mt-2 font-medium">
            Housekeeping & Maintenance
          </div>
        </div>

      </div>

      {/* AI Smart Operations Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-white text-sm">
              Aura AI Smart Resort Recommendations
            </h3>
          </div>
          <button
            onClick={fetchInsights}
            disabled={loadingInsights}
            className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingInsights ? 'animate-spin' : ''}`} />
            <span>Refresh AI Insights</span>
          </button>
        </div>

        <div className="mt-3 space-y-2">
          {loadingInsights ? (
            <div className="text-xs text-slate-400 py-3 text-center">
              Generating real-time AI resort analytics...
            </div>
          ) : (
            insights.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80"
              >
                <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="leading-relaxed">{item}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 10 Core Outlets Live Status Grid (From Image Signboard) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-extrabold text-white">
              Core Amenities & Outlets Status
            </h2>
            <p className="text-xs text-slate-400">
              Live monitor for all 10 resort facilities listed on the OceanView Sussex Village signboard.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {amenitiesGrid.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                onClick={() => onNavigate(item.module)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all hover:scale-[1.02] active:scale-95 shadow-md ${item.color}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className="w-5 h-5" />
                  <ChevronRight className="w-4 h-4 opacity-60" />
                </div>
                <div className="font-bold text-xs text-white mb-1">{item.name}</div>
                <div className="text-[11px] opacity-90">{item.status}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Action Dispatch Center */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <h3 className="font-bold text-white text-sm mb-3">Quick Dispatch & Terminal Shortcuts</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          <button
            onClick={() => onNavigate('accommodations')}
            className="p-3 bg-slate-950 hover:bg-slate-800 rounded-xl border border-slate-800 text-left transition-colors text-xs font-medium text-slate-300"
          >
            <Hotel className="w-4 h-4 text-cyan-400 mb-1.5" />
            Check-In Room
          </button>

          <button
            onClick={() => onNavigate('water_sports')}
            className="p-3 bg-slate-950 hover:bg-slate-800 rounded-xl border border-slate-800 text-left transition-colors text-xs font-medium text-slate-300"
          >
            <Waves className="w-4 h-4 text-teal-400 mb-1.5" />
            Water Sports Charter
          </button>

          <button
            onClick={() => onNavigate('vip_lounge')}
            className="p-3 bg-slate-950 hover:bg-slate-800 rounded-xl border border-slate-800 text-left transition-colors text-xs font-medium text-slate-300"
          >
            <Wine className="w-4 h-4 text-amber-400 mb-1.5" />
            VIP Lounge Booking
          </button>

          <button
            onClick={() => onNavigate('event_venue')}
            className="p-3 bg-slate-950 hover:bg-slate-800 rounded-xl border border-slate-800 text-left transition-colors text-xs font-medium text-slate-300"
          >
            <Calendar className="w-4 h-4 text-rose-400 mb-1.5" />
            Book Event Venue
          </button>

          <button
            onClick={() => onNavigate('staff_tasks')}
            className="p-3 bg-slate-950 hover:bg-slate-800 rounded-xl border border-slate-800 text-left transition-colors text-xs font-medium text-slate-300"
          >
            <CheckSquare className="w-4 h-4 text-orange-400 mb-1.5" />
            Dispatch Staff Task
          </button>

          <button
            onClick={onOpenPOS}
            className="p-3 bg-emerald-950/60 hover:bg-emerald-900/60 rounded-xl border border-emerald-800/60 text-left transition-colors text-xs font-medium text-emerald-300"
          >
            <DollarSign className="w-4 h-4 text-emerald-400 mb-1.5" />
            Point of Sale
          </button>
        </div>
      </div>

    </div>
  );
};
