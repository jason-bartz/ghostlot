"use client";

import React, { useState, useEffect } from 'react';
import { CreditCard, Calendar, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type NotificationType = 'reservation' | 'testdrive';

export interface NotificationProps {
  id: string;
  type: NotificationType;
  vehicle: {
    year: string;
    make: string;
    model: string;
    trim?: string;
    image?: string;
  };
  customer: {
    name: string;
    email?: string;
    phone?: string;
  };
  timestamp?: string;
  onClose?: (id: string) => void;
  autoDismiss?: boolean;
  dismissAfter?: number; // in milliseconds
}

const Notification: React.FC<NotificationProps> = ({
  id,
  type,
  vehicle,
  customer,
  timestamp = 'Just now',
  onClose,
  autoDismiss = true,
  dismissAfter = 5000,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoDismiss) {
      const timer = setTimeout(() => {
        handleClose();
      }, dismissAfter);
      
      return () => clearTimeout(timer);
    }
  }, [autoDismiss, dismissAfter]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose(id);
    }, 300); // Wait for animation to finish
  };

  const bgColor = type === 'reservation' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200';
  const icon = type === 'reservation' ? 
    <CreditCard className="h-5 w-5 text-green-600" /> : 
    <Calendar className="h-5 w-5 text-blue-600" />;
  const title = type === 'reservation' ? 'New Reservation' : 'New Test Drive';
  const action = type === 'reservation' ? 'reserved' : 'scheduled a test drive for';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`fixed top-20 right-4 z-50 w-80 shadow-lg rounded-lg overflow-hidden ${bgColor} border`}
        >
          <div className="flex p-4">
            <div className="flex-shrink-0 mr-3">
              {icon}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">{title}</h4>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">{customer.name}</span> has {action} the {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim || ''}
              </p>
              <span className="text-xs text-gray-500 block mt-1">{timestamp}</span>
            </div>
            <button 
              onClick={handleClose}
              className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;