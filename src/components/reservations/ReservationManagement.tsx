"use client";

import React, { useEffect, useState } from 'react';
import { Calendar, DollarSign, Phone, Mail, CheckCircle, XCircle } from 'lucide-react';
import supabase from '@/lib/supabase';
import mockReservations from '@/utils/mockReservations';

type Reservation = {
  id: string;
  vehicle_id?: string;
  consumer_id?: string;
  deposit_amount?: number;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  has_trade_in?: boolean;
  created_at?: string;
  consumer?: {
    name: string;
    email: string;
    phone: string;
    zip_code?: string;
  };
  customer?: {
    name: string;
    email: string;
    phone: string;
  };
  vehicle: {
    make: string;
    model: string;
    year: number;
    trim?: string;
    price?: number;
    stock_number?: string;
    vin?: string;
  };
  amount?: string;
  reservation_date?: {
    date: string;
    notes: string;
  };
  actions?: string[];
};

export default function ReservationManagement() {
  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  // No need to fetch data, using mock data directly
  useEffect(() => {
    // Initialize with mock data
    setLoading(false);
  }, []);
  
  const updateReservationStatus = (id: string, status: 'Confirmed' | 'Completed' | 'Cancelled') => {
    // Update local state only
    setReservations(prev => 
      prev.map(reservation => 
        reservation.id === id ? { ...reservation, status } : reservation
      )
    );
  };
  
  // Filter reservations based on status
  const filteredReservations = filterStatus === 'all' 
    ? reservations 
    : reservations.filter(r => r.status.toLowerCase() === filterStatus);
  
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Vehicle Reservations</h1>
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
          <option value="all">All Reservations</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-500 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading reservations...</p>
        </div>
      ) : filteredReservations.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No reservations found</p>
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
                  Reservation Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
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
              {filteredReservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {reservation.customer?.name || reservation.consumer?.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {reservation.customer?.email || reservation.consumer?.email}
                    </div>
                    <div className="text-sm text-gray-500">
                      {reservation.customer?.phone || reservation.consumer?.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {reservation.vehicle.year} {reservation.vehicle.make} {reservation.vehicle.model}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {reservation.reservation_date?.date || 
                      (typeof reservation.created_at === 'string' && reservation.created_at.includes('T') 
                        ? new Date(reservation.created_at).toLocaleDateString() 
                        : reservation.created_at)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {reservation.reservation_date?.notes || (
                        reservation.has_trade_in ? (
                          <span>Trade-in vehicle: 2018 Toyota Camry</span>
                        ) : (
                          reservation.status === 'Pending' ? (
                            <span>Customer wants to finance</span>
                          ) : reservation.status === 'Completed' ? (
                            <span>Cash purchase</span>
                          ) : (
                            <span>Waiting for financing approval</span>
                          )
                        )
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {reservation.amount || (reservation.deposit_amount ? `$${reservation.deposit_amount}` : '$500')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      reservation.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      reservation.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                      reservation.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {reservation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {reservation.status === 'Pending' && (
                      <div className="space-x-2">
                        <button
                          onClick={() => updateReservationStatus(reservation.id, 'Confirmed')}
                          className="text-green-600 hover:text-green-900"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => updateReservationStatus(reservation.id, 'Cancelled')}
                          className="text-red-600 hover:text-red-900"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={() => window.location.href = `mailto:${reservation.customer?.email || reservation.consumer?.email}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Contact
                        </button>
                      </div>
                    )}
                    {reservation.status === 'Confirmed' && (
                      <div className="space-x-2">
                        <button
                          onClick={() => updateReservationStatus(reservation.id, 'Completed')}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Mark Completed
                        </button>
                        <button
                          onClick={() => updateReservationStatus(reservation.id, 'Cancelled')}
                          className="text-red-600 hover:text-red-900"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={() => window.location.href = `mailto:${reservation.customer?.email || reservation.consumer?.email}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Contact
                        </button>
                      </div>
                    )}
                    {reservation.status === 'Completed' && (
                      <div className="space-x-2">
                        <button 
                          onClick={() => window.location.href = `mailto:${reservation.customer?.email || reservation.consumer?.email}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Contact
                        </button>
                      </div>
                    )}
                    {reservation.status === 'Cancelled' && (
                      <div className="space-x-2">
                        <button 
                          onClick={() => window.location.href = `mailto:${reservation.customer?.email || reservation.consumer?.email}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Contact
                        </button>
                      </div>
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