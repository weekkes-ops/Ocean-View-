import React, { useState } from 'react';
import { Trophy, Clock, CheckCircle2, User, Plus, ShieldAlert } from 'lucide-react';
import { CourtBooking } from '../types';

interface MultipurposeCourtViewProps {
  courts: CourtBooking[];
  onBookCourt: (courtId: string, bookedBy: string, equipment: string[]) => void;
}

export const MultipurposeCourtView: React.FC<MultipurposeCourtViewProps> = ({
  courts,
  onBookCourt,
}) => {
  const [selectedCourtId, setSelectedCourtId] = useState<string | null>(null);
  const [bookedBy, setBookedBy] = useState('');

  const handleConfirmBooking = () => {
    if (!selectedCourtId || !bookedBy) return;
    onBookCourt(selectedCourtId, bookedBy, ['Pro Rackets', 'Match Balls']);
    setSelectedCourtId(null);
    setBookedBy('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <h1 className="text-xl font-extrabold text-white">Multipurpose Sports Courts</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Pro tennis courts, beach volleyball arena, pickleball, and basketball half-courts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-yellow-950/80 text-yellow-300 border border-yellow-800/60 rounded-xl text-xs font-semibold">
            Equipment Rental & Coaching Station
          </span>
        </div>
      </div>

      {/* Courts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {courts.map((court) => (
          <div
            key={court.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-yellow-500/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-extrabold text-white text-base">{court.courtName}</span>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    court.status === 'Booked'
                      ? 'bg-yellow-950 text-yellow-300 border border-yellow-800'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}
                >
                  {court.status}
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Time Slot:</span>
                  <span className="font-bold text-white">{court.timeSlot}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Court Fee:</span>
                  <span className="font-bold text-yellow-400">${court.fee} / Slot</span>
                </div>

                {court.bookedBy && (
                  <div className="p-2.5 bg-yellow-950/30 rounded-xl border border-yellow-800/40 text-xs">
                    <span className="text-slate-400 block font-semibold">Reserved By:</span>
                    <span className="font-bold text-yellow-200">{court.bookedBy}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 mt-4">
              {court.status === 'Available' ? (
                <button
                  onClick={() => setSelectedCourtId(court.id)}
                  className="w-full py-2 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-md"
                >
                  Book Court Slot
                </button>
              ) : (
                <span className="w-full py-2 bg-slate-950 text-center text-slate-400 font-semibold text-xs rounded-xl border border-slate-800">
                  Currently Reserved
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedCourtId && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-white text-base border-b border-slate-800 pb-2">
              Book Multipurpose Court Slot
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Guest or Member Name</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Samuel Cole"
                  value={bookedBy}
                  onChange={(e) => setBookedBy(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
              <button
                onClick={() => setSelectedCourtId(null)}
                className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                className="flex-1 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
