"use client";

import React, { useState } from 'react';
import { Car, BarChart2, QrCode, Calendar, Users, Settings, LogOut } from 'lucide-react';
import { NotificationProvider } from '@/components/ui/notification-provider';
import DemoQRCodesTab from './tabs/DemoQRCodesTab';
import DemoInventoryTab from './tabs/DemoInventoryTab';
import DemoTestDrivesTab from './tabs/DemoTestDrivesTab';
import DemoReservationsTab from './tabs/DemoReservationsTab';
import DemoAnalyticsTab from './tabs/DemoAnalyticsTab';
import DemoSettingsTab from './tabs/DemoSettingsTab';

export default function DemoDashboard() {
  const [activeTab, setActiveTab] = useState<string>('qr-codes');
  
  // Navigation items including Settings
  const navItems = [
    { id: 'qr-codes', label: 'QR Code Generator', icon: <QrCode className="h-5 w-5 mr-3" /> },
    { id: 'inventory', label: 'Inventory', icon: <Car className="h-5 w-5 mr-3" /> },
    { id: 'test-drives', label: 'Test Drive Requests', icon: <Calendar className="h-5 w-5 mr-3" /> },
    { id: 'reservations', label: 'Reservations', icon: <Users className="h-5 w-5 mr-3" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 className="h-5 w-5 mr-3" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5 mr-3" /> },
  ];
  
  return (
    <NotificationProvider demoMode={true}>
      <div className="flex h-[600px] w-[900px] bg-gray-100 overflow-hidden border border-gray-200 rounded-lg shadow-xl text-sm">
        {/* Demo badge */}
        <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
          Interactive Demo
        </div>
        
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md">
          <div className="p-6">
            <div className="flex flex-col items-center">
              <img src="/ghostlot2.png" alt="GhostLot Logo" className="h-32 w-32" />
            </div>
          </div>
          
          <nav className="mt-3">
            {navItems.map((item) => (
              <div 
                key={item.id}
                className={`flex items-center px-6 py-3 cursor-pointer ${activeTab === item.id ? 'bg-indigo-50 border-r-4 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab(item.id)}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
            
            {/* Sign Out Option */}
            <div className="flex items-center px-6 py-3 cursor-pointer text-gray-600 mt-auto border-t border-gray-100">
              <LogOut className="h-5 w-5 mr-3" />
              <span>Sign Out</span>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {activeTab === 'qr-codes' && <DemoQRCodesTab />}
          {activeTab === 'inventory' && <DemoInventoryTab />}
          {activeTab === 'test-drives' && <DemoTestDrivesTab />}
          {activeTab === 'reservations' && <DemoReservationsTab />}
          {activeTab === 'analytics' && <DemoAnalyticsTab />}
          {activeTab === 'settings' && <DemoSettingsTab />}
        </div>
      </div>
    </NotificationProvider>
  );
}