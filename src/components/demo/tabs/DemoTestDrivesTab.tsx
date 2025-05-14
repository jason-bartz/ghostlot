"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

// Demo test drive data
const demoTestDrives = [
  {
    id: "td1",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    vehicle: {
      id: "v1",
      year: "2023",
      make: "Toyota",
      model: "Camry",
      trim: "XLE"
    },
    customer: {
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "(555) 123-4567"
    },
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: "10:30 AM",
    status: "Pending",
    notes: "Customer is interested in upgrading from a 2018 Camry"
  },
  {
    id: "td2",
    created_at: new Date(Date.now() - 172800000).toISOString(),
    vehicle: {
      id: "v2",
      year: "2022",
      make: "Honda",
      model: "Accord",
      trim: "Sport"
    },
    customer: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "(555) 987-6543"
    },
    date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
    time: "3:00 PM",
    status: "Confirmed",
    notes: "Customer is comparing with Toyota Camry and Mazda 6"
  },
  {
    id: "td3",
    created_at: new Date(Date.now() - 259200000).toISOString(),
    vehicle: {
      id: "v3",
      year: "2021",
      make: "Ford",
      model: "F-150",
      trim: "Lariat"
    },
    customer: {
      name: "Michael Brown",
      email: "m.brown@example.com",
      phone: "(555) 456-7890"
    },
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    time: "1:45 PM",
    status: "Completed",
    notes: "Customer is trading in a 2015 Chevrolet Silverado"
  },
  {
    id: "td4",
    created_at: new Date(Date.now() - 345600000).toISOString(),
    vehicle: {
      id: "v4",
      year: "2023",
      make: "Tesla",
      model: "Model 3",
      trim: "Long Range"
    },
    customer: {
      name: "Emma Wilson",
      email: "emma.w@example.com",
      phone: "(555) 234-5678"
    },
    date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
    time: "11:00 AM",
    status: "Cancelled",
    notes: "Customer rescheduled then cancelled due to financing"
  }
];

export default function DemoTestDrivesTab() {
  const [testDrives, setTestDrives] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showDetails, setShowDetails] = useState<string | null>(null);
  
  // Load test drives
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      let filtered = [...demoTestDrives];
      
      // Apply filter if needed
      if (filter !== 'all') {
        filtered = demoTestDrives.filter(td => td.status.toLowerCase() === filter);
      }
      
      setTestDrives(filtered);
      setLoading(false);
    }, 500);
  }, [filter]);
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };
  
  const updateStatus = (id: string, status: string) => {
    setTestDrives(
      testDrives.map(td => 
        td.id === id
          ? { ...td, status }
          : td
      )
    );
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'Pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'Completed':
        return <CheckCircle className="h-5 w-5 text-blue-600" />;
      case 'Cancelled':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center">Loading test drives...</div>
      </div>
    );
  }
  
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Test Drive Requests</h2>
        <div className="flex gap-4">
          <select
            value={filter}
            onChange={handleFilterChange}
            className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Calendar className="h-4 w-4 inline mr-2" />
            Calendar View
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {testDrives.map((td) => (
              <React.Fragment key={td.id}>
                <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => setShowDetails(showDetails === td.id ? null : td.id)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{td.customer.name}</div>
                    <div className="text-sm text-gray-500">{td.customer.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {td.vehicle.year} {td.vehicle.make} {td.vehicle.model} {td.vehicle.trim}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{new Date(td.date).toLocaleDateString()}</div>
                    <div>{td.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusClass(td.status)}`}>
                      {getStatusIcon(td.status)}
                      <span className="ml-1">{td.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {td.status === 'Pending' && (
                      <>
                        <button 
                          onClick={(e) => { e.stopPropagation(); updateStatus(td.id, 'Confirmed'); }}
                          className="text-green-600 hover:text-green-900 mr-4"
                        >
                          Confirm
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); updateStatus(td.id, 'Cancelled'); }}
                          className="text-red-600 hover:text-red-900"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {td.status === 'Confirmed' && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); updateStatus(td.id, 'Completed'); }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Mark Completed
                      </button>
                    )}
                  </td>
                </tr>
                {showDetails === td.id && (
                  <tr className="bg-gray-50">
                    <td colSpan={5} className="px-6 py-4">
                      <div className="mb-2">
                        <h4 className="text-sm font-medium text-gray-900">Customer Details:</h4>
                        <p className="text-sm text-gray-500">{td.customer.phone}</p>
                      </div>
                      <div className="mb-2">
                        <h4 className="text-sm font-medium text-gray-900">Notes:</h4>
                        <p className="text-sm text-gray-500">{td.notes || 'No notes provided'}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Request Created:</h4>
                        <p className="text-sm text-gray-500">{new Date(td.created_at).toLocaleString()}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            
            {testDrives.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  No test drive requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}