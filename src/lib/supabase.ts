import { createClient } from '@supabase/supabase-js';
import { mockSupabaseService, mockDealer, mockVehicles, mockQRCodes, mockTestDriveRequests, mockReservations, mockAnalyticsEvents, mockConsumers } from './mockData';

export type Database = {
  public: {
    Tables: {
      dealers: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          phone: string;
          location: string;
          website: string;
          logo_url: string | null;
          primary_color: string | null;
          text_color: string | null;
          hours: {
            monday: string;
            tuesday: string;
            wednesday: string;
            thursday: string;
            friday: string;
            saturday: string;
            sunday: string;
          } | null;
          social_media: {
            facebook: string | null;
            instagram: string | null;
            twitter: string | null;
            youtube: string | null;
          } | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          phone: string;
          location: string;
          website?: string;
          logo_url?: string | null;
          primary_color?: string | null;
          text_color?: string | null;
          hours?: {
            monday: string;
            tuesday: string;
            wednesday: string;
            thursday: string;
            friday: string;
            saturday: string;
            sunday: string;
          } | null;
          social_media?: {
            facebook: string | null;
            instagram: string | null;
            twitter: string | null;
            youtube: string | null;
          } | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string;
          phone?: string;
          location?: string;
          website?: string;
          logo_url?: string | null;
          primary_color?: string | null;
          text_color?: string | null;
          hours?: {
            monday: string;
            tuesday: string;
            wednesday: string;
            thursday: string;
            friday: string;
            saturday: string;
            sunday: string;
          } | null;
          social_media?: {
            facebook: string | null;
            instagram: string | null;
            twitter: string | null;
            youtube: string | null;
          } | null;
        };
      };
      consumers: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string | null;
          phone: string | null;
          zip_code: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email?: string | null;
          phone?: string | null;
          zip_code?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string | null;
          phone?: string | null;
          zip_code?: string | null;
        };
      };
      vehicles: {
        Row: {
          id: string;
          created_at: string;
          stock_number: string;
          vin: string;
          dealer_id: string;
          year: number;
          make: string;
          model: string;
          trim: string;
          price: number;
          mileage: number;
          exterior_color: string;
          interior_color: string;
          mpg: string;
          engine: string;
          transmission: string;
          drivetrain: string;
          fuel_type: string;
          features: string[];
          images: string[];
          status: 'Active' | 'Reserved' | 'Sold';
        };
        Insert: {
          id?: string;
          created_at?: string;
          stock_number: string;
          vin: string;
          dealer_id: string;
          year: number;
          make: string;
          model: string;
          trim: string;
          price: number;
          mileage: number;
          exterior_color: string;
          interior_color: string;
          mpg: string;
          engine: string;
          transmission: string;
          drivetrain: string;
          fuel_type: string;
          features?: string[];
          images?: string[];
          status?: 'Active' | 'Reserved' | 'Sold';
        };
        Update: {
          id?: string;
          created_at?: string;
          stock_number?: string;
          vin?: string;
          dealer_id?: string;
          year?: number;
          make?: string;
          model?: string;
          trim?: string;
          price?: number;
          mileage?: number;
          exterior_color?: string;
          interior_color?: string;
          mpg?: string;
          engine?: string;
          transmission?: string;
          drivetrain?: string;
          fuel_type?: string;
          features?: string[];
          images?: string[];
          status?: 'Active' | 'Reserved' | 'Sold';
        };
      };
      qr_codes: {
        Row: {
          id: string;
          created_at: string;
          vehicle_id: string;
          url: string;
          scan_count: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          vehicle_id: string;
          url: string;
          scan_count?: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          vehicle_id?: string;
          url?: string;
          scan_count?: number;
        };
      };
      test_drive_requests: {
        Row: {
          id: string;
          created_at: string;
          vehicle_id: string;
          consumer_id: string;
          date: string;
          time: string;
          status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
        };
        Insert: {
          id?: string;
          created_at?: string;
          vehicle_id: string;
          consumer_id: string;
          date: string;
          time: string;
          status?: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
        };
        Update: {
          id?: string;
          created_at?: string;
          vehicle_id?: string;
          consumer_id?: string;
          date?: string;
          time?: string;
          status?: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
        };
      };
      reservations: {
        Row: {
          id: string;
          created_at: string;
          vehicle_id: string;
          consumer_id: string;
          deposit_amount: number;
          status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
          has_trade_in: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          vehicle_id: string;
          consumer_id: string;
          deposit_amount: number;
          status?: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
          has_trade_in?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          vehicle_id?: string;
          consumer_id?: string;
          deposit_amount?: number;
          status?: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
          has_trade_in?: boolean;
        };
      };
      saved_vehicles: {
        Row: {
          id: string;
          created_at: string;
          vehicle_id: string;
          consumer_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          vehicle_id: string;
          consumer_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          vehicle_id?: string;
          consumer_id?: string;
        };
      };
      analytics_events: {
        Row: {
          id: string;
          created_at: string;
          event_type: 'scan' | 'view' | 'test_drive' | 'save' | 'reserve' | 'share';
          vehicle_id: string;
          consumer_id: string | null;
          source: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          event_type: 'scan' | 'view' | 'test_drive' | 'save' | 'reserve' | 'share';
          vehicle_id: string;
          consumer_id?: string | null;
          source?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          event_type?: 'scan' | 'view' | 'test_drive' | 'save' | 'reserve' | 'share';
          vehicle_id?: string;
          consumer_id?: string | null;
          source?: string | null;
        };
      };
    };
  };
};

// Check if we're in demo mode
const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

// Create a single Supabase client for the entire app
const supabaseClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// Create enhanced Supabase client with mock data support
const supabase = DEMO_MODE || true ? 
  // In demo mode, intercept certain methods to return mock data
  {
    ...supabaseClient,
    
    // Auth methods with mock support
    auth: {
      ...supabaseClient.auth,
      getUser: async () => ({ data: { user: { id: 'demo-dealer-id', email: 'demo@dealer.com' } }, error: null }),
      getSession: async () => ({ data: { session: { user: { id: 'demo-dealer-id', email: 'demo@dealer.com' } } }, error: null }),
      signInWithPassword: async () => ({ data: { user: { id: 'demo-dealer-id', email: 'demo@dealer.com' } }, error: null }),
      signUp: async () => ({ data: { user: { id: 'demo-dealer-id', email: 'demo@dealer.com' } }, error: null }),
      signOut: async () => ({ error: null }),
      resetPasswordForEmail: async () => ({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } }, error: null }),
    },
    
    // Storage with mock support
    storage: {
      ...supabaseClient.storage,
      from: (bucket: string) => ({
        upload: async () => ({ data: { path: 'mock-file-path' }, error: null }),
        getPublicUrl: (path: string) => ({ data: { publicUrl: `https://demo-storage.example.com/${path}` } }),
      }),
    },
    
    // Modified from method to handle mock data
    from: (table: string) => {
      const originalFrom = supabaseClient.from(table);
      
      // Handle specific tables with mock data
      if (table === 'dealers') {
        return {
          ...originalFrom,
          select: () => ({
            eq: () => ({
              single: async () => ({ data: mockDealer, error: null }),
            }),
          }),
          update: async (updates: any) => ({ data: { ...mockDealer, ...updates }, error: null }),
          insert: async () => ({ data: mockDealer, error: null }),
        };
      }
      
      if (table === 'vehicles') {
        return {
          ...originalFrom,
          select: (columns = '*') => {
            const mockSelectQuery = {
              eq: (field: string, value: string) => {
                const mockEqQuery = {
                  order: (column: string, options: any = {}) => {
                    let filteredVehicles = mockVehicles;
                    if (field === 'dealer_id') {
                      filteredVehicles = mockVehicles.filter(v => v.dealer_id === value);
                    } else if (field === 'id') {
                      filteredVehicles = mockVehicles.filter(v => v.id === value);
                    } else if (field === 'status') {
                      filteredVehicles = mockVehicles.filter(v => v.status === value);
                    }
                    return { data: filteredVehicles, error: null };
                  },
                  single: async () => {
                    const vehicle = mockVehicles.find(v => {
                      if (field === 'id') return v.id === value;
                      if (field === 'dealer_id') return v.dealer_id === value;
                      return false;
                    });
                    return { data: vehicle || null, error: vehicle ? null : { message: 'Vehicle not found' } };
                  }
                };
                return mockEqQuery;
              },
              order: (column: string, options: any = {}) => {
                return { data: mockVehicles, error: null };
              }
            };
            return mockSelectQuery;
          },
          update: async (updates: any) => {
            return { data: null, error: null };
          },
          insert: async (vehicleData: any) => {
            const generateId = () => Math.random().toString(36).substring(2, 15);
            const newVehicle = {
              id: generateId(),
              created_at: new Date().toISOString(),
              ...vehicleData
            };
            // Add the vehicle to our mock data
            mockVehicles.push(newVehicle as any);
            return { data: [newVehicle], error: null };
          },
          delete: async () => {
            return { data: null, error: null };
          },
        };
      }
      
      if (table === 'qr_codes') {
        return {
          ...originalFrom,
          select: (columns = '*') => {
            const mockSelectQuery = {
              eq: (field: string, value: string) => {
                const mockEqQuery = {
                  single: async () => {
                    const qrCode = mockQRCodes.find(qr => {
                      if (field === 'id') return qr.id === value;
                      if (field === 'vehicle_id') return qr.vehicle_id === value;
                      return false;
                    });
                    return { data: qrCode || null, error: qrCode ? null : { message: 'QR code not found' } };
                  }
                };
                return mockEqQuery;
              },
              order: (column: string, options: any = {}) => {
                return { data: mockQRCodes, error: null };
              }
            };
            return mockSelectQuery;
          },
          insert: async (qrCodeData: any) => {
            const generateId = () => Math.random().toString(36).substring(2, 15);
            const newQRCode = {
              id: generateId(),
              created_at: new Date().toISOString(),
              ...qrCodeData,
              scan_count: 0
            };
            mockQRCodes.push(newQRCode as any);
            return { data: null, error: null };
          },
        };
      }
      
      // Handle test drive requests with mock data
      if (table === 'test_drive_requests') {
        return {
          ...originalFrom,
          select: (columns = '*') => {
            const mockSelect = {
              eq: (field: string, value: string) => {
                return {
                  single: async () => {
                    const testDrive = mockTestDriveRequests.find(td => td[field] === value);
                    return { data: testDrive || null, error: testDrive ? null : { message: 'Test drive not found' } };
                  }
                };
              },
              order: (column: string, options: any = {}) => {
                // Use custom mock data when in demo mode
                const testDrivesFromCustomMock = mockTestDrivesCustom.map(td => {
                  return {
                    id: td.id,
                    created_at: new Date().toISOString(),
                    vehicle_id: "mock-vehicle-id",
                    consumer_id: "mock-consumer-id",
                    date: td.date_time.date,
                    time: td.date_time.time,
                    status: td.status,
                    consumer: {
                      name: td.customer.name,
                      email: td.customer.email,
                      phone: td.customer.phone
                    },
                    vehicle: {
                      make: td.vehicle.make,
                      model: td.vehicle.model,
                      year: td.vehicle.year,
                      trim: td.vehicle.trim,
                      stock_number: "MOCK" + Math.floor(Math.random() * 10000),
                      vin: "MOCKVN" + Math.floor(Math.random() * 1000000)
                    }
                  };
                });
                return { data: testDrivesFromCustomMock, error: null };
              }
            };
            return mockSelect;
          },
          update: async (updates: any) => {
            return { data: null, error: null };
          }
        };
      }
      
      // Handle reservations with mock data
      if (table === 'reservations') {
        return {
          ...originalFrom,
          select: (columns = '*') => {
            const mockSelect = {
              eq: (field: string, value: string) => {
                return {
                  single: async () => {
                    const reservation = mockReservations.find(r => r[field] === value);
                    return { data: reservation || null, error: reservation ? null : { message: 'Reservation not found' } };
                  }
                };
              },
              order: (column: string, options: any = {}) => {
                // Use custom mock data when in demo mode
                const reservationsFromCustomMock = mockReservationsCustom.map(r => {
                  return {
                    id: r.id,
                    created_at: r.reservation_date.date, // Use the date directly as shown in UI
                    vehicle_id: "mock-vehicle-id",
                    consumer_id: "mock-consumer-id",
                    deposit_amount: parseInt(r.amount.replace('$', '')) || 500,
                    status: r.status,
                    has_trade_in: r.reservation_date.notes.includes('Trade-in'),
                    consumer: {
                      name: r.customer.name,
                      email: r.customer.email,
                      phone: r.customer.phone,
                      zip_code: '14216'
                    },
                    vehicle: {
                      make: r.vehicle.make,
                      model: r.vehicle.model,
                      year: r.vehicle.year,
                      trim: r.vehicle.trim,
                      price: 30000,
                      stock_number: "MOCK" + Math.floor(Math.random() * 10000),
                      vin: "MOCKVN" + Math.floor(Math.random() * 1000000)
                    }
                  };
                });
                return { data: reservationsFromCustomMock, error: null };
              }
            };
            return mockSelect;
          },
          update: async (updates: any) => {
            return { data: null, error: null };
          }
        };
      }
      
      // Handle analytics events with mock data
      if (table === 'analytics_events') {
        return {
          ...originalFrom,
          select: (columns = '*') => {
            return {
              gte: (field: string, value: string) => {
                // Filter analytics events by date if that's the field
                let filteredEvents = mockAnalyticsEvents;
                if (field === 'created_at') {
                  filteredEvents = mockAnalyticsEvents.filter(event => {
                    return new Date(event.created_at) >= new Date(value);
                  });
                }
                return { data: filteredEvents, error: null };
              }
            };
          }
        };
      }
      
      // For other tables, pass through to the original client
      return originalFrom;
    },
  } 
  : 
  // In normal mode, use the regular Supabase client
  supabaseClient;

// Add createClient to the mock interface for realtime subscriptions
if (DEMO_MODE) {
  supabase.channel = (channelName) => {
    return {
      on: (event, filter, callback) => {
        return {
          subscribe: () => {}
        };
      }
    };
  };
  
  supabase.removeChannel = () => {};
}

export default supabase;