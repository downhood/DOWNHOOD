'use client';

import { useState } from 'react';

interface DesignCanvasProps {
  selectedColor: string;
  selectedStyle: string;
  uploadedImage: string | null;
}

export default function DesignCanvas({
  selectedColor,
  selectedStyle,
  uploadedImage,
}: DesignCanvasProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-white mb-4">Design Your Own Hood</h1>

      <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-2">Design Preview</h2>

        <div
          className={`relative w-full aspect-[3/4] border-2 border-dashed rounded-md flex items-center justify-center ${
            hovered ? 'border-blue-500' : 'border-gray-600'
          }`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* 👕 T-shirt background */}
          <img
            src="/tshirt.png"
            alt="T-shirt mockup"
            className="absolute top-0 left-0 w-full h-full object-contain opacity-30 pointer-events-none"
          />

          {uploadedImage ? (
            <img
              src={uploadedImage}
              alt="Design Preview"
              className="relative z-10 object-contain max-h-full"
            />
          ) : (
            <p className="text-gray-400 relative z-10 text-center">
              Upload an image to see your design
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
