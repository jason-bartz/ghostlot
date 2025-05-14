"use client";

import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Filter } from 'lucide-react';
import { mockVehicles } from '@/lib/mockData';

export default function DemoInventoryTab() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<any | null>(null);
  const [syncMethod, setSyncMethod] = useState('manual');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<any | null>(null);
  
  // Fetch vehicles on component mount
  useEffect(() => {
    // Simulate an API call with a short delay
    setTimeout(() => {
      let filteredVehicles = [...mockVehicles];
      
      // Apply filter if needed
      if (filter !== 'all') {
        filteredVehicles = mockVehicles.filter(v => v.status === filter);
      }
      
      setVehicles(filteredVehicles);
      setLoading(false);
    }, 500);
  }, [filter]);
  
  const handleEditVehicle = (vehicle: any) => {
    setEditingVehicle(vehicle);
    setShowEditModal(true);
  };
  
  const handleDeleteConfirm = (vehicle: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setVehicleToDelete(vehicle);
    setShowDeleteConfirm(true);
  };
  
  const handleDelete = () => {
    if (!vehicleToDelete) return;
    
    // Update local state
    setVehicles(vehicles.filter(v => v.id !== vehicleToDelete.id));
    setShowDeleteConfirm(false);
    setVehicleToDelete(null);
  };
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const changeStatus = (vehicleId: string, newStatus: 'Active' | 'Reserved' | 'Sold', e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Update local state
    setVehicles(
      vehicles.map(vehicle => 
        vehicle.id === vehicleId 
          ? { ...vehicle, status: newStatus } 
          : vehicle
      )
    );
  };
  
  // Filter vehicles based on search query
  const filteredVehicles = vehicles.filter(vehicle => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      vehicle.stock_number.toLowerCase().includes(query) ||
      vehicle.vin.toLowerCase().includes(query) ||
      vehicle.make.toLowerCase().includes(query) ||
      vehicle.model.toLowerCase().includes(query) ||
      vehicle.trim.toLowerCase().includes(query)
    );
  });
  
  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center">Loading inventory...</div>
      </div>
    );
  }
  
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Inventory Management</h2>
        <div className="flex gap-3">
          <select
            value={syncMethod}
            onChange={(e) => setSyncMethod(e.target.value)}
            className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <option value="manual">Manual Import</option>
            <option value="frazer">Frazer DMS</option>
            <option value="dealertrack">Dealertrack DMS</option>
          </select>
          
          <button 
            className="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {syncMethod === 'manual' ? 'Upload CSV' : 'Sync Inventory'}
          </button>
          
          <button 
            className="bg-green-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Plus className="inline h-4 w-4 mr-1" />
            Add Vehicle
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg mb-6 p-4">
        <div className="flex items-center justify-between">
          <div className="relative rounded-md shadow-sm flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-400 mr-2" />
            <select
              value={filter}
              onChange={handleFilterChange}
              className="rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Vehicles</option>
              <option value="Active">Active Only</option>
              <option value="Reserved">Reserved Only</option>
              <option value="Sold">Sold Only</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock #
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                VIN
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
            {filteredVehicles.map((vehicle) => (
              <tr 
                key={vehicle.id} 
                className={`${vehicle.status === 'Sold' ? 'bg-gray-100' : ''} cursor-pointer hover:bg-gray-50`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {vehicle.stock_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${vehicle.price.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {vehicle.vin}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${vehicle.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      vehicle.status === 'Reserved' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'}`}>
                    {vehicle.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" onClick={(e) => e.stopPropagation()}>
                  <button 
                    className="text-blue-600 hover:text-blue-900 mr-2"
                  >
                    Copy URL
                  </button>
                  <button 
                    onClick={() => handleEditVehicle(vehicle)}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    <Edit className="h-4 w-4 inline" />
                    <span className="ml-1">Edit</span>
                  </button>
                  {vehicle.status !== 'Sold' && (
                    <button 
                      onClick={(e) => changeStatus(vehicle.id, 'Sold', e)}
                      className="text-gray-600 hover:text-gray-900 mr-2"
                    >
                      Mark Sold
                    </button>
                  )}
                  {vehicle.status === 'Active' && (
                    <button 
                      onClick={(e) => changeStatus(vehicle.id, 'Reserved', e)}
                      className="text-yellow-600 hover:text-yellow-900 mr-2"
                    >
                      Reserve
                    </button>
                  )}
                  {vehicle.status === 'Reserved' && (
                    <button 
                      onClick={(e) => changeStatus(vehicle.id, 'Active', e)}
                      className="text-green-600 hover:text-green-900 mr-2"
                    >
                      Unreserve
                    </button>
                  )}
                  <button 
                    onClick={(e) => handleDeleteConfirm(vehicle, e)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
            
            {filteredVehicles.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  No vehicles found. Add a vehicle to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && vehicleToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Confirm Delete</h3>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to delete the {vehicleToDelete.year} {vehicleToDelete.make} {vehicleToDelete.model}? This action cannot be undone.
              </p>
              
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}