import React, { useState } from 'react';
import { Film, Ticket, Clock, DollarSign, CheckCircle2, Tv, Sparkles, X } from 'lucide-react';
import { MovieShowtime } from '../types';

interface MovieTheaterViewProps {
  showtimes: MovieShowtime[];
  onBookSeats: (movieShowtimeId: string, count: number) => void;
}

export const MovieTheaterView: React.FC<MovieTheaterViewProps> = ({
  showtimes,
  onBookSeats,
}) => {
  const [selectedMovie, setSelectedMovie] = useState<MovieShowtime | null>(null);
  const [seatCount, setSeatCount] = useState<number>(2);

  const handleConfirmSeats = () => {
    if (!selectedMovie) return;
    onBookSeats(selectedMovie.id, seatCount);
    setSelectedMovie(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 text-purple-400" />
            <h1 className="text-xl font-extrabold text-white">Luxury Movie Theater</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Laser 4K Dolby Atmos Cinema Suite & Beachfront Outdoor Moonlight Screenings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-purple-950/80 text-purple-300 border border-purple-800/60 rounded-xl text-xs font-semibold">
            Dolby Atmos Sound System Ready
          </span>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {showtimes.map((movie) => (
          <div
            key={movie.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-purple-500/40 transition-all flex flex-col sm:flex-row"
          >
            <div className="sm:w-2/5 h-64 sm:h-auto relative overflow-hidden">
              <img
                src={movie.posterImage}
                alt={movie.movieTitle}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 sm:bg-gradient-to-r sm:from-transparent sm:to-slate-900" />
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-purple-950/90 text-purple-300 font-bold text-[11px] rounded-md border border-purple-800">
                {movie.rating}
              </span>
            </div>

            <div className="p-5 sm:w-3/5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{movie.genre}</span>
                <h3 className="text-xl font-extrabold text-white leading-tight">{movie.movieTitle}</h3>
                
                <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Tv className="w-3.5 h-3.5 text-purple-400" /> Screen:
                    </span>
                    <span className="font-semibold text-slate-200">{movie.screenName}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-sky-400" /> Showtime:
                    </span>
                    <span className="font-bold text-white">{movie.showTime}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Ticket className="w-3.5 h-3.5 text-amber-400" /> Seat Availability:
                    </span>
                    <span className="font-bold text-emerald-400">
                      {movie.totalSeats - movie.bookedSeats} Left ({movie.bookedSeats}/{movie.totalSeats} Booked)
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Ticket Price:</span>
                    <span className="font-extrabold text-purple-300 text-sm">${movie.ticketPrice} / Person</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedMovie(movie)}
                className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all active:scale-95"
              >
                Select Seats & Book Tickets
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Seat Selection Modal */}
      {selectedMovie && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base">Theater Ticket Booking</h3>
                <p className="text-xs text-purple-400">{selectedMovie.movieTitle} ({selectedMovie.screenName})</p>
              </div>
              <button onClick={() => setSelectedMovie(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Screen Banner */}
            <div className="w-full py-1.5 bg-purple-950/60 border border-purple-800/40 rounded-xl text-center text-xs font-bold text-purple-300 tracking-widest uppercase shadow-inner">
              ❖ SCREEN ❖
            </div>

            {/* Simulated Seat Grid */}
            <div className="grid grid-cols-8 gap-2 py-3 px-4 bg-slate-950 rounded-xl border border-slate-800">
              {Array.from({ length: 24 }).map((_, idx) => {
                const isOccupied = idx < 10;
                return (
                  <div
                    key={idx}
                    className={`h-7 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                      isOccupied
                        ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                        : 'bg-purple-950/80 text-purple-300 border border-purple-700/60 hover:bg-purple-600 hover:text-white cursor-pointer'
                    }`}
                  >
                    {String.fromCharCode(65 + Math.floor(idx / 8))}{(idx % 8) + 1}
                  </div>
                );
              })}
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Select Number of Tickets:</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSeatCount(Math.max(1, seatCount - 1))}
                    className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold"
                  >
                    -
                  </button>
                  <span className="font-extrabold text-white text-sm">{seatCount}</span>
                  <button
                    onClick={() => setSeatCount(Math.min(6, seatCount + 1))}
                    className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="p-3 bg-purple-950/30 rounded-xl border border-purple-800/40 flex items-center justify-between">
                <span className="text-slate-300 font-semibold">Total Ticket Price:</span>
                <span className="text-lg font-extrabold text-purple-300">
                  ${selectedMovie.ticketPrice * seatCount}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
              <button
                onClick={() => setSelectedMovie(null)}
                className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSeats}
                className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg"
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
