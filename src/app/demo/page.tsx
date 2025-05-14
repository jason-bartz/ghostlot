"use client";

import React from 'react';
import LandingDemoDashboard from "@/components/demo/LandingDemoDashboard";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";

export default function DemoPage() {
  return (
    <div className="min-h-screen">
      {/* Background */}
      <AnimatedGradientBackground className="fixed inset-0 z-0" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center py-12 px-4">
        <header className="w-full max-w-4xl mb-10 text-center">
          <div className="flex justify-center mb-4">
            <img src="/ghostlot.png" alt="GhostLot Logo" className="h-16 w-16" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            GhostLot Interactive Demo
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            Experience how GhostLot helps dealerships connect with customers 24/7. 
            Explore the dealer dashboard interface below.
          </p>
        </header>
        
        <main className="w-full max-w-5xl mb-8">
          <LandingDemoDashboard />
        </main>
        
        <footer className="w-full max-w-4xl mt-auto text-center text-white/80">
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
      </div>
    </div>
  );
}