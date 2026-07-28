import React, { useState } from 'react';
import { Users2, Tv, Utensils, DollarSign, Clock, CheckCircle2, Plus } from 'lucide-react';
import { ConferenceBooking } from '../types';

interface ConferenceRoomsViewProps {
  conferences: ConferenceBooking[];
  onAddConference: (newConf: ConferenceBooking) => void;
}

export const ConferenceRoomsView: React.FC<ConferenceRoomsViewProps> = ({
  conferences,
  onAddConference,
}) => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Users2 className="w-5 h-5 text-sky-400" />
            <h1 className="text-xl font-extrabold text-white">Conference Rooms & Executive Boardrooms</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Audio/Visual presentation systems, corporate catering packages, and high-speed satellite Wi-Fi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-sky-950/80 text-sky-300 border border-sky-800/60 rounded-xl text-xs font-semibold">
            High-Speed Fiber Business Hub
          </span>
        </div>
      </div>

      {/* Conference Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {conferences.map((conf) => (
          <div
            key={conf.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-sky-500/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-extrabold text-white text-base">{conf.roomName}</span>
                <span className="px-2.5 py-1 bg-sky-950 text-sky-300 border border-sky-800 rounded-full text-xs font-bold">
                  Cap: {conf.capacity} Pax
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-cyan-300 text-sm">{conf.companyName}</h4>
                <p className="text-xs text-slate-400">Contact: {conf.contactPerson}</p>
              </div>

              <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Scheduled Date:</span>
                  <span className="font-bold text-white">{conf.date} ({conf.durationHours} Hours)</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Total Contract Fee:</span>
                  <span className="font-extrabold text-emerald-400 text-sm">${conf.totalCost.toLocaleString()}</span>
                </div>

                <div className="flex items-center gap-4 text-slate-300 pt-1">
                  <span className="flex items-center gap-1 text-[11px] text-cyan-400 font-medium">
                    <Tv className="w-3.5 h-3.5" /> A/V Equipment Included
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-amber-400 font-medium">
                    <Utensils className="w-3.5 h-3.5" /> Catering Package
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between mt-4">
              <span className="text-[11px] text-slate-500 font-mono">CONF ID: {conf.id}</span>
              <span className="px-3 py-1 bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 rounded-xl text-xs font-semibold">
                {conf.status}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
