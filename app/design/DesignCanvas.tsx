'use client';

import DesignCanvas from './components/DesignCanvas'; // adjust path if needed
import { useState } from 'react';

export default function Page() {
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [selectedStyle, setSelectedStyle] = useState('tshirt');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      {/* ✅ Updated Heading */}
      <h1 className="text-4xl font-bold mb-6">Design Your Own Hood</h1>

      {/* Upload Control */}
      <div className="mb-4">
        <label className="block mb-2 text-sm text-gray-300">Upload Your Design</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="bg-gray-800 p-2 rounded"
        />
      </div>

      {/* Design Canvas */}
      <DesignCanvas
        selectedColor={selectedColor}
        selectedStyle={selectedStyle}
        uploadedImage={uploadedImage}
      />
    </main>
  );
}
