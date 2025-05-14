"use client";

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Car, BarChart2, QrCode, Settings, Calendar, Users, LogOut } from 'lucide-react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/components/ui/notification-provider';
import Head from 'next/head';

export const metadata = {
  title: 'GhostLot™ Dealer Dashboard',
  description: 'Manage your dealership inventory, QR codes, test drives, reservations, and analytics in one place.',
  openGraph: {
    type: 'website',
    title: 'GhostLot™ Dealer Dashboard',
    description: 'Manage your dealership inventory, QR codes, test drives, reservations, and analytics in one place.',
    images: ['/opengraph.webp'],
    siteName: 'GhostLot™',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GhostLot™ Dealer Dashboard',
    description: 'Manage your dealership inventory, QR codes, test drives, reservations, and analytics in one place.',
    images: ['/opengraph.webp'],
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <NotificationProvider demoMode={true}>
      <DashboardContent>{children}</DashboardContent>
    </NotificationProvider>
  );
}

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { user, signOut, userType } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  
  // Redirect if not logged in or not a dealer
  React.useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (userType !== 'dealer') {
      // Don't redirect to a non-existent route
      // Consumer users should stay on dashboard but with limited access
      console.log('Consumer user accessing dealer dashboard');
    }
  }, [user, userType, router]);
  
  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };
  
  const navItems = [
    { path: '/dashboard/qr-codes', label: 'QR Code Generator', icon: <QrCode className="h-5 w-5 mr-3" /> },
    { path: '/dashboard/inventory', label: 'Inventory', icon: <Car className="h-5 w-5 mr-3" /> },
    { path: '/dashboard/test-drives', label: 'Test Drive Requests', icon: <Calendar className="h-5 w-5 mr-3" /> },
    { path: '/dashboard/reservations', label: 'Reservations', icon: <Users className="h-5 w-5 mr-3" /> },
    { path: '/dashboard/analytics', label: 'Analytics', icon: <BarChart2 className="h-5 w-5 mr-3" /> },
    { path: '/dashboard/settings', label: 'Settings', icon: <Settings className="h-5 w-5 mr-3" /> },
  ];
  
  if (!user) {
    return null;
  }
  
  return (
    <>
      <Head>
        <title>GhostLot™ Dealer Dashboard</title>
        <meta name="description" content="Manage your dealership inventory, QR codes, test drives, reservations, and analytics in one place." />
        <meta property="og:title" content="GhostLot™ Dealer Dashboard" />
        <meta property="og:description" content="Manage your dealership inventory, QR codes, test drives, reservations, and analytics in one place." />
        <meta property="og:image" content="/opengraph.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="GhostLot™" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GhostLot™ Dealer Dashboard" />
        <meta name="twitter:description" content="Manage your dealership inventory, QR codes, test drives, reservations, and analytics in one place." />
        <meta name="twitter:image" content="/opengraph.webp" />
      </Head>
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md">
          <div className="p-6">
            <div className="flex flex-col items-center">
              <img src="/ghostlot2.png" alt="GhostLot Logo" className="h-28 w-28" />
            </div>
          </div>
          
          <nav className="mt-6">
            {navItems.map((item) => (
              <div 
                key={item.path}
                className={`flex items-center px-6 py-3 cursor-pointer ${pathname === item.path ? 'bg-indigo-50 border-r-4 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}
                onClick={() => router.push(item.path)}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
            
            <div 
              className="flex items-center px-6 py-3 cursor-pointer text-gray-600 mt-auto"
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>Sign Out</span>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </>
  );
}