"use client";

import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabase';
import { Database } from '@/lib/supabase';

type Vehicle = Database['public']['Tables']['vehicles']['Row'];

export default function QRCodeGenerator() {
  const [selectedVehicles, setSelectedVehicles] = useState<Vehicle[]>([]);
  const [vehicles, setVehicles] = useState<(Vehicle & { selected: boolean })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPrintMenu, setShowPrintMenu] = useState(false);
  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const printFrameRef = useRef<HTMLIFrameElement>(null);
  
  const router = useRouter();
  
  // Fetch vehicles on component mount
  React.useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('vehicles')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        setVehicles(data.map(vehicle => ({ ...vehicle, selected: false })));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVehicles();
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
  
  const generateQRCode = async (vehicleId: string) => {
    try {
      setLoadingGenerate(true);
      
      const vehicleUrl = `${window.location.origin}/vehicle/${vehicleId}`;
      
      // Check if QR code already exists
      const { data: existingQR } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('vehicle_id', vehicleId)
        .single();
      
      if (!existingQR) {
        // Create new QR code entry
        await supabase
          .from('qr_codes')
          .insert([{
            vehicle_id: vehicleId,
            url: vehicleUrl,
            scan_count: 0
          }]);
      }
      
      return vehicleUrl;
    } catch (err: any) {
      console.error('Error generating QR code:', err);
      return null;
    } finally {
      setLoadingGenerate(false);
    }
  };
  
  const handleGenerateSingle = async (vehicle: Vehicle) => {
    await generateQRCode(vehicle.id);
    router.push(`/dashboard/qr-codes/preview/${vehicle.id}`);
  };
  
  const handleGenerateBatch = async () => {
    if (selectedVehicles.length === 0) {
      alert('Please select at least one vehicle');
      return;
    }
    
    try {
      setLoadingGenerate(true);
      
      // Generate QR codes for all selected vehicles
      const qrPromises = selectedVehicles.map(vehicle => generateQRCode(vehicle.id));
      await Promise.all(qrPromises);
      
      // Show print dialog
      setShowPrintMenu(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingGenerate(false);
    }
  };
  
  const generatePrintableHTML = () => {
    let html = `
      <html>
        <head>
          <title>QR Codes - GhostLot</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .qr-container { 
              display: inline-block; 
              margin: 15px; 
              page-break-inside: avoid;
              text-align: center;
              width: 200px;
            }
            .qr-code { 
              width: 100%; 
              height: auto; 
              max-width: 200px; 
            }
            .vehicle-info {
              margin-top: 5px;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
    `;
    
    selectedVehicles.forEach(vehicle => {
      const qrUrl = `${window.location.origin}/vehicle/${vehicle.id}`;
      
      html += `
        <div class="qr-container">
          <img class="qr-code" src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrUrl)}" alt="QR Code" />
          <div class="vehicle-info">
            <p><strong>${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}</strong></p>
            <p>Stock #: ${vehicle.stock_number}</p>
            <p>VIN: ${vehicle.vin.slice(-6)}</p>
          </div>
        </div>
      `;
    });
    
    html += `
        </body>
      </html>
    `;
    
    return html;
  };
  
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      printWindow.document.write(generatePrintableHTML());
      printWindow.document.close();
      
      // Wait for images to load before printing
      printWindow.onload = () => {
        printWindow.print();
        setShowPrintMenu(false);
      };
    }
  };
  
  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center">
        <div className="text-gray-500">Loading vehicles...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-8 flex flex-col items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
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
              <tr key={vehicle.id}>
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
                    onClick={() => router.push(`/dashboard/qr-codes/preview/${vehicle.id}`)}
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
      
      {/* Hidden iframe for printing */}
      <iframe 
        ref={printFrameRef} 
        style={{ display: 'none' }} 
        title="Print Frame"
      />
    </div>
  );
}