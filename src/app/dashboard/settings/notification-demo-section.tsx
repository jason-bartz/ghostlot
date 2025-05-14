"use client";

import React from 'react';
import NotificationDemo from '@/components/ui/notification-demo';

export default function NotificationDemoSection() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4">Notification Demo</h3>
      <p className="text-gray-600 mb-4">
        This section allows you to test the notification system. Use the buttons below to manually trigger different types of notifications or enable the automatic demo mode.
      </p>
      
      <div className="mb-4">
        <h4 className="text-md font-medium mb-2">What You'll See:</h4>
        <ul className="list-disc pl-5 text-gray-600 space-y-1">
          <li>Reservation notifications appear with a green accent</li>
          <li>Test drive notifications appear with a blue accent</li>
          <li>Demo mode will show a reservation notification after 3 seconds</li>
          <li>Demo mode will show a test drive notification 8 seconds later</li>
        </ul>
      </div>
      
      <NotificationDemo />
    </div>
  );
}