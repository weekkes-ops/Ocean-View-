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
import { InventoryView } from './components/InventoryView';
import { SettingsView } from './components/SettingsView';

import { POSTerminalModal } from './components/POSTerminalModal';
import { AIAssistantModal } from './components/AIAssistantModal';
import { ResortInfoModal } from './components/ResortInfoModal';
import { ReceiptModal, ReceiptData } from './components/ReceiptModal';

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
  INITIAL_INVENTORY,
  INITIAL_INVENTORY_LOGS,
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
  InventoryItem,
  InventoryLog,
  POSProduct,
} from './types';
import { useTheme } from './context/ThemeContext';

export function App() {
  const [activeModule, setActiveModule] = useState<ModuleType>('dashboard');
  const { config, layoutDensity, layoutStyle } = useTheme();

  // Density padding helper
  const densityPadding =
    layoutDensity === 'compact'
      ? 'p-2 sm:p-4'
      : layoutDensity === 'spacious'
      ? 'p-6 sm:p-8 lg:p-12'
      : 'p-4 sm:p-6 lg:p-8';

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
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [inventoryLogs, setInventoryLogs] = useState<InventoryLog[]>(INITIAL_INVENTORY_LOGS);
  const [posProducts, setPosProducts] = useState<POSProduct[]>(INITIAL_POS_PRODUCTS);
  const [todayRevenue, setTodayRevenue] = useState(24850);

  // Modals
  const [isPOSOpen, setIsPOSOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState<ReceiptData | null>(null);

  // Compute Live Stats
  const occupiedCount = rooms.filter((r) => r.status === 'Occupied').length;
  const occupancyRate = Math.round((occupiedCount / rooms.length) * 100) || 0;
  const pendingTasksCount = staffTasks.filter((t) => t.status !== 'Completed').length;
  const waterSportsActiveRentals = waterSports.reduce((acc, curr) => acc + curr.currentRentalsCount, 0);
  const lowStockCount = inventory.filter((i) => i.currentStock <= i.minThreshold).length;

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

  // Inventory Handlers
  const handleRestockItem = (itemId: string, qtyToAdd: number, notes?: string) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newStock = item.currentStock + qtyToAdd;
          const newStatus = newStock === 0 ? 'Out of Stock' : newStock <= item.minThreshold ? 'Low Stock' : 'In Stock';
          
          // Add Audit log
          const newLog: InventoryLog = {
            id: `LOG-${Date.now().toString().slice(-4)}`,
            itemId: item.id,
            itemName: item.name,
            type: 'Restock',
            quantityChanged: qtyToAdd,
            resultingStock: newStock,
            timestamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
            performedBy: 'Logistics Manager',
            notes: notes || 'Manual Stock Replenishment',
          };
          setInventoryLogs((logs) => [newLog, ...logs]);

          return {
            ...item,
            currentStock: newStock,
            lastRestocked: new Date().toISOString().split('T')[0],
            status: newStatus,
          };
        }
        return item;
      })
    );
  };

  const handleAddNewInventoryItem = (newItemData: Omit<InventoryItem, 'id' | 'status'>) => {
    const id = `INV-${(inventory.length + 1).toString().padStart(3, '0')}`;
    const status = newItemData.currentStock === 0 ? 'Out of Stock' : newItemData.currentStock <= newItemData.minThreshold ? 'Low Stock' : 'In Stock';
    const newItem: InventoryItem = {
      ...newItemData,
      id,
      status,
    };

    setInventory((prev) => [newItem, ...prev]);

    // Initial Restock Log
    const newLog: InventoryLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      itemId: id,
      itemName: newItem.name,
      type: 'Restock',
      quantityChanged: newItem.currentStock,
      resultingStock: newItem.currentStock,
      timestamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      performedBy: 'System Admin',
      notes: 'Initial SKU Registration',
    };
    setInventoryLogs((logs) => [newLog, ...logs]);
  };

  const handleCompletePOSTransaction = (tx: any) => {
    setTodayRevenue((prev) => prev + tx.total);

    // Show printable receipt modal instantly
    const receiptData: ReceiptData = {
      receiptNumber: tx.receiptNumber || `REC-${Date.now().toString().slice(-6)}`,
      timestamp: tx.timestamp || `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      cashierName: tx.cashierName || 'POS Cashier #01',
      paymentMethod: tx.paymentMethod,
      roomNumber: tx.roomNumber,
      guestName: tx.guestName,
      items: tx.items.map((i: any) => ({
        name: i.name || i.item?.name || 'Resort Service Item',
        qty: i.qty || 1,
        price: i.price || i.item?.price || 0,
      })),
      subtotal: tx.subtotal,
      tax: tx.tax,
      total: tx.total,
    };
    setActiveReceipt(receiptData);

    // Auto-deduct inventory stock for matching sold products
    if (tx.items && tx.items.length > 0) {
      const logsToAdd: InventoryLog[] = [];

      setInventory((prevInventory) => {
        const updatedInventory = [...prevInventory];
        tx.items.forEach((soldItem: any) => {
          const itemName = (soldItem.name || soldItem.item?.name || '').toLowerCase();
          const qty = soldItem.qty || 1;

          const matchIndex = updatedInventory.findIndex((inv) =>
            inv.name.toLowerCase().includes(itemName) || itemName.includes(inv.name.toLowerCase())
          );

          if (matchIndex !== -1) {
            const target = updatedInventory[matchIndex];
            const newStock = Math.max(0, target.currentStock - qty);
            const newStatus = newStock === 0 ? 'Out of Stock' : newStock <= target.minThreshold ? 'Low Stock' : 'In Stock';
            
            updatedInventory[matchIndex] = {
              ...target,
              currentStock: newStock,
              status: newStatus,
            };

            logsToAdd.push({
              id: `LOG-${Date.now().toString().slice(-4)}-${Math.floor(Math.random() * 100)}`,
              itemId: target.id,
              itemName: target.name,
              type: 'POS Sale Deduction',
              quantityChanged: -qty,
              resultingStock: newStock,
              timestamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
              performedBy: 'POS Terminal #01',
              notes: `Auto deduction for receipt ${receiptData.receiptNumber}`,
            });
          }
        });
        return updatedInventory;
      });

      if (logsToAdd.length > 0) {
        setInventoryLogs((logs) => [...logsToAdd, ...logs]);
      }
    }
  };

  const handleRestoreData = (data: any) => {
    if (data.rooms) setRooms(data.rooms);
    if (data.inventory) setInventory(data.inventory);
    if (data.guests) setGuests(data.guests);
    if (data.staffTasks) setStaffTasks(data.staffTasks);
    if (data.posProducts) setPosProducts(data.posProducts);
  };

  const handleResetData = () => {
    setRooms(INITIAL_ROOMS);
    setInventory(INITIAL_INVENTORY);
    setInventoryLogs(INITIAL_INVENTORY_LOGS);
    setGuests(INITIAL_GUESTS);
    setStaffTasks(INITIAL_STAFF_TASKS);
    setPosProducts(INITIAL_POS_PRODUCTS);
    setVipTables(INITIAL_VIP_LOUNGE);
    setEvents(INITIAL_EVENTS);
    setFitnessSessions(INITIAL_FITNESS);
    setMovieShowtimes(INITIAL_MOVIES);
    setCourts(INITIAL_COURTS);
    setConferences(INITIAL_CONFERENCES);
    setWaterSports(INITIAL_WATER_SPORTS);
    setRestaurantTables(INITIAL_RESTAURANT_TABLES);
    setTodayRevenue(24850);
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
        activeModule={activeModule}
        onSelectModule={handleSelectModuleFromSidebar}
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
          lowStockCount={lowStockCount}
        />

        {/* Main Content Area */}
        <main className={`flex-1 ${densityPadding} overflow-y-auto max-w-7xl mx-auto w-full transition-all`}>
          {activeModule === 'dashboard' && (
            <DashboardView
              stats={stats}
              onNavigate={setActiveModule}
              onOpenPOS={() => setIsPOSOpen(true)}
              onOpenAI={() => setIsAIOpen(true)}
            />
          )}

          {activeModule === 'inventory' && (
            <InventoryView
              inventory={inventory}
              inventoryLogs={inventoryLogs}
              onRestockItem={handleRestockItem}
              onAddNewItem={handleAddNewInventoryItem}
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

          {activeModule === 'settings' && (
            <SettingsView
              systemData={{
                rooms,
                inventory,
                guests,
                staffTasks,
                posProducts,
              }}
              onRestoreData={handleRestoreData}
              onResetData={handleResetData}
              onSelectModule={handleSelectModuleFromSidebar}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <POSTerminalModal
        isOpen={isPOSOpen}
        onClose={() => setIsPOSOpen(false)}
        posCatalog={posProducts}
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

      <ReceiptModal
        isOpen={!!activeReceipt}
        onClose={() => setActiveReceipt(null)}
        receipt={activeReceipt}
      />

    </div>
  );
}

export default App;
