"use client";

import React from 'react';
import { SaveIcon } from 'lucide-react';

export default function DemoSettingsTab() {
  return (
    <div className="p-6 bg-white h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dealership Settings</h2>
      
      {/* Contact Information */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-700 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dealership Name</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value="Refraction Motors"
              readOnly 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value="jason@shoprefraction.com"
              readOnly 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value="(716) 555-0123"
              readOnly 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input 
              type="url" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value="https://shoprefraction.com"
              readOnly 
            />
          </div>
        </div>
      </div>
      
      {/* Address */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-700 mb-4">Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value="155 Chandler Street"
              readOnly 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value="Buffalo"
              readOnly 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value="New York"
              readOnly 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value="14207"
              readOnly 
            />
          </div>
        </div>
      </div>
      
      {/* Social Media */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-700 mb-4">Social Media</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
            <input 
              type="url" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value="https://www.facebook.com/RefractionMotorcar"
              readOnly 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value="@refractionmotors"
              readOnly 
            />
          </div>
        </div>
      </div>
      
      {/* Branding */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-700 mb-4">Branding</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded mr-2" style={{ backgroundColor: '#6D28D9' }}></div>
              <span>#6D28D9</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Color</label>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded mr-2" style={{ backgroundColor: '#8B5CF6' }}></div>
              <span>#8B5CF6</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Accent Color</label>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded mr-2" style={{ backgroundColor: '#FBBF24' }}></div>
              <span>#FBBF24</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Save Button - Just for show in the demo */}
      <div className="flex justify-end">
        <button className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
          <SaveIcon className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );
}