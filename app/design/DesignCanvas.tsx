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

  // Convert color codes to image-safe names
  const colorMap: Record<string, string> = {
    '#000000': 'black',
    '#FFFFFF': 'white',
    '#FF0000': 'red',
    '#0000FF': 'blue',
    '#00FF00': 'green',
    '#FFFF00': 'yellow',
    '#FF00FF': 'pink',
    '#808080': 'gray',
  };

  const colorName = colorMap[selectedColor] || 'black';
  const imageSrc = `/mockups/tshirt-${colorName}.png`;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-white mb-4">Design Your Own Hood</h1>

      <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-2">Design Preview</h2>

        <div
          className={`relative w-full aspect-[3/4] border-2 border-dashed rounded-md flex items-center justify-center overflow-hidden ${
            hovered ? 'border-blue-500' : 'border-gray-600'
          }`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* T-shirt image changes with color */}
          <img
            src={imageSrc}
            alt={`${colorName} t-shirt`}
            className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
          />

          {uploadedImage ? (
            <img
              src={uploadedImage}
              alt="Design Preview"
              className="absolute z-10 max-w-[60%] max-h-[60%] object-contain"
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
