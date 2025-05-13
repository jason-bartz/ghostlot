"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Calendar, BookOpen, ArrowUpRight, User, Edit, LogOut, Car, CalendarDays, CreditCard } from 'lucide-react';
import { mockVehicles, mockDealer } from '@/lib/mockData';

export default function ConsumerView() {
  // Sample vehicle (in real implementation, this would come from the QR code URL param)
  const [vehicle, setVehicle] = useState(mockVehicles[0]);
  const [dealerInfo, setDealerInfo] = useState(mockDealer);
  const [showLogin, setShowLogin] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [savedToProfile, setSavedToProfile] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loginName, setLoginName] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPhone, setLoginPhone] = useState('');
  const [showReservationFlow, setShowReservationFlow] = useState(false);
  const [reservationStep, setReservationStep] = useState(1);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState('profile');
  const [savedVehicles, setSavedVehicles] = useState([
    {
      id: '1',
      make: 'Honda',
      model: 'Accord',
      year: '2022',
      trim: 'Touring',
      price: 32999,
      dealership: 'ABC Motors',
      savedDate: '5/4/2025',
      image: '/saved-vehicles/camry.webp'
    },
    {
      id: '2',
      make: 'Toyota',
      model: 'Camry',
      year: '2023',
      trim: 'XSE',
      price: 28999,
      dealership: 'ABC Motors',
      savedDate: '5/7/2025',
      image: '/saved-vehicles/camry.webp'
    },
    {
      id: '3',
      make: 'Ford',
      model: 'F-150',
      year: '2021',
      trim: 'Lariat',
      price: 45999,
      dealership: 'XYZ Auto Group',
      savedDate: '4/30/2025',
      image: '/saved-vehicles/ford.jpg'
    },
    {
      id: '4',
      make: 'Tesla',
      model: 'Model 3',
      year: '2023',
      trim: 'Long Range',
      price: 48999,
      dealership: 'EV Dealership',
      savedDate: '4/19/2025',
      image: '/saved-vehicles/tesla.jpg'
    }
  ]);
  const [testDriveAppointments, setTestDriveAppointments] = useState([
    {
      id: '1',
      make: 'Honda',
      model: 'Accord',
      year: '2022',
      trim: 'Touring',
      dealership: 'ABC Motors',
      date: '5/14/2025',
      time: '10:00 AM',
      status: 'Scheduled'
    },
    {
      id: '2',
      make: 'Ford',
      model: 'F-150',
      year: '2021',
      trim: 'Lariat',
      dealership: 'XYZ Auto Group',
      date: '5/19/2025',
      time: '2:00 PM',
      status: 'Scheduled'
    }
  ]);
  const [vehicleReservations, setVehicleReservations] = useState([
    {
      id: '1',
      make: 'Tesla',
      model: 'Model 3',
      year: '2023',
      trim: 'Long Range',
      dealership: 'EV Dealership',
      date: '5/21/2025',
      deposit: 500,
      status: 'Pending'
    }
  ]);
  const [reservationData, setReservationData] = useState({
    acknowledge1: false,
    acknowledge2: false,
    hasTrade: false,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: '',
    agreeToRules: false
  });
  
  // Payment calculator state
  const [calculatorState, setCalculatorState] = useState({
    price: vehicle.price,
    downPayment: 3000,
    tradeInValue: 0,
    term: 60,
    rate: 4.99,
    paymentResult: 0
  });

  // Styling options customized for the dealer
  const styling = {
    primaryColor: dealerInfo.primary_color || '#e01818', // Default E-Z Loan red color
    fontColor: dealerInfo.text_color || '#ffffff', // Default white text
    buttonShape: 'rounded', // 'rounded', 'pill', or 'square'
  };

  // Get button styling based on dealer preferences
  const getButtonStyle = () => {
    return {
      backgroundColor: styling.primaryColor,
      color: styling.fontColor,
      borderRadius: styling.buttonShape === 'pill' ? '9999px' : 
                   styling.buttonShape === 'rounded' ? '0.375rem' : '0',
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
      
      // If clicking save vehicle triggered this login, save the current vehicle
      if (savedToProfile === false) {
        const newSavedVehicle = {
          id: (savedVehicles.length + 1).toString(),
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year.toString(),
          trim: vehicle.trim,
          price: vehicle.price,
          dealership: dealerInfo.name,
          savedDate: new Date().toLocaleDateString('en-US', {month: 'numeric', day: 'numeric', year: 'numeric'}),
          image: '/demo-vehicle/camry1.webp'
        };
        setSavedVehicles([...savedVehicles, newSavedVehicle]);
      }
      
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

  // Generate date range for next 3 days (72 hours)
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

  // Toggle section visibility
  const toggleSection = (section) => {
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

  // Trade-in calculator state
  const [tradeInForm, setTradeInForm] = useState({
    year: '',
    make: '',
    model: '',
    mileage: ''
  });

  // Update trade-in form
  const handleTradeInChange = (e) => {
    const { name, value } = e.target;
    setTradeInForm({
      ...tradeInForm,
      [name]: value
    });
  };

  // Get trade-in value (simplified for demo)
  const getTradeInValue = () => {
    if (!tradeInForm.year || !tradeInForm.make || !tradeInForm.model || !tradeInForm.mileage) {
      alert('Please fill out all fields to get a trade-in estimate.');
      return;
    }
    
    // Simple mock calculation
    const baseValue = 5000;
    const yearValue = (parseInt(tradeInForm.year) - 2010) * 500;
    const mileageDeduction = parseInt(tradeInForm.mileage) * 0.02;
    
    const estimatedValue = Math.max(500, baseValue + yearValue - mileageDeduction);
    
    alert(`Estimated Trade-In Value: $${estimatedValue.toFixed(0)}`);
    
    // Update calculator
    setCalculatorState({
      ...calculatorState,
      tradeInValue: estimatedValue
    });
  };

  // Create a moving gradient animation
  const gradientStyle = {
    backgroundSize: '300% 300%',
    backgroundImage: 'linear-gradient(45deg, #f5f7fa, #e8edf2, #f0f2f5, #f7f9fc, #edf0f5)',
    animation: 'gradientBG 15s ease infinite',
  };

  return (
    <div 
      className="min-h-screen relative" 
      style={{
        ...gradientStyle,
      }}
    >
      <style jsx global>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
      `}</style>
      {/* Dealer Header */}
      <div className="bg-white p-4 shadow-md flex flex-col items-center relative">
        <div className="absolute right-4 top-4">
          <button 
            onClick={() => {
              if (isUserLoggedIn) {
                setShowProfileMenu(!showProfileMenu);
              } else {
                setShowLogin(true);
              }
            }}
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
          >
            <User className="h-5 w-5 text-gray-700" />
          </button>
          
          {/* Profile Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg overflow-hidden z-50">
              <div className="p-4 border-b border-gray-200">
                <p className="font-medium text-gray-800">{loginName || 'John Smith'}</p>
                <p className="text-sm text-gray-500">{loginEmail || 'john@example.com'}</p>
              </div>
              <div className="py-2">
                <button 
                  onClick={() => {
                    setShowProfilePage(true);
                    setActiveProfileTab('profile');
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
                <button 
                  onClick={() => {
                    setShowProfilePage(true);
                    setActiveProfileTab('vehicles');
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <Car className="h-4 w-4 mr-2" />
                  Saved Vehicles
                </button>
                <button 
                  onClick={() => {
                    setShowProfilePage(true);
                    setActiveProfileTab('testDrives');
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Test Drives
                </button>
                <button 
                  onClick={() => {
                    setShowProfilePage(true);
                    setActiveProfileTab('reservations');
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Reservations
                </button>
              </div>
              <div className="py-2 border-t border-gray-200">
                <button onClick={() => {
                  setIsUserLoggedIn(false);
                  setShowProfileMenu(false);
                }} className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="h-12 mb-2 flex items-center justify-center">
          {dealerInfo.logo_url ? (
            <img 
              src={dealerInfo.logo_url} 
              alt={dealerInfo.name} 
              className="h-10 object-contain" 
            />
          ) : (
            <div className="bg-red-600 rounded-full h-10 w-10 flex items-center justify-center">
              <span className="text-white font-bold text-xl">E-Z</span>
            </div>
          )}
        </div>
        <h1 className="text-xl font-bold text-center">{dealerInfo.name}</h1>
      </div>
      
      {/* Photo Carousel */}
      <div className="relative overflow-hidden">
        <div className="flex items-center justify-center">
          <div className="max-w-md mx-auto w-full overflow-hidden">
            <div className="flex transition-transform duration-300 ease-in-out" 
                 style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
              <img src="/demo-vehicle/camry1.webp" alt="Toyota Camry" className="w-full h-64 object-contain flex-shrink-0" />
              <img src="/demo-vehicle/camry2.webp" alt="Toyota Camry" className="w-full h-64 object-contain flex-shrink-0" />
              <img src="/demo-vehicle/camry3.webp" alt="Toyota Camry" className="w-full h-64 object-contain flex-shrink-0" />
              <img src="/demo-vehicle/camry4.webp" alt="Toyota Camry" className="w-full h-64 object-contain flex-shrink-0" />
            </div>
          </div>
        </div>
        
        {/* Carousel Controls */}
        <button 
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-2"
          onClick={() => setActiveSlide((prev) => (prev === 0 ? 3 : prev - 1))}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-2"
          onClick={() => setActiveSlide((prev) => (prev === 3 ? 0 : prev + 1))}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {[0, 1, 2, 3].map((index) => (
            <button 
              key={index}
              className={`h-2 w-2 rounded-full ${activeSlide === index ? 'bg-white' : 'bg-white/50'}`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
        
        {/* Swipe indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
          Swipe to view
        </div>
      </div>
      
      {/* Vehicle Header */}
      <div className="bg-indigo-50 p-4">
        <h2 className="text-xl font-bold text-center">
          2023 Toyota Camry XLE
        </h2>
        <p className="text-2xl font-bold text-center text-indigo-600 mt-1">
          ${vehicle.price.toLocaleString()}
        </p>
        <p className="text-sm text-center text-gray-600 mt-1">
          VIN: {vehicle.vin}
        </p>
        
        <div className="flex justify-center mt-4 space-x-3">
          <button 
            onClick={handleSaveVehicle} 
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${savedToProfile ? 'bg-green-100 text-green-800' : 'bg-white text-gray-700'}`}
          >
            {savedToProfile ? (
              <>
                <Heart className="h-4 w-4 mr-1 fill-current" />
                Saved
              </>
            ) : (
              <>
                <Heart className="h-4 w-4 mr-1" />
                Save Vehicle
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Linktree-style buttons */}
      <div className="p-4 max-w-md mx-auto">
        <div className="space-y-3">
          <button
            onClick={() => toggleSection('specs')}
            className="w-full py-3 px-4 flex justify-between items-center shadow-sm"
            style={getButtonStyle()}
          >
            <span>Vehicle Specs & Features</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button
            onClick={() => toggleSection('reviews')}
            className="w-full py-3 px-4 flex justify-between items-center shadow-sm"
            style={getButtonStyle()}
          >
            <span>Expert Reviews</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button
            onClick={() => toggleSection('calculator')}
            className="w-full py-3 px-4 flex justify-between items-center shadow-sm"
            style={getButtonStyle()}
          >
            <span>Payment Calculator</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button
            onClick={() => toggleSection('trade-in')}
            className="w-full py-3 px-4 flex justify-between items-center shadow-sm"
            style={getButtonStyle()}
          >
            <span>Trade-In Value</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button
            onClick={() => toggleSection('test-drive')}
            className="w-full py-3 px-4 flex justify-between items-center shadow-sm"
            style={getButtonStyle()}
          >
            <span>Schedule Test Drive</span>
            <ArrowUpRight className="h-5 w-5" />
          </button>
          
          <button
            onClick={() => setShowReservationFlow(true)}
            className="w-full py-3 px-4 shadow-sm"
            style={getButtonStyle()}
          >
            Reserve This Vehicle
          </button>
        </div>
      </div>
      
      {/* Content Sections */}
      <div className="p-4 max-w-md mx-auto">
        {/* Vehicle Specs Section */}
        {activeSection === 'specs' && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-4 mt-4">
            <h3 className="text-lg font-medium mb-4">Vehicle Specifications</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Mileage</p>
                <p className="font-medium">{vehicle.mileage.toLocaleString()} mi</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Exterior Color</p>
                <p className="font-medium">{vehicle.exterior_color}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Interior Color</p>
                <p className="font-medium">{vehicle.interior_color}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">MPG</p>
                <p className="font-medium">{vehicle.mpg}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Engine</p>
                <p className="font-medium">{vehicle.engine}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Transmission</p>
                <p className="font-medium">{vehicle.transmission}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Drivetrain</p>
                <p className="font-medium">{vehicle.drivetrain}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Fuel Type</p>
                <p className="font-medium">{vehicle.fuel_type}</p>
              </div>
            </div>
            
            <h3 className="text-lg font-medium mb-3">Features & Options</h3>
            <ul className="space-y-2">
              {vehicle.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <span className="h-2 w-2 bg-indigo-600 rounded-full mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Reviews Section */}
        {activeSection === 'reviews' && (
          <div>
            <div className="bg-white rounded-lg shadow-md p-4 mb-4 mt-4">
              <h3 className="text-lg font-medium mb-4">Expert Reviews</h3>
              
              <div className="mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-center mb-2">
                  <div className="font-bold">Car and Driver</div>
                  <div className="ml-2 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="ml-2 text-sm text-gray-600">9.0/10</div>
                </div>
                <p className="text-sm text-gray-700">
                  "The Toyota Camry continues to be a benchmark in the midsize sedan category, offering an excellent blend of comfort, technology, and driving dynamics."
                </p>
              </div>
              
              <div className="mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-center mb-2">
                  <div className="font-bold">Motor Trend</div>
                  <div className="ml-2 flex">
                    {[1, 2, 3, 4].map((star) => (
                      <svg key={star} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <svg className="h-4 w-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div className="ml-2 text-sm text-gray-600">8.5/10</div>
                </div>
                <p className="text-sm text-gray-700">
                  "The XLE trim offers premium features that rival luxury brands at a more accessible price point. The refined drivetrain and comfortable ride provide an excellent driving experience."
                </p>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <div className="font-bold">Consumer Reports</div>
                  <div className="ml-2 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="ml-2 text-sm text-gray-600">90/100</div>
                </div>
                <p className="text-sm text-gray-700">
                  "Excellent reliability ratings and safety scores make the Camry a smart long-term choice. The XLE trim's premium features and comfortable ride quality impressed our testers."
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-medium mb-4">Video Reviews</h3>
              
              <div className="space-y-6">
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
                  <h4 className="font-medium">2023 Toyota Camry Review - The Good & The Bad</h4>
                  <p className="text-sm text-gray-600">Redline Reviews • 132K views</p>
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
                  <h4 className="font-medium">2023 Toyota Camry XLE - Test Drive & Review</h4>
                  <p className="text-sm text-gray-600">Motortrend • 207K views</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Payment Calculator Section */}
        {activeSection === 'calculator' && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-4 mt-4">
            <h3 className="text-lg font-medium mb-4">Payment Calculator</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Price
                </label>
                <input
                  type="number"
                  value={calculatorState.price}
                  onChange={(e) => setCalculatorState({...calculatorState, price: parseFloat(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Down Payment
                </label>
                <input
                  type="number"
                  value={calculatorState.downPayment}
                  onChange={(e) => setCalculatorState({...calculatorState, downPayment: parseFloat(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trade-In Value
                </label>
                <input
                  type="number"
                  value={calculatorState.tradeInValue}
                  onChange={(e) => setCalculatorState({...calculatorState, tradeInValue: parseFloat(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Term (Months)
                </label>
                <select
                  value={calculatorState.term}
                  onChange={(e) => setCalculatorState({...calculatorState, term: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value={36}>36 Months (3 Years)</option>
                  <option value={48}>48 Months (4 Years)</option>
                  <option value={60}>60 Months (5 Years)</option>
                  <option value={72}>72 Months (6 Years)</option>
                  <option value={84}>84 Months (7 Years)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interest Rate (%)
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={calculatorState.rate}
                    onChange={(e) => setCalculatorState({...calculatorState, rate: parseFloat(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    step="0.01"
                  />
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Credit Score Estimate:
                  </p>
                  <div className="flex space-x-2 mt-1">
                    <button onClick={() => setCalculatorState({...calculatorState, rate: 2.99})} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Excellent (2.99%)</button>
                    <button onClick={() => setCalculatorState({...calculatorState, rate: 3.99})} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Good (3.99%)</button>
                    <button onClick={() => setCalculatorState({...calculatorState, rate: 4.99})} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">Average (4.99%)</button>
                    <button onClick={() => setCalculatorState({...calculatorState, rate: 6.99})} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">Fair (6.99%)</button>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <button
                  onClick={calculatePayment}
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  Calculate Payment
                </button>
              </div>
              
              {calculatorState.paymentResult > 0 && (
                <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
                  <h4 className="font-medium text-center mb-2">Estimated Monthly Payment</h4>
                  <p className="text-2xl font-bold text-center text-indigo-600">
                    ${calculatorState.paymentResult.toFixed(2)}/mo
                  </p>
                  <p className="text-sm text-center text-gray-600 mt-1">
                    Total Cost: ${((calculatorState.paymentResult * calculatorState.term) + calculatorState.downPayment + calculatorState.tradeInValue).toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Trade-In Section */}
        {activeSection === 'trade-in' && (
          <div className="bg-white rounded-lg shadow-md p-4 mt-4">
            <h3 className="text-lg font-medium mb-4">Get Trade-In Value</h3>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-700">
                Enter your vehicle information to get an estimated trade-in value.
              </p>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Year
                </label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  name="year"
                  value={tradeInForm.year}
                  onChange={handleTradeInChange}
                >
                  <option value="">Select Year</option>
                  {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Make
                </label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  name="make"
                  value={tradeInForm.make}
                  onChange={handleTradeInChange}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model
                </label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  name="model"
                  value={tradeInForm.model}
                  onChange={handleTradeInChange}
                >
                  <option value="">Select Model</option>
                  {tradeInForm.make === 'Honda' && (
                    <>
                      <option value="Accord">Accord</option>
                      <option value="Civic">Civic</option>
                      <option value="CR-V">CR-V</option>
                      <option value="Pilot">Pilot</option>
                    </>
                  )}
                  {tradeInForm.make === 'Toyota' && (
                    <>
                      <option value="Camry">Camry</option>
                      <option value="Corolla">Corolla</option>
                      <option value="RAV4">RAV4</option>
                      <option value="Highlander">Highlander</option>
                    </>
                  )}
                  {tradeInForm.make === 'Ford' && (
                    <>
                      <option value="F-150">F-150</option>
                      <option value="Escape">Escape</option>
                      <option value="Explorer">Explorer</option>
                      <option value="Mustang">Mustang</option>
                    </>
                  )}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mileage
                </label>
                <input
                  type="number"
                  placeholder="Enter vehicle mileage"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  name="mileage"
                  value={tradeInForm.mileage}
                  onChange={handleTradeInChange}
                />
              </div>
              
              <div className="pt-2">
                <button
                  onClick={getTradeInValue}
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  Get Trade-In Value
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Dealer Footer */}
      <div className="bg-white p-4 shadow-md mt-6">
        <div className="text-center text-sm text-gray-600">
          <p className="font-medium">{dealerInfo.name}</p>
          <p>{dealerInfo.location}</p>
          <p>{dealerInfo.phone}</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="text-red-600">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="text-red-600">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-2">Powered by GhostLot <img src="/ghostlot-logo.png" alt="GhostLot Logo" className="inline h-4 w-4" /></p>
        </div>
      </div>

      {/* Profile Page */}
      {showProfilePage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">My Profile</h2>
              <button 
                onClick={() => setShowProfilePage(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button 
                  onClick={() => setActiveProfileTab('profile')}
                  className={`px-6 py-3 border-b-2 text-sm font-medium ${
                    activeProfileTab === 'profile'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Profile
                </button>
                <button 
                  onClick={() => setActiveProfileTab('vehicles')}
                  className={`px-6 py-3 border-b-2 text-sm font-medium ${
                    activeProfileTab === 'vehicles'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Saved Vehicles
                </button>
                <button 
                  onClick={() => setActiveProfileTab('testDrives')}
                  className={`px-6 py-3 border-b-2 text-sm font-medium ${
                    activeProfileTab === 'testDrives'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Test Drives
                </button>
                <button 
                  onClick={() => setActiveProfileTab('reservations')}
                  className={`px-6 py-3 border-b-2 text-sm font-medium ${
                    activeProfileTab === 'reservations'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Reservations
                </button>
              </nav>
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {/* Profile Tab */}
              {activeProfileTab === 'profile' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900">Edit Profile</h3>
                  
                  <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        value={loginName || 'John Smith'}
                        onChange={(e) => setLoginName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        value={loginEmail || 'john@example.com'}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={loginPhone || '555-123-4567'}
                        onChange={(e) => setLoginPhone(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <input
                        type="password"
                        defaultValue="••••••••"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                      onClick={() => {
                        alert('Profile updated successfully!');
                      }}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
              
              {/* Saved Vehicles Tab */}
              {activeProfileTab === 'vehicles' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Saved Vehicles</h3>
                  
                  <div className="space-y-4">
                    {savedVehicles.map(vehicle => (
                      <div key={vehicle.id} className="bg-white border rounded-lg overflow-hidden shadow-sm">
                        <div className="sm:flex">
                          <div className="sm:w-32 h-28 bg-gray-200 sm:h-auto flex-shrink-0">
                            <img 
                              src={vehicle.image} 
                              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4 flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-gray-900">{vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}</h4>
                                <p className="text-sm text-gray-500">${vehicle.price.toLocaleString()} • {vehicle.dealership}</p>
                                <p className="text-xs text-gray-400 mt-1">Saved on {vehicle.savedDate}</p>
                              </div>
                              <div className="flex space-x-2">
                                <button 
                                  className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-md text-sm font-medium"
                                  onClick={() => setShowProfilePage(false)}
                                >
                                  View
                                </button>
                                <button 
                                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm font-medium"
                                  onClick={() => {
                                    const updatedVehicles = savedVehicles.filter(v => v.id !== vehicle.id);
                                    setSavedVehicles(updatedVehicles);
                                  }}
                                >
                                  Unsave
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Test Drives Tab */}
              {activeProfileTab === 'testDrives' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Test Drive Appointments</h3>
                  
                  <div className="space-y-4">
                    {testDriveAppointments.map(appointment => (
                      <div key={appointment.id} className="bg-white border rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">{appointment.year} {appointment.make} {appointment.model} {appointment.trim}</h4>
                            <p className="text-sm text-gray-500">{appointment.dealership}</p>
                            <p className="mt-2 text-sm font-medium text-gray-700">{appointment.date} at {appointment.time}</p>
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {appointment.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Reservations Tab */}
              {activeProfileTab === 'reservations' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Vehicle Reservations</h3>
                  
                  <div className="space-y-4">
                    {vehicleReservations.map(reservation => (
                      <div key={reservation.id} className="bg-white border rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">{reservation.year} {reservation.make} {reservation.model} {reservation.trim}</h4>
                            <p className="text-sm text-gray-500">{reservation.dealership}</p>
                            <p className="mt-2 text-sm text-gray-700">Reserved on {reservation.date}</p>
                            <p className="text-sm font-medium text-gray-700">${reservation.deposit} deposit</p>
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {reservation.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* User Login/Profile Creation Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Create Profile</h3>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                Create a profile to save vehicles and access them later.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your name"
                    value={loginName}
                    onChange={(e) => setLoginName(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your phone number"
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                  />
                </div>
                
                <p className="text-xs text-gray-500">
                  <span className="text-red-500">*</span> Required fields. Please provide at least one contact method (email or phone).
                </p>
              </div>
              
              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={() => setShowLogin(false)}
                  className="bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                
                <button
                  onClick={handleCreateProfile}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
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
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Schedule Test Drive</h3>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                Select a date and time to test drive this {vehicle.year} {vehicle.make} {vehicle.model}.
              </p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {getDateRange().map((date, index) => (
                    <button
                      key={index}
                      className={`py-2 px-4 border rounded-md text-sm font-medium ${selectedDate && date.toDateString() === selectedDate.toDateString() ? 'bg-indigo-100 border-indigo-500 text-indigo-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedTime(null);
                      }}
                    >
                      <div className="font-bold">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                      <div>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              {selectedDate && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Time
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'].map((time, index) => (
                      <button
                        key={index}
                        className={`py-2 px-3 border rounded-md text-sm font-medium ${selectedTime === time ? 'bg-indigo-100 border-indigo-500 text-indigo-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 space-y-4">
                {selectedDate && selectedTime && (
                  <div className="bg-indigo-50 p-4 rounded-md">
                    <h4 className="font-medium text-indigo-700 mb-1">Selected Appointment</h4>
                    <p className="text-sm text-gray-700">
                      {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at {selectedTime}
                    </p>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setShowCalendar(false)}
                    className="bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  
                  <button
                    onClick={scheduleTestDrive}
                    disabled={!selectedDate || !selectedTime}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${!selectedDate || !selectedTime ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                  >
                    Schedule Test Drive
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Vehicle Reservation Flow */}
      {showReservationFlow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 bg-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">Set Up Your Order:</h2>
              <p className="text-gray-700">You're only a few clicks away before we get you set up with your new ride.</p>
            </div>
            
            <div className="p-6">
              {reservationStep === 1 && (
                <div>
                  <h3 className="text-lg font-medium mb-6">1. Acknowledgement</h3>
                  
                  <div className="space-y-4">
                    <label className="flex items-start">
                      <input 
                        type="checkbox"
                        className="h-5 w-5 mt-1 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        checked={reservationData.acknowledge1}
                        onChange={e => setReservationData({...reservationData, acknowledge1: e.target.checked})}
                      />
                      <span className="ml-3 text-gray-700">This is the vehicle I want</span>
                    </label>
                    
                    <label className="flex items-start">
                      <input 
                        type="checkbox"
                        className="h-5 w-5 mt-1 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        checked={reservationData.acknowledge2}
                        onChange={e => setReservationData({...reservationData, acknowledge2: e.target.checked})}
                      />
                      <span className="ml-3 text-gray-700">I understand that the deposit paid will be held by the dealer against this selected vehicle.</span>
                    </label>
                    
                    <label className="flex items-start">
                      <input 
                        type="checkbox"
                        className="h-5 w-5 mt-1 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        checked={reservationData.hasTrade}
                        onChange={e => setReservationData({...reservationData, hasTrade: e.target.checked})}
                      />
                      <span className="ml-3 text-gray-700">I have a trade-in (optional)</span>
                    </label>
                  </div>
                </div>
              )}
              
              {reservationStep === 2 && (
                <div>
                  <h3 className="text-lg font-medium mb-4">2. Vehicle Pickup</h3>
                  
                  <p className="text-gray-700 mb-4">The dealership will be in contact to coordinate pickup details.</p>
                </div>
              )}
              
              {reservationStep === 3 && (
                <div>
                  <h3 className="text-lg font-medium mb-6">3. Enter Personal Details</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <input 
                        type="text"
                        placeholder="First name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        value={reservationData.firstName}
                        onChange={e => setReservationData({...reservationData, firstName: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <input 
                        type="text"
                        placeholder="Last name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        value={reservationData.lastName}
                        onChange={e => setReservationData({...reservationData, lastName: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <input 
                      type="email"
                      placeholder="Email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      value={reservationData.email}
                      onChange={e => setReservationData({...reservationData, email: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex">
                      <div className="flex items-center justify-center bg-gray-100 border border-gray-300 border-r-0 rounded-l-md px-3">
                        <span className="text-sm text-gray-500">🇺🇸</span>
                      </div>
                      <input 
                        type="tel"
                        placeholder="Phone"
                        className="w-full px-3 py-2 border border-gray-300 rounded-none rounded-r-md shadow-sm"
                        value={reservationData.phone}
                        onChange={e => setReservationData({...reservationData, phone: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <input 
                        type="text"
                        placeholder="Zip Code"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        value={reservationData.zipCode}
                        onChange={e => setReservationData({...reservationData, zipCode: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {reservationStep === 4 && (
                <div>
                  <h3 className="text-lg font-medium mb-6">4. Deposit</h3>
                  
                  <label className="flex items-start mb-6">
                    <input 
                      type="checkbox"
                      className="h-5 w-5 mt-1 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      checked={reservationData.agreeToRules}
                      onChange={e => setReservationData({...reservationData, agreeToRules: e.target.checked})}
                    />
                    <span className="ml-3 text-gray-700">
                      I understand the <span className="font-medium text-black">rules and policies</span>.
                    </span>
                  </label>
                  
                  <div className="mb-8 text-sm text-gray-700">
                    <p>Deposit paid through Refraction is a Down Payment to hold the specific vehicle until the depositor completes the sale directly from the dealership. Refraction's role is to present consumers available inventory, and connect buyers with participating dealerships.</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-xl font-bold">Deposit Amount: $500.00</h4>
                  </div>
                  
                  <div className="mb-6">
                    <div className="border border-gray-300 rounded-md px-4 py-3 bg-gray-50 flex items-center">
                      <span className="text-gray-400 mr-2">💳</span>
                      <input 
                        type="text"
                        placeholder="Card number"
                        className="flex-grow bg-transparent border-none focus:outline-none text-gray-700"
                      />
                      <input 
                        type="text"
                        placeholder="MM / YY  CVC"
                        className="w-24 md:w-32 bg-transparent border-none focus:outline-none text-gray-700 text-right"
                      />
                    </div>
                  </div>
                  
                  <button
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-full font-medium hover:bg-indigo-700"
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
                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => {
                      if (reservationStep > 1) {
                        setReservationStep(reservationStep - 1);
                      } else {
                        setShowReservationFlow(false);
                      }
                    }}
                    className="bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    {reservationStep === 1 ? 'Cancel' : 'Back'}
                  </button>
                  
                  <button
                    onClick={() => setReservationStep(reservationStep + 1)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
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