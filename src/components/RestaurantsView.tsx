import React, { useState } from 'react';
import { Utensils, DollarSign, User, CheckCircle2, AlertCircle, Plus, X } from 'lucide-react';
import { RestaurantTable } from '../types';

interface RestaurantsViewProps {
  tables: RestaurantTable[];
  onUpdateTable: (table: RestaurantTable) => void;
}

export const RestaurantsView: React.FC<RestaurantsViewProps> = ({ tables, onUpdateTable }) => {
  const [selectedTable, setSelectedTable] = useState<RestaurantTable | null>(null);
  const [guestName, setGuestName] = useState('');
  const [billAmount, setBillAmount] = useState('0');

  const handleSeatGuest = () => {
    if (!selectedTable) return;
    onUpdateTable({
      ...selectedTable,
      status: 'Occupied',
      currentGuestName: guestName || 'Walk-in Guest',
      billAmount: parseFloat(billAmount) || 0,
    });
    setSelectedTable(null);
  };

  const handleClearTable = (table: RestaurantTable) => {
    onUpdateTable({
      ...table,
      status: 'Available',
      currentGuestName: undefined,
      billAmount: 0,
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-orange-400" />
            <h1 className="text-xl font-extrabold text-white">Oceanfront Restaurants & Dining</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Ocean Breeze Fine Dining & Sunset Terrace Grill. Fresh Atlantic seafood & bespoke cocktails.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-orange-950/80 text-orange-300 border border-orange-800/60 rounded-xl text-xs font-semibold">
            Kitchen Display System Connected
          </span>
        </div>
      </div>

      {/* Restaurant Outlets Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tables.map((table) => (
          <div
            key={table.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-orange-500/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="font-extrabold text-white text-base">{table.tableNumber}</h3>
                  <span className="text-xs text-orange-400 font-medium">{table.outlet}</span>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    table.status === 'Occupied'
                      ? 'bg-orange-950 text-orange-300 border border-orange-800'
                      : table.status === 'Reserved'
                      ? 'bg-sky-950 text-sky-300 border border-sky-800'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}
                >
                  {table.status}
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Seating Capacity:</span>
                  <span className="font-bold text-white">{table.seats} Persons</span>
                </div>

                {table.currentGuestName && (
                  <div className="p-2.5 bg-orange-950/30 rounded-xl border border-orange-800/40 space-y-1">
                    <div className="flex items-center justify-between font-bold text-orange-200">
                      <span>Guest: {table.currentGuestName}</span>
                      {table.serverName && <span className="text-slate-400 font-normal">Server: {table.serverName}</span>}
                    </div>
                    {table.billAmount ? (
                      <div className="text-emerald-400 font-extrabold text-xs">
                        Current Order Bill: ${table.billAmount}
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 mt-4">
              {table.status === 'Available' ? (
                <button
                  onClick={() => {
                    setSelectedTable(table);
                    setGuestName('');
                    setBillAmount('50');
                  }}
                  className="w-full py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Seat Guest at Table
                </button>
              ) : (
                <button
                  onClick={() => handleClearTable(table)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700"
                >
                  Clear & Close Table
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Seat Guest Modal */}
      {selectedTable && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-white text-base border-b border-slate-800 pb-2">
              Seat Guest - {selectedTable.tableNumber}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Guest Name / Room Number</label>
                <input
                  type="text"
                  placeholder="e.g. Ms. Aminata Bangura"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Initial Order Bill ($)</label>
                <input
                  type="number"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-orange-500"
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
                onClick={handleSeatGuest}
                className="flex-1 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl shadow-lg"
              >
                Confirm Seating
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
