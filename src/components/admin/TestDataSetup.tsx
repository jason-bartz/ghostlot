"use client";

import React, { useState, useEffect } from 'react';
import { AlertCircle, Check, Loader, RefreshCw, Database as DatabaseIcon, Car, QrCode, BarChart2, User, Trash, Calendar as CalendarIcon, BookOpen as BookOpenIcon } from 'lucide-react';
import supabase from '@/lib/supabase';
import type { Database } from '@/lib/supabase';
import dataImportService from '@/utils/dataImportService';
import SampleDataGenerator from '@/utils/sampleDataGenerator';

export default function TestDataSetup() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [status, setStatus] = useState({ message: '', type: '' });
  const [progress, setProgress] = useState(0);
  const [showSuccessDetails, setShowSuccessDetails] = useState(false);
  const [generatedCounts, setGeneratedCounts] = useState({
    dealers: 0,
    vehicles: 0,
    qrCodes: 0,
    testDrives: 0,
    reservations: 0,
    analytics: 0
  });
  const [options, setOptions] = useState({
    includeSampleImages: true,
    generateVehicleSpecs: true,
    createConsumerAccounts: true,
    generateRealisticAnalytics: true,
    vehicleCount: 25,
    timeRange: 90
  });

  // Set up service callbacks when component mounts
  useEffect(() => {
    dataImportService.setProgressCallback((progress) => {
      setProgress(progress);
    });

    dataImportService.setStatusCallback((message, type) => {
      setStatus({ message, type });
    });

    return () => {
      // Clear callbacks when component unmounts
      dataImportService.setProgressCallback(null);
      dataImportService.setStatusCallback(null);
    };
  }, []);

  // Handle option changes
  const handleOptionChange = (key: string, value: boolean | number) => {
    setOptions({
      ...options,
      [key]: value
    });
  };

  // Generate test data using the service
  const generateTestData = async () => {
    setIsGenerating(true);
    setProgress(0);
    setShowSuccessDetails(false);
    setStatus({ message: 'Starting test data generation...', type: 'info' });

    try {
      const result = await dataImportService.generateTestData(options);

      if (result.success) {
        setGeneratedCounts(result.counts);
        setShowSuccessDetails(true);
      } else if (result.cancelled) {
        setStatus({ message: 'Operation cancelled by user.', type: 'warning' });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setStatus({ message: `Error generating test data: ${errorMessage}`, type: 'error' });
    } finally {
      setIsGenerating(false);
    }
  };

  // Clear test data using the service
  const clearTestData = async () => {
    setIsClearing(true);
    setStatus({ message: 'Clearing test data...', type: 'info' });

    try {
      const result = await dataImportService.clearTestData();

      if (result.success) {
        setGeneratedCounts({
          dealers: 0,
          vehicles: 0,
          qrCodes: 0,
          testDrives: 0,
          reservations: 0,
          analytics: 0
        });
        setShowSuccessDetails(false);
      } else if (result.cancelled) {
        setStatus({ message: 'Operation cancelled by user.', type: 'warning' });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setStatus({ message: `Error clearing test data: ${errorMessage}`, type: 'error' });
    } finally {
      setIsClearing(false);
    }
  };

  // Cancel current operation
  const cancelOperation = () => {
    dataImportService.cancelOperation();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Test Data Setup</h2>
        <div className="flex space-x-3">
          <button
            onClick={generateTestData}
            disabled={isGenerating || isClearing}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isGenerating ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {isGenerating ? (
              <>
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <DatabaseIcon className="h-4 w-4 mr-2" />
                Generate Test Data
              </>
            )}
          </button>
          {(isGenerating || isClearing) && (
            <button
              onClick={cancelOperation}
              className="flex items-center px-4 py-2 rounded-md text-sm font-medium bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              Cancel
            </button>
          )}
          <button
            onClick={clearTestData}
            disabled={isGenerating || isClearing}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
              isClearing ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            {isClearing ? (
              <>
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                Clearing...
              </>
            ) : (
              <>
                <Trash className="h-4 w-4 mr-2" />
                Clear All Test Data
              </>
            )}
          </button>
        </div>
      </div>

      {/* Setup Instructions */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Test Data Setup Instructions</h3>
        <p className="text-gray-600 mb-4">
          This utility helps you set up realistic test data for GhostLot demos and development. 
          The generated data includes dealer profiles, vehicles, QR codes, test drive requests, 
          reservations, and analytics data.
        </p>
        
        <div className="mb-4">
          <h4 className="text-base font-medium text-gray-700 mb-2">What will be created:</h4>
          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            <li>3 Dealer profiles with customized settings</li>
            <li>25 Vehicles with complete specifications and images</li>
            <li>QR codes for all vehicles</li>
            <li>12 Test drive requests in various statuses</li>
            <li>8 Vehicle reservations with payment information</li>
            <li>150+ Analytics data points for QR scans and user interactions</li>
          </ul>
        </div>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Note:</strong> Generating new test data will not affect any existing real data in your database.
                However, using "Clear All Test Data" will remove all data created by this tool.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Status and Progress */}
      {status.message && (
        <div className={`bg-white shadow-md rounded-lg p-6 mb-6 ${isGenerating || isClearing ? '' : 'border-l-4 border-' + (status.type === 'success' ? 'green' : status.type === 'error' ? 'red' : 'blue') + '-500'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Operation Status</h3>
            {(status.type === 'success' || status.type === 'error') && !isGenerating && !isClearing && (
              <button 
                onClick={() => setStatus({ message: '', type: '' })}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          <div className="flex items-start">
            {status.type === 'success' && !isGenerating && !isClearing && (
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            )}
            {status.type === 'error' && !isGenerating && !isClearing && (
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
            )}
            {status.type === 'info' && (
              <div className="mr-2 mt-0.5">
                {isGenerating || isClearing ? (
                  <Loader className="h-5 w-5 text-indigo-500 animate-spin" />
                ) : (
                  <RefreshCw className="h-5 w-5 text-blue-500" />
                )}
              </div>
            )}
            <div className="flex-1">
              <p className={`text-${status.type === 'success' ? 'green' : status.type === 'error' ? 'red' : 'blue'}-600`}>
                {status.message}
              </p>
              
              {/* Progress bar for generation */}
              {isGenerating && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">{progress}% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {/* Generation statistics */}
              {showSuccessDetails && status.type === 'success' && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Generated Test Data Summary</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-indigo-500 mr-2" />
                      <span className="text-sm text-gray-600">
                        {generatedCounts.dealers} Dealer {generatedCounts.dealers === 1 ? 'Profile' : 'Profiles'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Car className="h-4 w-4 text-indigo-500 mr-2" />
                      <span className="text-sm text-gray-600">
                        {generatedCounts.vehicles} {generatedCounts.vehicles === 1 ? 'Vehicle' : 'Vehicles'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <QrCode className="h-4 w-4 text-indigo-500 mr-2" />
                      <span className="text-sm text-gray-600">
                        {generatedCounts.qrCodes} QR {generatedCounts.qrCodes === 1 ? 'Code' : 'Codes'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 text-indigo-500 mr-2" />
                      <span className="text-sm text-gray-600">
                        {generatedCounts.testDrives} Test {generatedCounts.testDrives === 1 ? 'Drive' : 'Drives'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <BookOpenIcon className="h-4 w-4 text-indigo-500 mr-2" />
                      <span className="text-sm text-gray-600">
                        {generatedCounts.reservations} {generatedCounts.reservations === 1 ? 'Reservation' : 'Reservations'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <BarChart2 className="h-4 w-4 text-indigo-500 mr-2" />
                      <span className="text-sm text-gray-600">
                        {generatedCounts.analytics} Analytics {generatedCounts.analytics === 1 ? 'Entry' : 'Entries'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Configuration Options */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Data Generation Options</h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Include Sample Images
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={options.includeSampleImages}
                  onChange={(e) => handleOptionChange('includeSampleImages', e.target.checked)}
                  disabled={isGenerating || isClearing}
                />
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Use a collection of sample vehicle images from our library. If disabled, placeholder images will be used.
            </p>
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Generate Complete Vehicle Specs
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={options.generateVehicleSpecs}
                  onChange={(e) => handleOptionChange('generateVehicleSpecs', e.target.checked)}
                  disabled={isGenerating || isClearing}
                />
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Include detailed specifications for each vehicle. If disabled, only basic info will be generated.
            </p>
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Create Sample Consumer Accounts
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={options.createConsumerAccounts}
                  onChange={(e) => handleOptionChange('createConsumerAccounts', e.target.checked)}
                  disabled={isGenerating || isClearing}
                />
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Create sample consumer accounts for testing the consumer experience.
            </p>
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Generate Realistic Analytics
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={options.generateRealisticAnalytics}
                  onChange={(e) => handleOptionChange('generateRealisticAnalytics', e.target.checked)}
                  disabled={isGenerating || isClearing}
                />
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Generate realistic analytics data with patterns and trends over time.
            </p>
          </div>
          
          <div>
            <label htmlFor="vehicle-count" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Vehicles ({options.vehicleCount})
            </label>
            <input
              type="range"
              id="vehicle-count"
              name="vehicle-count"
              min="5"
              max="50"
              value={options.vehicleCount}
              onChange={(e) => handleOptionChange('vehicleCount', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              disabled={isGenerating || isClearing}
            />
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">5</span>
              <span className="text-xs text-gray-500">25</span>
              <span className="text-xs text-gray-500">50</span>
            </div>
          </div>
          
          <div>
            <label htmlFor="time-range" className="block text-sm font-medium text-gray-700 mb-1">
              Data Time Range
            </label>
            <select
              id="time-range"
              name="time-range"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={options.timeRange}
              onChange={(e) => handleOptionChange('timeRange', parseInt(e.target.value))}
              disabled={isGenerating || isClearing}
            >
              <option value="30">Last 30 days</option>
              <option value="60">Last 60 days</option>
              <option value="90">Last 90 days</option>
              <option value="180">Last 6 months</option>
              <option value="365">Last year</option>
            </select>
            <p className="mt-1 text-xs text-gray-500">
              Time range for generated analytics and activities.
            </p>
          </div>
          
          <div className="pt-4 border-t border-gray-200 mt-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Data Generation Summary</h4>
                <p className="text-xs text-gray-500 mt-1">
                  With current settings, approximately {options.vehicleCount} vehicles, 
                  {options.createConsumerAccounts ? ' 30 consumers,' : ''} 
                  {options.vehicleCount} QR codes, and {Math.round(options.vehicleCount * 6)} analytics entries 
                  will be generated over the past {options.timeRange} days.
                </p>
              </div>
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  ~ {isGenerating ? progress : 0}% Complete
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Define the icon props interface
interface IconProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

// Define Calendar and BookOpen icons since they might not be available in lucide-react
const Calendar = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || props.className?.includes('w-') ? undefined : "24"}
    height={props.height || props.className?.includes('h-') ? undefined : "24"}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className || ""}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const BookOpen = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || props.className?.includes('w-') ? undefined : "24"}
    height={props.height || props.className?.includes('h-') ? undefined : "24"}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className || ""}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);