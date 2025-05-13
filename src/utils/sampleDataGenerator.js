/**
 * Sample Data Generator for GhostLot
 * 
 * This utility provides functions for generating realistic sample data
 * for vehicles, dealers, consumers, and other entities in the GhostLot application.
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
  'default': ['Model', 'Custom', 'Deluxe', 'Premium', 'Sport', 'Limited']
};

// Sample colors
const exteriorColors = [
  'Midnight Black', 'Pearl White', 'Silver Sky', 'Magnetic Gray', 'Blueprint', 'Ruby Flare Pearl',
  'Celestial Silver', 'Supersonic Red', 'Cavalry Blue', 'Wind Chill Pearl', 'Lunar Rock'
];

const interiorColors = [
  'Black', 'Gray', 'Beige', 'Brown', 'Red', 'Tan', 'Black/Gray', 'Black/Red', 'Ivory'
];

// Sample features
const vehicleFeatures = [
  'Leather Seats', 'Sunroof', 'Navigation System', 'Premium Audio', 'Heated Seats',
  'Backup Camera', 'Bluetooth', 'Keyless Entry', 'Remote Start', 'Lane Departure Warning',
  'Blind Spot Monitoring', 'Adaptive Cruise Control', 'Apple CarPlay', 'Android Auto'
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

// Generator functions
const generateVehicle = () => {
  const make = getRandomElement(vehicleMakes);
  const models = vehicleModels[make] || vehicleModels.default;
  const model = getRandomElement(models);
  const year = getRandomInt(2018, 2024);
  
  const mileage = getRandomInt(0, 80000);
  const price = mileage === 0 ? 
    getRandomInt(25000, 60000) : // New car
    getRandomInt(15000, 40000);  // Used car
  
  const featureCount = getRandomInt(5, 15);
  const features = getRandomSubset(vehicleFeatures, featureCount);
  
  // Generate a sample VIN (not a real VIN format)
  const vin = `${makeFakeVin()}`;
  
  return {
    stock_number: `S${getRandomInt(10000, 99999)}`,
    vin,
    year,
    make,
    model,
    trim: getRandomElement(['S', 'SE', 'LE', 'XLE', 'Limited', 'Sport', 'XSE', 'Touring']),
    price,
    mileage,
    exterior_color: getRandomElement(exteriorColors),
    interior_color: getRandomElement(interiorColors),
    mpg: `${getRandomInt(20, 30)} City / ${getRandomInt(25, 40)} Hwy`,
    engine: getRandomElement(['2.0L 4-Cylinder', '2.5L 4-Cylinder', '3.5L V6', '5.0L V8', '2.0L Turbo', '3.0L Turbo']),
    transmission: getRandomElement(['6-Speed Automatic', '8-Speed Automatic', '10-Speed Automatic', 'CVT', '6-Speed Manual']),
    drivetrain: getRandomElement(['FWD', 'RWD', 'AWD', '4WD']),
    fuel_type: getRandomElement(['Gasoline', 'Diesel', 'Hybrid', 'Electric']),
    features,
    status: getRandomElement(['Active', 'Reserved', 'Sold'])
  };
};

// Helper function to create a fake VIN
const makeFakeVin = () => {
  const chars = 'ABCDEFGHJKLMNPRSTUVWXYZ123456789';
  let vin = '';
  for (let i = 0; i < 17; i++) {
    vin += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return vin;
};

// Export the generator functions
const SampleDataGenerator = {
  generateVehicle,
  utils: {
    getRandomInt,
    getRandomElement,
    getRandomSubset
  }
};

export default SampleDataGenerator;