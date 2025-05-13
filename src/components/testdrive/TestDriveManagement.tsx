"use client";

import React, { useEffect, useState } from 'react';
import { Calendar, Clock, Phone, Mail, CheckCircle, XCircle } from 'lucide-react';
import supabase from '@/lib/supabase';
import mockTestDrives from '@/utils/mockTestDrives';

type TestDriveRequest = {
  id: string;
  vehicle_id?: string;
  consumer_id?: string;
  date?: string;
  time?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  created_at?: string;
  customer?: {
    name: string;
    email: string;
    phone: string;
  };
  consumer?: {
    name: string;
    email: string;
    phone: string;
  };
  vehicle: {
    make: string;
    model: string;
    year: number;
    trim: string;
    stock_number?: string;
    vin?: string;
  };
  date_time?: {
    date: string;
    time: string;
  };
  actions?: string[];
};

export default function TestDriveManagement() {
  const [loading, setLoading] = useState(false);
  const [testDrives, setTestDrives] = useState<TestDriveRequest[]>(mockTestDrives);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  // No need to fetch data, using mock data directly
  useEffect(() => {
    // Initialize with mock data
    setLoading(false);
  }, []);
  
  const updateTestDriveStatus = (id: string, status: 'Confirmed' | 'Completed' | 'Cancelled') => {
    // Update local state only
    setTestDrives(prev => 
      prev.map(testDrive => 
        testDrive.id === id ? { ...testDrive, status } : testDrive
      )
    );
  };
  
  // Filter test drives based on status
  const filteredTestDrives = filterStatus === 'all' 
    ? testDrives 
    : testDrives.filter(td => td.status.toLowerCase() === filterStatus);
  
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Test Drive Requests</h1>
      </div>
      
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div className="mb-6 hidden">
        <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Status
        </label>
        <select
          id="statusFilter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="all">All Requests</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-500 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading test drive requests...</p>
        </div>
      ) : filteredTestDrives.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No test drive requests found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTestDrives.map((testDrive) => (
                <tr key={testDrive.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {testDrive.customer?.name || testDrive.consumer?.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testDrive.customer?.email || testDrive.consumer?.email}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testDrive.customer?.phone || testDrive.consumer?.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {testDrive.vehicle.year} {testDrive.vehicle.make} {testDrive.vehicle.model} {testDrive.vehicle.trim}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {testDrive.date_time?.date || testDrive.date}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testDrive.date_time?.time || testDrive.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      testDrive.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      testDrive.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                      testDrive.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {testDrive.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {testDrive.status === 'Pending' && (
                      <div className="space-x-2">
                        <button
                          onClick={() => updateTestDriveStatus(testDrive.id, 'Confirmed')}
                          className="text-green-600 hover:text-green-900"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => updateTestDriveStatus(testDrive.id, 'Cancelled')}
                          className="text-red-600 hover:text-red-900"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={() => window.location.href = `mailto:${testDrive.customer?.email || testDrive.consumer?.email}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Contact
                        </button>
                      </div>
                    )}
                    {testDrive.status === 'Confirmed' && (
                      <div className="space-x-2">
                        <button
                          onClick={() => updateTestDriveStatus(testDrive.id, 'Completed')}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Mark Completed
                        </button>
                        <button
                          onClick={() => updateTestDriveStatus(testDrive.id, 'Cancelled')}
                          className="text-red-600 hover:text-red-900"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={() => window.location.href = `mailto:${testDrive.customer?.email || testDrive.consumer?.email}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Contact
                        </button>
                      </div>
                    )}
                    {testDrive.status === 'Completed' && (
                      <div className="space-x-2">
                        <button 
                          onClick={() => window.location.href = `mailto:${testDrive.customer?.email || testDrive.consumer?.email}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Contact
                        </button>
                      </div>
                    )}
                    {testDrive.status === 'Cancelled' && (
                      <span className="text-gray-500">No actions available</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}