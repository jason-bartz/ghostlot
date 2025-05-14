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
      alert('Profile created! Vehicle saved to your profile.');
    } else {
      alert('Please enter your name and either email or phone number.');
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
                  <button onClick={() => {
                    setIsUserLoggedIn(false);
                    setShowProfileMenu(false);
                  }} className="flex items-center px-3 py-2 text-xs text-red-600 hover:bg-gray-100 w-full text-left">
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
              onClick={() => toggleSection('test-drive')}
              className="w-full py-2 px-3 flex justify-between items-center shadow-sm text-xs"
              style={getButtonStyle()}
            >
              <span>Schedule Test Drive</span>
              <ArrowUpRight className="h-4 w-4" />
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
                    value={loginName}
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
                    value={loginEmail}
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
                    value={loginPhone}
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
    </div>
  );
}