"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabase';
import { Database } from '@/lib/supabase';
import { CreditCard, Check, AlertCircle } from 'lucide-react';

type Vehicle = Database['public']['Tables']['vehicles']['Row'];

interface ReservationSystemProps {
  vehicle: Vehicle;
  onClose: () => void;
}

export default function ReservationSystem({ vehicle, onClose }: ReservationSystemProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: '',
    acknowledgement1: false,
    acknowledgement2: false,
    hasTrade: false,
    agreeToTerms: false,
    cardNumber: '',
    cardExpiry: '',
    cardCVC: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    
    // Remove non-numeric characters
    value = value.replace(/\D/g, '');
    
    // Limit to 16 digits
    if (value.length > 16) {
      value = value.slice(0, 16);
    }
    
    // Format with spaces every 4 digits
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    setForm({
      ...form,
      cardNumber: formattedValue
    });
  };
  
  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    
    // Remove non-numeric characters
    value = value.replace(/\D/g, '');
    
    // Limit to 4 digits
    if (value.length > 4) {
      value = value.slice(0, 4);
    }
    
    // Format as MM/YY
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    
    setForm({
      ...form,
      cardExpiry: value
    });
  };
  
  const handleCardCVCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    
    // Remove non-numeric characters
    value = value.replace(/\D/g, '');
    
    // Limit to 3-4 digits
    if (value.length > 4) {
      value = value.slice(0, 4);
    }
    
    setForm({
      ...form,
      cardCVC: value
    });
  };
  
  const handleNext = () => {
    if (step === 1) {
      if (!form.acknowledgement1 || !form.acknowledgement2) {
        setError('Please confirm both acknowledgements to continue.');
        return;
      }
      setError(null);
      setStep(2);
    } else if (step === 2) {
      // Validate form fields
      if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.zipCode) {
        setError('Please fill in all required fields.');
        return;
      }
      setError(null);
      setStep(3);
    }
  };
  
  const handleBack = () => {
    setError(null);
    if (step > 1) {
      setStep(step - 1);
    } else {
      onClose();
    }
  };
  
  const handleSubmitReservation = async () => {
    // Validate payment information
    if (!form.cardNumber || !form.cardExpiry || !form.cardCVC || !form.agreeToTerms) {
      setError('Please complete all payment fields and agree to the terms to continue.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Create a guest consumer profile for the reservation
        const { data: consumer, error: consumerError } = await supabase
          .from('consumers')
          .insert([{
            name: `${form.firstName} ${form.lastName}`,
            email: form.email,
            phone: form.phone,
            zip_code: form.zipCode
          }])
          .select()
          .single();
        
        if (consumerError) {
          throw consumerError;
        }
        
        // Create the reservation
        await supabase
          .from('reservations')
          .insert([{
            vehicle_id: vehicle.id,
            consumer_id: consumer.id,
            deposit_amount: 500, // Fixed deposit amount
            status: 'Pending',
            has_trade_in: form.hasTrade
          }]);
        
        // Update vehicle status to Reserved
        await supabase
          .from('vehicles')
          .update({ status: 'Reserved' })
          .eq('id', vehicle.id);
        
        // Log analytics event
        await supabase
          .from('analytics_events')
          .insert([{
            event_type: 'reserve',
            vehicle_id: vehicle.id,
            consumer_id: consumer.id
          }]);
      } else {
        // Create the reservation with the authenticated user
        await supabase
          .from('reservations')
          .insert([{
            vehicle_id: vehicle.id,
            consumer_id: user.id,
            deposit_amount: 500, // Fixed deposit amount
            status: 'Pending',
            has_trade_in: form.hasTrade
          }]);
        
        // Update vehicle status to Reserved
        await supabase
          .from('vehicles')
          .update({ status: 'Reserved' })
          .eq('id', vehicle.id);
        
        // Log analytics event
        await supabase
          .from('analytics_events')
          .insert([{
            event_type: 'reserve',
            vehicle_id: vehicle.id,
            consumer_id: user.id
          }]);
      }
      
      // Show success message
      setSuccess(true);
    } catch (err: any) {
      console.error('Error creating reservation:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  if (success) {
    return (
      <div className="p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">Reservation Successful!</h3>
        <p className="text-gray-600 mb-6">
          Your reservation for the {vehicle.year} {vehicle.make} {vehicle.model} has been confirmed. 
          The dealership will contact you shortly to complete the purchase process.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="font-medium text-gray-700 mb-2">Reservation Details</h4>
          <p className="text-sm text-gray-600">
            <strong>Vehicle:</strong> {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Deposit Amount:</strong> $500.00
          </p>
          <p className="text-sm text-gray-600">
            <strong>Name:</strong> {form.firstName} {form.lastName}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Email:</strong> {form.email}
          </p>
        </div>
        <button
          onClick={() => router.push('/')}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700"
        >
          Return to Homepage
        </button>
      </div>
    );
  }
  
  return (
    <div>
      {/* Step indicator */}
      <div className="flex items-center justify-center mb-8">
        <div 
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}
        >
          1
        </div>
        <div className={`w-12 h-1 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
        <div 
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}
        >
          2
        </div>
        <div className={`w-12 h-1 ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
        <div 
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}
        >
          3
        </div>
      </div>
      
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}
      
      {/* Step 1: Acknowledgement */}
      {step === 1 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Step 1: Acknowledgement</h3>
          
          <div className="space-y-4 mb-6">
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h4 className="font-medium text-indigo-700 mb-2">Vehicle Information</h4>
              <p className="text-gray-700 mb-1">
                <strong>{vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}</strong>
              </p>
              <p className="text-gray-600 text-sm mb-1">Stock #: {vehicle.stock_number}</p>
              <p className="text-gray-600 text-sm mb-1">VIN: {vehicle.vin}</p>
              <p className="text-gray-700 text-lg font-medium">${vehicle.price.toLocaleString()}</p>
            </div>
            
            <div className="flex items-start">
              <input
                type="checkbox"
                id="acknowledgement1"
                name="acknowledgement1"
                checked={form.acknowledgement1}
                onChange={handleChange}
                className="h-5 w-5 mt-1 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="acknowledgement1" className="ml-3 text-gray-700">
                I confirm that this is the vehicle I want to reserve
              </label>
            </div>
            
            <div className="flex items-start">
              <input
                type="checkbox"
                id="acknowledgement2"
                name="acknowledgement2"
                checked={form.acknowledgement2}
                onChange={handleChange}
                className="h-5 w-5 mt-1 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="acknowledgement2" className="ml-3 text-gray-700">
                I understand that the $500 deposit will be applied toward the purchase of this vehicle
              </label>
            </div>
            
            <div className="flex items-start">
              <input
                type="checkbox"
                id="hasTrade"
                name="hasTrade"
                checked={form.hasTrade}
                onChange={handleChange}
                className="h-5 w-5 mt-1 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="hasTrade" className="ml-3 text-gray-700">
                I plan to trade in my current vehicle (optional)
              </label>
            </div>
          </div>
        </div>
      )}
      
      {/* Step 2: Personal Information */}
      {step === 2 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Step 2: Personal Information</h3>
          
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name*
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name*
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number*
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                Zip Code*
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={form.zipCode}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Step 3: Payment */}
      {step === 3 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Step 3: Payment Information</h3>
          
          <div className="p-4 bg-indigo-50 rounded-lg mb-6">
            <h4 className="font-medium text-indigo-700 mb-2">Reservation Deposit</h4>
            <p className="text-gray-700 mb-1">
              A $500 refundable deposit is required to reserve this vehicle.
            </p>
            <p className="text-gray-700 text-lg font-medium mt-2">Total: $500.00</p>
          </div>
          
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Card Number*
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date*
                </label>
                <input
                  type="text"
                  id="cardExpiry"
                  name="cardExpiry"
                  value={form.cardExpiry}
                  onChange={handleCardExpiryChange}
                  placeholder="MM/YY"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label htmlFor="cardCVC" className="block text-sm font-medium text-gray-700 mb-1">
                  CVC/CVV*
                </label>
                <input
                  type="text"
                  id="cardCVC"
                  name="cardCVC"
                  value={form.cardCVC}
                  onChange={handleCardCVCChange}
                  placeholder="123"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            
            <div className="flex items-start pt-2">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={form.agreeToTerms}
                onChange={handleChange}
                className="h-5 w-5 mt-1 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="agreeToTerms" className="ml-3 text-gray-700 text-sm">
                I agree to the <a href="#" className="text-indigo-600 hover:underline">Terms and Conditions</a> and
                authorize a $500 deposit to reserve this vehicle.
              </label>
            </div>
          </div>
        </div>
      )}
      
      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50"
        >
          {step === 1 ? 'Cancel' : 'Back'}
        </button>
        
        {step < 3 ? (
          <button
            onClick={handleNext}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmitReservation}
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 disabled:bg-gray-300 flex items-center"
          >
            {loading ? 'Processing...' : 'Complete Reservation'}
          </button>
        )}
      </div>
    </div>
  );
}