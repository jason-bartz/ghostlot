"use client";

import React, { useState, useEffect } from 'react';
import { mockVehicles } from '@/lib/mockData';

export default function DemoQRCodesTab() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [selectedVehicles, setSelectedVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPrintMenu, setShowPrintMenu] = useState(false);
  const [loadingGenerate, setLoadingGenerate] = useState(false);
  
  // Fetch vehicles on component mount
  useEffect(() => {
    // Use mockVehicles data with added selected property
    setVehicles(mockVehicles.map(vehicle => ({ ...vehicle, selected: false })));
    setLoading(false);
  }, []);
  
  const toggleVehicleSelection = (id: string) => {
    setVehicles(
      vehicles.map(vehicle => 
        vehicle.id === id 
          ? { ...vehicle, selected: !vehicle.selected } 
          : vehicle
      )
    );
    
    const selected = vehicles.find(v => v.id === id);
    if (selected) {
      if (!selected.selected) {
        setSelectedVehicles([...selectedVehicles, selected]);
      } else {
        setSelectedVehicles(selectedVehicles.filter(v => v.id !== id));
      }
    }
  };
  
  const selectAll = () => {
    setVehicles(
      vehicles.map(vehicle => ({ ...vehicle, selected: true }))
    );
    setSelectedVehicles([...vehicles]);
  };
  
  const deselectAll = () => {
    setVehicles(
      vehicles.map(vehicle => ({ ...vehicle, selected: false }))
    );
    setSelectedVehicles([]);
  };
  
  const handleGenerateBatch = async () => {
    if (selectedVehicles.length === 0) {
      alert('Please select at least one vehicle');
      return;
    }
    
    // Simulate generating QR codes
    setLoadingGenerate(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setLoadingGenerate(false);
    
    // Show print dialog
    setShowPrintMenu(true);
  };
  
  const handleGenerateSingle = async (vehicle: any) => {
    // Simulate generating single QR code
    setLoadingGenerate(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setLoadingGenerate(false);
    
    // Simulate preview action with a visual feedback
    const row = document.getElementById(`vehicle-row-${vehicle.id}`);
    if (row) {
      row.classList.add('bg-indigo-50');
      setTimeout(() => {
        row.classList.remove('bg-indigo-50');
      }, 500);
    }
  };
  
  const handlePrint = () => {
    // Simulate print action
    setShowPrintMenu(false);
    
    // Visual feedback for demo
    alert('In a real environment, this would open a print dialog with QR codes for the selected vehicles.');
  };
  
  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center">
        <div className="text-gray-500">Loading vehicles...</div>
      </div>
    );
  }
  
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">QR Code Generator</h2>
        <div className="flex gap-3">
          <button 
            onClick={handleGenerateBatch}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={selectedVehicles.length === 0 || loadingGenerate}
          >
            {loadingGenerate ? 'Generating...' : 'Generate QR Codes'}
          </button>
          <button 
            onClick={selectAll}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Select All
          </button>
          <button 
            onClick={deselectAll}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            disabled={selectedVehicles.length === 0}
          >
            Deselect All
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Select
              </th>
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
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} id={`vehicle-row-${vehicle.id}`} className="transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input 
                    type="checkbox" 
                    checked={vehicle.selected}
                    onChange={() => toggleVehicleSelection(vehicle.id)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </td>
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
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => handleGenerateSingle(vehicle)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Generate Single QR
                  </button>
                  <button 
                    onClick={() => handleGenerateSingle(vehicle)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Preview
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Print Menu Modal */}
      {showPrintMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Print QR Codes</h3>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h4 className="font-medium mb-2">Print Options</h4>
                <p className="text-sm text-gray-600 mb-4">
                  You are about to print QR codes for {selectedVehicles.length} vehicles.
                </p>
                
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="include-details" 
                      name="print-option" 
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" 
                      defaultChecked 
                    />
                    <label htmlFor="include-details" className="ml-2 text-sm text-gray-700">
                      Include vehicle details
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="qr-only" 
                      name="print-option" 
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" 
                    />
                    <label htmlFor="qr-only" className="ml-2 text-sm text-gray-700">
                      QR codes only
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">QR Code Size</h4>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                  <option value="small">Small (4 per page)</option>
                  <option value="medium" selected>Medium (2 per page)</option>
                  <option value="large">Large (1 per page)</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowPrintMenu(false)}
                  className="bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                
                <button
                  onClick={handlePrint}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}