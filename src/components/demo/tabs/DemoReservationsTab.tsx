"use client";

import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, DollarSign } from 'lucide-react';

// Demo reservations data
const demoReservations = [
  {
    id: "res1",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    vehicle: {
      id: "v1",
      year: "2023",
      make: "Toyota",
      model: "Camry",
      trim: "XLE",
      price: 32999
    },
    customer: {
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "(555) 123-4567"
    },
    deposit_amount: 500,
    status: "Pending",
    has_trade_in: false,
    trade_in_details: null,
    financing_pre_approved: true,
    pickup_date: new Date(Date.now() + 604800000).toISOString().split('T')[0],
    notes: "Customer wants to add extended warranty"
  },
  {
    id: "res2",
    created_at: new Date(Date.now() - 172800000).toISOString(),
    vehicle: {
      id: "v2",
      year: "2022",
      make: "Honda",
      model: "Accord",
      trim: "Sport",
      price: 28995
    },
    customer: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "(555) 987-6543"
    },
    deposit_amount: 1000,
    status: "Confirmed",
    has_trade_in: true,
    trade_in_details: {
      year: "2017",
      make: "Honda",
      model: "Civic",
      estimated_value: 12500
    },
    financing_pre_approved: false,
    pickup_date: new Date(Date.now() + 345600000).toISOString().split('T')[0],
    notes: "Customer needs financing through dealership"
  },
  {
    id: "res3",
    created_at: new Date(Date.now() - 259200000).toISOString(),
    vehicle: {
      id: "v3",
      year: "2021",
      make: "Ford",
      model: "F-150",
      trim: "Lariat",
      price: 45999
    },
    customer: {
      name: "Michael Brown",
      email: "m.brown@example.com",
      phone: "(555) 456-7890"
    },
    deposit_amount: 750,
    status: "Completed",
    has_trade_in: true,
    trade_in_details: {
      year: "2015",
      make: "Chevrolet",
      model: "Silverado",
      estimated_value: 17000
    },
    financing_pre_approved: true,
    pickup_date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    notes: "Deal completed 5/1/25"
  },
  {
    id: "res4",
    created_at: new Date(Date.now() - 345600000).toISOString(),
    vehicle: {
      id: "v4",
      year: "2023",
      make: "Tesla",
      model: "Model 3",
      trim: "Long Range",
      price: 52990
    },
    customer: {
      name: "Emma Wilson",
      email: "emma.w@example.com",
      phone: "(555) 234-5678"
    },
    deposit_amount: 1500,
    status: "Cancelled",
    has_trade_in: false,
    trade_in_details: null,
    financing_pre_approved: true,
    pickup_date: null,
    notes: "Customer found vehicle at another dealership"
  }
];

export default function DemoReservationsTab() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showDetails, setShowDetails] = useState<string | null>(null);
  
  // Load reservations
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      let filtered = [...demoReservations];
      
      // Apply filter if needed
      if (filter !== 'all') {
        filtered = demoReservations.filter(res => res.status.toLowerCase() === filter);
      }
      
      setReservations(filtered);
      setLoading(false);
    }, 500);
  }, [filter]);
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };
  
  const updateStatus = (id: string, status: string) => {
    setReservations(
      reservations.map(res => 
        res.id === id
          ? { ...res, status }
          : res
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
        <div className="text-center">Loading reservations...</div>
      </div>
    );
  }
  
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Vehicle Reservations</h2>
        <div className="flex gap-4">
          <select
            value={filter}
            onChange={handleFilterChange}
            className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Reservations</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Export Report
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
                Deposit
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pickup Date
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
            {reservations.map((res) => (
              <React.Fragment key={res.id}>
                <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => setShowDetails(showDetails === res.id ? null : res.id)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{res.customer.name}</div>
                    <div className="text-sm text-gray-500">{res.customer.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {res.vehicle.year} {res.vehicle.make} {res.vehicle.model} {res.vehicle.trim}
                    <div className="font-medium text-gray-900">${res.vehicle.price.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="inline-flex items-center text-sm font-medium text-green-600">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {res.deposit_amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {res.pickup_date ? new Date(res.pickup_date).toLocaleDateString() : 'Not scheduled'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusClass(res.status)}`}>
                      {getStatusIcon(res.status)}
                      <span className="ml-1">{res.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {res.status === 'Pending' && (
                      <>
                        <button 
                          onClick={(e) => { e.stopPropagation(); updateStatus(res.id, 'Confirmed'); }}
                          className="text-green-600 hover:text-green-900 mr-4"
                        >
                          Confirm
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); updateStatus(res.id, 'Cancelled'); }}
                          className="text-red-600 hover:text-red-900"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {res.status === 'Confirmed' && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); updateStatus(res.id, 'Completed'); }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Mark Completed
                      </button>
                    )}
                  </td>
                </tr>
                {showDetails === res.id && (
                  <tr className="bg-gray-50">
                    <td colSpan={6} className="px-6 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Customer Details:</h4>
                          <p className="text-sm text-gray-500">Phone: {res.customer.phone}</p>
                          <p className="text-sm text-gray-500">Financing Pre-approved: {res.financing_pre_approved ? 'Yes' : 'No'}</p>
                        </div>
                        <div>
                          {res.has_trade_in && res.trade_in_details && (
                            <>
                              <h4 className="text-sm font-medium text-gray-900 mb-2">Trade-in Vehicle:</h4>
                              <p className="text-sm text-gray-500">
                                {res.trade_in_details.year} {res.trade_in_details.make} {res.trade_in_details.model}
                              </p>
                              <p className="text-sm text-gray-500">
                                Estimated Value: ${res.trade_in_details.estimated_value.toLocaleString()}
                              </p>
                            </>
                          )}
                        </div>
                        <div className="col-span-2">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Notes:</h4>
                          <p className="text-sm text-gray-500">{res.notes || 'No notes provided'}</p>
                        </div>
                        <div className="col-span-2">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Reservation Created:</h4>
                          <p className="text-sm text-gray-500">{new Date(res.created_at).toLocaleString()}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            
            {reservations.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  No reservations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}