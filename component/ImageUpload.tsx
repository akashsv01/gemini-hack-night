'use client';

import { useState, useRef } from 'react';

interface ImageUploadProps {
  onImageUpload?: (file: File, dataUrl: string) => void;
}

export default function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setSelectedImage(dataUrl);
        
        // Pass both the file and data URL to parent
        if (onImageUpload) {
          onImageUpload(file, dataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-lg shadow-md">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={fileInputRef}
        className="hidden"
      />
      <button
        onClick={handleButtonClick}
        className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
      >
        Upload Image
      </button>
      {selectedImage && (
        <div className="mt-4">
          <img
            src={selectedImage}
            alt="Uploaded preview"
            className="max-w-xs rounded-lg shadow-sm"
          />
        </div>
      )}
    </div>
  );
}