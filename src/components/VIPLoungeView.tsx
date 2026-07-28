import React, { useState } from 'react';
import { Wine, Crown, Plus, CheckCircle, Flame, DollarSign, User, ShieldCheck, X } from 'lucide-react';
import { VIPLoungeTable } from '../types';

interface VIPLoungeViewProps {
  tables: VIPLoungeTable[];
  onUpdateTable: (table: VIPLoungeTable) => void;
}

export const VIPLoungeView: React.FC<VIPLoungeViewProps> = ({ tables, onUpdateTable }) => {
  const [selectedTable, setSelectedTable] = useState<VIPLoungeTable | null>(null);
  const [guestName, setGuestName] = useState('');
  const [memberTier, setMemberTier] = useState<VIPLoungeTable['memberTier']>('Platinum Elite');
  const [bottle, setBottle] = useState('');

  const handleOpenReserve = (table: VIPLoungeTable) => {
    setSelectedTable(table);
    setGuestName(table.guestName || '');
    setMemberTier(table.memberTier || 'Platinum Elite');
    setBottle('');
  };

  const handleSaveReservation = () => {
    if (!selectedTable) return;
    const currentBottles = selectedTable.bottlesOrdered || [];
    const updatedBottles = bottle.trim() ? [...currentBottles, bottle.trim()] : currentBottles;

    const updated: VIPLoungeTable = {
      ...selectedTable,
      status: guestName.trim() ? 'Occupied' : 'Open',
      guestName: guestName.trim() || undefined,
      memberTier: guestName.trim() ? memberTier : undefined,
      bottlesOrdered: updatedBottles,
    };

    onUpdateTable(updated);
    setSelectedTable(null);
  };

  const handleFreeTable = (table: VIPLoungeTable) => {
    onUpdateTable({
      ...table,
      status: 'Open',
      guestName: undefined,
      memberTier: undefined,
      bottlesOrdered: [],
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Wine className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl font-extrabold text-white">VIP Lounge & Cigar Vault</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Exclusive oceanfront seating, premium bottle service, and private lounge deck reservations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-amber-950/80 text-amber-300 border border-amber-800/60 rounded-xl text-xs font-semibold flex items-center gap-1.5">
            <Crown className="w-4 h-4 text-amber-400" /> Platinum Tier Active
          </span>
        </div>
      </div>

      {/* Member Tiers Overview Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-slate-900 to-amber-950/40 p-4 rounded-2xl border border-amber-500/30 shadow-lg">
          <div className="flex items-center justify-between text-xs text-amber-300 font-bold mb-1">
            <span>Platinum Elite Member</span>
            <Crown className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-[11px] text-slate-300">Complimentary Dom Pérignon welcome glass, priority Sunset Deck cabana, no minimum spend ceiling.</p>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-yellow-950/40 p-4 rounded-2xl border border-yellow-500/30 shadow-lg">
          <div className="flex items-center justify-between text-xs text-yellow-300 font-bold mb-1">
            <span>Gold VIP Member</span>
            <ShieldCheck className="w-4 h-4 text-yellow-400" />
          </div>
          <p className="text-[11px] text-slate-300">Reserved seating at Cigar Vault, 15% discount on rare cognac bottles, dedicated sommelier.</p>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-850 p-4 rounded-2xl border border-slate-700 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-200 font-bold mb-1">
            <span>Day Pass VIP Guest</span>
            <Wine className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-[11px] text-slate-400">Access to Main Bar Lounge & Poolside deck with standard minimum table spend.</p>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tables.map((table) => (
          <div
            key={table.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-amber-500/30 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="font-extrabold text-white text-base">{table.tableNumber}</h3>
                  <span className="text-xs text-amber-400/90 font-medium">{table.zone}</span>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    table.status === 'Occupied'
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : table.status === 'Reserved'
                      ? 'bg-sky-950 text-sky-300 border border-sky-800'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}
                >
                  {table.status}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Seating Capacity:</span>
                  <span className="font-bold text-white">{table.capacity} Guests</span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Min Spend Target:</span>
                  <span className="font-bold text-amber-400">${table.minSpend}</span>
                </div>

                {table.guestName && (
                  <div className="p-3 bg-amber-950/30 rounded-xl border border-amber-800/40 space-y-1">
                    <div className="flex items-center justify-between font-bold text-amber-200">
                      <span>{table.guestName}</span>
                      <span className="text-[10px] px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded-full">
                        {table.memberTier}
                      </span>
                    </div>

                    {table.bottlesOrdered && table.bottlesOrdered.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-amber-800/30 text-[11px]">
                        <span className="text-slate-400 block mb-1 font-semibold">Bottles Served:</span>
                        <ul className="list-disc list-inside space-y-0.5 text-slate-200">
                          {table.bottlesOrdered.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 mt-4">
              <button
                onClick={() => handleOpenReserve(table)}
                className="flex-1 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                {table.status === 'Occupied' ? 'Add Order / Edit' : 'Reserve & Order'}
              </button>

              {table.status === 'Occupied' && (
                <button
                  onClick={() => handleFreeTable(table)}
                  className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl border border-slate-700"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Reservation & Bottle Service Modal */}
      {selectedTable && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base">VIP Table Reservation</h3>
                <p className="text-xs text-amber-400">{selectedTable.tableNumber} ({selectedTable.zone})</p>
              </div>
              <button onClick={() => setSelectedTable(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">VIP Guest Name</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Samuel Cole"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Membership Tier</label>
                <select
                  value={memberTier}
                  onChange={(e) => setMemberTier(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Platinum Elite">Platinum Elite</option>
                  <option value="Gold VIP">Gold VIP</option>
                  <option value="Silver Member">Silver Member</option>
                  <option value="Day Pass VIP">Day Pass VIP</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Add Champagne / Spirits Order</label>
                <input
                  type="text"
                  placeholder="e.g. Dom Pérignon Vintage 2012 or Hennessy XO"
                  value={bottle}
                  onChange={(e) => setBottle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
              <button
                onClick={() => setSelectedTable(null)}
                className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveReservation}
                className="flex-1 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs rounded-xl shadow-lg"
              >
                Save VIP Table
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
