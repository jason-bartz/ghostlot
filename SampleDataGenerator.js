/**
 * Sample Data Generator for GhostLot
 * 
 * This utility file provides functions for generating realistic sample data
 * for the GhostLot demo application, including vehicles, dealer profiles,
 * test drives, reservations, and analytics data.
 */

// Sample vehicle makes and models
const vehicleMakes = [
  'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'Mazda', 'Subaru', 
  'Hyundai', 'Kia', 'BMW', 'Mercedes-Benz', 'Audi', 'Lexus', 'Acura',
  'Volkswagen', 'Jeep', 'Dodge', 'Ram', 'Tesla', 'Cadillac'
];

const vehicleModels = {
  'Toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma', '4Runner', 'Sienna', 'Prius'],
  'Honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey', 'HR-V', 'Ridgeline'],
  'Ford': ['F-150', 'Escape', 'Explorer', 'Mustang', 'Edge', 'Ranger', 'Bronco', 'Maverick'],
  'Chevrolet': ['Silverado', 'Equinox', 'Tahoe', 'Traverse', 'Malibu', 'Blazer', 'Colorado'],
  'Nissan': ['Altima', 'Rogue', 'Sentra', 'Pathfinder', 'Frontier', 'Murano', 'Armada'],
  'Mazda': ['CX-5', 'CX-9', 'Mazda3', 'Mazda6', 'CX-30', 'MX-5 Miata'],
  'Subaru': ['Outback', 'Forester', 'Crosstrek', 'Impreza', 'Ascent', 'Legacy', 'WRX'],
  'Hyundai': ['Tucson', 'Santa Fe', 'Elantra', 'Sonata', 'Kona', 'Palisade', 'Venue'],
  'Kia': ['Sportage', 'Sorento', 'Forte', 'Telluride', 'Soul', 'Seltos', 'K5'],
  'BMW': ['3 Series', '5 Series', 'X3', 'X5', '7 Series', 'X1', 'X7'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC', 'GLE', 'S-Class', 'GLA', 'GLS'],
  'Audi': ['A4', 'Q5', 'A6', 'Q7', 'Q3', 'A3', 'e-tron'],
  'Lexus': ['RX', 'ES', 'NX', 'IS', 'GX', 'UX', 'LX'],
  'Acura': ['MDX', 'RDX', 'TLX', 'ILX', 'NSX', 'RLX'],
  'Volkswagen': ['Tiguan', 'Jetta', 'Atlas', 'Passat', 'Golf', 'Taos', 'ID.4'],
  'Jeep': ['Grand Cherokee', 'Wrangler', 'Cherokee', 'Compass', 'Gladiator', 'Renegade'],
  'Dodge': ['Challenger', 'Charger', 'Durango', 'Journey'],
  'Ram': ['1500', '2500', '3500', 'ProMaster', 'ProMaster City'],
  'Tesla': ['Model 3', 'Model Y', 'Model S', 'Model X', 'Cybertruck'],
  'Cadillac': ['Escalade', 'XT5', 'CT5', 'XT4', 'CT4']
};

// Vehicle trim levels by make
const vehicleTrims = {
  'Toyota': ['L', 'LE', 'XLE', 'SE', 'XSE', 'Limited', 'Platinum', 'TRD', 'Nightshade'],
  'Honda': ['LX', 'EX', 'EX-L', 'Sport', 'Touring', 'Elite', 'Black Edition'],
  'Ford': ['XL', 'XLT', 'Lariat', 'King Ranch', 'Platinum', 'Limited', 'Tremor', 'Raptor', 'ST'],
  'Chevrolet': ['LS', 'LT', 'LTZ', 'RS', 'Premier', 'High Country', 'Z71', 'ZR2'],
  'default': ['Base', 'Sport', 'Premium', 'Limited', 'Touring', 'Elite', 'Signature']
};

// Sample colors
const exteriorColors = [
  'Midnight Black', 'Pearl White', 'Silver Sky', 'Magnetic Gray', 'Blueprint', 'Ruby Flare Pearl', 
  'Celestial Silver', 'Supersonic Red', 'Cavalry Blue', 'Wind Chill Pearl', 'Lunar Rock',
  'Cosmic Blue', 'Granite Crystal', 'Brilliant Black', 'Velvet Red', 'Diamond Black', 'Bright White',
  'Glacier White', 'Deep Ocean Blue', 'Jet Black', 'Summit White', 'Red Hot', 'Satin Steel Gray'
];

const interiorColors = [
  'Black', 'Gray', 'Beige', 'Brown', 'Red', 'Tan', 'Black/Gray', 'Black/Red', 
  'Ivory', 'Charcoal', 'Saddle Brown', 'Mocha', 'Dune', 'Jet Black'
];

// Sample features
const vehicleFeatures = [
  'Leather Seats', 'Sunroof', 'Navigation System', 'Premium Audio', 'Heated Seats', 
  'Backup Camera', 'Bluetooth', 'Keyless Entry', 'Remote Start', 'Lane Departure Warning',
  'Blind Spot Monitoring', 'Adaptive Cruise Control', 'Apple CarPlay', 'Android Auto',
  'Wireless Charging', 'Panoramic Sunroof', 'Premium Wheels', 'LED Headlights',
  '360-Degree Camera', 'Heated Steering Wheel', 'Ventilated Seats', 'Third Row Seating',
  'Trailer Hitch', 'Roof Rack', 'Power Liftgate', 'Off-Road Package', 'Sport Package',
  'Premium Package', 'Technology Package', 'Driver Assistance Package', 'Appearance Package'
];

// Sample dealer names
const dealershipNames = [
  'Citywide Auto', 'Metro Motors', 'Southside Vehicles', 'Capital City Cars',
  'Bayside Auto Group', 'Riverside Motors', 'Mountain State Auto', 'Pacific Auto Mall',
  'Eastside Automotive', 'Central Valley Cars', 'Northtown Motors', 'Downtown Auto Exchange',
  'Westside Wheels', 'Harbor City Autos', 'Golden State Motors', 'Fair Deal Auto',
  'Uptown Automotive', 'Premiere Motors', 'Liberty Auto Sales', 'Hometown Cars & Trucks',
  'Continental Auto Group', 'Presidential Motors', 'Five Star Auto Sales', 'Elite Motors'
];

// Sample locations
const locations = [
  { city: 'Phoenix', state: 'AZ' },
  { city: 'Los Angeles', state: 'CA' },
  { city: 'San Diego', state: 'CA' },
  { city: 'San Francisco', state: 'CA' },
  { city: 'Denver', state: 'CO' },
  { city: 'Miami', state: 'FL' },
  { city: 'Orlando', state: 'FL' },
  { city: 'Atlanta', state: 'GA' },
  { city: 'Chicago', state: 'IL' },
  { city: 'Boston', state: 'MA' },
  { city: 'Detroit', state: 'MI' },
  { city: 'Minneapolis', state: 'MN' },
  { city: 'Las Vegas', state: 'NV' },
  { city: 'New York', state: 'NY' },
  { city: 'Charlotte', state: 'NC' },
  { city: 'Cleveland', state: 'OH' },
  { city: 'Portland', state: 'OR' },
  { city: 'Philadelphia', state: 'PA' },
  { city: 'Austin', state: 'TX' },
  { city: 'Dallas', state: 'TX' },
  { city: 'Houston', state: 'TX' },
  { city: 'San Antonio', state: 'TX' },
  { city: 'Seattle', state: 'WA' }
];

// Sample consumer names
const firstNames = [
  'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles',
  'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen',
  'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua',
  'Lisa', 'Nancy', 'Betty', 'Margaret', 'Sandra', 'Ashley', 'Kimberly', 'Emily', 'Donna', 'Michelle'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
  'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green'
];

// Utility functions
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomSubset = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const getRandomDate = (start, end) => {
  const startDate = start || new Date(Date.now() - 365 * 24 * 60 * 60 * 1000); // Default to 1 year ago
  const endDate = end || new Date();
  return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
};

const getRandomPhoneNumber = () => {
  return `(${getRandomInt(200, 999)}) ${getRandomInt(200, 999)}-${getRandomInt(1000, 9999)}`;
};

const getRandomEmail = (firstName, lastName) => {
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'icloud.com', 'hotmail.com'];
  const domain = getRandomElement(domains);
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
};

const getRandomPrice = (min, max) => {
  return Math.floor(getRandomInt(min, max) / 100) * 100; // Round to nearest 100
};

// Generator functions
const generateVehicle = () => {
  const make = getRandomElement(vehicleMakes);
  const model = getRandomElement(vehicleModels[make]);
  const year = getRandomInt(2018, 2024);
  
  const trimArray = vehicleTrims[make] || vehicleTrims.default;
  const trim = getRandomElement(trimArray);
  
  const exteriorColor = getRandomElement(exteriorColors);
  const interiorColor = getRandomElement(interiorColors);
  
  const mileage = getRandomInt(0, 80000);
  const price = mileage === 0 ? 
    getRandomPrice(25000, 60000) : // New car
    getRandomPrice(15000, 40000);  // Used car
  
  const featureCount = getRandomInt(5, 15);
  const features = getRandomSubset(vehicleFeatures, featureCount);
  
  // Fake VIN - not a real VIN format but sufficient for demo
  const vinLetters = 'ABCDEFGHJKLMNPRSTUVWXYZ';
  const vinDigits = '0123456789';
  let vin = '';
  for (let i = 0; i < 17; i++) {
    if (i === 0 || i === 1 || i === 2 || i === 10) {
      vin += getRandomElement(vinLetters.split(''));
    } else {
      vin += getRandomElement(vinDigits.split(''));
    }
  }
  
  // Generate image URLs - in a real app these would point to actual images
  const imageCount = getRandomInt(4, 8);
  const images = Array(imageCount).fill(0).map((_, i) => {
    return {
      url: `/api/placeholder/800/600?text=${make}+${model}&seed=${i}`,
      isPrimary: i === 0
    };
  });
  
  const status = Math.random() > 0.15 ? 'available' : 
                (Math.random() > 0.5 ? 'reserved' : 'sold');
  
  return {
    id: `VEH-${getRandomInt(10000, 99999)}`,
    make,
    model,
    year,
    trim,
    exteriorColor,
    interiorColor,
    vin,
    mileage,
    price,
    features,
    description: `${year} ${make} ${model} ${trim} in beautiful ${exteriorColor} with ${interiorColor} interior. This vehicle has only ${mileage.toLocaleString()} miles and comes with ${features.slice(0, 3).join(', ')} and many more features.`,
    images,
    status,
    createdAt: getRandomDate()
  };
};

const generateDealer = () => {
  const name = getRandomElement(dealershipNames);
  const location = getRandomElement(locations);
  
  // Generate primary and text colors that work well together
  const primaryColors = ['#4F46E5', '#7C3AED', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#6366F1'];
  const primaryColor = getRandomElement(primaryColors);
  
  return {
    id: `DEA-${getRandomInt(10000, 99999)}`,
    name,
    location: `${location.city}, ${location.state}`,
    address: `${getRandomInt(100, 9999)} ${getRandomElement(['Main', 'Oak', 'Maple', 'Washington', 'Broadway', 'Park', 'Lake', 'River', 'Sunset', 'Highland'])} ${getRandomElement(['St', 'Ave', 'Blvd', 'Dr', 'Rd', 'Ln'])}`,
    phone: getRandomPhoneNumber(),
    email: `info@${name.toLowerCase().replace(/[\s&']/g, '')}autos.com`,
    website: `https://www.${name.toLowerCase().replace(/[\s&']/g, '')}autos.com`,
    logo: `/api/placeholder/300/100?text=${name}&color=FFFFFF&background=${primaryColor.substring(1)}`,
    branding: {
      primaryColor,
      textColor: '#FFFFFF',
      accentColor: '#F3F4F6',
    },
    businessHours: {
      monday: { open: '9:00 AM', close: '8:00 PM', isClosed: false },
      tuesday: { open: '9:00 AM', close: '8:00 PM', isClosed: false },
      wednesday: { open: '9:00 AM', close: '8:00 PM', isClosed: false },
      thursday: { open: '9:00 AM', close: '8:00 PM', isClosed: false },
      friday: { open: '9:00 AM', close: '8:00 PM', isClosed: false },
      saturday: { open: '10:00 AM', close: '6:00 PM', isClosed: false },
      sunday: { open: '11:00 AM', close: '5:00 PM', isClosed: Math.random() > 0.5 }
    },
    socialMedia: {
      facebook: `https://facebook.com/${name.toLowerCase().replace(/[\s&']/g, '')}`,
      instagram: `https://instagram.com/${name.toLowerCase().replace(/[\s&']/g, '')}`
    },
    createdAt: getRandomDate(new Date(Date.now() - 3 * 365 * 24 * 60 * 60 * 1000))
  };
};

const generateConsumer = () => {
  const firstName = getRandomElement(firstNames);
  const lastName = getRandomElement(lastNames);
  
  return {
    id: `CON-${getRandomInt(10000, 99999)}`,
    firstName,
    lastName,
    email: getRandomEmail(firstName, lastName),
    phone: getRandomPhoneNumber(),
    createdAt: getRandomDate(new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)) // Last 6 months
  };
};

const generateTestDrive = (vehicle, consumer) => {
  // Create a date in the future for the test drive
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + getRandomInt(1, 14));
  
  // Generate a time between 10am and 6pm
  const hour = getRandomInt(10, 18);
  const minute = getRandomInt(0, 3) * 15; // 0, 15, 30, or 45
  futureDate.setHours(hour, minute, 0, 0);
  
  const testDriveStatuses = ['scheduled', 'completed', 'cancelled', 'no_show'];
  const testDriveStatus = getRandomElement(testDriveStatuses);
  
  // If the status is "completed" or "cancelled", set a date in the past
  let actualDate = new Date(futureDate);
  if (testDriveStatus === 'completed' || testDriveStatus === 'cancelled' || testDriveStatus === 'no_show') {
    actualDate = getRandomDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date());
  }
  
  return {
    id: `TD-${getRandomInt(10000, 99999)}`,
    vehicleId: vehicle.id,
    consumerId: consumer.id,
    scheduledDate: futureDate,
    status: testDriveStatus,
    notes: testDriveStatus === 'cancelled' ? 
      getRandomElement(['Customer called to reschedule', 'Weather conditions', 'Vehicle unavailable', 'Personal emergency']) : 
      '',
    createdAt: getRandomDate(new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), new Date())
  };
};

const generateReservation = (vehicle, consumer) => {
  const reservationDate = getRandomDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date());
  
  const depositAmount = getRandomElement([500, 1000, 1500, 2000]);
  
  const reservationStatuses = ['pending', 'confirmed', 'completed', 'cancelled', 'refunded'];
  const status = getRandomElement(reservationStatuses);
  
  return {
    id: `RES-${getRandomInt(10000, 99999)}`,
    vehicleId: vehicle.id,
    consumerId: consumer.id,
    depositAmount,
    reservationDate,
    expirationDate: new Date(reservationDate.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from reservation
    status,
    paymentMethod: getRandomElement(['credit_card', 'debit_card', 'paypal', 'bank_transfer']),
    createdAt: reservationDate
  };
};

const generateQRCode = (vehicle, dealer) => {
  return {
    id: `QR-${getRandomInt(10000, 99999)}`,
    vehicleId: vehicle.id,
    dealerId: dealer.id,
    url: `/vehicle/${vehicle.id}`,
    scanCount: getRandomInt(0, 150),
    isActive: Math.random() > 0.1, // 90% active
    createdAt: vehicle.createdAt
  };
};

const generateAnalyticsEntry = (qrCode, type) => {
  const date = getRandomDate(qrCode.createdAt, new Date());
  
  // Default analytics entry
  let entry = {
    id: `ANL-${getRandomInt(10000, 99999)}`,
    qrCodeId: qrCode.id,
    vehicleId: qrCode.vehicleId,
    timestamp: date,
    ipAddress: `${getRandomInt(1, 255)}.${getRandomInt(0, 255)}.${getRandomInt(0, 255)}.${getRandomInt(0, 255)}`,
    userAgent: getRandomElement([
      'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
      'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.50 Mobile Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15'
    ]),
    city: getRandomElement(locations).city,
    state: getRandomElement(locations).state,
    type: type || 'qr_scan', // Default type
    createdAt: date
  };
  
  // Add additional fields based on type
  if (type === 'page_view') {
    entry.page = getRandomElement([
      '/vehicle/details',
      '/vehicle/specs',
      '/vehicle/reviews',
      '/vehicle/payment-calculator'
    ]);
    entry.timeOnPage = getRandomInt(10, 300); // 10 to 300 seconds
  } else if (type === 'button_click') {
    entry.buttonType = getRandomElement([
      'schedule_test_drive',
      'calculate_payment',
      'view_specs',
      'save_vehicle',
      'contact_dealer',
      'share_vehicle'
    ]);
  } else if (type === 'form_submission') {
    entry.formType = getRandomElement([
      'test_drive_request', 
      'contact_form',
      'payment_calculator',
      'trade_in_value'
    ]);
    entry.isComplete = Math.random() > 0.2; // 80% complete forms
  }
  
  return entry;
};

// Export all the generator functions
const SampleDataGenerator = {
  vehicle: generateVehicle,
  dealer: generateDealer,
  consumer: generateConsumer,
  testDrive: generateTestDrive,
  reservation: generateReservation,
  qrCode: generateQRCode,
  analyticsEntry: generateAnalyticsEntry,
  
  // Additional utilities for batch generation
  generateBatch: {
    vehicles: (count) => Array(count).fill(0).map(() => generateVehicle()),
    consumers: (count) => Array(count).fill(0).map(() => generateConsumer()),
    dealers: (count) => Array(count).fill(0).map(() => generateDealer())
  },
  
  // Utility functions that might be useful
  utils: {
    getRandomInt,
    getRandomElement,
    getRandomSubset,
    getRandomDate,
    getRandomPhoneNumber,
    getRandomEmail,
    getRandomPrice
  }
};

export default SampleDataGenerator;