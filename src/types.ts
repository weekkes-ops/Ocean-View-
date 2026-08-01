export type ModuleType =
  | 'dashboard'
  | 'accommodations'
  | 'vip_lounge'
  | 'event_venue'
  | 'fitness_club'
  | 'movie_theater'
  | 'multipurpose_court'
  | 'conference_rooms'
  | 'water_sports'
  | 'restaurants'
  | 'cafe'
  | 'pos_terminal'
  | 'inventory'
  | 'guests'
  | 'staff_tasks'
  | 'reports'
  | 'proposal'
  | 'ai_assistant'
  | 'settings';

export type ThemeMode =
  | 'light_luxury'
  | 'ocean_teal'
  | 'emerald_gold'
  | 'midnight_slate'
  | 'sunset_coral'
  | 'cobalt_sapphire';

export type LayoutStyle = 'expanded_sidebar' | 'compact_sidebar' | 'top_navigation';

export type LayoutDensity = 'comfortable' | 'compact' | 'spacious';

export interface Room {
  id: string;
  unitNumber: string;
  name: string;
  category: 'Luxury Villa' | 'Oceanfront Suite' | 'Beach Cabana' | 'Deluxe Room' | 'Penthouse VIP';
  status: 'Available' | 'Occupied' | 'Cleaning' | 'Maintenance';
  pricePerNight: number;
  capacity: number;
  view: 'Ocean View' | 'Garden View' | 'Beachfront' | 'Sunset Pier';
  amenities: string[];
  currentGuest?: string;
  guestPhone?: string;
  checkInDate?: string;
  checkOutDate?: string;
  image: string;
}

export interface VIPLoungeTable {
  id: string;
  tableNumber: string;
  zone: 'Sunset Deck' | 'Cigar & Cognac Vault' | 'Poolside Cabana VIP' | 'Main Bar Lounge';
  capacity: number;
  status: 'Open' | 'Reserved' | 'Occupied';
  guestName?: string;
  memberTier?: 'Platinum Elite' | 'Gold VIP' | 'Silver Member' | 'Day Pass VIP';
  minSpend: number;
  bottlesOrdered?: string[];
  notes?: string;
}

export interface EventBooking {
  id: string;
  venueName: 'Beachfront Lawn' | 'Grand Palm Ballroom' | 'Sunset Pier Terrace' | 'Garden Gazebo';
  title: string;
  eventType: 'Wedding Ceremony' | 'Corporate Gala' | 'Executive Retreat' | 'Private Birthday' | 'Concert';
  organizerName: string;
  organizerContact: string;
  eventDate: string;
  timeSlot: string;
  attendeesCount: number;
  cateringPackage: 'Ultra Luxury Seafood & Bar' | 'Executive Buffet' | 'Cocktail & Canapés' | 'Standard Resort Buffet';
  totalBilling: number;
  status: 'Confirmed' | 'In Progress' | 'Inquiry' | 'Completed';
  specialRequirements?: string;
}

export interface FitnessSession {
  id: string;
  title: string;
  instructor: string;
  type: 'Yoga Sunrise' | 'Personal HIIT' | 'Tennis Coaching' | 'Squash Match' | 'Pilates Core';
  timeSlot: string;
  location: 'Fitness Center' | 'Beach Yoga Deck' | 'Tennis Court';
  capacity: number;
  registeredCount: number;
  status: 'Scheduled' | 'In Session' | 'Completed';
}

export interface MovieShowtime {
  id: string;
  movieTitle: string;
  genre: string;
  durationMinutes: number;
  rating: string;
  screenName: 'Cinema Suite A (Laser 4K)' | 'Beachfront Outdoor Screen B';
  showTime: string;
  ticketPrice: number;
  totalSeats: number;
  bookedSeats: number;
  posterImage: string;
}

export interface CourtBooking {
  id: string;
  courtName: string;
  courtType: 'Tennis Court 1' | 'Tennis Court 2' | 'Beach Volleyball' | 'Pickleball' | 'Basketball Half-Court';
  timeSlot: string;
  bookedBy: string;
  status: 'Available' | 'Booked' | 'Maintenance';
  equipmentRented: string[];
  fee: number;
}

export interface ConferenceBooking {
  id: string;
  roomName: 'Executive Boardroom A' | 'Atlantic Summit Hall' | 'Sussex Conference Suite';
  capacity: number;
  companyName: string;
  contactPerson: string;
  date: string;
  durationHours: number;
  avPackageRequired: boolean;
  cateringIncluded: boolean;
  totalCost: number;
  status: 'Confirmed' | 'Pending' | 'Completed';
}

export interface WaterSportAsset {
  id: string;
  name: 'Jet Ski WaveRunner' | 'Ocean Tandem Kayak' | 'Paddleboard SUP' | 'Scuba Diving Gear' | 'Speedboat Charter';
  category: 'Motorized' | 'Non-Motorized' | 'Excursion';
  pricePerHour: number;
  availableUnits: number;
  totalUnits: number;
  instructorRequired: boolean;
  safetyRequirement: string;
  currentRentalsCount: number;
}

export interface RestaurantTable {
  id: string;
  tableNumber: string;
  outlet: 'Ocean Breeze Fine Dining' | 'Sunset Terrace Grill';
  seats: number;
  status: 'Available' | 'Reserved' | 'Occupied' | 'Billing';
  currentGuestName?: string;
  serverName?: string;
  billAmount?: number;
}

export interface CafeOrderItem {
  id: string;
  name: string;
  category: 'Espresso & Coffee' | 'Fresh Juices' | 'Artisanal Bakery' | 'Gourmet Snacks';
  price: number;
  quantity: number;
}

export interface CafeOrder {
  id: string;
  customerName: string;
  roomNumber?: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
  paymentMethod: 'Room Charge' | 'Card' | 'Cash';
  status: 'Preparing' | 'Ready' | 'Delivered';
  timestamp: string;
}

export interface POSProduct {
  id: string;
  code: string;
  name: string;
  category: 'Dining' | 'Cafe' | 'VIP Lounge' | 'Water Sports' | 'Theater' | 'Retail';
  price: number;
  stock: number;
}

export interface StaffTask {
  id: string;
  title: string;
  department: 'Housekeeping' | 'Front Desk' | 'Maintenance' | 'F&B Services' | 'Water Sports' | 'Concierge';
  priority: 'High' | 'Medium' | 'Low';
  assignee: string;
  roomOrLocation: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  createdAt: string;
}

export interface GuestProfile {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  roomNumber: string;
  vipTier: 'Platinum' | 'Gold' | 'Silver' | 'Standard';
  stayHistoryCount: number;
  totalSpend: number;
  preferences: string[];
  status: 'In-House' | 'Upcoming' | 'Checked Out';
}

export interface ResortSummaryStats {
  occupancyRate: number;
  totalRooms: number;
  occupiedRooms: number;
  todayRevenue: number;
  activeGuestsCount: number;
  pendingTasksCount: number;
  waterSportsActiveRentals: number;
  upcomingEventsCount: number;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: 'Food & Beverage' | 'VIP Lounge Spirits' | 'Water Sports Assets' | 'Housekeeping Supplies' | 'Cafe & Bakery' | 'Resort Retail';
  outlet: string;
  currentStock: number;
  unit: string;
  minThreshold: number;
  unitCost: number;
  unitPrice: number;
  supplier: string;
  lastRestocked: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export interface InventoryLog {
  id: string;
  itemId: string;
  itemName: string;
  type: 'Restock' | 'POS Sale Deduction' | 'Rental Allocation' | 'Wastage / Adjustment';
  quantityChanged: number;
  resultingStock: number;
  timestamp: string;
  performedBy: string;
  notes?: string;
}
