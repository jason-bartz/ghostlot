"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Check } from 'lucide-react';
import supabase from '@/lib/supabase';
import { Database } from '@/lib/supabase';

type Vehicle = Database['public']['Tables']['vehicles']['Row'];

interface TestDriveSchedulerProps {
  vehicle: Vehicle;
  onClose: () => void;
}

export default function TestDriveScheduler({ vehicle, onClose }: TestDriveSchedulerProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [dealerHours, setDealerHours] = useState<any>(null);
  
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  
  // Generate available dates (next 7 days)
  useEffect(() => {
    const getDates = async () => {
      try {
        // Get dealer info
        const { data: dealerData, error: dealerError } = await supabase
          .from('dealers')
          .select('hours')
          .eq('id', vehicle.dealer_id)
          .single();
        
        if (dealerError) throw dealerError;
        
        setDealerHours(dealerData.hours || {
          monday: '9:00 AM - 6:00 PM',
          tuesday: '9:00 AM - 6:00 PM',
          wednesday: '9:00 AM - 6:00 PM',
          thursday: '9:00 AM - 6:00 PM',
          friday: '9:00 AM - 6:00 PM',
          saturday: '9:00 AM - 5:00 PM',
          sunday: 'Closed'
        });
        
        // Generate dates for the next 7 days
        const dates = [];
        const today = new Date();
        
        for (let i = 1; i <= 7; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          dates.push(date);
        }
        
        setAvailableDates(dates);
      } catch (err) {
        console.error('Error fetching dealer hours:', err);
      }
    };
    
    getDates();
  }, [vehicle.dealer_id]);
  
  // Generate available times based on selected date and dealer hours
  useEffect(() => {
    if (!selectedDate || !dealerHours) return;
    
    const dayOfWeek = selectedDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const hoursString = dealerHours[dayOfWeek];
    
    if (hoursString === 'Closed') {
      setAvailableTimes([]);
      return;
    }
    
    const [openTime, closeTime] = hoursString.split(' - ');
    
    // Parse hours
    const parseTime = (timeString: string) => {
      const [time, period] = timeString.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      
      if (period === 'PM' && hours < 12) {
        hours += 12;
      } else if (period === 'AM' && hours === 12) {
        hours = 0;
      }
      
      return { hours, minutes };
    };
    
    const open = parseTime(openTime);
    const close = parseTime(closeTime);
    
    // Generate hourly slots
    const times = [];
    const startHour = open.hours;
    const endHour = close.hours;
    
    for (let hour = startHour; hour < endHour; hour++) {
      // Skip lunch hour (12-1 PM)
      if (hour === 12) continue;
      
      const displayHour = hour > 12 ? hour - 12 : hour;
      const amPm = hour >= 12 ? 'PM' : 'AM';
      
      times.push(`${displayHour}:00 ${amPm}`);
      times.push(`${displayHour}:30 ${amPm}`);
    }
    
    setAvailableTimes(times);
  }, [selectedDate, dealerHours]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };
  
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      setError('Please select a date and time for your test drive.');
      return;
    }
    
    if (!form.firstName || !form.lastName || !form.email || !form.phone) {
      setError('Please fill in all required fields.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Create a guest consumer profile for the test drive
        const { data: consumer, error: consumerError } = await supabase
          .from('consumers')
          .insert([{
            name: `${form.firstName} ${form.lastName}`,
            email: form.email,
            phone: form.phone
          }])
          .select()
          .single();
        
        if (consumerError) {
          throw consumerError;
        }
        
        // Create the test drive request
        await supabase
          .from('test_drive_requests')
          .insert([{
            vehicle_id: vehicle.id,
            consumer_id: consumer.id,
            date: selectedDate.toISOString().split('T')[0],
            time: selectedTime,
            status: 'Pending'
          }]);
        
        // Log analytics event
        await supabase
          .from('analytics_events')
          .insert([{
            event_type: 'test_drive',
            vehicle_id: vehicle.id,
            consumer_id: consumer.id
          }]);
      } else {
        // Create the test drive with the authenticated user
        await supabase
          .from('test_drive_requests')
          .insert([{
            vehicle_id: vehicle.id,
            consumer_id: user.id,
            date: selectedDate.toISOString().split('T')[0],
            time: selectedTime,
            status: 'Pending'
          }]);
        
        // Log analytics event
        await supabase
          .from('analytics_events')
          .insert([{
            event_type: 'test_drive',
            vehicle_id: vehicle.id,
            consumer_id: user.id
          }]);
      }
      
      // Show success message
      setSuccess(true);
    } catch (err) {
      console.error('Error scheduling test drive:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while scheduling your test drive';
      setError(errorMessage);
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
        <h3 className="text-xl font-medium text-gray-900 mb-2">Test Drive Scheduled!</h3>
        <p className="text-gray-600 mb-6">
          Your test drive for the {vehicle.year} {vehicle.make} {vehicle.model} has been 
          scheduled for {selectedDate?.toLocaleDateString()} at {selectedTime}.
          The dealership will contact you to confirm the appointment.
        </p>
        <button
          onClick={onClose}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700"
        >
          Close
        </button>
      </div>
    );
  }
  
  return (
    <div className="p-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule a Test Drive</h3>
      
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div className="space-y-6">
        {/* Vehicle Information */}
        <div className="p-4 bg-indigo-50 rounded-lg">
          <h4 className="font-medium text-indigo-700 mb-2">Vehicle Information</h4>
          <p className="text-gray-700 mb-1">
            <strong>{vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}</strong>
          </p>
          <p className="text-gray-600 text-sm">Stock #: {vehicle.stock_number}</p>
        </div>
        
        {/* Date Selection */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Select a Date
          </h4>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {availableDates.map((date, index) => {
              const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
              const isAvailable = dealerHours && dealerHours[dayOfWeek] !== 'Closed';
              
              return (
                <button
                  key={index}
                  onClick={() => isAvailable && handleDateSelect(date)}
                  disabled={!isAvailable}
                  className={`py-2 px-3 border rounded-md text-sm font-medium focus:outline-none ${
                    selectedDate && date.toDateString() === selectedDate.toDateString()
                      ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                      : isAvailable
                      ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      : 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed'
                  }`}
                >
                  <div className="font-bold">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                  <div>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Time Selection */}
        {selectedDate && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Select a Time
            </h4>
            
            {availableTimes.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {availableTimes.map((time, index) => (
                  <button
                    key={index}
                    onClick={() => handleTimeSelect(time)}
                    className={`py-2 px-3 border rounded-md text-sm font-medium focus:outline-none ${
                      selectedTime === time
                        ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                Sorry, the dealership is closed on this day. Please select a different date.
              </p>
            )}
          </div>
        )}
        
        {/* Contact Information */}
        <form onSubmit={handleSubmit}>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Your Contact Information</h4>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="firstName" className="sr-only">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First Name*"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="sr-only">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last Name*"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="sr-only">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address*"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number*"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={loading || !selectedDate || !selectedTime}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 disabled:bg-gray-300"
            >
              {loading ? 'Scheduling...' : 'Schedule Test Drive'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}