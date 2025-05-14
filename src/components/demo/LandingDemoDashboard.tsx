"use client";

import React from 'react';
import DemoDashboard from './DemoDashboard';

/**
 * Wrapper component for the demo dashboard on the landing page
 * This allows us to render the dashboard with specific settings for the landing page
 */
export default function LandingDemoDashboard() {
  return (
    <div className="landing-demo-container">
      <style jsx>{`
        .landing-demo-container {
          position: relative;
          max-width: 1150px;
          margin: 0 auto;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          border: 1px solid var(--gray-light);
        }
      `}</style>
      <DemoDashboard />
    </div>
  );
}