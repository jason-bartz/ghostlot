"use client";

import React from 'react';
import { useNotifications } from './notification-provider';

export default function NotificationDemo() {
  const { showNotification, simulateDemoNotifications } = useNotifications();

  // Sample vehicles for demo
  const demoVehicles = [
    { year: '2023', make: 'Toyota', model: 'Camry', trim: 'XLE' },
    { year: '2022', make: 'Honda', model: 'Accord', trim: 'Sport' },
    { year: '2021', make: 'Ford', model: 'F-150', trim: 'Lariat' },
    { year: '2023', make: 'Tesla', model: 'Model 3', trim: 'Long Range' }
  ];

  // Sample customer names
  const demoCustomers = [
    { name: 'John Smith', email: 'john.smith@example.com' },
    { name: 'Sarah Johnson', email: 'sarah.j@example.com' },
    { name: 'Michael Brown', email: 'm.brown@example.com' },
    { name: 'Emma Wilson', email: 'emma.w@example.com' }
  ];

  const showReservationNotification = () => {
    const randomVehicle = demoVehicles[Math.floor(Math.random() * demoVehicles.length)];
    const randomCustomer = demoCustomers[Math.floor(Math.random() * demoCustomers.length)];
    
    showNotification({
      type: 'reservation',
      vehicle: randomVehicle,
      customer: randomCustomer,
      autoDismiss: true,
      dismissAfter: 5000,
    });
  };

  const showTestDriveNotification = () => {
    const randomVehicle = demoVehicles[Math.floor(Math.random() * demoVehicles.length)];
    const randomCustomer = demoCustomers[Math.floor(Math.random() * demoCustomers.length)];
    
    showNotification({
      type: 'testdrive',
      vehicle: randomVehicle,
      customer: randomCustomer,
      autoDismiss: true,
      dismissAfter: 5000,
    });
  };

  const startDemoMode = () => {
    simulateDemoNotifications(true);
  };

  const stopDemoMode = () => {
    simulateDemoNotifications(false);
  };

  return (
    <div className="flex space-x-2 mt-4">
      <button 
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        onClick={showReservationNotification}
      >
        Show Reservation
      </button>
      <button 
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        onClick={showTestDriveNotification}
      >
        Show Test Drive
      </button>
      <button 
        className="bg-white border border-green-600 text-green-600 hover:bg-green-50 px-4 py-2 rounded-md text-sm font-medium"
        onClick={startDemoMode}
      >
        Start Demo
      </button>
      <button 
        className="bg-white border border-red-600 text-red-600 hover:bg-red-50 px-4 py-2 rounded-md text-sm font-medium"
        onClick={stopDemoMode}
      >
        Stop Demo
      </button>
    </div>
  );
}