import React, { useState } from 'react';
import { CalendarHeart, Users, DollarSign, Plus, MapPin, Clock, CheckCircle2, Sparkles, X } from 'lucide-react';
import { EventBooking } from '../types';

interface EventVenueViewProps {
  events: EventBooking[];
  onAddEvent: (newEvent: EventBooking) => void;
}

export const EventVenueView: React.FC<EventVenueViewProps> = ({ events, onAddEvent }) => {
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [venueName, setVenueName] = useState<EventBooking['venueName']>('Beachfront Lawn');
  const [eventType, setEventType] = useState<EventBooking['eventType']>('Wedding Ceremony');
  const [organizerName, setOrganizerName] = useState('');
  const [organizerContact, setOrganizerContact] = useState('');
  const [eventDate, setEventDate] = useState('2026-08-10');
  const [timeSlot, setTimeSlot] = useState('17:00 - 23:00');
  const [attendeesCount, setAttendeesCount] = useState('150');
  const [cateringPackage, setCateringPackage] = useState<EventBooking['cateringPackage']>('Ultra Luxury Seafood & Bar');
  const [totalBilling, setTotalBilling] = useState('8500');
  const [specialRequirements, setSpecialRequirements] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !organizerName) return;

    const newBooking: EventBooking = {
      id: `EVT-${Date.now().toString().slice(-4)}`,
      venueName,
      title,
      eventType,
      organizerName,
      organizerContact,
      eventDate,
      timeSlot,
      attendeesCount: parseInt(attendeesCount) || 100,
      cateringPackage,
      totalBilling: parseFloat(totalBilling) || 5000,
      status: 'Confirmed',
      specialRequirements,
    };

    onAddEvent(newBooking);
    setShowAddModal(false);
    setTitle('');
    setOrganizerName('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <CalendarHeart className="w-5 h-5 text-rose-400" />
            <h1 className="text-xl font-extrabold text-white">Event Venues & Galas</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Host luxury oceanfront weddings, corporate retreats, galas, and sunset celebrations.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Book Event Venue</span>
        </button>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-rose-500/30 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="px-2.5 py-1 bg-rose-950/80 text-rose-300 border border-rose-800/60 rounded-lg text-xs font-bold">
                  {evt.venueName}
                </span>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/40">
                  {evt.status}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-white text-base leading-snug">{evt.title}</h3>
                <span className="text-xs text-orange-400 font-medium">{evt.eventType}</span>
              </div>

              <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800/60">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" /> Date & Time:
                  </span>
                  <span className="font-bold text-white">{evt.eventDate} ({evt.timeSlot})</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-sky-400" /> Guests:
                  </span>
                  <span className="font-semibold text-slate-200">{evt.attendeesCount} Attendees</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Total Contract:
                  </span>
                  <span className="font-extrabold text-emerald-400 text-sm">${evt.totalBilling.toLocaleString()}</span>
                </div>

                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px] space-y-1">
                  <div className="text-slate-400 font-semibold">Organizer: {evt.organizerName} ({evt.organizerContact})</div>
                  <div className="text-slate-300">Catering: {evt.cateringPackage}</div>
                </div>

                {evt.specialRequirements && (
                  <p className="text-[11px] text-amber-300/90 italic bg-amber-950/20 p-2 rounded-lg border border-amber-800/30">
                    "{evt.specialRequirements}"
                  </p>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between mt-4">
              <span className="text-[11px] text-slate-500 font-mono">ID: {evt.id}</span>
              <button className="py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700">
                View Setup Specs
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Book Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Book Event Venue</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Event Title</label>
                <input
                  type="text"
                  placeholder="e.g. Sierra Leone Tech Summit Gala Dinner"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Venue Location</label>
                  <select
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="Beachfront Lawn">Beachfront Lawn</option>
                    <option value="Grand Palm Ballroom">Grand Palm Ballroom</option>
                    <option value="Sunset Pier Terrace">Sunset Pier Terrace</option>
                    <option value="Garden Gazebo">Garden Gazebo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Event Type</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="Wedding Ceremony">Wedding Ceremony</option>
                    <option value="Corporate Gala">Corporate Gala</option>
                    <option value="Executive Retreat">Executive Retreat</option>
                    <option value="Private Birthday">Private Birthday</option>
                    <option value="Concert">Concert</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Organizer Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Mrs. Fatima Kargbo"
                    value={organizerName}
                    onChange={(e) => setOrganizerName(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Organizer Contact</label>
                  <input
                    type="text"
                    placeholder="+232-76-000000"
                    value={organizerContact}
                    onChange={(e) => setOrganizerContact(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Date</label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Time Slot</label>
                  <input
                    type="text"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Attendees</label>
                  <input
                    type="number"
                    value={attendeesCount}
                    onChange={(e) => setAttendeesCount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Catering Package</label>
                  <select
                    value={cateringPackage}
                    onChange={(e) => setCateringPackage(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="Ultra Luxury Seafood & Bar">Ultra Luxury Seafood & Bar</option>
                    <option value="Executive Buffet">Executive Buffet</option>
                    <option value="Cocktail & Canapés">Cocktail & Canapés</option>
                    <option value="Standard Resort Buffet">Standard Resort Buffet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Contract Total ($)</label>
                  <input
                    type="number"
                    value={totalBilling}
                    onChange={(e) => setTotalBilling(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Special Stage / AV Setup Notes</label>
                <textarea
                  placeholder="e.g. Flower archway, live saxophone stage, sound system..."
                  value={specialRequirements}
                  onChange={(e) => setSpecialRequirements(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-500 h-16"
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
                className="flex-1 py-2 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white font-bold text-xs rounded-xl shadow-lg"
              >
                Confirm Event Booking
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
