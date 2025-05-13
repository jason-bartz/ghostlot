"use client";

import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import { mockDealer } from '@/lib/mockData';

export default function ConsumerViewQRCode() {
  const [dealerInfo, setDealerInfo] = useState(mockDealer);
  const [qrValue, setQrValue] = useState<string>('');
  const printFrameRef = useRef<HTMLIFrameElement>(null);
  
  React.useEffect(() => {
    // Set QR code value to the consumer view URL
    const consumerViewUrl = `${window.location.origin}/consumer-view`;
    setQrValue(consumerViewUrl);
  }, []);
  
  const handlePrint = () => {
    window.print();
  };

  const generatePrintableHTML = () => {
    const consumerViewUrl = `${window.location.origin}/consumer-view`;
    
    let html = `
      <html>
        <head>
          <title>Consumer View QR Code - GhostLot</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
              padding: 20px;
            }
            .qr-container { 
              text-align: center;
              width: 250px;
              padding: 20px;
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .qr-code { 
              width: 100%; 
              height: auto; 
              max-width: 250px; 
            }
            .dealer-info {
              margin-top: 15px;
              text-align: center;
            }
            .dealer-name {
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 5px;
            }
            .instruction {
              margin-top: 15px;
              font-size: 14px;
              color: #4a5568;
            }
          </style>
        </head>
        <body>
          <div class="qr-container">
            <img class="qr-code" src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(consumerViewUrl)}" alt="QR Code" />
            
            <div class="dealer-info">
              <p class="dealer-name">${dealerInfo.name}</p>
              <p>Browse Our Inventory</p>
            </div>
            
            <div class="instruction">
              <p>Scan to view available vehicles</p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    return html;
  };
  
  const handlePrintQRCode = () => {
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      printWindow.document.write(generatePrintableHTML());
      printWindow.document.close();
      
      // Wait for images to load before printing
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  const buttonStyle = {
    backgroundColor: dealerInfo.primary_color || '#4f46e5',
    color: dealerInfo.text_color || '#ffffff',
  };
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Consumer View QR Code</h2>
        <div className="flex gap-3">
          <button
            onClick={handlePrintQRCode}
            className="px-6 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            style={buttonStyle}
          >
            Print QR Code
          </button>
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
        <p className="text-lg font-medium text-gray-800 mb-6">
          This QR code directs customers to your consumer view inventory page.
        </p>
        
        <div className="mb-6 p-8 border border-gray-200 rounded-lg">
          <QRCode value={qrValue} size={250} />
        </div>
        
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500 mb-2">Scan to browse vehicle inventory</p>
          <p className="text-xs text-gray-400">{qrValue}</p>
        </div>
        
        <div className="w-full max-w-md">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Usage Tips</h3>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="bg-indigo-100 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">
                <span className="text-indigo-600 font-bold text-sm">1</span>
              </div>
              <p className="text-gray-600">Print this QR code and display it prominently in your dealership</p>
            </div>
            
            <div className="flex items-start">
              <div className="bg-indigo-100 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">
                <span className="text-indigo-600 font-bold text-sm">2</span>
              </div>
              <p className="text-gray-600">Include the QR code in your marketing materials and advertisements</p>
            </div>
            
            <div className="flex items-start">
              <div className="bg-indigo-100 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">
                <span className="text-indigo-600 font-bold text-sm">3</span>
              </div>
              <p className="text-gray-600">Customers can scan the code to browse your complete inventory on their devices</p>
            </div>
            
            <div className="flex items-start">
              <div className="bg-indigo-100 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">
                <span className="text-indigo-600 font-bold text-sm">4</span>
              </div>
              <p className="text-gray-600">Track engagement with the analytics dashboard in your dealer portal</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hidden iframe for printing */}
      <iframe 
        ref={printFrameRef} 
        style={{ display: 'none' }} 
        title="Print Frame"
      />
    </div>
  );
}