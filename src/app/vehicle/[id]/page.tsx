"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Calendar, BookOpen, ArrowUpRight, X } from 'lucide-react';
import supabase from '@/lib/supabase';
import ReservationSystem from '@/components/vehicle/ReservationSystem';
import TestDriveScheduler from '@/components/vehicle/TestDriveScheduler';
import { getAllMakes, getModelsByMake, getValueMultiplier } from '@/lib/vehicleDatabase';

export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  const [vehicle, setVehicle] = useState<any>(null);
  const [dealerInfo, setDealerInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [savedToProfile, setSavedToProfile] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showReservationFlow, setShowReservationFlow] = useState(false);
  const [showTestDriveScheduler, setShowTestDriveScheduler] = useState(false);
  
  // Payment calculator state
  const [calculatorState, setCalculatorState] = useState({
    price: 0,
    downPayment: 3000,
    tradeInValue: 0,
    term: 60,
    rate: 4.99,
    paymentResult: 0
  });
  
  // Trade-in form state
  const [tradeInForm, setTradeInForm] = useState({
    year: 2020,
    make: '',
    model: '',
    mileage: 0,
    color: '',
    condition: 'Good'
  });
  
  // Vehicle makes and available models
  const [availableMakes] = useState<string[]>(getAllMakes());
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  
  const router = useRouter();
  
  useEffect(() => {
    const fetchVehicleAndDealer = async () => {
      try {
        setLoading(true);
        
        // Log QR code scan/view event
        await supabase
          .from('analytics_events')
          .insert([{
            event_type: 'view',
            vehicle_id: params.id,
            source: 'qr_scan'
          }]);
        
        // Increment scan count in QR codes table
        const { data: qrCode } = await supabase
          .from('qr_codes')
          .select('scan_count')
          .eq('vehicle_id', params.id)
          .single();
        
        if (qrCode) {
          await supabase
            .from('qr_codes')
            .update({ scan_count: qrCode.scan_count + 1 })
            .eq('vehicle_id', params.id);
        }
        
        // Fetch vehicle
        const { data: vehicleData, error: vehicleError } = await supabase
          .from('vehicles')
          .select('*')
          .eq('id', params.id)
          .single();
        
        if (vehicleError) {
          throw vehicleError;
        }
        
        if (!vehicleData) {
          throw new Error('Vehicle not found');
        }
        
        setVehicle(vehicleData);
        setCalculatorState({
          ...calculatorState,
          price: vehicleData.price
        });
        
        // Fetch dealer info
        const { data: dealerData, error: dealerError } = await supabase
          .from('dealers')
          .select('*')
          .eq('id', vehicleData.dealer_id)
          .single();
        
        if (dealerError) {
          throw dealerError;
        }
        
        setDealerInfo(dealerData);
        
        // Check if the vehicle is saved by the user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { data: savedVehicle } = await supabase
            .from('saved_vehicles')
            .select('*')
            .eq('vehicle_id', params.id)
            .eq('consumer_id', user.id)
            .single();
          
          setSavedToProfile(!!savedVehicle);
        }
      } catch (err: any) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVehicleAndDealer();
  }, [params.id]);
  
  const toggleSection = (section: string) => {
    if (section === 'test-drive') {
      setShowTestDriveScheduler(true);
      return;
    }
    
    if (section === 'reserve') {
      setShowReservationFlow(true);
      return;
    }
    
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };
  
  const handleSaveVehicle = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      setShowLogin(true);
      return;
    }
    
    if (savedToProfile) {
      // Remove from saved vehicles
      await supabase
        .from('saved_vehicles')
        .delete()
        .match({ vehicle_id: params.id, consumer_id: user.id });
        
      setSavedToProfile(false);
    } else {
      // Add to saved vehicles
      await supabase
        .from('saved_vehicles')
        .insert([{
          vehicle_id: params.id,
          consumer_id: user.id
        }]);
        
      // Log save event
      await supabase
        .from('analytics_events')
        .insert([{
          event_type: 'save',
          vehicle_id: params.id,
          consumer_id: user.id
        }]);
        
      setSavedToProfile(true);
    }
  };
  
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
  
  const calculateTradeIn = () => {
    // Enhanced trade-in value calculation using our vehicle database
    const { year, make, model, mileage, condition } = tradeInForm;
    
    if (!make || !model) {
      alert('Please select a make and model from the dropdown menus.');
      return;
    }
    
    // Base value calculation
    const currentYear = new Date().getFullYear();
    const baseValue = 25000; // Base value for a current year vehicle in excellent condition
    
    // Get the make/model specific value multiplier from our database
    const makeModelMultiplier = getValueMultiplier(make, model);
    
    // Adjust for year (more steep depreciation in recent years)
    let yearAdjustment;
    const age = currentYear - year;
    
    if (age <= 3) {
      // Newer cars depreciate faster (15% per year)
      yearAdjustment = -baseValue * (age * 0.15);
    } else if (age <= 10) {
      // Middle-aged cars depreciate slower
      yearAdjustment = -baseValue * (0.45 + (age - 3) * 0.05);
    } else {
      // After 10 years, depreciation slows even more
      yearAdjustment = -baseValue * (0.80 + (age - 10) * 0.01);
      
      // Classic car value boost for vehicles 25+ years old
      if (age >= 25) {
        yearAdjustment += baseValue * 0.1;
      }
    }
    
    // Adjust for mileage
    // Average mileage is about 12,000 per year
    const expectedMileage = age * 12000;
    const mileageDifference = mileage - expectedMileage;
    let mileageAdjustment = 0;
    
    if (mileageDifference > 0) {
      // Higher than expected mileage (penalize more heavily)
      mileageAdjustment = -1 * (mileageDifference / 5000) * 250;
    } else {
      // Lower than expected mileage (reward but not as much)
      mileageAdjustment = -1 * (mileageDifference / 5000) * 150;
    }
    
    // Adjust for condition (expanded options)
    let conditionMultiplier = 1;
    switch (condition) {
      case 'Excellent':
        conditionMultiplier = 1.2; // Looks new and is in excellent mechanical condition (2% of cars)
        break;
      case 'Very Good':
        conditionMultiplier = 1.1; // Has minor cosmetic defects and is in good mechanical condition (28% of cars)
        break;
      case 'Good':
        conditionMultiplier = 1.0; // Has repairable cosmetic defects and mechanical problems (50% of cars)
        break;
      case 'Fair':
        conditionMultiplier = 0.85; // Requires some mechanical repairs (20% of cars)
        break;
      case 'Poor':
        conditionMultiplier = 0.7; // Significant mechanical or cosmetic issues
        break;
    }
    
    // Small boost for popular car colors
    const popularColors = ['black', 'white', 'silver', 'gray', 'blue'];
    if (tradeInForm.color && popularColors.includes(tradeInForm.color.toLowerCase())) {
      conditionMultiplier += 0.03; // 3% boost for popular colors
    }
    
    // Calculate final value
    const estimatedValue = Math.max(
      500, // Minimum value
      (baseValue + yearAdjustment + mileageAdjustment) * makeModelMultiplier * conditionMultiplier
    );
    
    // Update calculator
    setCalculatorState({
      ...calculatorState,
      tradeInValue: Math.round(estimatedValue)
    });
    
    // Show in alert with more detailed information
    alert(`
Estimated Trade-In Value: $${Math.round(estimatedValue).toLocaleString()}

Vehicle Details:
${year} ${make} ${model}
${color ? color + ', ' : ''}${condition} condition
${mileage.toLocaleString()} miles

This is an estimated value based on current market conditions. 
Actual trade-in offers may vary.
    `);
  };
  
  const handleTradeInChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Special handling for make selection - update available models
    if (name === 'make') {
      setTradeInForm({
        ...tradeInForm,
        make: value,
        model: '' // Reset model when make changes
      });
      
      // Update available models when make changes
      const models = getModelsByMake(value);
      setAvailableModels(models);
    } 
    else if (name === 'year' || name === 'mileage') {
      setTradeInForm({
        ...tradeInForm,
        [name]: parseInt(value) || 0
      });
    } else {
      setTradeInForm({
        ...tradeInForm,
        [name]: value
      });
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-gray-500">Loading vehicle details...</div>
      </div>
    );
  }
  
  if (error || !vehicle || !dealerInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-red-500">Error: {error || 'Vehicle or dealer not found'}</div>
      </div>
    );
  }
  
  // Generate button style based on dealer preferences
  const getButtonStyle = () => {
    const primaryColor = dealerInfo.primary_color || '#f7b2e0';
    const textColor = dealerInfo.text_color || '#ffffff';
    
    return {
      backgroundColor: primaryColor,
      color: textColor,
      borderRadius: '0.375rem',
    };
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Dealer Header */}
      <div className="bg-white p-4 shadow-md flex flex-col items-center">
        <div className="h-12 mb-2 flex items-center justify-center">
          {dealerInfo.logo_url ? (
            <img 
              src={dealerInfo.logo_url} 
              alt={dealerInfo.name} 
              className="h-10 object-contain" 
            />
          ) : (
            <div className="bg-red-600 rounded-full h-10 w-10 flex items-center justify-center">
              <span className="text-white font-bold text-xl">{dealerInfo.name.substring(0, 2)}</span>
            </div>
          )}
        </div>
        <h1 className="text-xl font-bold text-center">{dealerInfo.name}</h1>
      </div>
      
      {/* Vehicle Header */}
      <div className="bg-indigo-50 p-4">
        <h2 className="text-xl font-bold text-center">
          {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}
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
      
      {/* Vehicle Images */}
      {vehicle.images && vehicle.images.length > 0 && (
        <div className="p-4">
          <div className="overflow-x-auto whitespace-nowrap hide-scrollbar">
            <div className="inline-flex space-x-2">
              {vehicle.images.map((imageUrl: string, index: number) => (
                <div 
                  key={index} 
                  className="h-40 w-60 rounded-lg overflow-hidden flex-shrink-0"
                >
                  <img 
                    src={imageUrl} 
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
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
            onClick={() => toggleSection('reserve')}
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
              {vehicle.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-center text-sm">
                  <span className="h-2 w-2 bg-indigo-600 rounded-full mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Expert Reviews Section */}
        {activeSection === 'reviews' && (
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
                "The {vehicle.make} {vehicle.model} continues to be a benchmark in its category, offering an excellent blend of comfort, technology, and driving dynamics."
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
                "The {vehicle.trim} trim offers premium features that rival luxury brands at a more accessible price point. The {vehicle.engine} engine provides plenty of power."
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
                "Excellent reliability ratings and safety scores make the {vehicle.model} a smart long-term choice. The {vehicle.trim} trim's premium features and comfortable ride quality impressed our testers."
              </p>
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
                  <div className="flex flex-wrap gap-2 mt-1">
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
        
        {/* Trade-In Estimator Section */}
        {activeSection === 'trade-in' && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-4 mt-4">
            <h3 className="text-lg font-medium mb-4">Trade-In Value Estimator</h3>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-700">
                Enter your vehicle information to get an estimated trade-in value.
              </p>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Year
                </label>
                <input
                  type="number"
                  value={tradeInForm.year}
                  onChange={handleTradeInChange}
                  name="year"
                  min={1990}
                  max={new Date().getFullYear()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Make
                </label>
                <select
                  value={tradeInForm.make}
                  onChange={handleTradeInChange}
                  name="make"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select a make</option>
                  {availableMakes.map((make) => (
                    <option key={make} value={make}>
                      {make}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model
                </label>
                <select
                  value={tradeInForm.model}
                  onChange={handleTradeInChange}
                  name="model"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  disabled={!tradeInForm.make}
                >
                  <option value="">Select a model</option>
                  {availableModels.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mileage
                </label>
                <input
                  type="number"
                  value={tradeInForm.mileage}
                  onChange={handleTradeInChange}
                  name="mileage"
                  min={0}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter vehicle mileage"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <select
                  value={tradeInForm.color}
                  onChange={handleTradeInChange}
                  name="color"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select a color</option>
                  <option value="Black">Black</option>
                  <option value="White">White</option>
                  <option value="Silver">Silver</option>
                  <option value="Gray">Gray</option>
                  <option value="Blue">Blue</option>
                  <option value="Red">Red</option>
                  <option value="Green">Green</option>
                  <option value="Brown">Brown</option>
                  <option value="Yellow">Yellow</option>
                  <option value="Orange">Orange</option>
                  <option value="Purple">Purple</option>
                  <option value="Gold">Gold</option>
                  <option value="Beige">Beige</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Condition
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  {/* Excellent Condition */}
                  <div 
                    className={`border rounded-lg p-3 cursor-pointer transition ${
                      tradeInForm.condition === 'Excellent' 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-300 hover:border-indigo-300'
                    }`}
                    onClick={() => setTradeInForm({...tradeInForm, condition: 'Excellent'})}
                  >
                    <div className="flex items-center mb-1">
                      <input 
                        type="radio" 
                        name="condition-radio" 
                        checked={tradeInForm.condition === 'Excellent'} 
                        onChange={() => {}} 
                        className="h-4 w-4 text-indigo-600"
                      />
                      <span className="ml-2 font-medium">Excellent</span>
                    </div>
                    <p className="text-xs font-semibold text-indigo-800">2% of cars we value</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Looks new and is in excellent mechanical condition. No visible wear and tear.
                    </p>
                  </div>
                  
                  {/* Very Good Condition */}
                  <div 
                    className={`border rounded-lg p-3 cursor-pointer transition ${
                      tradeInForm.condition === 'Very Good' 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-300 hover:border-indigo-300'
                    }`}
                    onClick={() => setTradeInForm({...tradeInForm, condition: 'Very Good'})}
                  >
                    <div className="flex items-center mb-1">
                      <input 
                        type="radio" 
                        name="condition-radio" 
                        checked={tradeInForm.condition === 'Very Good'} 
                        onChange={() => {}} 
                        className="h-4 w-4 text-indigo-600"
                      />
                      <span className="ml-2 font-medium">Very Good</span>
                    </div>
                    <p className="text-xs font-semibold text-indigo-800">28% of cars we value</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Has minor cosmetic defects and is in good mechanical condition.
                    </p>
                  </div>
                  
                  {/* Good Condition */}
                  <div 
                    className={`border rounded-lg p-3 cursor-pointer transition ${
                      tradeInForm.condition === 'Good' 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-300 hover:border-indigo-300'
                    }`}
                    onClick={() => setTradeInForm({...tradeInForm, condition: 'Good'})}
                  >
                    <div className="flex items-center mb-1">
                      <input 
                        type="radio" 
                        name="condition-radio" 
                        checked={tradeInForm.condition === 'Good'} 
                        onChange={() => {}} 
                        className="h-4 w-4 text-indigo-600"
                      />
                      <span className="ml-2 font-medium">Good</span>
                    </div>
                    <p className="text-xs font-semibold text-indigo-800">50% of cars we value</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Has repairable cosmetic defects and minor mechanical problems.
                    </p>
                  </div>
                  
                  {/* Fair Condition */}
                  <div 
                    className={`border rounded-lg p-3 cursor-pointer transition ${
                      tradeInForm.condition === 'Fair' 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-300 hover:border-indigo-300'
                    }`}
                    onClick={() => setTradeInForm({...tradeInForm, condition: 'Fair'})}
                  >
                    <div className="flex items-center mb-1">
                      <input 
                        type="radio" 
                        name="condition-radio" 
                        checked={tradeInForm.condition === 'Fair'} 
                        onChange={() => {}} 
                        className="h-4 w-4 text-indigo-600"
                      />
                      <span className="ml-2 font-medium">Fair</span>
                    </div>
                    <p className="text-xs font-semibold text-indigo-800">20% of cars we value</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Requires some mechanical repairs and has noticeable cosmetic flaws.
                    </p>
                  </div>
                  
                  {/* Poor Condition */}
                  <div 
                    className={`border rounded-lg p-3 cursor-pointer transition ${
                      tradeInForm.condition === 'Poor' 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-300 hover:border-indigo-300'
                    }`}
                    onClick={() => setTradeInForm({...tradeInForm, condition: 'Poor'})}
                  >
                    <div className="flex items-center mb-1">
                      <input 
                        type="radio" 
                        name="condition-radio" 
                        checked={tradeInForm.condition === 'Poor'} 
                        onChange={() => {}} 
                        className="h-4 w-4 text-indigo-600"
                      />
                      <span className="ml-2 font-medium">Poor</span>
                    </div>
                    <p className="text-xs font-semibold text-gray-800">&lt;1% of cars we value</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Significant mechanical or cosmetic issues that affect drivability or safety.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <button
                  onClick={calculateTradeIn}
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
            {dealerInfo.social_media?.facebook && (
              <a href={dealerInfo.social_media.facebook} className="text-red-600">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            )}
            {dealerInfo.social_media?.instagram && (
              <a href={dealerInfo.social_media.instagram} className="text-red-600">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">Powered by GhostLot <img src="/ghostlot-logo.png" alt="GhostLot Logo" className="inline h-4 w-4" /></p>
        </div>
      </div>

      {/* User Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Create Profile</h3>
              <button
                onClick={() => setShowLogin(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
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
                  />
                </div>
                
                <p className="text-xs text-gray-500">
                  <span className="text-red-500">*</span> Required fields. Please provide at least one contact method (email or phone).
                </p>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowLogin(false)}
                  className="bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 mr-3"
                >
                  Cancel
                </button>
                
                <button
                  onClick={() => {
                    // Mock profile creation
                    alert('Profile created successfully! Vehicle saved to your profile.');
                    setSavedToProfile(true);
                    setShowLogin(false);
                  }}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  Create Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Test Drive Scheduler Modal */}
      {showTestDriveScheduler && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Schedule Test Drive</h3>
              <button
                onClick={() => setShowTestDriveScheduler(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <TestDriveScheduler 
              vehicle={vehicle} 
              onClose={() => setShowTestDriveScheduler(false)} 
            />
          </div>
        </div>
      )}
      
      {/* Reservation Flow Modal */}
      {showReservationFlow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Reserve This Vehicle</h3>
              <button
                onClick={() => setShowReservationFlow(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <ReservationSystem 
              vehicle={vehicle} 
              onClose={() => setShowReservationFlow(false)} 
            />
          </div>
        </div>
      )}
    </div>
  );
}