"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import Notification, { NotificationProps } from './notification';

type NotificationContextType = {
  showNotification: (notification: Omit<NotificationProps, 'id'>) => string;
  removeNotification: (id: string) => void;
  simulateDemoNotifications: (enabled?: boolean) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
  demoMode?: boolean;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ 
  children, 
  demoMode = false 
}) => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [runDemoMode, setRunDemoMode] = useState(demoMode);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const showNotification = (notification: Omit<NotificationProps, 'id'>) => {
    const id = generateId();
    setNotifications(current => [...current, { ...notification, id }]);
    return id;
  };

  const removeNotification = (id: string) => {
    setNotifications(current => current.filter(notification => notification.id !== id));
  };

  const simulateDemoNotifications = (enabled = true) => {
    setRunDemoMode(enabled);
  };

  // Demo notification simulation
  useEffect(() => {
    if (!runDemoMode) return;

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

    // First notification - Reservation
    const timer1 = setTimeout(() => {
      showNotification({
        type: 'reservation',
        vehicle: demoVehicles[0],
        customer: demoCustomers[0],
        autoDismiss: true,
        dismissAfter: 5000,
      });
    }, 3000);

    // Second notification - Test Drive (appears 8 seconds after the first one disappears)
    const timer2 = setTimeout(() => {
      showNotification({
        type: 'testdrive',
        vehicle: demoVehicles[1],
        customer: demoCustomers[1],
        autoDismiss: true,
        dismissAfter: 5000,
      });
    }, 16000); // 3s initial + 5s display + 8s gap

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [runDemoMode]);

  return (
    <NotificationContext.Provider value={{ showNotification, removeNotification, simulateDemoNotifications }}>
      {children}
      <div className="notification-container">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            {...notification}
            onClose={removeNotification}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;