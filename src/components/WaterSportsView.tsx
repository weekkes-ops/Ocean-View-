import React, { useState } from 'react';
import { Waves, ShieldCheck, Clock, DollarSign, Plus, Compass, AlertTriangle, X } from 'lucide-react';
import { WaterSportAsset } from '../types';

interface WaterSportsViewProps {
  assets: WaterSportAsset[];
  onRentAsset: (assetId: string) => void;
}

export const WaterSportsView: React.FC<WaterSportsViewProps> = ({ assets, onRentAsset }) => {
  const [selectedAsset, setSelectedAsset] = useState<WaterSportAsset | null>(null);
  const [guestName, setGuestName] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [waiverSigned, setWaiverSigned] = useState(true);

  const handleConfirmRental = () => {
    if (!selectedAsset || !guestName) return;
    onRentAsset(selectedAsset.id);
    setSelectedAsset(null);
    setGuestName('');
    setRoomNo('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Waves className="w-5 h-5 text-teal-400" />
            <h1 className="text-xl font-extrabold text-white">Water Sports & Speedboat Marina</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Jet Skis, Kayaking, Paddleboarding, Scuba Reef Diving, and Speedboat Excursions in Sussex Bay.
          </p>
        </div>

        {/* Live Marine Safety Condition */}
        <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-800/60 px-3.5 py-2 rounded-xl text-xs text-emerald-300 font-bold">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Sussex Water Condition: GREEN FLAG (Optimal)</span>
        </div>
      </div>

      {/* Water Sports Fleet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-teal-500/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-extrabold text-white text-base">{asset.name}</span>
                <span className="px-2.5 py-1 bg-teal-950 text-teal-300 border border-teal-800 rounded-full text-xs font-bold">
                  {asset.category}
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Hourly Rental Rate:</span>
                  <span className="font-extrabold text-emerald-400 text-sm">${asset.pricePerHour} / Hr</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Available Marina Fleet:</span>
                  <span className="font-bold text-teal-300">
                    {asset.availableUnits} of {asset.totalUnits} Ready ({asset.currentRentalsCount} Active on Water)
                  </span>
                </div>

                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-[11px]">
                  <div className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                    <span>{asset.safetyRequirement}</span>
                  </div>
                  {asset.instructorRequired && (
                    <div className="text-amber-400 font-medium">* Licensed Instructor Required</div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 mt-4">
              <button
                onClick={() => setSelectedAsset(asset)}
                disabled={asset.availableUnits <= 0}
                className="w-full py-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                {asset.availableUnits > 0 ? 'Rent & Sign Safety Waiver' : 'All Units Out on Water'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Safety Waiver Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base">Water Sports Charter & Waiver</h3>
                <p className="text-xs text-teal-400">{selectedAsset.name}</p>
              </div>
              <button onClick={() => setSelectedAsset(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Guest Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Samuel Cole"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Room Number (Optional for Room Charge)</label>
                <input
                  type="text"
                  placeholder="e.g. VILLA-01"
                  value={roomNo}
                  onChange={(e) => setRoomNo(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="p-3 bg-teal-950/30 rounded-xl border border-teal-800/40 text-[11px] text-slate-300 space-y-2">
                <div className="font-bold text-teal-300">OceanView Sussex Marine Safety Acknowledgement</div>
                <p>I confirm receipt of life jacket, safety briefing, and agree to stay within designated Sussex Bay water zones.</p>
                <label className="flex items-center gap-2 cursor-pointer font-bold text-white">
                  <input
                    type="checkbox"
                    checked={waiverSigned}
                    onChange={(e) => setWaiverSigned(e.target.checked)}
                    className="accent-teal-500 rounded"
                  />
                  <span>I agree to Marine Safety Terms</span>
                </label>
              </div>

              <div className="flex items-center justify-between font-bold text-white pt-1">
                <span className="text-slate-400">Charter Total Rate:</span>
                <span className="text-emerald-400 text-base">${selectedAsset.pricePerHour} / Hour</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
              <button
                onClick={() => setSelectedAsset(null)}
                className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRental}
                disabled={!waiverSigned || !guestName}
                className="flex-1 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg"
              >
                Dispatch Water Equipment
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
