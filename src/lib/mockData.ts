// Mock data for demo mode
import { Database } from './supabase';
import mockTestDrivesCustom from '../utils/mockTestDrives';
import mockReservationsCustom from '../utils/mockReservations';
import mockAnalyticsCustom from '../utils/mockAnalytics';

type Vehicle = Database['public']['Tables']['vehicles']['Row'];
type Dealer = Database['public']['Tables']['dealers']['Row'];
type TestDriveRequest = Database['public']['Tables']['test_drive_requests']['Row'];
type Reservation = Database['public']['Tables']['reservations']['Row'];
type AnalyticsEvent = Database['public']['Tables']['analytics_events']['Row'];

// Generate a unique ID
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Mock dealer data
export const mockDealer: Dealer = {
  id: 'demo-dealer-id',
  created_at: new Date().toISOString(),
  name: 'E-Z Loan Auto Sales',
  email: 'contact@ezloanauto.com',
  phone: '(716) 961-0480',
  location: '2227 Elmwood Ave, Buffalo, NY 14216',
  website: 'https://ezloanauto.com',
  logo_url: '/ezloan-logo.png',
  primary_color: '#E11B22', // Red color from the logo
  text_color: '#FFFFFF', // White text
  hours: {
    monday: '9:00 AM - 7:00 PM',
    tuesday: '9:00 AM - 7:00 PM',
    wednesday: '9:00 AM - 7:00 PM',
    thursday: '9:00 AM - 7:00 PM',
    friday: '9:00 AM - 7:00 PM',
    saturday: '9:00 AM - 5:00 PM',
    sunday: 'Closed'
  },
  social_media: {
    facebook: 'https://www.facebook.com/EZLoanAutoSales',
    instagram: 'https://www.instagram.com/ezloanautosales123/',
    twitter: '',
    youtube: ''
  }
};

// Mock vehicles data
export const mockVehicles: Vehicle[] = [
  {
    id: generateId(),
    created_at: new Date().toISOString(),
    stock_number: 'A12345',
    vin: '1HGCM82633A123456',
    dealer_id: 'demo-dealer-id',
    year: 2023,
    make: 'Toyota',
    model: 'Camry',
    trim: 'XLE',
    price: 32999,
    mileage: 5200,
    exterior_color: 'Midnight Black',
    interior_color: 'Ash',
    mpg: '28 city / 39 hwy',
    engine: '2.5L 4-Cylinder',
    transmission: 'Automatic',
    drivetrain: 'FWD',
    fuel_type: 'Gasoline',
    features: ['Backup Camera', 'Bluetooth', 'Navigation', 'Heated Seats'],
    images: [],
    status: 'Active'
  },
  {
    id: generateId(),
    created_at: new Date().toISOString(),
    stock_number: 'A12346',
    vin: '5UXWX7C5*BA123457',
    dealer_id: 'demo-dealer-id',
    year: 2022,
    make: 'Honda',
    model: 'Accord',
    trim: 'Sport',
    price: 28995,
    mileage: 12500,
    exterior_color: 'Platinum White',
    interior_color: 'Black',
    mpg: '30 city / 38 hwy',
    engine: '1.5L Turbo 4-Cylinder',
    transmission: 'CVT',
    drivetrain: 'FWD',
    fuel_type: 'Gasoline',
    features: ['Apple CarPlay', 'Android Auto', 'Sunroof', 'Adaptive Cruise Control'],
    images: [],
    status: 'Active'
  },
  {
    id: generateId(),
    created_at: new Date().toISOString(),
    stock_number: 'T98765',
    vin: 'JH4KB16534C123458',
    dealer_id: 'demo-dealer-id',
    year: 2021,
    make: 'Ford',
    model: 'F-150',
    trim: 'Lariat',
    price: 45999,
    mileage: 24000,
    exterior_color: 'Velocity Blue',
    interior_color: 'Medium Earth Gray',
    mpg: '20 city / 26 hwy',
    engine: '3.5L EcoBoost V6',
    transmission: '10-Speed Automatic',
    drivetrain: '4WD',
    fuel_type: 'Gasoline',
    features: ['Leather Seats', 'Towing Package', 'Bedliner', 'Premium Sound System'],
    images: [],
    status: 'Reserved'
  },
  {
    id: generateId(),
    created_at: new Date().toISOString(),
    stock_number: 'S54321',
    vin: 'WBABN33481J123459',
    dealer_id: 'demo-dealer-id',
    year: 2023,
    make: 'Tesla',
    model: 'Model 3',
    trim: 'Long Range',
    price: 52990,
    mileage: 1500,
    exterior_color: 'Deep Blue Metallic',
    interior_color: 'White',
    mpg: 'Electric',
    engine: 'Electric',
    transmission: 'Single-Speed',
    drivetrain: 'AWD',
    fuel_type: 'Electric',
    features: ['Autopilot', 'Glass Roof', 'Premium Connectivity', 'Heated Seats'],
    images: [],
    status: 'Active'
  },
  {
    id: generateId(),
    created_at: new Date().toISOString(),
    stock_number: 'C67890',
    vin: '3VWPD71K05M123460',
    dealer_id: 'demo-dealer-id',
    year: 2020,
    make: 'Chevrolet',
    model: 'Silverado',
    trim: 'LT Trail Boss',
    price: 38500,
    mileage: 35000,
    exterior_color: 'Summit White',
    interior_color: 'Jet Black',
    mpg: '16 city / 21 hwy',
    engine: '5.3L V8',
    transmission: '8-Speed Automatic',
    drivetrain: '4WD',
    fuel_type: 'Gasoline',
    features: ['Z71 Off-Road Package', 'Trailering Package', 'Lifted Suspension', 'Spray-in Bedliner'],
    images: [],
    status: 'Sold'
  },
  // New vehicles
  {
    id: generateId(),
    created_at: new Date().toISOString(),
    stock_number: 'H24381',
    vin: 'KM8J3CAL4PU193826',
    dealer_id: 'demo-dealer-id',
    year: 2023,
    make: 'Hyundai',
    model: 'Tucson',
    trim: 'Limited',
    price: 36450,
    mileage: 8250,
    exterior_color: 'Amazon Gray',
    interior_color: 'Black',
    mpg: '25 city / 32 hwy',
    engine: '2.5L 4-Cylinder',
    transmission: '8-Speed Automatic',
    drivetrain: 'AWD',
    fuel_type: 'Gasoline',
    features: ['Panoramic Sunroof', 'Smart Cruise Control', 'Blind Spot Monitor', 'Leather Seats'],
    images: [],
    status: 'Active'
  },
  {
    id: generateId(),
    created_at: new Date().toISOString(),
    stock_number: 'K76521',
    vin: '5YJ3E1EA4KF305981',
    dealer_id: 'demo-dealer-id',
    year: 2022,
    make: 'Kia',
    model: 'Telluride',
    trim: 'SX Prestige',
    price: 47250,
    mileage: 15600,
    exterior_color: 'Gravity Gray',
    interior_color: 'Dune Brown',
    mpg: '20 city / 26 hwy',
    engine: '3.8L V6',
    transmission: '8-Speed Automatic',
    drivetrain: 'AWD',
    fuel_type: 'Gasoline',
    features: ['Nappa Leather', 'Head-Up Display', 'Surround View Monitor', 'Premium Sound System'],
    images: [],
    status: 'Active'
  },
  {
    id: generateId(),
    created_at: new Date().toISOString(),
    stock_number: 'M71932',
    vin: 'WA1AVAFY5K2087329',
    dealer_id: 'demo-dealer-id',
    year: 2023,
    make: 'Mazda',
    model: 'CX-5',
    trim: 'Signature',
    price: 39800,
    mileage: 7420,
    exterior_color: 'Soul Red Crystal',
    interior_color: 'Parchment',
    mpg: '24 city / 30 hwy',
    engine: '2.5L Turbo 4-Cylinder',
    transmission: '6-Speed Automatic',
    drivetrain: 'AWD',
    fuel_type: 'Gasoline',
    features: ['Nappa Leather', 'Bose Audio', 'Navigation', 'Heated & Ventilated Seats'],
    images: [],
    status: 'Active'
  },
  {
    id: generateId(),
    created_at: new Date().toISOString(),
    stock_number: 'B98234',
    vin: 'WBAJA5C52KBW63935',
    dealer_id: 'demo-dealer-id',
    year: 2022,
    make: 'BMW',
    model: '330i',
    trim: 'xDrive',
    price: 49950,
    mileage: 22340,
    exterior_color: 'Mineral White',
    interior_color: 'Cognac',
    mpg: '25 city / 34 hwy',
    engine: '2.0L Turbo 4-Cylinder',
    transmission: '8-Speed Automatic',
    drivetrain: 'AWD',
    fuel_type: 'Gasoline',
    features: ['Live Cockpit Pro', 'Adaptive Suspension', 'Harman Kardon Audio', 'Sport Seats'],
    images: [],
    status: 'Active'
  },
  {
    id: generateId(),
    created_at: new Date().toISOString(),
    stock_number: 'N35781',
    vin: '1N4BL4EV8KC215734',
    dealer_id: 'demo-dealer-id',
    year: 2023,
    make: 'Nissan',
    model: 'Altima',
    trim: 'SR',
    price: 31340,
    mileage: 5920,
    exterior_color: 'Sunset Drift',
    interior_color: 'Charcoal',
    mpg: '28 city / 39 hwy',
    engine: '2.5L 4-Cylinder',
    transmission: 'CVT',
    drivetrain: 'FWD',
    fuel_type: 'Gasoline',
    features: ['ProPilot Assist', 'Blind Spot Warning', 'Leather Wrapped Steering Wheel', 'Rear Spoiler'],
    images: [],
    status: 'Reserved'
  },
  {
    id: generateId(),
    created_at: new Date().toISOString(),
    stock_number: 'J87952',
    vin: '3GNAXSEV1KS612938',
    dealer_id: 'demo-dealer-id',
    year: 2022,
    make: 'Jeep',
    model: 'Wrangler',
    trim: 'Rubicon',
    price: 52780,
    mileage: 18650,
    exterior_color: 'Sarge Green',
    interior_color: 'Black',
    mpg: '17 city / 23 hwy',
    engine: '3.6L V6',
    transmission: '8-Speed Automatic',
    drivetrain: '4WD',
    fuel_type: 'Gasoline',
    features: ['Rock-Trac 4x4', 'Electronic Disconnect Sway Bar', 'Heavy Duty Axles', 'Leather Seats'],
    images: [],
    status: 'Active'
  },
  {
    id: generateId(),
    created_at: new Date().toISOString(),
    stock_number: 'V35217',
    vin: 'YV4A22RK5K1257812',
    dealer_id: 'demo-dealer-id',
    year: 2023,
    make: 'Volvo',
    model: 'XC60',
    trim: 'Recharge',
    price: 59950,
    mileage: 4350,
    exterior_color: 'Thunder Gray',
    interior_color: 'Charcoal',
    mpg: '57 MPGe',
    engine: '2.0L Turbo 4-Cylinder Plug-in Hybrid',
    transmission: '8-Speed Automatic',
    drivetrain: 'AWD',
    fuel_type: 'Hybrid',
    features: ['Pilot Assist', 'Bowers & Wilkins Audio', 'Nappa Leather', 'Heated Steering Wheel'],
    images: [],
    status: 'Active'
  },
  {
    id: generateId(),
    created_at: new Date().toISOString(),
    stock_number: 'A98726',
    vin: 'WA1BAAFY6K2179023',
    dealer_id: 'demo-dealer-id',
    year: 2022,
    make: 'Audi',
    model: 'Q5',
    trim: 'Premium Plus',
    price: 54750,
    mileage: 19870,
    exterior_color: 'Navarra Blue',
    interior_color: 'Atlas Beige',
    mpg: '23 city / 28 hwy',
    engine: '2.0L Turbo 4-Cylinder',
    transmission: '7-Speed Dual-Clutch',
    drivetrain: 'AWD',
    fuel_type: 'Gasoline',
    features: ['Virtual Cockpit', 'Bang & Olufsen Sound', 'Panoramic Sunroof', 'Heated Front Seats'],
    images: [],
    status: 'Sold'
  },
  {
    id: generateId(),
    created_at: new Date().toISOString(),
    stock_number: 'S73621',
    vin: '4S4BSANC0K3392682',
    dealer_id: 'demo-dealer-id',
    year: 2023,
    make: 'Subaru',
    model: 'Outback',
    trim: 'Wilderness',
    price: 38990,
    mileage: 9350,
    exterior_color: 'Geyser Blue',
    interior_color: 'Gray StarTex',
    mpg: '22 city / 26 hwy',
    engine: '2.4L Turbo 4-Cylinder',
    transmission: 'CVT',
    drivetrain: 'AWD',
    fuel_type: 'Gasoline',
    features: ['StarLink Safety', 'Raised Suspension', 'X-Mode', 'All-Weather Floor Mats'],
    images: [],
    status: 'Active'
  },
  {
    id: generateId(),
    created_at: new Date().toISOString(),
    stock_number: 'L54390',
    vin: 'JTJAM7BX6K5213957',
    dealer_id: 'demo-dealer-id',
    year: 2022,
    make: 'Lexus',
    model: 'RX 350',
    trim: 'F Sport',
    price: 57990,
    mileage: 14520,
    exterior_color: 'Ultra White',
    interior_color: 'Circuit Red',
    mpg: '20 city / 27 hwy',
    engine: '3.5L V6',
    transmission: '8-Speed Automatic',
    drivetrain: 'AWD',
    fuel_type: 'Gasoline',
    features: ['Mark Levinson Audio', 'Head-Up Display', 'Adaptive Variable Suspension', 'Panoramic View Monitor'],
    images: [],
    status: 'Active'
  }
];

// Create mock consumers
export const mockConsumers = [
  {
    id: generateId(),
    created_at: new Date().toISOString(),
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    zip_code: '14216'
  },
  {
    id: generateId(),
    created_at: new Date().toISOString(),
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '(555) 987-6543',
    zip_code: '14217'
  },
  {
    id: generateId(),
    created_at: new Date().toISOString(),
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    phone: '(555) 456-7890',
    zip_code: '14220'
  },
  {
    id: generateId(),
    created_at: new Date().toISOString(),
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    phone: '(555) 234-5678',
    zip_code: '14215'
  }
];

// Mock test drive requests
export const mockTestDriveRequests: TestDriveRequest[] = [
  {
    id: generateId(),
    created_at: new Date().toISOString(),
    vehicle_id: mockVehicles[0].id,
    consumer_id: mockConsumers[0].id,
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM',
    status: 'Pending'
  },
  {
    id: generateId(),
    created_at: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    vehicle_id: mockVehicles[1].id,
    consumer_id: mockConsumers[1].id,
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    time: '2:30 PM',
    status: 'Confirmed'
  },
  {
    id: generateId(),
    created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    vehicle_id: mockVehicles[3].id,
    consumer_id: mockConsumers[2].id,
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
    time: '11:15 AM',
    status: 'Completed'
  },
  {
    id: generateId(),
    created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    vehicle_id: mockVehicles[4].id,
    consumer_id: mockConsumers[3].id,
    date: new Date(Date.now() - 172800000).toISOString().split('T')[0], // 2 days ago
    time: '3:45 PM',
    status: 'Cancelled'
  }
];

// Mock reservations
export const mockReservations: Reservation[] = [
  {
    id: generateId(),
    created_at: new Date().toISOString(),
    vehicle_id: mockVehicles[0].id,
    consumer_id: mockConsumers[0].id,
    deposit_amount: 500,
    status: 'Pending',
    has_trade_in: false
  },
  {
    id: generateId(),
    created_at: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    vehicle_id: mockVehicles[1].id,
    consumer_id: mockConsumers[1].id,
    deposit_amount: 1000,
    status: 'Confirmed',
    has_trade_in: true
  },
  {
    id: generateId(),
    created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    vehicle_id: mockVehicles[2].id,
    consumer_id: mockConsumers[2].id,
    deposit_amount: 750,
    status: 'Completed',
    has_trade_in: false
  },
  {
    id: generateId(),
    created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    vehicle_id: mockVehicles[3].id,
    consumer_id: mockConsumers[3].id,
    deposit_amount: 1500,
    status: 'Cancelled',
    has_trade_in: true
  }
];

// Mock analytics events
export const mockAnalyticsEvents: AnalyticsEvent[] = [
  // Create a batch of events for each day over the past 30 days
  ...Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Create a random number of events for each day (between 5 and 20)
    const eventsCount = Math.floor(Math.random() * 15) + 5;
    
    return Array.from({ length: eventsCount }, () => {
      const vehicle = mockVehicles[Math.floor(Math.random() * mockVehicles.length)];
      const consumer = Math.random() > 0.3 ? mockConsumers[Math.floor(Math.random() * mockConsumers.length)].id : null;
      const eventTypes: AnalyticsEvent['event_type'][] = ['scan', 'view', 'test_drive', 'save', 'reserve', 'share'];
      const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      
      return {
        id: generateId(),
        created_at: new Date(date).toISOString(),
        event_type: eventType,
        vehicle_id: vehicle.id,
        consumer_id: consumer,
        source: Math.random() > 0.5 ? 'web' : 'qr'
      };
    });
  }).flat()
];

// Mock QR codes data
export const mockQRCodes = mockVehicles.map(vehicle => ({
  id: generateId(),
  created_at: new Date().toISOString(),
  vehicle_id: vehicle.id,
  url: `https://example.com/vehicle/${vehicle.id}`,
  scan_count: Math.floor(Math.random() * 50)
}));

// Export custom format mock data that matches the screenshots
export const customMockData = {
  testDrives: mockTestDrivesCustom,
  reservations: mockReservationsCustom,
  analytics: mockAnalyticsCustom,
  dealerInfo: {
    name: 'E-Z Loan Auto Sales',
    logo: '/ezloan-logo.png',
    address: '2227 Elmwood Ave, Buffalo, NY 14216',
    phone: '(716) 961-0480',
    website: 'https://ezloanauto.com',
    email: 'contact@ezloanauto.com',
    hours: {
      monday: '9:00 AM - 7:00 PM',
      tuesday: '9:00 AM - 7:00 PM',
      wednesday: '9:00 AM - 7:00 PM',
      thursday: '9:00 AM - 7:00 PM',
      friday: '9:00 AM - 7:00 PM',
      saturday: '9:00 AM - 5:00 PM',
      sunday: 'Closed'
    },
    social: {
      facebook: 'https://www.facebook.com/EZLoanAutoSales',
      instagram: 'https://www.instagram.com/ezloanautosales123/'
    },
    theme: {
      primaryColor: '#E11B22',
      textColor: '#FFFFFF',
      accentColor: '#F3F4F6'
    }
  }
};

// Mock API service to replace Supabase calls in demo mode
export const mockSupabaseService = {
  // Dealers
  getDealerProfile: async (dealerId: string) => {
    return { data: mockDealer, error: null };
  },
  updateDealerProfile: async (dealerId: string, updates: any) => {
    return { data: { ...mockDealer, ...updates }, error: null };
  },
  
  // Vehicles
  getVehicles: async (dealerId: string, filter?: string) => {
    let filteredVehicles = mockVehicles;
    
    if (filter && filter !== 'all') {
      filteredVehicles = mockVehicles.filter(v => v.status === filter);
    }
    
    return { data: filteredVehicles, error: null };
  },
  getVehicle: async (vehicleId: string) => {
    const vehicle = mockVehicles.find(v => v.id === vehicleId);
    return { data: vehicle || null, error: vehicle ? null : { message: 'Vehicle not found' } };
  },
  addVehicle: async (vehicleData: any) => {
    const newVehicle = {
      id: generateId(),
      created_at: new Date().toISOString(),
      ...vehicleData,
      features: vehicleData.features || [],
      images: vehicleData.images || [],
      status: vehicleData.status || 'Active'
    };
    
    mockVehicles.push(newVehicle as Vehicle);
    return { data: [newVehicle], error: null };
  },
  updateVehicle: async (vehicleId: string, updates: any) => {
    const index = mockVehicles.findIndex(v => v.id === vehicleId);
    
    if (index === -1) {
      return { error: { message: 'Vehicle not found' } };
    }
    
    mockVehicles[index] = { ...mockVehicles[index], ...updates };
    return { data: null, error: null };
  },
  deleteVehicle: async (vehicleId: string) => {
    const index = mockVehicles.findIndex(v => v.id === vehicleId);
    
    if (index === -1) {
      return { error: { message: 'Vehicle not found' } };
    }
    
    mockVehicles.splice(index, 1);
    return { data: null, error: null };
  },
  
  // QR Codes
  getQRCodes: async () => {
    return { data: mockQRCodes, error: null };
  },
  getQRCode: async (vehicleId: string) => {
    const qrCode = mockQRCodes.find(qr => qr.vehicle_id === vehicleId);
    return { data: qrCode || null, error: qrCode ? null : { message: 'QR code not found' } };
  },
  createQRCode: async (qrCodeData: any) => {
    const newQRCode = {
      id: generateId(),
      created_at: new Date().toISOString(),
      ...qrCodeData,
      scan_count: 0
    };
    
    mockQRCodes.push(newQRCode);
    return { data: null, error: null };
  },
  
  // Analytics
  getAnalytics: async (dateRange: string) => {
    // This would simulate fetching analytics data based on date range
    return { data: customMockData.analytics, error: null };
  }
};