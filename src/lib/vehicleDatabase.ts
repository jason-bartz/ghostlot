/**
 * Comprehensive database of vehicle makes and models for the trade-in calculator
 */

export type VehicleMakeModel = {
  make: string;
  models: string[];
  value: number; // Base value multiplier
};

export const vehicleDatabase: VehicleMakeModel[] = [
  {
    make: "Acura",
    models: [
      "ILX", "Integra", "Legend", "MDX", "NSX", "RDX", "RL", "RLX", 
      "RSX", "TL", "TLX", "TSX", "ZDX"
    ],
    value: 1.1
  },
  {
    make: "Alfa Romeo",
    models: [
      "4C", "8C", "Giulia", "Giulietta", "MiTo", "Stelvio"
    ],
    value: 1.0
  },
  {
    make: "Aston Martin",
    models: [
      "DB11", "DB9", "DBS", "DBX", "Rapide", "Valhalla", "Valkyrie", "Vantage", "Virage"
    ],
    value: 2.5
  },
  {
    make: "Audi",
    models: [
      "A1", "A3", "A4", "A5", "A6", "A7", "A8", "e-tron", "Q2", "Q3", "Q4", "Q5", 
      "Q7", "Q8", "R8", "RS3", "RS4", "RS5", "RS6", "RS7", "S3", "S4", "S5", 
      "S6", "S7", "S8", "TT", "TTS"
    ],
    value: 1.3
  },
  {
    make: "Bentley",
    models: [
      "Arnage", "Bentayga", "Continental", "Flying Spur", "Mulsanne"
    ],
    value: 2.4
  },
  {
    make: "BMW",
    models: [
      "1 Series", "2 Series", "3 Series", "4 Series", "5 Series", "6 Series", "7 Series", "8 Series",
      "i3", "i4", "i7", "i8", "iX", "M2", "M3", "M4", "M5", "M6", "M8", "X1", "X2", "X3", "X4", "X5", 
      "X6", "X7", "Z3", "Z4"
    ],
    value: 1.35
  },
  {
    make: "Buick",
    models: [
      "Cascada", "Enclave", "Encore", "Encore GX", "Envision", "LaCrosse", "Lucerne",
      "Regal", "Verano"
    ],
    value: 0.9
  },
  {
    make: "Cadillac",
    models: [
      "ATS", "CT4", "CT5", "CT6", "CTS", "DTS", "Escalade", "ELR", "Lyriq", "SRX", 
      "STS", "XT4", "XT5", "XT6", "XTS"
    ],
    value: 1.0
  },
  {
    make: "Chevrolet",
    models: [
      "Avalanche", "Aveo", "Blazer", "Bolt", "Camaro", "Captiva", "Cobalt", "Colorado",
      "Corvette", "Cruze", "Equinox", "Express", "Impala", "Malibu", "Silverado", "Sonic",
      "Spark", "Suburban", "Tahoe", "Trailblazer", "Traverse", "Trax", "Volt"
    ],
    value: 0.95
  },
  {
    make: "Chrysler",
    models: [
      "200", "300", "Aspen", "Crossfire", "Pacifica", "PT Cruiser", "Sebring", "Town & Country"
    ],
    value: 0.85
  },
  {
    make: "Dodge",
    models: [
      "Avenger", "Caliber", "Caravan", "Challenger", "Charger", "Dart", "Durango", "Grand Caravan",
      "Journey", "Magnum", "Neon", "Nitro", "Ram", "Viper"
    ],
    value: 0.9
  },
  {
    make: "Ferrari",
    models: [
      "296 GTB", "458", "488", "599", "812", "California", "F12", "F8", "FF", "GTC4Lusso",
      "LaFerrari", "Portofino", "Roma", "SF90"
    ],
    value: 3.0
  },
  {
    make: "Fiat",
    models: [
      "124 Spider", "500", "500L", "500X", "Panda", "Punto"
    ],
    value: 0.8
  },
  {
    make: "Ford",
    models: [
      "Bronco", "C-Max", "EcoSport", "Edge", "Escape", "Excursion", "Expedition", "Explorer",
      "F-150", "F-250", "F-350", "Fiesta", "Flex", "Focus", "Fusion", "GT", "Maverick", "Mustang",
      "Mustang Mach-E", "Ranger", "Taurus", "Transit", "Transit Connect"
    ],
    value: 1.0
  },
  {
    make: "Genesis",
    models: [
      "G70", "G80", "G90", "GV60", "GV70", "GV80"
    ],
    value: 1.1
  },
  {
    make: "GMC",
    models: [
      "Acadia", "Canyon", "Envoy", "Hummer EV", "Jimmy", "Savana", "Sierra", "Terrain", "Yukon"
    ],
    value: 1.0
  },
  {
    make: "Honda",
    models: [
      "Accord", "Civic", "Clarity", "CR-V", "CR-Z", "Crosstour", "Element", "Fit", "HR-V",
      "Insight", "Odyssey", "Passport", "Pilot", "Prelude", "Ridgeline", "S2000"
    ],
    value: 1.1
  },
  {
    make: "Hyundai",
    models: [
      "Accent", "Azera", "Elantra", "Entourage", "Equus", "Genesis", "Ioniq", "Ioniq 5",
      "Kona", "Nexo", "Palisade", "Santa Cruz", "Santa Fe", "Sonata", "Tucson", "Veloster", "Venue"
    ],
    value: 0.95
  },
  {
    make: "Infiniti",
    models: [
      "EX", "FX", "G", "J", "JX", "M", "Q40", "Q50", "Q60", "Q70", "QX30", "QX50", "QX55",
      "QX56", "QX60", "QX70", "QX80"
    ],
    value: 1.1
  },
  {
    make: "Jaguar",
    models: [
      "E-Pace", "F-Pace", "F-Type", "I-Pace", "S-Type", "XE", "XF", "XJ", "XK"
    ],
    value: 1.2
  },
  {
    make: "Jeep",
    models: [
      "Cherokee", "Commander", "Compass", "Gladiator", "Grand Cherokee", "Grand Wagoneer",
      "Liberty", "Patriot", "Renegade", "Wagoneer", "Wrangler"
    ],
    value: 1.1
  },
  {
    make: "Kia",
    models: [
      "Cadenza", "Carnival", "EV6", "Forte", "K5", "K900", "Niro", "Optima", "Rio", "Sedona",
      "Seltos", "Sorento", "Soul", "Sportage", "Stinger", "Telluride"
    ],
    value: 0.9
  },
  {
    make: "Lamborghini",
    models: [
      "Aventador", "Diablo", "Gallardo", "Huracán", "Murciélago", "Urus", "Veneno"
    ],
    value: 3.0
  },
  {
    make: "Land Rover",
    models: [
      "Defender", "Discovery", "Discovery Sport", "Freelander", "LR2", "LR3", "LR4",
      "Range Rover", "Range Rover Evoque", "Range Rover Sport", "Range Rover Velar"
    ],
    value: 1.3
  },
  {
    make: "Lexus",
    models: [
      "CT", "ES", "GS", "GX", "HS", "IS", "LC", "LFA", "LS", "LX", "NX", "RC", "RX", "SC", "UX"
    ],
    value: 1.2
  },
  {
    make: "Lincoln",
    models: [
      "Aviator", "Continental", "Corsair", "MKC", "MKS", "MKT", "MKX", "MKZ", "Nautilus",
      "Navigator", "Town Car", "Zephyr"
    ],
    value: 1.0
  },
  {
    make: "Lotus",
    models: [
      "Elise", "Emira", "Esprit", "Evija", "Evora", "Exige"
    ],
    value: 1.7
  },
  {
    make: "Maserati",
    models: [
      "Ghibli", "GranTurismo", "Grecale", "Levante", "MC20", "Quattroporte"
    ],
    value: 1.5
  },
  {
    make: "Mazda",
    models: [
      "2", "3", "5", "6", "CX-3", "CX-30", "CX-5", "CX-50", "CX-7", "CX-9", "CX-90", "MX-5 Miata",
      "MX-30", "RX-7", "RX-8", "Tribute"
    ],
    value: 1.0
  },
  {
    make: "McLaren",
    models: [
      "570S", "600LT", "650S", "720S", "765LT", "Artura", "GT", "P1", "Senna"
    ],
    value: 3.0
  },
  {
    make: "Mercedes-Benz",
    models: [
      "A-Class", "AMG GT", "B-Class", "C-Class", "CL-Class", "CLA", "CLS", "E-Class", "EQE",
      "EQS", "G-Class", "GL-Class", "GLA", "GLB", "GLC", "GLE", "GLK", "GLS", "ML-Class",
      "R-Class", "S-Class", "SL-Class", "SLC", "SLK", "SLS AMG", "Sprinter"
    ],
    value: 1.4
  },
  {
    make: "Mini",
    models: [
      "Clubman", "Convertible", "Cooper", "Countryman", "Coupe", "Hardtop", "Paceman", "Roadster"
    ],
    value: 1.0
  },
  {
    make: "Mitsubishi",
    models: [
      "3000GT", "Eclipse", "Eclipse Cross", "Endeavor", "Galant", "i-MiEV", "Lancer",
      "Mirage", "Montero", "Outlander", "Outlander Sport", "Raider"
    ],
    value: 0.8
  },
  {
    make: "Nissan",
    models: [
      "350Z", "370Z", "Altima", "Armada", "Cube", "Frontier", "GT-R", "Juke", "Kicks",
      "Leaf", "Maxima", "Murano", "NV", "Pathfinder", "Quest", "Rogue", "Sentra", "Titan",
      "Versa", "Xterra", "Z"
    ],
    value: 0.95
  },
  {
    make: "Pagani",
    models: [
      "Huayra", "Zonda"
    ],
    value: 4.0
  },
  {
    make: "Porsche",
    models: [
      "718 Boxster", "718 Cayman", "911", "918", "Boxster", "Cayenne", "Cayman", "Macan",
      "Panamera", "Taycan"
    ],
    value: 1.8
  },
  {
    make: "Ram",
    models: [
      "1500", "2500", "3500", "ProMaster", "ProMaster City"
    ],
    value: 1.0
  },
  {
    make: "Rivian",
    models: [
      "R1S", "R1T"
    ],
    value: 1.5
  },
  {
    make: "Rolls-Royce",
    models: [
      "Cullinan", "Dawn", "Ghost", "Phantom", "Wraith"
    ],
    value: 3.5
  },
  {
    make: "Subaru",
    models: [
      "Ascent", "BRZ", "Crosstrek", "Forester", "Impreza", "Legacy", "Outback", "Solterra",
      "Tribeca", "WRX", "XV"
    ],
    value: 1.05
  },
  {
    make: "Tesla",
    models: [
      "Cybertruck", "Model 3", "Model S", "Model X", "Model Y", "Roadster"
    ],
    value: 1.4
  },
  {
    make: "Toyota",
    models: [
      "4Runner", "86", "Avalon", "bZ4X", "C-HR", "Camry", "Celica", "Corolla", "Crown",
      "FJ Cruiser", "GR86", "Highlander", "Land Cruiser", "Matrix", "Mirai", "Prius",
      "RAV4", "Sequoia", "Sienna", "Supra", "Tacoma", "Tundra", "Venza", "Yaris"
    ],
    value: 1.05
  },
  {
    make: "Volkswagen",
    models: [
      "Arteon", "Atlas", "Atlas Cross Sport", "Beetle", "CC", "e-Golf", "Eos", "Golf",
      "GTI", "ID.4", "Jetta", "Passat", "Phaeton", "Rabbit", "Routan", "Taos", "Tiguan",
      "Touareg"
    ],
    value: 1.0
  },
  {
    make: "Volvo",
    models: [
      "C30", "C40", "C70", "S40", "S60", "S80", "S90", "V40", "V50", "V60", "V70", "V90",
      "XC40", "XC60", "XC70", "XC90"
    ],
    value: 1.1
  }
];

/**
 * Lookup table for model specific adjustments
 * Format: "Make:Model" => value multiplier
 */
export const specialModels: Record<string, number> = {
  // High-value special models
  "Toyota:Supra": 1.4,
  "Toyota:Land Cruiser": 1.3,
  "Honda:S2000": 1.4,
  "Chevrolet:Corvette": 1.4,
  "Ford:GT": 2.5,
  "Ford:Mustang": 1.2,
  "Ford:Bronco": 1.2,
  "Dodge:Viper": 1.7,
  "Dodge:Challenger": 1.2,
  "Dodge:Charger": 1.2,
  "Nissan:GT-R": 1.6,
  "Nissan:370Z": 1.2,
  "Subaru:WRX": 1.2,
  "Volkswagen:GTI": 1.2,
  "BMW:M3": 1.5,
  "BMW:M5": 1.5,
  "Porsche:911": 2.0,
  "Mercedes-Benz:G-Class": 1.7,
  "Mercedes-Benz:AMG GT": 1.9,
  "Jeep:Wrangler": 1.3,
  "Toyota:Tacoma": 1.2,
  "Tesla:Model S": 1.5,
  "Tesla:Roadster": 1.8,
  "Subaru:BRZ": 1.2
};

/**
 * Helper function to get all makes and models
 */
export function getAllMakes(): string[] {
  return vehicleDatabase.map(entry => entry.make);
}

/**
 * Get all models for a specific make
 */
export function getModelsByMake(make: string): string[] {
  const entry = vehicleDatabase.find(
    entry => entry.make.toLowerCase() === make.toLowerCase()
  );
  return entry ? entry.models : [];
}

/**
 * Get value multiplier for a make/model combination
 * This can be used to estimate vehicle values
 */
export function getValueMultiplier(make: string, model: string): number {
  // Look for special model first
  const specialKey = `${make}:${model}`;
  if (specialModels[specialKey]) {
    return specialModels[specialKey];
  }
  
  // Fall back to make-level multiplier
  const entry = vehicleDatabase.find(
    entry => entry.make.toLowerCase() === make.toLowerCase()
  );
  return entry ? entry.value : 1.0; // Default to 1.0 if make not found
}