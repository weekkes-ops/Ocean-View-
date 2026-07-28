import React, { useState } from 'react';
import {
  Sun,
  Waves,
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
} from 'lucide-react';
import { ResortSummaryStats } from '../types';

interface HeaderProps {
  stats: ResortSummaryStats;
  onOpenPOS: () => void;
  onOpenAI: () => void;
  onOpenInfo: () => void;
  onSearch: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  onOpenPOS,
  onOpenAI,
  onOpenInfo,
  onSearch,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          
          {/* Brand & Address Quick Banner */}
          <div className="flex items-center justify-between lg:justify-start gap-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={onOpenInfo}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-400 to-orange-500 p-0.5 shadow-md shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Waves className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-orange-400 bg-clip-text text-transparent">
                    OceanView
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/50 font-medium">
                    Resort System
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1 hover:text-cyan-300 transition-colors">
                    <MapPin className="w-3 h-3 text-orange-400" /> 10 Sweds Free Ave, Sussex Village
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 hover:text-cyan-300 transition-colors">
                    <Phone className="w-3 h-3 text-cyan-400" /> +232-76-862043
                  </span>
                </div>
              </div>
            </div>

            {/* Weather & Conditions Ticker */}
            <div className="hidden xl:flex items-center gap-3 px-3 py-1.5 bg-slate-950/80 rounded-lg border border-slate-800 text-xs text-slate-300">
              <Sun className="w-4 h-4 text-amber-400 animate-pulse" />
              <div>
                <span className="font-semibold text-white">29°C</span> Sunny | Sussex Coast
              </div>
              <div className="h-3 w-px bg-slate-700" />
              <div className="flex items-center gap-1 text-emerald-400">
                <Compass className="w-3 h-3" /> Calm Sea (12kt)
              </div>
            </div>
          </div>

          {/* Search, Occupancy & Quick Action Buttons */}
          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap justify-between lg:justify-end">
            
            {/* Global Search */}
            <div className="relative w-full sm:w-60">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search rooms, guests, bookings..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* Occupancy Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-cyan-950/40 border border-cyan-800/40 rounded-lg text-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-slate-300">Occupancy:</span>
              <span className="font-bold text-cyan-300">{stats.occupancyRate}%</span>
              <span className="text-slate-400">({stats.occupiedRooms}/{stats.totalRooms})</span>
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

              {/* Notifications bell */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white relative transition-colors"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-slate-900" />
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-3 z-50 text-xs">
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
      </div>
    </header>
  );
};
