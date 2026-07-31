import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { AccommodationsView } from './components/AccommodationsView';
import { VIPLoungeView } from './components/VIPLoungeView';
import { EventVenueView } from './components/EventVenueView';
import { FitnessClubView } from './components/FitnessClubView';
import { MovieTheaterView } from './components/MovieTheaterView';
import { MultipurposeCourtView } from './components/MultipurposeCourtView';
import { ConferenceRoomsView } from './components/ConferenceRoomsView';
import { WaterSportsView } from './components/WaterSportsView';
import { RestaurantsView } from './components/RestaurantsView';
import { CafeView } from './components/CafeView';
import { StaffTasksView } from './components/StaffTasksView';
import { GuestsView } from './components/GuestsView';
import { ReportsView } from './components/ReportsView';
import { ProposalView } from './components/ProposalView';

import { POSTerminalModal } from './components/POSTerminalModal';
import { AIAssistantModal } from './components/AIAssistantModal';
import { ResortInfoModal } from './components/ResortInfoModal';

import {
  INITIAL_ROOMS,
  INITIAL_VIP_LOUNGE,
  INITIAL_EVENTS,
  INITIAL_FITNESS,
  INITIAL_MOVIES,
  INITIAL_COURTS,
  INITIAL_CONFERENCES,
  INITIAL_WATER_SPORTS,
  INITIAL_RESTAURANT_TABLES,
  INITIAL_POS_PRODUCTS,
  INITIAL_STAFF_TASKS,
  INITIAL_GUESTS,
} from './data/mockData';

import {
  ModuleType,
  Room,
  VIPLoungeTable,
  EventBooking,
  FitnessSession,
  MovieShowtime,
  CourtBooking,
  ConferenceBooking,
  WaterSportAsset,
  RestaurantTable,
  StaffTask,
  GuestProfile,
  ResortSummaryStats,
} from './types';
import { useTheme } from './context/ThemeContext';

export function App() {
  const [activeModule, setActiveModule] = useState<ModuleType>('dashboard');
  const { config } = useTheme();

  // Core State
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  const [vipTables, setVipTables] = useState<VIPLoungeTable[]>(INITIAL_VIP_LOUNGE);
  const [events, setEvents] = useState<EventBooking[]>(INITIAL_EVENTS);
  const [fitnessSessions, setFitnessSessions] = useState<FitnessSession[]>(INITIAL_FITNESS);
  const [movieShowtimes, setMovieShowtimes] = useState<MovieShowtime[]>(INITIAL_MOVIES);
  const [courts, setCourts] = useState<CourtBooking[]>(INITIAL_COURTS);
  const [conferences, setConferences] = useState<ConferenceBooking[]>(INITIAL_CONFERENCES);
  const [waterSports, setWaterSports] = useState<WaterSportAsset[]>(INITIAL_WATER_SPORTS);
  const [restaurantTables, setRestaurantTables] = useState<RestaurantTable[]>(INITIAL_RESTAURANT_TABLES);
  const [staffTasks, setStaffTasks] = useState<StaffTask[]>(INITIAL_STAFF_TASKS);
  const [guests, setGuests] = useState<GuestProfile[]>(INITIAL_GUESTS);
  const [todayRevenue, setTodayRevenue] = useState(24850);

  // Modals
  const [isPOSOpen, setIsPOSOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  // Compute Live Stats
  const occupiedCount = rooms.filter((r) => r.status === 'Occupied').length;
  const occupancyRate = Math.round((occupiedCount / rooms.length) * 100) || 0;
  const pendingTasksCount = staffTasks.filter((t) => t.status !== 'Completed').length;
  const waterSportsActiveRentals = waterSports.reduce((acc, curr) => acc + curr.currentRentalsCount, 0);

  const stats: ResortSummaryStats = {
    todayRevenue,
    occupancyRate,
    occupiedRooms: occupiedCount,
    totalRooms: rooms.length,
    activeGuestsCount: 142,
    waterSportsActiveRentals,
    pendingTasksCount,
    upcomingEventsCount: events.length,
  };

  // Handlers for state mutations
  const handleUpdateRoom = (updatedRoom: Room) => {
    setRooms((prev) => prev.map((r) => (r.id === updatedRoom.id ? updatedRoom : r)));
  };

  const handleAddRoom = (newRoom: Room) => {
    setRooms((prev) => [newRoom, ...prev]);
  };

  const handleUpdateVIPTable = (updatedTable: VIPLoungeTable) => {
    setVipTables((prev) => prev.map((t) => (t.id === updatedTable.id ? updatedTable : t)));
  };

  const handleAddEvent = (newEvent: EventBooking) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

  const handleAddFitnessSession = (newSession: FitnessSession) => {
    setFitnessSessions((prev) => [...prev, newSession]);
  };

  const handleRegisterFitnessMember = (sessionId: string) => {
    setFitnessSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, registeredCount: s.registeredCount + 1 } : s))
    );
  };

  const handleBookMovieSeats = (showtimeId: string, count: number) => {
    setMovieShowtimes((prev) =>
      prev.map((m) => (m.id === showtimeId ? { ...m, bookedSeats: m.bookedSeats + count } : m))
    );
  };

  const handleBookCourt = (courtId: string, bookedBy: string) => {
    setCourts((prev) =>
      prev.map((c) => (c.id === courtId ? { ...c, status: 'Booked', bookedBy } : c))
    );
  };

  const handleAddConference = (newConf: ConferenceBooking) => {
    setConferences((prev) => [...prev, newConf]);
  };

  const handleRentWaterAsset = (assetId: string) => {
    setWaterSports((prev) =>
      prev.map((a) =>
        a.id === assetId
          ? {
              ...a,
              availableUnits: Math.max(0, a.availableUnits - 1),
              currentRentalsCount: a.currentRentalsCount + 1,
            }
          : a
      )
    );
  };

  const handleUpdateRestaurantTable = (updatedTable: RestaurantTable) => {
    setRestaurantTables((prev) => prev.map((t) => (t.id === updatedTable.id ? updatedTable : t)));
  };

  const handleAddTask = (newTask: StaffTask) => {
    setStaffTasks((prev) => [newTask, ...prev]);
  };

  const handleUpdateTaskStatus = (taskId: string, newStatus: StaffTask['status']) => {
    setStaffTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const handleAddGuest = (newGuest: GuestProfile) => {
    setGuests((prev) => [newGuest, ...prev]);
  };

  const handleCompletePOSTransaction = (tx: any) => {
    setTodayRevenue((prev) => prev + tx.total);
  };

  const handleSelectModuleFromSidebar = (module: ModuleType) => {
    if (module === 'pos_terminal') {
      setIsPOSOpen(true);
    } else if (module === 'ai_assistant') {
      setIsAIOpen(true);
    } else {
      setActiveModule(module);
    }
  };

  return (
    <div className={`min-h-screen ${config.bgClass} font-sans flex flex-col antialiased transition-colors duration-200`}>
      
      {/* Header Bar */}
      <Header
        stats={stats}
        onOpenPOS={() => setIsPOSOpen(true)}
        onOpenAI={() => setIsAIOpen(true)}
        onOpenInfo={() => setIsInfoOpen(true)}
        onSearch={(query) => {
          if (query.trim() && activeModule !== 'accommodations' && activeModule !== 'guests') {
            setActiveModule('accommodations');
          }
        }}
      />

      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar */}
        <Sidebar
          activeModule={activeModule}
          onSelectModule={handleSelectModuleFromSidebar}
          pendingTasksCount={pendingTasksCount}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {activeModule === 'dashboard' && (
            <DashboardView
              stats={stats}
              onNavigate={setActiveModule}
              onOpenPOS={() => setIsPOSOpen(true)}
              onOpenAI={() => setIsAIOpen(true)}
            />
          )}

          {activeModule === 'accommodations' && (
            <AccommodationsView
              rooms={rooms}
              onUpdateRoom={handleUpdateRoom}
              onAddRoom={handleAddRoom}
            />
          )}

          {activeModule === 'vip_lounge' && (
            <VIPLoungeView tables={vipTables} onUpdateTable={handleUpdateVIPTable} />
          )}

          {activeModule === 'event_venue' && (
            <EventVenueView events={events} onAddEvent={handleAddEvent} />
          )}

          {activeModule === 'fitness_club' && (
            <FitnessClubView
              sessions={fitnessSessions}
              onAddSession={handleAddFitnessSession}
              onRegisterMember={handleRegisterFitnessMember}
            />
          )}

          {activeModule === 'movie_theater' && (
            <MovieTheaterView showtimes={movieShowtimes} onBookSeats={handleBookMovieSeats} />
          )}

          {activeModule === 'multipurpose_court' && (
            <MultipurposeCourtView courts={courts} onBookCourt={handleBookCourt} />
          )}

          {activeModule === 'conference_rooms' && (
            <ConferenceRoomsView conferences={conferences} onAddConference={handleAddConference} />
          )}

          {activeModule === 'water_sports' && (
            <WaterSportsView assets={waterSports} onRentAsset={handleRentWaterAsset} />
          )}

          {activeModule === 'restaurants' && (
            <RestaurantsView tables={restaurantTables} onUpdateTable={handleUpdateRestaurantTable} />
          )}

          {activeModule === 'cafe' && <CafeView />}

          {activeModule === 'guests' && <GuestsView guests={guests} onAddGuest={handleAddGuest} />}

          {activeModule === 'staff_tasks' && (
            <StaffTasksView
              tasks={staffTasks}
              onAddTask={handleAddTask}
              onUpdateTaskStatus={handleUpdateTaskStatus}
            />
          )}

          {activeModule === 'reports' && <ReportsView stats={stats} />}

          {activeModule === 'proposal' && <ProposalView />}
        </main>
      </div>

      {/* Modals */}
      <POSTerminalModal
        isOpen={isPOSOpen}
        onClose={() => setIsPOSOpen(false)}
        posCatalog={INITIAL_POS_PRODUCTS}
        rooms={rooms}
        onCompleteTransaction={handleCompletePOSTransaction}
      />

      <AIAssistantModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        stats={stats}
      />

      <ResortInfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />

    </div>
  );
}

export default App;
