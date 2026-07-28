import React from 'react';
import { MapPin, Phone, Waves, Sun, Compass, ShieldCheck, Hotel, Utensils, Wine, Film, Trophy, X } from 'lucide-react';

interface ResortInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResortInfoModal: React.FC<ResortInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto p-6 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-amber-400 to-rose-500 p-0.5 shadow-md">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Waves className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white">OceanView Country Club & Resort</h2>
              <p className="text-xs text-orange-400 font-medium">Sussex Village Coast, Sierra Leone</p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Official Address & Phone Signboard Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-orange-950/60 text-orange-400 rounded-xl border border-orange-800/40 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 block uppercase">Resort Physical Address</span>
              <p className="font-extrabold text-white text-sm">10 Sweds Free Avenue</p>
              <p className="text-xs text-slate-300">Sussex Village, Sierra Leone</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-cyan-950/60 text-cyan-400 rounded-xl border border-cyan-800/40 shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 block uppercase">Front Desk / Concierge Tel</span>
              <p className="font-extrabold text-cyan-300 text-sm">+232-76-862043</p>
              <p className="text-xs text-slate-300">WhatsApp & Direct Calls (24/7)</p>
            </div>
          </div>
        </div>

        {/* Resort Blueprint Map Layout */}
        <div className="space-y-2">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400" /> Resort Interactive Blueprint Map
          </h3>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 relative min-h-64 flex flex-col justify-between space-y-4">
            
            {/* Atlantic Ocean Header */}
            <div className="w-full py-2 bg-gradient-to-r from-teal-900 via-cyan-900 to-sky-900 rounded-xl border border-teal-700/50 text-center text-xs font-extrabold text-cyan-200 tracking-wider">
              🌊 SUSSEX BAY & ATLANTIC OCEAN (Water Sports Marina & Pier)
            </div>

            {/* Layout Nodes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 bg-slate-900 rounded-xl border border-cyan-800/60 text-center">
                <Hotel className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                <div className="font-bold text-white">Oceanfront Villas</div>
                <span className="text-[10px] text-slate-400">Villas 01 - 04</span>
              </div>

              <div className="p-2.5 bg-slate-900 rounded-xl border border-amber-800/60 text-center">
                <Wine className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                <div className="font-bold text-white">VIP Lounge & Deck</div>
                <span className="text-[10px] text-slate-400">Sunset Cigar Vault</span>
              </div>

              <div className="p-2.5 bg-slate-900 rounded-xl border border-rose-800/60 text-center">
                <Utensils className="w-4 h-4 text-rose-400 mx-auto mb-1" />
                <div className="font-bold text-white">Restaurants & Cafe</div>
                <span className="text-[10px] text-slate-400">Ocean Breeze Grill</span>
              </div>

              <div className="p-2.5 bg-slate-900 rounded-xl border border-purple-800/60 text-center">
                <Film className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                <div className="font-bold text-white">Movie Theater</div>
                <span className="text-[10px] text-slate-400">4K Laser Suite</span>
              </div>
            </div>

            {/* Entrance Road Footer */}
            <div className="w-full py-1.5 bg-slate-900 rounded-xl border border-slate-800 text-center text-[11px] text-slate-400 font-semibold">
              📍 MAIN ENTRANCE GATE & CAR PARK — 10 Sweds Free Avenue
            </div>

          </div>
        </div>

        {/* Close Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
          >
            Close Blueprint
          </button>
        </div>

      </div>
    </div>
  );
};
