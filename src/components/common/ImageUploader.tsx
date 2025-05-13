"use client";

import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import supabase from '@/lib/supabase';

interface ImageUploaderProps {
  vehicleId: string;
  existingImages?: string[];
  onImagesUploaded?: (imageUrls: string[]) => void;
  maxFiles?: number;
}

export default function ImageUploader({ 
  vehicleId, 
  existingImages = [], 
  onImagesUploaded,
  maxFiles = 10
}: ImageUploaderProps) {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>(existingImages);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (images.length + e.target.files.length > maxFiles) {
        setUploadError(`You can only upload a maximum of ${maxFiles} images`);
        return;
      }
      
      setSelectedFiles(e.target.files);
      setUploadError(null);
    }
  };
  
  const handleUpload = async () => {
    if (!selectedFiles) return;
    
    setUploading(true);
    setUploadProgress(0);
    setUploadError(null);
    
    try {
      const totalFiles = selectedFiles.length;
      const uploadedUrls: string[] = [];
      
      for (let i = 0; i < totalFiles; i++) {
        const file = selectedFiles[i];
        const filename = `${vehicleId}/${Date.now()}_${file.name}`;
        
        // Upload file to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('vehicle-images')
          .upload(filename, file);
        
        if (uploadError) {
          throw uploadError;
        }
        
        // Get public URL for the uploaded file
        const { data: { publicUrl } } = supabase.storage
          .from('vehicle-images')
          .getPublicUrl(filename);
        
        uploadedUrls.push(publicUrl);
        
        // Update progress
        setUploadProgress(Math.round(((i + 1) / totalFiles) * 100));
      }
      
      // Update vehicle record with new images
      const { data: vehicleData } = await supabase
        .from('vehicles')
        .select('images')
        .eq('id', vehicleId)
        .single();
      
      const currentImages = vehicleData?.images || [];
      const updatedImages = [...currentImages, ...uploadedUrls];
      
      await supabase
        .from('vehicles')
        .update({ images: updatedImages })
        .eq('id', vehicleId);
      
      // Update local state
      setImages(updatedImages);
      
      // Call callback if provided
      if (onImagesUploaded) {
        onImagesUploaded(updatedImages);
      }
      
      // Clear selected files
      setSelectedFiles(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err: any) {
      console.error('Error uploading images:', err);
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };
  
  const handleRemoveImage = async (imageUrl: string) => {
    try {
      // Remove image from storage
      // Extract filename from URL
      const filenameParts = imageUrl.split('/');
      const filename = `${vehicleId}/${filenameParts[filenameParts.length - 1]}`;
      
      await supabase.storage
        .from('vehicle-images')
        .remove([filename]);
      
      // Update vehicle record
      const updatedImages = images.filter(img => img !== imageUrl);
      
      await supabase
        .from('vehicles')
        .update({ images: updatedImages })
        .eq('id', vehicleId);
      
      // Update local state
      setImages(updatedImages);
      
      // Call callback if provided
      if (onImagesUploaded) {
        onImagesUploaded(updatedImages);
      }
    } catch (err: any) {
      console.error('Error removing image:', err);
      setUploadError(err.message);
    }
  };
  
  return (
    <div className="space-y-4">
      {uploadError && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
          {uploadError}
        </div>
      )}
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
          id="image-upload"
        />
        
        <label htmlFor="image-upload" className="cursor-pointer block">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">Click to select images or drag and drop</p>
          <p className="text-xs text-gray-400 mt-1">{maxFiles - images.length} of {maxFiles} remaining</p>
        </label>
      </div>
      
      {selectedFiles && selectedFiles.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-gray-700">Selected {selectedFiles.length} files</p>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300"
            >
              {uploading ? `Uploading (${uploadProgress}%)` : 'Upload'}
            </button>
          </div>
          
          {uploading && (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
        </div>
      )}
      
      {images.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Vehicle Images</h4>
          <div className="grid grid-cols-3 gap-4">
            {images.map((imageUrl, index) => (
              <div key={index} className="relative group">
                <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg bg-gray-100">
                  <img 
                    src={imageUrl} 
                    alt={`Vehicle image ${index + 1}`} 
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => handleRemoveImage(imageUrl)}
                      className="p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}