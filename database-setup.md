# Database Setup Guide for GhostLot

This guide provides instructions for setting up the required database schema in Supabase for the GhostLot application.

## Schema Setup

The GhostLot application requires several tables in your Supabase project. You can set these up using the Supabase web interface or by running SQL scripts.

### Option 1: Using the Supabase Web Interface

1. Log in to your Supabase project dashboard
2. Navigate to the "Table Editor" section
3. Create each table according to the schema described below

### Option 2: Using SQL Scripts

1. Log in to your Supabase project dashboard
2. Navigate to the "SQL Editor" section
3. Create a new query and paste the SQL script below
4. Run the script to create all required tables

```sql
-- Create tables for GhostLot

-- Dealers table
CREATE TABLE public.dealers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  location TEXT NOT NULL,
  website TEXT,
  logo_url TEXT,
  primary_color TEXT,
  text_color TEXT,
  hours JSONB DEFAULT '{"monday":"9:00 AM - 6:00 PM","tuesday":"9:00 AM - 6:00 PM","wednesday":"9:00 AM - 6:00 PM","thursday":"9:00 AM - 6:00 PM","friday":"9:00 AM - 6:00 PM","saturday":"9:00 AM - 5:00 PM","sunday":"Closed"}',
  social_media JSONB DEFAULT '{"facebook":null,"instagram":null,"twitter":null,"youtube":null}'
);

-- Consumers table
CREATE TABLE public.consumers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  zip_code TEXT
);

-- Vehicles table
CREATE TABLE public.vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  stock_number TEXT NOT NULL,
  vin TEXT NOT NULL,
  dealer_id UUID NOT NULL REFERENCES public.dealers(id),
  year INTEGER NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  trim TEXT NOT NULL,
  price NUMERIC NOT NULL,
  mileage NUMERIC NOT NULL,
  exterior_color TEXT NOT NULL,
  interior_color TEXT NOT NULL,
  mpg TEXT NOT NULL,
  engine TEXT NOT NULL,
  transmission TEXT NOT NULL,
  drivetrain TEXT NOT NULL,
  fuel_type TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Reserved', 'Sold'))
);

-- QR Codes table
CREATE TABLE public.qr_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  vehicle_id UUID NOT NULL REFERENCES public.vehicles(id),
  url TEXT NOT NULL,
  scan_count INTEGER DEFAULT 0
);

-- Test Drive Requests table
CREATE TABLE public.test_drive_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  vehicle_id UUID NOT NULL REFERENCES public.vehicles(id),
  consumer_id UUID NOT NULL REFERENCES public.consumers(id),
  date DATE NOT NULL,
  time TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Confirmed', 'Completed', 'Cancelled'))
);

-- Reservations table
CREATE TABLE public.reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  vehicle_id UUID NOT NULL REFERENCES public.vehicles(id),
  consumer_id UUID NOT NULL REFERENCES public.consumers(id),
  deposit_amount NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Confirmed', 'Completed', 'Cancelled')),
  has_trade_in BOOLEAN DEFAULT false
);

-- Saved Vehicles table
CREATE TABLE public.saved_vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  vehicle_id UUID NOT NULL REFERENCES public.vehicles(id),
  consumer_id UUID NOT NULL REFERENCES public.consumers(id)
);

-- Analytics Events table
CREATE TABLE public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  event_type TEXT NOT NULL CHECK (event_type IN ('scan', 'view', 'test_drive', 'save', 'reserve', 'share')),
  vehicle_id UUID NOT NULL REFERENCES public.vehicles(id),
  consumer_id UUID REFERENCES public.consumers(id),
  source TEXT
);

-- Create Row Level Security (RLS) policies
ALTER TABLE public.dealers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consumers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qr_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_drive_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Create policies (examples, customize based on your needs)
CREATE POLICY "Public read access for dealers" ON public.dealers
  FOR SELECT USING (true);

CREATE POLICY "Public read access for vehicles" ON public.vehicles
  FOR SELECT USING (true);

-- You'll likely want to add more specific policies for write operations
-- based on your application's authentication and authorization needs
```

## Test Data Generation

GhostLot includes a test data generator that can populate your database with sample data for development and testing purposes. To use this feature:

1. Start the GhostLot application
2. Navigate to `/admin/test-data` in your browser
3. Use the admin interface to generate test data with various options

Note: The test data generator is intended for development environments only and should not be used in production.

## Schema Reference

For detailed information about the database schema, refer to the TypeScript type definitions in `src/lib/supabase.ts`.

## Troubleshooting

If you encounter issues with the database setup:

1. Check that your Supabase project is on the latest version
2. Verify that your `.env.local` file contains the correct credentials
3. Make sure Row Level Security (RLS) policies are correctly configured
4. Check for any error messages in the browser console or server logs