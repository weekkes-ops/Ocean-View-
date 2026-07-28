import React, { useState } from 'react';
import { UserCheck, Crown, Search, Plus, Phone, Mail, DollarSign, Calendar, Heart, X } from 'lucide-react';
import { GuestProfile } from '../types';

interface GuestsViewProps {
  guests: GuestProfile[];
  onAddGuest: (newGuest: GuestProfile) => void;
}

export const GuestsView: React.FC<GuestsViewProps> = ({ guests, onAddGuest }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [vipTier, setVipTier] = useState<GuestProfile['vipTier']>('Platinum');
  const [roomNumber, setRoomNumber] = useState('');
  const [notes, setNotes] = useState('');

  const filtered = guests.filter((g) =>
    g.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.phone.includes(searchQuery) ||
    (g.roomNumber && g.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName) return;

    const newGuestObj: GuestProfile = {
      id: `GST-${Date.now().toString().slice(-4)}`,
      fullName,
      phone,
      email,
      vipTier,
      roomNumber,
      totalSpend: 0,
      stayHistoryCount: 1,
      preferences: [notes || 'Preferred oceanfront view'],
      status: 'In-House',
    };

    onAddGuest(newGuestObj);
    setShowAddModal(false);
    setFullName('');
    setPhone('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-extrabold text-white">Registered Guest Profiles & VIP Directory</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Track VIP status tiers, stay histories, total resort expenditures, and personalized preferences.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Guest</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search guest name, phone, or villa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Guests Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((guest) => (
          <div
            key={guest.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-cyan-500/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-slate-950 text-cyan-400 font-extrabold text-xs flex items-center justify-center border border-slate-800">
                    {guest.fullName.charAt(0)}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-white text-sm">{guest.fullName}</h3>
                    <span className="text-[11px] text-cyan-400 font-semibold">{guest.roomNumber || 'Day Guest Pass'}</span>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 bg-amber-950/80 text-amber-300 border border-amber-800/60 rounded-full text-[10px] font-bold flex items-center gap-1">
                  <Crown className="w-3 h-3 text-amber-400" /> {guest.vipTier} VIP
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" /> Phone:
                  </span>
                  <span className="font-semibold text-slate-200">{guest.phone}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" /> Stays History:
                  </span>
                  <span className="font-semibold text-slate-200">{guest.stayHistoryCount} Visits</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Total Resort Spend:
                  </span>
                  <span className="font-extrabold text-emerald-400 text-sm">${guest.totalSpend.toLocaleString()}</span>
                </div>

                {guest.preferences && guest.preferences.length > 0 && (
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px] space-y-1">
                    <span className="text-slate-400 font-semibold flex items-center gap-1">
                      <Heart className="w-3 h-3 text-rose-400" /> Special Guest Preferences:
                    </span>
                    <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                      {guest.preferences.map((p, idx) => (
                        <li key={idx}>{p}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between mt-4">
              <span className="text-[11px] text-slate-500 font-mono">ID: {guest.id}</span>
              <span className="px-2.5 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold rounded-full">
                {guest.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Guest Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Register New Guest Profile</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Samuel K. Cole"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+232-76-000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">VIP Tier</label>
                  <select
                    value={vipTier}
                    onChange={(e) => setVipTier(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Platinum">Platinum VIP</option>
                    <option value="Gold">Gold VIP</option>
                    <option value="Silver">Silver Member</option>
                    <option value="Standard">Standard Guest</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="guest@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Assigned Unit</label>
                  <input
                    type="text"
                    placeholder="e.g. VILLA-01"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Special Preferences / Allergies</label>
                <textarea
                  placeholder="e.g. Requires extra pillows, vintage champagne, shellfish allergy"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500 h-16"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-white font-bold text-xs rounded-xl shadow-lg"
              >
                Save Guest Profile
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
