'use client';

import { useState } from 'react';

interface DesignCanvasProps {
  selectedColor: string;
  selectedStyle: string;
  uploadedImage: string | null;
}

export default function DesignCanvas({ selectedColor, selectedStyle, uploadedImage }: DesignCanvasProps) {
  const [imagePosition, setImagePosition] = useState({ x: 50, y: 40 });
  const [imageSize, setImageSize] = useState(30);

  const getShirtImage = () => {
    const baseUrl = 'https://readdy.ai/api/search-image?';
    const params = new URLSearchParams({
      query: `${selectedStyle} mockup, ${selectedColor === '#000000' ? 'black' : selectedColor === '#FFFFFF' ? 'white' : 'colored'} ${selectedStyle}, front view, clean background, product mockup, apparel template`,
      width: '400',
      height: '500',
      seq: `${selectedStyle}-${selectedColor}`,
      orientation: 'portrait'
    });
    return baseUrl + params.toString();
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-semibold mb-4">Design Preview</h3>

      <div className="relative bg-gray-900 rounded-lg aspect-[4/5] overflow-hidden border-2 border-gray-600">
        {/* Shirt Background */}
        <img
          src={getShirtImage()}
          alt={`${selectedStyle} preview`}
          className="w-full h-full object-cover"
        />

        {/* Uploaded Design Overlay */}
        {uploadedImage && (
          <div
            className="absolute cursor-move"
            style={{
              left: `${imagePosition.x}%`,
              top: `${imagePosition.y}%`,
              width: `${imageSize}%`,
              transform: 'translate(-50%, -50%)'
            }}
            draggable
            onDragEnd={(e) => {
              const rect = e.currentTarget.parentElement?.getBoundingClientRect();
              if (rect) {
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                setImagePosition({
                  x: Math.max(15, Math.min(85, x)),
                  y: Math.max(15, Math.min(85, y))
                });
              }
            }}
          >
            <img
              src={uploadedImage}
              alt="Custom design"
              className="w-full h-auto max-w-none"
              style={{ aspectRatio: '1' }}
            />
          </div>
        )}

        {/* Design Controls */}
        {uploadedImage && (
          <div className="absolute bottom-4 left-4 right-4 bg-black/80 rounded-lg p-3">
            <div className="flex items-center gap-4">
              <label className="text-xs text-gray-300">Size:</label>
              <input
                type="range"
                min="10"
                max="50"
                value={imageSize}
                onChange={(e) => setImageSize(Number(e.target.value))}
                className="flex-1"
              />
              <button
                onClick={() => setImagePosition({ x: 50, y: 40 })}
                className="!rounded-button bg-gray-700 px-3 py-1 text-xs hover:bg-gray-600 transition-colors"
              >
                Center
              </button>
            </div>
          </div>
        )}
      </div>

      {!uploadedImage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <i className="ri-image-line text-4xl mb-2 block"></i>
            <p>Upload an image to see your design</p>
          </div>
        </div>
      )}
    </div>
  );
}
