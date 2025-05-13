"use client";

import { useState } from 'react';
import QRCodeGenerator from '@/components/qrcode/QRCodeGenerator';
import ConsumerViewQRCode from '@/components/qrcode/ConsumerViewQRCode';

export default function QRCodesPage() {
  const [activeTab, setActiveTab] = useState('vehicles');
  
  return (
    <div>
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('vehicles')}
          className={`py-4 px-6 font-medium text-sm focus:outline-none ${
            activeTab === 'vehicles' 
              ? 'text-indigo-600 border-b-2 border-indigo-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Vehicle QR Codes
        </button>
        <button
          onClick={() => setActiveTab('consumer')}
          className={`py-4 px-6 font-medium text-sm focus:outline-none ${
            activeTab === 'consumer' 
              ? 'text-indigo-600 border-b-2 border-indigo-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Consumer View QR Code
        </button>
      </div>
      
      {activeTab === 'vehicles' ? (
        <QRCodeGenerator />
      ) : (
        <ConsumerViewQRCode />
      )}
    </div>
  );
}