"use client";

import React, { useState } from 'react';
import { Heart, Calendar, ArrowUpRight, User, LogOut } from 'lucide-react';

export default function ConsumerViewDemo() {
  // State variables
  const [activeSlide, setActiveSlide] = useState(0);
  const [savedToProfile, setSavedToProfile] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [loginName, setLoginName] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPhone, setLoginPhone] = useState('');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showReservationFlow, setShowReservationFlow] = useState(false);
  const [reservationStep, setReservationStep] = useState(1);
  const [showProfileView, setShowProfileView] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState('saved');
  const [reservationData, setReservationData] = useState({
    acknowledge1: false,
    acknowledge2: false,
    hasTrade: false,
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    zipCode: '14207',
    agreeToRules: false,
    cardNumber: '4242 4242 4242 4242',
    expiry: '12/25',
    cvc: '123'
  });
  
  // Mock vehicle data
  const vehicle = {
    id: 'v1',
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    trim: 'XLE',
    price: 32970,
    mileage: 5,
    vin: '1HGCM82633A123456',
    exterior_color: 'Celestial Silver Metallic',
    interior_color: 'Black Leather',
    mpg: '28 City / 39 Hwy',
    engine: '2.5L 4-Cylinder',
    transmission: '8-Speed Automatic',
    drivetrain: 'FWD',
    fuel_type: 'Gasoline',
    features: [
      'Leather Seats',
      'Heated Front Seats',
      'Panoramic Moonroof',
      'JBL Premium Audio System',
      'Apple CarPlay & Android Auto',
      'Toyota Safety Sense 2.5+',
      'Blind Spot Monitor',
      'Wireless Charging',
      'Dual-Zone Climate Control',
      'LED Headlights'
    ]
  };
  
  // Refraction Motors dealer info
  const dealerInfo = {
    name: 'Refraction Motors',
    location: '155 Chandler Street, Buffalo, New York 14207',
    phone: '(716) 555-0123',
    email: 'jason@shoprefraction.com',
    website: 'https://shoprefraction.com',
    logo_url: '/refractionmotors.png',
    facebook_url: 'https://www.facebook.com/RefractionMotorcar',
    primary_color: '#6D28D9', // Purple color
    text_color: '#FFFFFF'
  };
  
  // Mock saved vehicles
  const savedVehicles = [
    {
      id: 'sv1',
      make: 'Toyota',
      model: 'Camry',
      year: 2023,
      trim: 'XLE',
      price: 32970,
      imageUrl: '/demo-vehicle/camry1.webp',
      dealerName: 'Refraction Motors',
      location: 'Buffalo, NY'
    },
    {
      id: 'sv2',
      make: 'Honda',
      model: 'Accord',
      year: 2023,
      trim: 'Touring',
      price: 38050,
      imageUrl: '/saved-vehicles/honda.jpg',
      dealerName: 'Auto Excellence',
      location: 'Rochester, NY'
    },
    {
      id: 'sv3',
      make: 'Tesla',
      model: 'Model 3',
      year: 2023,
      trim: 'Long Range',
      price: 47990,
      imageUrl: '/saved-vehicles/tesla.jpg',
      dealerName: 'Modern EV Solutions',
      location: 'Syracuse, NY'
    }
  ];
  
  // Mock scheduled test drives
  const scheduledTestDrives = [
    {
      id: 'td1',
      make: 'Ford',
      model: 'Mustang',
      year: 2023,
      trim: 'GT Premium',
      imageUrl: '/saved-vehicles/ford.jpg',
      dealerName: 'Classic Motors',
      location: 'Albany, NY',
      dateTime: 'May 20, 2025 at 2:00 PM'
    }
  ];
  
  // Mock reservations
  const reservations = [
    {
      id: 'rs1',
      make: 'Toyota',
      model: 'Camry',
      year: 2023,
      trim: 'XLE',
      price: 32970,
      imageUrl: '/saved-vehicles/camry.webp',
      dealerName: 'Refraction Motors',
      location: 'Buffalo, NY',
      status: 'Reserved',
      depositAmount: 500,
      reservationDate: 'May 10, 2025'
    }
  ];
  
  // Payment calculator state
  const [calculatorState, setCalculatorState] = useState({
    price: vehicle.price,
    downPayment: 3000,
    tradeInValue: 0,
    term: 60,
    rate: 4.99,
    paymentResult: 0
  });
  
  // Styling options for the dealer
  const getButtonStyle = () => {
    return {
      backgroundColor: dealerInfo.primary_color,
      color: dealerInfo.text_color,
      borderRadius: '0.375rem',
    };
  };
  
  // Handle save vehicle action
  const handleSaveVehicle = () => {
    if (!isUserLoggedIn) {
      setShowLogin(true);
    } else {
      setSavedToProfile(!savedToProfile);
      if (!savedToProfile) {
        alert('Vehicle saved to your profile!');
      } else {
        alert('Vehicle removed from your saved list.');
      }
    }
  };
  
  // Handle profile creation
  const handleCreateProfile = () => {
    if (loginName && (loginEmail || loginPhone)) {
      setIsUserLoggedIn(true);
      setShowLogin(false);
      setSavedToProfile(true);
      setLoginName(reservationData.firstName + ' ' + reservationData.lastName);
      setLoginEmail(reservationData.email);
      setLoginPhone(reservationData.phone);
      alert('Profile created! Vehicle saved to your profile.');
    } else {
      alert('Please enter your name and either email or phone number.');
    }
  };
  
  // Toggle profile view
  const toggleProfileView = () => {
    if (isUserLoggedIn) {
      setShowProfileView(!showProfileView);
      setShowProfileMenu(false);
    } else {
      setShowLogin(true);
    }
  };
  
  // Calculate payment
  const calculatePayment = () => {
    const { price, downPayment, tradeInValue, term, rate } = calculatorState;
    const loanAmount = price - downPayment - tradeInValue;
    const monthlyRate = rate / 100 / 12;
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    
    setCalculatorState({
      ...calculatorState,
      paymentResult: monthlyPayment
    });
  };
  
  // Toggle section visibility
  const toggleSection = (section: string) => {
    if (section === 'test-drive') {
      setShowCalendar(true);
      return;
    }
    
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };
  
  // Generate date range for next 3 days
  const getDateRange = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };
  
  // Schedule test drive
  const scheduleTestDrive = () => {
    if (selectedDate && selectedTime) {
      const formattedDate = selectedDate.toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
      });
      alert(`Test drive scheduled for ${formattedDate} at ${selectedTime}`);
      setShowCalendar(false);
      setSelectedDate(null);
      setSelectedTime(null);
    } else {
      alert('Please select both a date and time for your test drive.');
    }
  };
  
  return (
    <div className="relative h-full overflow-auto text-xs">
      {/* Moving gradient background */}
      <div 
        className="min-h-full relative" 
        style={{
          backgroundSize: '300% 300%',
          backgroundImage: 'linear-gradient(45deg, #f5f7fa, #e8edf2, #f0f2f5, #f7f9fc, #edf0f5)',
          animation: 'gradientBG 15s ease infinite',
        }}
      >
        <style jsx>{`
          @keyframes gradientBG {
            0% { background-position: 0% 50% }
            50% { background-position: 100% 50% }
            100% { background-position: 0% 50% }
          }
        `}</style>
        
        {/* Dealer Header */}
        <div className="bg-white p-3 shadow-md flex flex-col items-center relative">
          <div className="absolute right-3 top-3">
            <button 
              onClick={() => {
                if (isUserLoggedIn) {
                  setShowProfileMenu(!showProfileMenu);
                } else {
                  setShowLogin(true);
                }
              }}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <User className="h-4 w-4 text-gray-700" />
            </button>
            
            {/* Profile Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg overflow-hidden z-50">
                <div className="p-3 border-b border-gray-200">
                  <p className="font-medium text-xs text-gray-800">{loginName || 'Guest User'}</p>
                  <p className="text-xs text-gray-500">{loginEmail || 'No email'}</p>
                </div>
                <div className="py-1">
                  <button 
                    onClick={toggleProfileView} 
                    className="flex items-center px-3 py-2 text-xs text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <User className="h-3 w-3 mr-2" />
                    My Vehicles
                  </button>
                  <button 
                    onClick={() => {
                      setIsUserLoggedIn(false);
                      setShowProfileMenu(false);
                    }} 
                    className="flex items-center px-3 py-2 text-xs text-red-600 hover:bg-gray-100 w-full text-left"
                  >
                    <LogOut className="h-3 w-3 mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="h-10 mb-1 flex items-center justify-center">
            <img 
              src="/refractionmotors.png" 
              alt="Refraction Motors" 
              className="h-8 object-contain" 
            />
          </div>
          <h1 className="text-sm font-bold text-center">{dealerInfo.name}</h1>
        </div>
        
        {/* Vehicle Stats Banner */}
        <div className="bg-white py-1.5 shadow-sm relative overflow-x-auto">
          <div className="flex items-center justify-between max-w-md mx-auto px-3 space-x-2 text-xs text-gray-700">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              <span>238 views</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span>42 saved</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2a2 2 0 001.44-3.39l-1.787-1.787A2 2 0 0011.22 4H3zM17 8a2 2 0 00-2-2h-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v1H9V5a1 1 0 00-1-1H6a1 1 0 00-1 1v1H3V8h4a1 1 0 100-2V5h2v1a1 1 0 100 2h5.034l1.789 1.789A2 2 0 0117 13h-3v-1a1 1 0 00-1-1h-2a1 1 0 00-1 1v1H9a1 1 0 00-1 1v3h1.05a2.5 2.5 0 014.9 0H15a1 1 0 001-1v-4h1V8z" />
              </svg>
              <span>2 pending test drives</span>
            </div>
          </div>
        </div>
        
        {/* Photo Carousel */}
        <div className="relative overflow-hidden">
          <div className="flex items-center justify-center">
            <div className="max-w-md mx-auto w-full overflow-hidden">
              <div className="flex transition-transform duration-300 ease-in-out" 
                   style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
                <img src="/demo-vehicle/camry1.webp" alt="Toyota Camry" className="w-full h-48 object-contain flex-shrink-0" />
                <img src="/demo-vehicle/camry2.webp" alt="Toyota Camry" className="w-full h-48 object-contain flex-shrink-0" />
                <img src="/demo-vehicle/camry3.webp" alt="Toyota Camry" className="w-full h-48 object-contain flex-shrink-0" />
                <img src="/demo-vehicle/camry4.webp" alt="Toyota Camry" className="w-full h-48 object-contain flex-shrink-0" />
              </div>
            </div>
          </div>
          
          {/* Carousel Controls */}
          <button 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-1"
            onClick={() => setActiveSlide((prev) => (prev === 0 ? 3 : prev - 1))}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-1"
            onClick={() => setActiveSlide((prev) => (prev === 3 ? 0 : prev + 1))}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Carousel Indicators */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {[0, 1, 2, 3].map((index) => (
              <button 
                key={index}
                className={`h-1.5 w-1.5 rounded-full ${activeSlide === index ? 'bg-white' : 'bg-white/50'}`}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
        </div>
        
        {/* Vehicle Header */}
        <div className="bg-indigo-50 p-3">
          <h2 className="text-sm font-bold text-center">
            {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}
          </h2>
          <p className="text-base font-bold text-center text-indigo-600 mt-1">
            ${vehicle.price.toLocaleString()}
          </p>
          <p className="text-xs text-center text-gray-600 mt-0.5">
            VIN: {vehicle.vin}
          </p>
          
          <div className="flex justify-center mt-3 space-x-3">
            <button 
              onClick={handleSaveVehicle} 
              className={`flex items-center px-3 py-1.5 rounded-md text-xs font-medium ${savedToProfile ? 'bg-green-100 text-green-800' : 'bg-white text-gray-700'}`}
            >
              {savedToProfile ? (
                <>
                  <Heart className="h-3 w-3 mr-1 fill-current" />
                  Saved
                </>
              ) : (
                <>
                  <Heart className="h-3 w-3 mr-1" />
                  Save Vehicle
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Linktree-style buttons */}
        <div className="p-3 max-w-md mx-auto">
          <div className="space-y-2">
            <button
              onClick={() => toggleSection('specs')}
              className="w-full py-2 px-3 flex justify-between items-center shadow-sm text-xs"
              style={getButtonStyle()}
            >
              <span>Vehicle Specs & Features</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            <button
              onClick={() => toggleSection('reviews')}
              className="w-full py-2 px-3 flex justify-between items-center shadow-sm text-xs"
              style={getButtonStyle()}
            >
              <span>Expert Reviews</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            <button
              onClick={() => toggleSection('calculator')}
              className="w-full py-2 px-3 flex justify-between items-center shadow-sm text-xs"
              style={getButtonStyle()}
            >
              <span>Payment Calculator</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            <button
              onClick={() => toggleSection('trade-in')}
              className="w-full py-2 px-3 flex justify-between items-center shadow-sm text-xs"
              style={getButtonStyle()}
            >
              <span>Trade-In Value</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            <button
              onClick={() => toggleSection('test-drive')}
              className="w-full py-2 px-3 flex justify-between items-center shadow-sm text-xs"
              style={getButtonStyle()}
            >
              <span>Schedule Test Drive</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
            
            <button
              onClick={() => setShowReservationFlow(true)}
              className="w-full py-2 px-3 shadow-sm text-xs"
              style={getButtonStyle()}
            >
              Reserve This Vehicle
            </button>
          </div>
        </div>
        
        {/* Content Sections */}
        <div className="p-3 max-w-md mx-auto">
          {/* Vehicle Specs Section */}
          {activeSection === 'specs' && (
            <div className="bg-white rounded-lg shadow-md p-3 mb-3 mt-3 text-xs">
              <h3 className="text-sm font-medium mb-3">Vehicle Specifications</h3>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Mileage</p>
                  <p className="text-xs font-medium">{vehicle.mileage.toLocaleString()} mi</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">Exterior Color</p>
                  <p className="text-xs font-medium">{vehicle.exterior_color}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">Interior Color</p>
                  <p className="text-xs font-medium">{vehicle.interior_color}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">MPG</p>
                  <p className="text-xs font-medium">{vehicle.mpg}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">Engine</p>
                  <p className="text-xs font-medium">{vehicle.engine}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">Transmission</p>
                  <p className="text-xs font-medium">{vehicle.transmission}</p>
                </div>
              </div>
              
              <h3 className="text-sm font-medium mb-2">Features & Options</h3>
              <ul className="space-y-1.5">
                {vehicle.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-xs">
                    <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Reviews Section */}
          {activeSection === 'reviews' && (
            <div>
              <div className="bg-white rounded-lg shadow-md p-3 mb-3 mt-3 text-xs">
                <h3 className="text-sm font-medium mb-3">Expert Reviews</h3>
                
                <div className="mb-3 pb-3 border-b border-gray-200">
                  <div className="flex items-center mb-1.5">
                    <a 
                      href="https://www.caranddriver.com/toyota/camry-2023" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-indigo-600"
                    >
                      Car and Driver
                    </a>
                    <div className="ml-2 flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="h-3 w-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <div className="ml-2 text-xs text-gray-600">9.0/10</div>
                  </div>
                  <p className="text-xs text-gray-700">
                    "The Toyota Camry continues to be a benchmark in the midsize sedan category, offering an excellent blend of comfort, technology, and driving dynamics."
                  </p>
                </div>
                
                <div className="mb-3 pb-3 border-b border-gray-200">
                  <div className="flex items-center mb-1.5">
                    <a 
                      href="https://www.motortrend.com/cars/toyota/camry/2023" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-indigo-600"
                    >
                      Motor Trend
                    </a>
                    <div className="ml-2 flex">
                      {[1, 2, 3, 4].map((star) => (
                        <svg key={star} className="h-3 w-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <svg className="h-3 w-3 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div className="ml-2 text-xs text-gray-600">8.5/10</div>
                  </div>
                  <p className="text-xs text-gray-700">
                    "The XLE trim offers premium features that rival luxury brands at a more accessible price point. The refined drivetrain and comfortable ride provide an excellent driving experience."
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center mb-1.5">
                    <a 
                      href="https://www.edmunds.com/toyota/camry/2023/review/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-indigo-600"
                    >
                      Edmunds
                    </a>
                    <div className="ml-2 flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="h-3 w-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <div className="ml-2 text-xs text-gray-600">4.6/5</div>
                  </div>
                  <p className="text-xs text-gray-700">
                    "Excellent reliability ratings and safety scores make the Camry a smart long-term choice. The XLE trim's premium features and comfortable ride quality impressed our testers."
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-3">
                <h3 className="text-sm font-medium mb-3">Video Reviews</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="relative pb-[56.25%] h-0 overflow-hidden rounded mb-2">
                      <iframe 
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/Az9CigwShBw" 
                        title="2023 Toyota Camry XLE Review"
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen>
                      </iframe>
                    </div>
                    <h4 className="text-xs font-medium">2023 Toyota Camry Review - The Good & The Bad</h4>
                    <p className="text-xs text-gray-600">Redline Reviews • 132K views</p>
                  </div>
                  
                  <div>
                    <div className="relative pb-[56.25%] h-0 overflow-hidden rounded mb-2">
                      <iframe 
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/Hg2qLOlZPoo" 
                        title="2023 Toyota Camry XLE Review"
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen>
                      </iframe>
                    </div>
                    <h4 className="text-xs font-medium">2023 Toyota Camry XLE - Test Drive & Review</h4>
                    <p className="text-xs text-gray-600">Motortrend • 207K views</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Trade-In Section */}
          {activeSection === 'trade-in' && (
            <div className="bg-white rounded-lg shadow-md p-3 mt-3 text-xs">
              <h3 className="text-sm font-medium mb-3">Get Trade-In Value</h3>
              
              <div className="space-y-3">
                <p className="text-xs text-gray-700">
                  Enter your vehicle information to get an estimated trade-in value.
                </p>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Vehicle Year
                  </label>
                  <select 
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md"
                  >
                    <option value="">Select Year</option>
                    {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Make
                  </label>
                  <select 
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md"
                  >
                    <option value="">Select Make</option>
                    <option value="Honda">Honda</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Ford">Ford</option>
                    <option value="Chevrolet">Chevrolet</option>
                    <option value="Nissan">Nissan</option>
                    <option value="Tesla">Tesla</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Model
                  </label>
                  <select 
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md"
                  >
                    <option value="">Select Model</option>
                    <option value="Accord">Accord</option>
                    <option value="Civic">Civic</option>
                    <option value="CR-V">CR-V</option>
                    <option value="Camry">Camry</option>
                    <option value="Corolla">Corolla</option>
                    <option value="RAV4">RAV4</option>
                    <option value="F-150">F-150</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Mileage
                  </label>
                  <input
                    type="number"
                    placeholder="Enter vehicle mileage"
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="pt-1">
                  <button
                    className="w-full bg-indigo-600 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-indigo-700"
                    onClick={() => alert('Estimated Trade-In Value: $8,500')}
                  >
                    Get Trade-In Value
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Payment Calculator Section */}
          {activeSection === 'calculator' && (
            <div className="bg-white rounded-lg shadow-md p-3 mb-3 mt-3 text-xs">
              <h3 className="text-sm font-medium mb-3">Payment Calculator</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Vehicle Price
                  </label>
                  <input
                    type="number"
                    value={calculatorState.price}
                    onChange={(e) => setCalculatorState({...calculatorState, price: parseFloat(e.target.value) || 0})}
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Down Payment
                  </label>
                  <input
                    type="number"
                    value={calculatorState.downPayment}
                    onChange={(e) => setCalculatorState({...calculatorState, downPayment: parseFloat(e.target.value) || 0})}
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Loan Term (Months)
                  </label>
                  <select
                    value={calculatorState.term}
                    onChange={(e) => setCalculatorState({...calculatorState, term: parseInt(e.target.value)})}
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md"
                  >
                    <option value={36}>36 Months (3 Years)</option>
                    <option value={48}>48 Months (4 Years)</option>
                    <option value={60}>60 Months (5 Years)</option>
                    <option value={72}>72 Months (6 Years)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    value={calculatorState.rate}
                    onChange={(e) => setCalculatorState({...calculatorState, rate: parseFloat(e.target.value) || 0})}
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md"
                    step="0.01"
                  />
                </div>
                
                <div className="pt-1">
                  <button
                    onClick={calculatePayment}
                    className="w-full bg-indigo-600 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-indigo-700"
                  >
                    Calculate Payment
                  </button>
                </div>
                
                {calculatorState.paymentResult > 0 && (
                  <div className="mt-3 p-3 bg-indigo-50 rounded-lg">
                    <h4 className="font-medium text-center mb-1 text-xs">Estimated Monthly Payment</h4>
                    <p className="text-base font-bold text-center text-indigo-600">
                      ${calculatorState.paymentResult.toFixed(2)}/mo
                    </p>
                    <p className="text-xs text-center text-gray-600 mt-1">
                      Total Cost: ${((calculatorState.paymentResult * calculatorState.term) + calculatorState.downPayment).toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Dealer Footer */}
        <div className="bg-white p-3 shadow-md mt-4">
          <div className="text-center text-xs text-gray-600">
            <p className="font-medium">{dealerInfo.name}</p>
            <p>{dealerInfo.location}</p>
            <p>{dealerInfo.phone}</p>
            <div className="flex justify-center space-x-4 mt-2">
              <a href={dealerInfo.facebook_url} target="_blank" rel="noopener noreferrer" className="text-indigo-600">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
            <p className="text-xs text-gray-500 mt-2">Powered by GhostLot <img src="/ghostlot.png" alt="GhostLot Logo" className="inline h-3 w-3" /></p>
          </div>
        </div>
      </div>
      
      {/* Profile View Modal */}
      {showProfileView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-900">My Vehicles</h3>
              <button 
                onClick={() => setShowProfileView(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex border-b border-gray-200">
              <button 
                className={`px-4 py-2 text-xs font-medium ${activeProfileTab === 'saved' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600'}`}
                onClick={() => setActiveProfileTab('saved')}
              >
                Saved Vehicles ({savedVehicles.length})
              </button>
              <button 
                className={`px-4 py-2 text-xs font-medium ${activeProfileTab === 'testdrives' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600'}`}
                onClick={() => setActiveProfileTab('testdrives')}
              >
                Test Drives ({scheduledTestDrives.length})
              </button>
              <button 
                className={`px-4 py-2 text-xs font-medium ${activeProfileTab === 'reservations' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600'}`}
                onClick={() => setActiveProfileTab('reservations')}
              >
                Reservations ({reservations.length})
              </button>
            </div>
            
            <div className="p-4">
              {/* Saved Vehicles Tab */}
              {activeProfileTab === 'saved' && (
                <div className="space-y-4">
                  {savedVehicles.map(vehicle => (
                    <div key={vehicle.id} className="border border-gray-200 rounded-md overflow-hidden">
                      <div className="flex">
                        <div className="w-1/3">
                          <img src={vehicle.imageUrl} alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} className="w-full h-24 object-cover" />
                        </div>
                        <div className="w-2/3 p-2">
                          <h4 className="text-xs font-medium">{vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}</h4>
                          <p className="text-xs text-indigo-600 font-bold">${vehicle.price.toLocaleString()}</p>
                          <p className="text-xs text-gray-600 mt-1">{vehicle.dealerName}</p>
                          <p className="text-xs text-gray-500">{vehicle.location}</p>
                          <div className="mt-2 flex justify-end">
                            <button className="text-xs text-indigo-600 font-medium">View Details</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Test Drives Tab */}
              {activeProfileTab === 'testdrives' && (
                <div className="space-y-4">
                  {scheduledTestDrives.map(testDrive => (
                    <div key={testDrive.id} className="border border-gray-200 rounded-md overflow-hidden">
                      <div className="flex">
                        <div className="w-1/3">
                          <img src={testDrive.imageUrl} alt={`${testDrive.year} ${testDrive.make} ${testDrive.model}`} className="w-full h-24 object-cover" />
                        </div>
                        <div className="w-2/3 p-2">
                          <h4 className="text-xs font-medium">{testDrive.year} {testDrive.make} {testDrive.model} {testDrive.trim}</h4>
                          <div className="flex items-center mt-1">
                            <Calendar className="h-3 w-3 text-indigo-600 mr-1" />
                            <p className="text-xs text-gray-700">{testDrive.dateTime}</p>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{testDrive.dealerName}</p>
                          <p className="text-xs text-gray-500">{testDrive.location}</p>
                          <div className="mt-2 flex justify-end space-x-2">
                            <button className="text-xs text-gray-600">Reschedule</button>
                            <button className="text-xs text-indigo-600 font-medium">View Details</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Reservations Tab */}
              {activeProfileTab === 'reservations' && (
                <div className="space-y-4">
                  {reservations.map(reservation => (
                    <div key={reservation.id} className="border border-gray-200 rounded-md overflow-hidden">
                      <div className="flex">
                        <div className="w-1/3">
                          <img src={reservation.imageUrl} alt={`${reservation.year} ${reservation.make} ${reservation.model}`} className="w-full h-24 object-cover" />
                        </div>
                        <div className="w-2/3 p-2">
                          <div className="flex justify-between items-start">
                            <h4 className="text-xs font-medium">{reservation.year} {reservation.make} {reservation.model} {reservation.trim}</h4>
                            <span className="text-[10px] bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">{reservation.status}</span>
                          </div>
                          <p className="text-xs text-indigo-600 font-bold">${reservation.price.toLocaleString()}</p>
                          <p className="text-xs text-gray-600 mt-0.5">
                            <span className="font-medium">Deposit:</span> ${reservation.depositAmount}
                          </p>
                          <p className="text-xs text-gray-600">
                            <span className="font-medium">Reserved on:</span> {reservation.reservationDate}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">{reservation.dealerName}</p>
                          <div className="mt-1 flex justify-end">
                            <button className="text-xs text-indigo-600 font-medium">View Details</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* User Login/Profile Creation Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-xs w-full overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-900">Create Profile</h3>
            </div>
            
            <div className="p-4">
              <p className="text-xs text-gray-600 mb-3">
                Create a profile to save vehicles and access them later.
              </p>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Full Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md"
                    placeholder="Enter your name"
                    value={loginName || `${reservationData.firstName} ${reservationData.lastName}`}
                    onChange={(e) => setLoginName(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md"
                    placeholder="Enter your email"
                    value={loginEmail || reservationData.email}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md"
                    placeholder="Enter your phone number"
                    value={loginPhone || reservationData.phone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => setShowLogin(false)}
                  className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xs font-medium text-gray-700"
                >
                  Cancel
                </button>
                
                <button
                  onClick={handleCreateProfile}
                  className="bg-indigo-600 text-white px-3 py-1.5 rounded-md text-xs font-medium"
                >
                  Create Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Test Drive Calendar Modal */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-xs w-full overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-900">Schedule Test Drive</h3>
            </div>
            
            <div className="p-4">
              <p className="text-xs text-gray-600 mb-3">
                Select a date and time to test drive this {vehicle.year} {vehicle.make} {vehicle.model}.
              </p>
              
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {getDateRange().map((date, index) => (
                    <button
                      key={index}
                      className={`py-1.5 px-2 border rounded-md text-xs ${selectedDate && date.toDateString() === selectedDate.toDateString() ? 'bg-indigo-100 border-indigo-500 text-indigo-700' : 'border-gray-300 text-gray-700'}`}
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedTime(null);
                      }}
                    >
                      <div className="font-medium">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                      <div>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              {selectedDate && (
                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    Select Time
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'].map((time, index) => (
                      <button
                        key={index}
                        className={`py-1.5 px-2 border rounded-md text-xs ${selectedTime === time ? 'bg-indigo-100 border-indigo-500 text-indigo-700' : 'border-gray-300 text-gray-700'}`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => setShowCalendar(false)}
                  className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xs font-medium text-gray-700"
                >
                  Cancel
                </button>
                
                <button
                  onClick={scheduleTestDrive}
                  disabled={!selectedDate || !selectedTime}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium ${!selectedDate || !selectedTime ? 'bg-gray-300 text-gray-500' : 'bg-indigo-600 text-white'}`}
                >
                  Schedule Test Drive
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Vehicle Reservation Flow */}
      {showReservationFlow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-xs w-full max-h-[90vh] overflow-y-auto">
            <div className="px-4 py-3 bg-gray-100">
              <h2 className="text-sm font-bold text-gray-900">Set Up Your Order:</h2>
              <p className="text-xs text-gray-700">You're only a few clicks away before we get you set up with your new ride.</p>
            </div>
            
            <div className="p-4">
              {reservationStep === 1 && (
                <div>
                  <h3 className="text-xs font-medium mb-4">1. Acknowledgement</h3>
                  
                  <div className="space-y-3">
                    <label className="flex items-start">
                      <input 
                        type="checkbox"
                        className="h-4 w-4 mt-0.5 text-indigo-600 border-gray-300 rounded"
                        checked={reservationData.acknowledge1}
                        onChange={e => setReservationData({...reservationData, acknowledge1: e.target.checked})}
                      />
                      <span className="ml-2 text-xs text-gray-700">This is the vehicle I want</span>
                    </label>
                    
                    <label className="flex items-start">
                      <input 
                        type="checkbox"
                        className="h-4 w-4 mt-0.5 text-indigo-600 border-gray-300 rounded"
                        checked={reservationData.acknowledge2}
                        onChange={e => setReservationData({...reservationData, acknowledge2: e.target.checked})}
                      />
                      <span className="ml-2 text-xs text-gray-700">I understand that the deposit paid will be held by the dealer against this selected vehicle.</span>
                    </label>
                    
                    <label className="flex items-start">
                      <input 
                        type="checkbox"
                        className="h-4 w-4 mt-0.5 text-indigo-600 border-gray-300 rounded"
                        checked={reservationData.hasTrade}
                        onChange={e => setReservationData({...reservationData, hasTrade: e.target.checked})}
                      />
                      <span className="ml-2 text-xs text-gray-700">I have a trade-in (optional)</span>
                    </label>
                  </div>
                </div>
              )}
              
              {reservationStep === 2 && (
                <div>
                  <h3 className="text-xs font-medium mb-3">2. Vehicle Pickup</h3>
                  
                  <p className="text-xs text-gray-700 mb-3">
                    The dealership will be in contact to coordinate pickup details.
                  </p>
                </div>
              )}
              
              {reservationStep === 3 && (
                <div>
                  <h3 className="text-xs font-medium mb-4">3. Enter Personal Details</h3>
                  
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <input 
                        type="text"
                        placeholder="First name"
                        className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md"
                        value={reservationData.firstName}
                        onChange={e => setReservationData({...reservationData, firstName: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <input 
                        type="text"
                        placeholder="Last name"
                        className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md"
                        value={reservationData.lastName}
                        onChange={e => setReservationData({...reservationData, lastName: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <input 
                      type="email"
                      placeholder="Email"
                      className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md"
                      value={reservationData.email}
                      onChange={e => setReservationData({...reservationData, email: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input 
                        type="tel"
                        placeholder="Phone"
                        className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md"
                        value={reservationData.phone}
                        onChange={e => setReservationData({...reservationData, phone: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <input 
                        type="text"
                        placeholder="Zip Code"
                        className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md"
                        value={reservationData.zipCode}
                        onChange={e => setReservationData({...reservationData, zipCode: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {reservationStep === 4 && (
                <div>
                  <h3 className="text-xs font-medium mb-4">4. Deposit</h3>
                  
                  <label className="flex items-start mb-3">
                    <input 
                      type="checkbox"
                      className="h-4 w-4 mt-0.5 text-indigo-600 border-gray-300 rounded"
                      checked={reservationData.agreeToRules}
                      onChange={e => setReservationData({...reservationData, agreeToRules: e.target.checked})}
                    />
                    <span className="ml-2 text-xs text-gray-700">
                      I understand the <span className="font-medium text-black">rules and policies</span>.
                    </span>
                  </label>
                  
                  <div className="mb-4 text-xs text-gray-700">
                    <p>Deposit paid to Refraction Motors is a Down Payment to hold the specific vehicle until the depositor completes the sale directly from the dealership.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-bold">Deposit Amount: $500.00</h4>
                  </div>
                  
                  <div className="mb-4">
                    <div className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 flex items-center">
                      <span className="text-gray-400 mr-2">💳</span>
                      <input 
                        type="text"
                        value={reservationData.cardNumber}
                        onChange={(e) => setReservationData({...reservationData, cardNumber: e.target.value})}
                        className="flex-grow bg-transparent border-none focus:outline-none text-xs text-gray-700"
                      />
                      <input 
                        type="text"
                        value={`${reservationData.expiry}  ${reservationData.cvc}`}
                        onChange={(e) => {
                          const parts = e.target.value.split(/\s+/);
                          if (parts.length >= 2) {
                            setReservationData({
                              ...reservationData, 
                              expiry: parts[0], 
                              cvc: parts[1]
                            });
                          }
                        }}
                        className="w-24 bg-transparent border-none focus:outline-none text-xs text-gray-700 text-right"
                      />
                    </div>
                  </div>
                  
                  <button
                    className="w-full bg-indigo-600 text-white py-2 px-3 rounded-full text-xs font-medium hover:bg-indigo-700"
                    onClick={() => {
                      alert('Vehicle reserved successfully!');
                      setShowReservationFlow(false);
                    }}
                    disabled={!reservationData.agreeToRules}
                  >
                    Make Down Payment
                  </button>
                </div>
              )}
              
              {reservationStep < 4 && (
                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => {
                      if (reservationStep > 1) {
                        setReservationStep(reservationStep - 1);
                      } else {
                        setShowReservationFlow(false);
                      }
                    }}
                    className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xs font-medium text-gray-700"
                  >
                    {reservationStep === 1 ? 'Cancel' : 'Back'}
                  </button>
                  
                  <button
                    onClick={() => setReservationStep(reservationStep + 1)}
                    className="bg-indigo-600 text-white px-3 py-1.5 rounded-md text-xs font-medium"
                    disabled={reservationStep === 1 && !(reservationData.acknowledge1 && reservationData.acknowledge2)}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}