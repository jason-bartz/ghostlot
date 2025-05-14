"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Smartphone, Monitor } from 'lucide-react';

// Use dynamic import with SSR disabled to avoid hydration issues
const LandingDemoDashboard = dynamic(
  () => import("@/components/demo/LandingDemoDashboard"),
  { ssr: false }
);

// Import the consumer view component
const ConsumerViewDemo = dynamic(
  () => import("@/components/demo/ConsumerViewDemo"),
  { ssr: false }
);

import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";

export default function DemoPage() {
  const [viewMode, setViewMode] = useState<'dealer' | 'consumer'>('dealer');
  const [showConsumerModal, setShowConsumerModal] = useState(false);

  // Toggle between dealer and consumer views
  const toggleViewMode = () => {
    if (viewMode === 'dealer') {
      setViewMode('consumer');
      setShowConsumerModal(true);
    } else {
      setViewMode('dealer');
      setShowConsumerModal(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Background */}
      <AnimatedGradientBackground className="fixed inset-0 z-0" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center py-8 px-4">
        <header className="w-full max-w-5xl mb-6 text-center">
          <div className="flex justify-center mb-3">
            <img src="/ghostlot.png" alt="GhostLot Logo" className="h-16 w-16" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            GhostLot Interactive Demo
          </h1>
          <p className="text-base md:text-lg text-white/90 mb-4 max-w-3xl mx-auto">
            Experience how GhostLot helps dealerships connect with customers 24/7.
            Explore the dealer dashboard and consumer mobile interfaces below.
          </p>
        </header>
        
        <main className="w-full max-w-[1160px] mb-6">
          <LandingDemoDashboard />
          
          {/* View Toggle Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={toggleViewMode}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-full transition-colors shadow-lg backdrop-blur-sm"
            >
              {viewMode === 'dealer' ? (
                <>
                  <Smartphone className="h-5 w-5" />
                  <span>View Consumer Mobile Experience</span>
                </>
              ) : (
                <>
                  <Monitor className="h-5 w-5" />
                  <span>View Dealer Dashboard</span>
                </>
              )}
            </button>
          </div>
        </main>
        
        <footer className="w-full max-w-5xl mt-auto text-center text-white/80">
          <p className="mb-2">
            <a 
              href="/" 
              className="hover:text-white transition-colors underline"
            >
              Return to Homepage
            </a>
          </p>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} GhostLot. All rights reserved.
          </p>
        </footer>
        
        {/* Consumer Mobile Modal */}
        {showConsumerModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            onClick={() => {
              setShowConsumerModal(false);
              setViewMode('dealer');
            }}
          >
            <div 
              className="phone-frame relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Phone Frame Styling */}
              <style jsx>{`
                .phone-frame {
                  width: 375px;
                  height: 760px;
                  background-color: black;
                  border-radius: 40px;
                  overflow: hidden;
                  position: relative;
                  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.6);
                  padding: 10px;
                }
                
                .phone-content {
                  width: 100%;
                  height: 100%;
                  overflow: hidden;
                  border-radius: 30px;
                  background-color: white;
                  position: relative;
                }
                
                /* Notch styling */
                .phone-notch {
                  position: absolute;
                  top: 0;
                  left: 50%;
                  transform: translateX(-50%);
                  width: 150px;
                  height: 30px;
                  background-color: black;
                  border-bottom-left-radius: 15px;
                  border-bottom-right-radius: 15px;
                  z-index: 10;
                }
                
                /* Home indicator */
                .home-indicator {
                  position: absolute;
                  bottom: 8px;
                  left: 50%;
                  transform: translateX(-50%);
                  width: 120px;
                  height: 5px;
                  background-color: #ddd;
                  border-radius: 3px;
                  z-index: 10;
                }
              `}</style>
              
              <div className="phone-notch"></div>
              <div className="phone-content">
                <ConsumerViewDemo />
              </div>
              <div className="home-indicator"></div>
            </div>
            
            {/* Close button */}
            <button 
              className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-sm"
              onClick={() => {
                setShowConsumerModal(false);
                setViewMode('dealer');
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}