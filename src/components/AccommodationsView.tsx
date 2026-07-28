import React, { useState } from 'react';
import {
  Hotel,
  Search,
  Plus,
  User,
  Phone,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  BedDouble,
  DollarSign,
  Maximize2,
  X,
} from 'lucide-react';
import { Room } from '../types';

interface AccommodationsViewProps {
  rooms: Room[];
  onUpdateRoom: (updatedRoom: Room) => void;
  onAddRoom: (newRoom: Room) => void;
}

export const AccommodationsView: React.FC<AccommodationsViewProps> = ({
  rooms,
  onUpdateRoom,
  onAddRoom,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoomModal, setSelectedRoomModal] = useState<Room | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states for Check-In / Booking
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [checkInDate, setCheckInDate] = useState('2026-07-28');
  const [checkOutDate, setCheckOutDate] = useState('2026-08-02');

  // Form states for New Room
  const [newUnitNumber, setNewUnitNumber] = useState('');
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<Room['category']>('Luxury Villa');
  const [newPrice, setNewPrice] = useState('450');
  const [newCapacity, setNewCapacity] = useState('2');
  const [newView, setNewView] = useState<Room['view']>('Ocean View');

  const categories = ['All', 'Luxury Villa', 'Oceanfront Suite', 'Beach Cabana', 'Deluxe Room', 'Penthouse VIP'];
  const statuses = ['All', 'Available', 'Occupied', 'Cleaning', 'Maintenance'];

  const filteredRooms = rooms.filter((room) => {
    const matchesCategory = selectedCategory === 'All' || room.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || room.status === selectedStatus;
    const matchesSearch =
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.unitNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (room.currentGuest && room.currentGuest.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const handleOpenCheckInModal = (room: Room) => {
    setSelectedRoomModal(room);
    setGuestName(room.currentGuest || '');
    setGuestPhone(room.guestPhone || '');
    setCheckInDate(room.checkInDate || '2026-07-28');
    setCheckOutDate(room.checkOutDate || '2026-08-02');
  };

  const handleSaveCheckIn = () => {
    if (!selectedRoomModal) return;
    const updated: Room = {
      ...selectedRoomModal,
      status: guestName.trim() ? 'Occupied' : 'Available',
      currentGuest: guestName.trim() || undefined,
      guestPhone: guestPhone.trim() || undefined,
      checkInDate: guestName.trim() ? checkInDate : undefined,
      checkOutDate: guestName.trim() ? checkOutDate : undefined,
    };
    onUpdateRoom(updated);
    setSelectedRoomModal(null);
  };

  const handleStatusQuickChange = (room: Room, newStatus: Room['status']) => {
    const updated: Room = {
      ...room,
      status: newStatus,
      ...(newStatus === 'Available' || newStatus === 'Cleaning' || newStatus === 'Maintenance'
        ? { currentGuest: undefined, checkInDate: undefined, checkOutDate: undefined }
        : {}),
    };
    onUpdateRoom(updated);
  };

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newUnitNumber) return;

    const newRoomObj: Room = {
      id: `R-${Date.now().toString().slice(-4)}`,
      unitNumber: newUnitNumber,
      name: newName,
      category: newCategory,
      status: 'Available',
      pricePerNight: parseFloat(newPrice) || 300,
      capacity: parseInt(newCapacity) || 2,
      view: newView,
      amenities: ['Ocean View Terrace', 'Wi-Fi', 'Air Conditioning', 'Espresso Machine'],
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    };

    onAddRoom(newRoomObj);
    setShowAddModal(false);
    setNewName('');
    setNewUnitNumber('');
  };

  const getStatusBadge = (status: Room['status']) => {
    switch (status) {
      case 'Available':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800">Available</span>;
      case 'Occupied':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-400 border border-cyan-800">Occupied</span>;
      case 'Cleaning':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-400 border border-amber-800">Cleaning</span>;
      case 'Maintenance':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-950/80 text-rose-400 border border-rose-800">Maintenance</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Hotel className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-extrabold text-white">Accommodations Management</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage Luxury Villas, Oceanfront Suites, Beach Cabanas & Penthouse Suites.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Accommodation</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, unit #, guest..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedStatus === st
                    ? 'bg-slate-800 text-cyan-300 border border-cyan-800/60 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-800/80">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accommodation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            {/* Image & Badges */}
            <div className="relative h-48 overflow-hidden group">
              <img
                src={room.image}
                alt={room.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 bg-slate-950/90 text-white font-extrabold text-xs rounded-lg border border-slate-700 shadow-md">
                  {room.unitNumber}
                </span>
                <span className="px-2.5 py-1 bg-slate-900/80 text-cyan-300 text-xs font-semibold rounded-lg border border-cyan-800/50 backdrop-blur-sm">
                  {room.category}
                </span>
              </div>

              <div className="absolute top-3 right-3">{getStatusBadge(room.status)}</div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                <span className="text-lg font-extrabold">{room.name}</span>
              </div>
            </div>

            {/* Room Details Body */}
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <DollarSign className="w-4 h-4 text-emerald-400" /> Rate / Night:
                  </span>
                  <span className="font-bold text-white text-sm">${room.pricePerNight}</span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <BedDouble className="w-4 h-4 text-cyan-400" /> Max Capacity:
                  </span>
                  <span className="font-semibold text-slate-200">{room.capacity} Guests ({room.view})</span>
                </div>

                {room.status === 'Occupied' && (
                  <div className="p-2.5 bg-cyan-950/40 rounded-xl border border-cyan-800/40 space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold text-cyan-300">
                      <User className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{room.currentGuest}</span>
                    </div>
                    {room.checkInDate && (
                      <div className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <span>Stay: {room.checkInDate} to {room.checkOutDate}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
                <button
                  onClick={() => handleOpenCheckInModal(room)}
                  className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs rounded-xl border border-slate-700 transition-colors"
                >
                  {room.status === 'Occupied' ? 'Manage Guest / Checkout' : 'Check-In / Assign'}
                </button>

                <div className="flex items-center gap-1">
                  {room.status === 'Occupied' && (
                    <button
                      onClick={() => handleStatusQuickChange(room, 'Cleaning')}
                      className="p-2 bg-amber-950/80 hover:bg-amber-900 text-amber-300 rounded-xl border border-amber-800"
                      title="Set to Housekeeping Cleaning"
                    >
                      <Clock className="w-4 h-4" />
                    </button>
                  )}
                  {room.status === 'Cleaning' && (
                    <button
                      onClick={() => handleStatusQuickChange(room, 'Available')}
                      className="p-2 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 rounded-xl border border-emerald-800"
                      title="Mark Clean & Available"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Guest Check-In Modal */}
      {selectedRoomModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base">Check-In / Reservation</h3>
                <p className="text-xs text-cyan-400">{selectedRoomModal.name} ({selectedRoomModal.unitNumber})</p>
              </div>
              <button onClick={() => setSelectedRoomModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Guest Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Samuel K. Cole"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Guest Phone Number</label>
                <input
                  type="text"
                  placeholder="+232-76-000000"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Check-In Date</label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Check-Out Date</label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
              <button
                onClick={() => setSelectedRoomModal(null)}
                className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCheckIn}
                className="flex-1 py-2 bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-white font-bold text-xs rounded-xl shadow-lg"
              >
                Confirm Stay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Room Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateRoom} className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Add Accommodation Unit</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Unit Number / Code</label>
                <input
                  type="text"
                  placeholder="e.g. VILLA-03 or CABANA-05"
                  value={newUnitNumber}
                  onChange={(e) => setNewUnitNumber(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Accommodation Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sussex Palms Beach Villa"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Luxury Villa">Luxury Villa</option>
                    <option value="Oceanfront Suite">Oceanfront Suite</option>
                    <option value="Beach Cabana">Beach Cabana</option>
                    <option value="Deluxe Room">Deluxe Room</option>
                    <option value="Penthouse VIP">Penthouse VIP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Rate per Night ($)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Max Capacity</label>
                  <input
                    type="number"
                    value={newCapacity}
                    onChange={(e) => setNewCapacity(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">View Type</label>
                  <select
                    value={newView}
                    onChange={(e) => setNewView(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Ocean View">Ocean View</option>
                    <option value="Beachfront">Beachfront</option>
                    <option value="Sunset Pier">Sunset Pier</option>
                    <option value="Garden View">Garden View</option>
                  </select>
                </div>
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
                Create Room
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
