"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Edit, Trash2, Plus, Upload, Filter } from 'lucide-react';
import supabase from '@/lib/supabase';
import { Database } from '@/lib/supabase';
import { customMockData, mockVehicles } from '@/lib/mockData';

type Vehicle = Database['public']['Tables']['vehicles']['Row'];

export default function InventoryManagement() {
  const [vehicles, setVehicles] = useState<(Vehicle & { selected?: boolean })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [syncMethod, setSyncMethod] = useState('manual');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'reserved', 'sold'
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [formData, setFormData] = useState({
    stock_number: '',
    vin: '',
    year: 0,
    make: '',
    model: '',
    trim: '',
    price: 0,
    mileage: 0,
    exterior_color: '',
    interior_color: '',
    mpg: '',
    engine: '',
    transmission: '',
    drivetrain: '',
    fuel_type: '',
    features: [] as string[],
    status: 'Active' as 'Active' | 'Reserved' | 'Sold'
  });
  
  // Fetch vehicles on component mount
  useEffect(() => {
    fetchVehicles();
  }, [filter]);
  
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      
      // For demo purposes, use the mockVehicles data from mockData.ts 
      // This ensures consistency with the QR Code tab that uses the same data source
      
      let filteredVehicles = mockVehicles;
      
      // Apply filter
      if (filter !== 'all') {
        filteredVehicles = mockVehicles.filter(v => v.status === filter);
      }
      
      setVehicles(filteredVehicles);
      
      /* In a real implementation, would fetch from Supabase:
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }
      
      let query = supabase
        .from('vehicles')
        .select('*')
        .eq('dealer_id', user.id);
      
      // Apply filter
      if (filter !== 'all') {
        query = query.eq('status', filter);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setVehicles(data || []);
      */
    } catch (err: any) {
      console.error('Error fetching vehicles:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleEditVehicle = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      stock_number: vehicle.stock_number,
      vin: vehicle.vin,
      year: vehicle.year,
      make: vehicle.make,
      model: vehicle.model,
      trim: vehicle.trim,
      price: vehicle.price,
      mileage: vehicle.mileage,
      exterior_color: vehicle.exterior_color,
      interior_color: vehicle.interior_color,
      mpg: vehicle.mpg,
      engine: vehicle.engine,
      transmission: vehicle.transmission,
      drivetrain: vehicle.drivetrain,
      fuel_type: vehicle.fuel_type,
      features: vehicle.features || [],
      status: vehicle.status
    });
    setShowEditModal(true);
  };
  
  const handleAddVehicle = () => {
    setEditingVehicle(null);
    setFormData({
      stock_number: '',
      vin: '',
      year: new Date().getFullYear(),
      make: '',
      model: '',
      trim: '',
      price: 0,
      mileage: 0,
      exterior_color: '',
      interior_color: '',
      mpg: '',
      engine: '',
      transmission: '',
      drivetrain: '',
      fuel_type: '',
      features: [],
      status: 'Active'
    });
    setShowAddModal(true);
  };
  
  const handleDeleteConfirm = (vehicle: Vehicle) => {
    setVehicleToDelete(vehicle);
    setShowDeleteConfirm(true);
  };
  
  const handleDelete = async () => {
    if (!vehicleToDelete) return;
    
    try {
      // In a real implementation, would delete from Supabase
      /* 
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', vehicleToDelete.id);
      
      if (error) {
        throw error;
      }
      */
      
      // Just update local state for demo
      setVehicles(vehicles.filter(v => v.id !== vehicleToDelete.id));
      setShowDeleteConfirm(false);
      setVehicleToDelete(null);
    } catch (err: any) {
      console.error('Error deleting vehicle:', err);
      setError(err.message);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseFloat(value) || 0 });
  };
  
  const handleFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const featuresText = e.target.value;
    const featuresArray = featuresText.split('\n').map(feature => feature.trim()).filter(Boolean);
    setFormData({ ...formData, features: featuresArray });
  };
  
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as 'Active' | 'Reserved' | 'Sold';
    setFormData({ ...formData, status });
  };
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };
  
  const handleSaveVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // In a real implementation, would save to Supabase
      /* 
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setError('User not authenticated');
        return;
      }
      
      const vehicleData = {
        ...formData,
        dealer_id: user.id
      };
      
      if (editingVehicle) {
        // Update existing vehicle
        const { error } = await supabase
          .from('vehicles')
          .update(vehicleData)
          .eq('id', editingVehicle.id);
        
        if (error) {
          throw error;
        }
      } else {
        // Add new vehicle
        const { data, error } = await supabase
          .from('vehicles')
          .insert([vehicleData])
          .select();
        
        if (error) {
          throw error;
        }
        
        if (data && data.length > 0) {
          setVehicles([...vehicles, data[0]]);
        }
      }
      */
      
      // Just update local state for demo
      if (editingVehicle) {
        // Update existing vehicle
        setVehicles(
          vehicles.map(vehicle => 
            vehicle.id === editingVehicle.id 
              ? { ...vehicle, ...formData } 
              : vehicle
          )
        );
        
        setShowEditModal(false);
      } else {
        // Add new vehicle
        const newVehicle = {
          ...formData,
          id: `v${vehicles.length + 1}`,
          created_at: new Date().toISOString(),
          dealer_id: 'demo-dealer-id',
          images: []
        } as Vehicle;
        
        setVehicles([...vehicles, newVehicle]);
        setShowAddModal(false);
      }
    } catch (err: any) {
      console.error('Error saving vehicle:', err);
      setError(err.message);
    }
  };
  
  const handleFilesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
    }
  };
  
  const handleUploadImages = async () => {
    if (!selectedFiles || !editingVehicle) return;
    
    setUploading(true);
    
    try {
      // Mock file upload for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Just update local state for demo
      setVehicles(
        vehicles.map(vehicle => 
          vehicle.id === editingVehicle.id 
            ? { ...vehicle, images: [...(vehicle.images || []), '/placeholder-image.jpg'] } 
            : vehicle
        )
      );
      
      // Clear selected files
      setSelectedFiles(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err: any) {
      console.error('Error uploading images:', err);
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };
  
  const handleImportCSV = () => {
    // Implement CSV import functionality
    alert('CSV import functionality will be implemented in the production version.');
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
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
  
  // Generate vehicle URL for sharing
  const generateVehicleURL = (vehicleId: string) => {
    return `${window.location.origin}/vehicle/${vehicleId}`;
  };
  
  // Function to copy URL to clipboard
  const copyToClipboard = (vehicle: Vehicle) => {
    const url = generateVehicleURL(vehicle.id);
    navigator.clipboard.writeText(url).then(
      () => {
        alert(`URL for ${vehicle.year} ${vehicle.make} ${vehicle.model} copied to clipboard! You can now share it via text or social media.`);
      },
      (err) => {
        console.error('Could not copy URL: ', err);
        alert('Failed to copy URL to clipboard. Please try again.');
      }
    );
  };
  
  // Function to view the vehicle detail page
  const viewVehicleDetail = (vehicleId: string) => {
    window.open(`/vehicle/${vehicleId}`, '_blank');
  };
  
  const changeStatus = async (vehicleId: string, newStatus: 'Active' | 'Reserved' | 'Sold') => {
    try {
      // In a real implementation, would update in Supabase
      /* 
      const { error } = await supabase
        .from('vehicles')
        .update({ status: newStatus })
        .eq('id', vehicleId);
      
      if (error) {
        throw error;
      }
      */
      
      // Just update local state for demo
      setVehicles(
        vehicles.map(vehicle => 
          vehicle.id === vehicleId 
            ? { ...vehicle, status: newStatus } 
            : vehicle
        )
      );
    } catch (err: any) {
      console.error('Error updating vehicle status:', err);
      setError(err.message);
    }
  };
  
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
            onClick={handleImportCSV}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {syncMethod === 'manual' ? 'Upload CSV' : 'Sync Inventory'}
          </button>
          
          <button 
            onClick={handleAddVehicle}
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

      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

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
                onClick={() => viewVehicleDetail(vehicle.id)}
                title="Click to view vehicle detail page"
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
                    onClick={() => copyToClipboard(vehicle)}
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
                      onClick={() => changeStatus(vehicle.id, 'Sold')}
                      className="text-gray-600 hover:text-gray-900 mr-2"
                    >
                      Mark Sold
                    </button>
                  )}
                  {vehicle.status === 'Active' && (
                    <button 
                      onClick={() => changeStatus(vehicle.id, 'Reserved')}
                      className="text-yellow-600 hover:text-yellow-900 mr-2"
                    >
                      Reserve
                    </button>
                  )}
                  {vehicle.status === 'Reserved' && (
                    <button 
                      onClick={() => changeStatus(vehicle.id, 'Active')}
                      className="text-green-600 hover:text-green-900 mr-2"
                    >
                      Unreserve
                    </button>
                  )}
                  <button 
                    onClick={() => handleDeleteConfirm(vehicle)}
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
      
      {/* Edit Vehicle Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Edit Vehicle</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSaveVehicle} className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Number
                  </label>
                  <input
                    type="text"
                    name="stock_number"
                    value={formData.stock_number}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    VIN
                  </label>
                  <input
                    type="text"
                    name="vin"
                    value={formData.vin}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleNumberInputChange}
                    required
                    min={1900}
                    max={new Date().getFullYear() + 1}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Make
                  </label>
                  <input
                    type="text"
                    name="make"
                    value={formData.make}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Model
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trim
                  </label>
                  <input
                    type="text"
                    name="trim"
                    value={formData.trim}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleNumberInputChange}
                    required
                    min={0}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mileage
                  </label>
                  <input
                    type="number"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleNumberInputChange}
                    required
                    min={0}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Exterior Color
                  </label>
                  <input
                    type="text"
                    name="exterior_color"
                    value={formData.exterior_color}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Interior Color
                  </label>
                  <input
                    type="text"
                    name="interior_color"
                    value={formData.interior_color}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    MPG
                  </label>
                  <input
                    type="text"
                    name="mpg"
                    value={formData.mpg}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Engine
                  </label>
                  <input
                    type="text"
                    name="engine"
                    value={formData.engine}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transmission
                  </label>
                  <input
                    type="text"
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Drivetrain
                  </label>
                  <input
                    type="text"
                    name="drivetrain"
                    value={formData.drivetrain}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fuel Type
                  </label>
                  <input
                    type="text"
                    name="fuel_type"
                    value={formData.fuel_type}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleStatusChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Features (one per line)
                </label>
                <textarea
                  name="features"
                  value={formData.features.join('\n')}
                  onChange={handleFeaturesChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>
              
              {editingVehicle && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Images
                  </label>
                  <div className="flex items-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFilesSelect}
                      ref={fileInputRef}
                      className="flex-1"
                    />
                    <button
                      type="button"
                      onClick={handleUploadImages}
                      disabled={!selectedFiles || uploading}
                      className="ml-2 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300"
                    >
                      {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">You can upload multiple images at once.</p>
                </div>
              )}
              
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 mr-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Add Vehicle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Add New Vehicle</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSaveVehicle} className="p-6">
              {/* Same form fields as Edit Modal */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Number
                  </label>
                  <input
                    type="text"
                    name="stock_number"
                    value={formData.stock_number}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    VIN
                  </label>
                  <input
                    type="text"
                    name="vin"
                    value={formData.vin}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleNumberInputChange}
                    required
                    min={1900}
                    max={new Date().getFullYear() + 1}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Make
                  </label>
                  <input
                    type="text"
                    name="make"
                    value={formData.make}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Model
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trim
                  </label>
                  <input
                    type="text"
                    name="trim"
                    value={formData.trim}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleNumberInputChange}
                    required
                    min={0}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mileage
                  </label>
                  <input
                    type="number"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleNumberInputChange}
                    required
                    min={0}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Exterior Color
                  </label>
                  <input
                    type="text"
                    name="exterior_color"
                    value={formData.exterior_color}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Interior Color
                  </label>
                  <input
                    type="text"
                    name="interior_color"
                    value={formData.interior_color}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    MPG
                  </label>
                  <input
                    type="text"
                    name="mpg"
                    value={formData.mpg}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Engine
                  </label>
                  <input
                    type="text"
                    name="engine"
                    value={formData.engine}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transmission
                  </label>
                  <input
                    type="text"
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Drivetrain
                  </label>
                  <input
                    type="text"
                    name="drivetrain"
                    value={formData.drivetrain}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fuel Type
                  </label>
                  <input
                    type="text"
                    name="fuel_type"
                    value={formData.fuel_type}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleStatusChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Features (one per line)
                </label>
                <textarea
                  name="features"
                  value={formData.features.join('\n')}
                  onChange={handleFeaturesChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 mr-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
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