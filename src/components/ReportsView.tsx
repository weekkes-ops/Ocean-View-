import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Hotel, Waves, Utensils, Calendar, Printer } from 'lucide-react';
import { ResortSummaryStats } from '../types';
import oceanViewLogo from '../assets/images/oceanview_resort_logo_1785518556173.jpg';

interface ReportsViewProps {
  stats: ResortSummaryStats;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ stats }) => {
  const revenueBreakdown = [
    { outlet: 'Accommodations (Villas/Suites)', revenue: 14200, percentage: 57 },
    { outlet: 'Water Sports & Speedboats', revenue: 3850, percentage: 15 },
    { outlet: 'VIP Lounge & Bottle Service', revenue: 3200, percentage: 13 },
    { outlet: 'Restaurants & Cafe Dining', revenue: 2400, percentage: 10 },
    { outlet: 'Event Venues & Theater', revenue: 1200, percentage: 5 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-4">
          <img
            src={oceanViewLogo}
            alt="OceanView Logo"
            className="h-12 w-auto object-contain rounded-lg bg-white p-1 shrink-0 shadow"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              <h1 className="text-xl font-extrabold text-white">Financial & Operational Analytics</h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Revenue stream distribution, occupancy yield management, and outlet performance metrics.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              try {
                window.print();
              } catch (err) {
                console.warn('Print not supported or blocked:', err);
              }
            }}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs border border-slate-700 flex items-center gap-1.5 shadow"
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            <span>Print Report</span>
          </button>
          <span className="px-3 py-1.5 bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 rounded-xl text-xs font-semibold">
            July 2026 Peak Season Summary
          </span>
        </div>
      </div>

      {/* Analytics Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-lg">
          <span className="text-xs text-slate-400 block mb-1">Total Monthly Revenue (MTD)</span>
          <div className="text-2xl font-extrabold text-emerald-400">${(stats.todayRevenue * 22).toLocaleString()}</div>
          <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-1">
            <TrendingUp className="w-3.5 h-3.5" /> +18.5% year-over-year
          </span>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-lg">
          <span className="text-xs text-slate-400 block mb-1">Average Daily Rate (ADR)</span>
          <div className="text-2xl font-extrabold text-cyan-300">$485.00</div>
          <span className="text-[11px] text-cyan-400 font-medium mt-1 block">Luxury Villa & Suite average</span>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-lg">
          <span className="text-xs text-slate-400 block mb-1">Revenue Per Available Room (RevPAR)</span>
          <div className="text-2xl font-extrabold text-amber-300">$426.80</div>
          <span className="text-[11px] text-amber-400 font-medium mt-1 block">Based on 88% occupancy</span>
        </div>
      </div>

      {/* Revenue Outlets Breakdown Bars */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="font-bold text-white text-base">Revenue Distribution by Outlet</h3>
        
        <div className="space-y-4">
          {revenueBreakdown.map((item, idx) => (
            <div key={idx} className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-slate-200">
                <span className="font-semibold">{item.outlet}</span>
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-white">${item.revenue.toLocaleString()}</span>
                  <span className="text-cyan-400 font-bold w-10 text-right">{item.percentage}%</span>
                </div>
              </div>

              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-cyan-500 via-sky-400 to-amber-400 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
