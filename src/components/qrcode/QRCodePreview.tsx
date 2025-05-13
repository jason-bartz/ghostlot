"use client";

import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { ArrowLeft } from 'lucide-react';
import supabase from '@/lib/supabase';
import { Database } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

type Vehicle = Database['public']['Tables']['vehicles']['Row'];

interface QRCodePreviewProps {
  vehicleId: string;
}

export default function QRCodePreview({ vehicleId }: QRCodePreviewProps) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qrValue, setQrValue] = useState<string>('');
  const [dealerInfo, setDealerInfo] = useState<any>(null);
  
  const router = useRouter();
  
  useEffect(() => {
    const fetchVehicleAndDealer = async () => {
      try {
        setLoading(true);
        
        // Fetch vehicle
        const { data: vehicleData, error: vehicleError } = await supabase
          .from('vehicles')
          .select('*')
          .eq('id', vehicleId)
          .single();
        
        if (vehicleError) {
          throw vehicleError;
        }
        
        if (!vehicleData) {
          throw new Error('Vehicle not found');
        }
        
        setVehicle(vehicleData);
        
        // Fetch dealer info
        const { data: dealerData, error: dealerError } = await supabase
          .from('dealers')
          .select('*')
          .eq('id', vehicleData.dealer_id)
          .single();
        
        if (dealerError) {
          throw dealerError;
        }
        
        setDealerInfo(dealerData);
        
        // Set QR code value
        const vehicleUrl = `${window.location.origin}/vehicle/${vehicleId}`;
        setQrValue(vehicleUrl);
        
        // Create or update QR code in database
        const { data: existingQR } = await supabase
          .from('qr_codes')
          .select('*')
          .eq('vehicle_id', vehicleId)
          .single();
        
        if (!existingQR) {
          await supabase
            .from('qr_codes')
            .insert([{
              vehicle_id: vehicleId,
              url: vehicleUrl,
              scan_count: 0
            }]);
        }
      } catch (err: any) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVehicleAndDealer();
  }, [vehicleId]);
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleGoBack = () => {
    router.back();
  };
  
  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center">
        <div className="text-gray-500">Loading QR code preview...</div>
      </div>
    );
  }
  
  if (error || !vehicle) {
    return (
      <div className="p-8 flex flex-col items-center justify-center">
        <div className="text-red-500">Error: {error || 'Vehicle not found'}</div>
        <button
          onClick={handleGoBack}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
        >
          Go Back
        </button>
      </div>
    );
  }
  
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button
            onClick={handleGoBack}
            className="mr-4 bg-white border border-gray-300 rounded-md shadow-sm p-2 text-gray-700 hover:bg-gray-50"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">QR Code Preview</h2>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Print QR Code
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
          <div className="mb-4">
            <QRCode value={qrValue} size={200} />
          </div>
          <p className="text-sm text-gray-500 mb-2">Scan to view vehicle details</p>
          <p className="text-xs text-gray-400">{qrValue}</p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Vehicle Information</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Year</p>
              <p className="font-medium">{vehicle.year}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Make</p>
              <p className="font-medium">{vehicle.make}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Model</p>
              <p className="font-medium">{vehicle.model}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Trim</p>
              <p className="font-medium">{vehicle.trim}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Stock #</p>
              <p className="font-medium">{vehicle.stock_number}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">VIN</p>
              <p className="font-medium">{vehicle.vin}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="font-medium">${vehicle.price.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className={`font-medium ${
                vehicle.status === 'Active' ? 'text-green-600' : 
                vehicle.status === 'Reserved' ? 'text-yellow-600' : 
                'text-gray-600'
              }`}>
                {vehicle.status}
              </p>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="text-md font-medium text-gray-800 mb-2">Dealership Information</h4>
            {dealerInfo && (
              <div>
                <p className="text-sm font-medium">{dealerInfo.name}</p>
                <p className="text-sm text-gray-500">{dealerInfo.location}</p>
                <p className="text-sm text-gray-500">{dealerInfo.phone}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}