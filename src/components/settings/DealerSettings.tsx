"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Save, Upload } from 'lucide-react';
import supabase from '@/lib/supabase';

export default function DealerSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [dealerData, setDealerData] = useState<any>(null);
  const [logo, setLogo] = useState<File | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    primary_color: '#f7b2e0',
    text_color: '#ffffff',
    hours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '9:00 AM - 5:00 PM',
      sunday: 'Closed'
    },
    social_media: {
      facebook: '',
      instagram: '',
      twitter: '',
      youtube: ''
    }
  });
  
  useEffect(() => {
    const fetchDealerData = async () => {
      try {
        setLoading(true);
        
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setError('User not authenticated');
          return;
        }
        
        const { data, error } = await supabase
          .from('dealers')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) {
          throw error;
        }
        
        setDealerData(data);
        
        // Initialize form with dealer data
        setFormData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          location: data.location || '',
          website: data.website || '',
          primary_color: data.primary_color || '#f7b2e0',
          text_color: data.text_color || '#ffffff',
          hours: data.hours || {
            monday: '9:00 AM - 6:00 PM',
            tuesday: '9:00 AM - 6:00 PM',
            wednesday: '9:00 AM - 6:00 PM',
            thursday: '9:00 AM - 6:00 PM',
            friday: '9:00 AM - 6:00 PM',
            saturday: '9:00 AM - 5:00 PM',
            sunday: 'Closed'
          },
          social_media: data.social_media || {
            facebook: '',
            instagram: '',
            twitter: '',
            youtube: ''
          }
        });
      } catch (err: any) {
        console.error('Error fetching dealer data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDealerData();
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleHoursChange = (day: string, value: string) => {
    setFormData({
      ...formData,
      hours: {
        ...formData.hours,
        [day]: value
      }
    });
  };
  
  const handleSocialMediaChange = (platform: string, value: string) => {
    setFormData({
      ...formData,
      social_media: {
        ...formData.social_media,
        [platform]: value
      }
    });
  };
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setLogo(e.target.files[0]);
    }
  };
  
  const uploadLogo = async (dealerId: string): Promise<string | null> => {
    if (!logo) return null;
    
    const filename = `${dealerId}/logo-${Date.now()}.${logo.name.split('.').pop()}`;
    
    const { error: uploadError } = await supabase.storage
      .from('dealer-logos')
      .upload(filename, logo);
    
    if (uploadError) {
      throw uploadError;
    }
    
    const { data: { publicUrl } } = supabase.storage
      .from('dealer-logos')
      .getPublicUrl(filename);
    
    return publicUrl;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setError('User not authenticated');
        return;
      }
      
      // Upload logo if selected
      let logoUrl = dealerData?.logo_url;
      if (logo) {
        logoUrl = await uploadLogo(user.id);
      }
      
      // Update dealer data
      const { error } = await supabase
        .from('dealers')
        .update({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          website: formData.website,
          logo_url: logoUrl,
          primary_color: formData.primary_color,
          text_color: formData.text_color,
          hours: formData.hours,
          social_media: formData.social_media
        })
        .eq('id', user.id);
      
      if (error) {
        throw error;
      }
      
      setSuccess(true);
      
      // Clear file input
      if (logoInputRef.current) {
        logoInputRef.current.value = '';
      }
      setLogo(null);
    } catch (err: any) {
      console.error('Error saving dealer settings:', err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center">Loading dealer settings...</div>
      </div>
    );
  }
  
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dealer Settings</h2>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="flex items-center bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          Settings saved successfully!
        </div>
      )}
      
      <div className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Basic Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dealership Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
        
        {/* Branding */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Branding</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Logo
              </label>
              <div className="flex items-center">
                {dealerData?.logo_url && (
                  <div className="w-16 h-16 mr-4 relative">
                    <img 
                      src={dealerData.logo_url} 
                      alt="Dealership Logo" 
                      className="w-full h-full object-contain rounded bg-gray-50 border border-gray-300"
                    />
                  </div>
                )}
                
                <div className="flex-grow">
                  <div className="flex items-center">
                    <label
                      htmlFor="logo-upload"
                      className="cursor-pointer bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <Upload className="h-4 w-4 inline mr-1" />
                      {dealerData?.logo_url ? 'Change Logo' : 'Upload Logo'}
                    </label>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                      ref={logoInputRef}
                    />
                    {logo && (
                      <span className="ml-2 text-sm text-gray-500">
                        {logo.name}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended size: 400x200 pixels, max 2MB
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Color
                </label>
                <div className="flex items-center">
                  <div 
                    className="w-10 h-10 rounded-full mr-3 border border-gray-300" 
                    style={{ backgroundColor: formData.primary_color }}
                  ></div>
                  <input
                    type="text"
                    name="primary_color"
                    value={formData.primary_color}
                    onChange={handleChange}
                    className="w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <input
                    type="color"
                    value={formData.primary_color}
                    onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                    className="ml-2 h-8 w-8 rounded cursor-pointer"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Used for buttons and primary UI elements
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Text Color
                </label>
                <div className="flex items-center">
                  <div 
                    className="w-10 h-10 rounded-full mr-3 border border-gray-300" 
                    style={{ backgroundColor: formData.text_color }}
                  ></div>
                  <input
                    type="text"
                    name="text_color"
                    value={formData.text_color}
                    onChange={handleChange}
                    className="w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <input
                    type="color"
                    value={formData.text_color}
                    onChange={(e) => setFormData({ ...formData, text_color: e.target.value })}
                    className="ml-2 h-8 w-8 rounded cursor-pointer"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Used for text on primary-colored elements
                </p>
              </div>
            </div>
            
            <div className="pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
              <div className="flex flex-col gap-3">
                <button 
                  className="py-2 px-4 rounded-md w-48 text-center" 
                  style={{ 
                    backgroundColor: formData.primary_color, 
                    color: formData.text_color
                  }}
                >
                  Sample Button
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Business Hours */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Business Hours</h3>
          
          <div className="space-y-4">
            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
              <div key={day} className="flex items-center">
                <div className="w-1/4 text-sm font-medium text-gray-700">{day.charAt(0).toUpperCase() + day.slice(1)}</div>
                <div className="w-3/4">
                  <input
                    type="text"
                    value={formData.hours[day as keyof typeof formData.hours]}
                    onChange={(e) => handleHoursChange(day, e.target.value)}
                    placeholder="9:00 AM - 6:00 PM or Closed"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            ))}
            
            <p className="text-xs text-gray-500 mt-1">
              Format: "9:00 AM - 6:00 PM" or "Closed"
            </p>
          </div>
        </div>
        
        {/* Social Media */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Social Media Links</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Facebook
              </label>
              <input
                type="url"
                value={formData.social_media.facebook}
                onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                placeholder="https://facebook.com/yourdealership"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instagram
              </label>
              <input
                type="url"
                value={formData.social_media.instagram}
                onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                placeholder="https://instagram.com/yourdealership"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Twitter
              </label>
              <input
                type="url"
                value={formData.social_media.twitter}
                onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                placeholder="https://twitter.com/yourdealership"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                YouTube
              </label>
              <input
                type="url"
                value={formData.social_media.youtube}
                onChange={(e) => handleSocialMediaChange('youtube', e.target.value)}
                placeholder="https://youtube.com/c/yourdealership"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}