'use client';

import { useState, useRef } from 'react';

const COLORS = ['#000000', '#FFFFFF', '#FF0000', '#0000FF', '#FFFF00'];

export default function DesignCanvas() {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [size, setSize] = useState(30);
  const [rotation, setRotation] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    const parent = e.currentTarget.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({
      x: Math.min(85, Math.max(15, x)),
      y: Math.min(85, Math.max(15, y)),
    });
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setUploadedImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    setUploadedImage(null);
    setSize(30);
    setRotation(0);
  };

  return (
    <div className="bg-[#0e0e0e] text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold text-center mb-6">🎨 Create Your T-Shirt</h2>

      {/* Preview Area */}
      <div className="relative w-[300px] h-[400px] mx-auto">
        {/* T-shirt Image */}
        <img
          src="/A_digital_photograph_showcases_a_plain_white_short.png"
          alt="T-shirt"
          className="w-full h-full object-contain z-0"
        />

        {/* Color Overlay */}
        <div
          className="absolute inset-0 transition-colors duration-700 mix-blend-multiply pointer-events-none rounded-lg"
          style={{ backgroundColor: selectedColor }}
        />

        {/* Red Dotted Print Area */}
        <div className="absolute top-[25%] left-[10%] w-[80%] h-[60%] border-2 border-dotted border-red-500 pointer-events-none z-10" />

        {/* Sticker */}
        {uploadedImage && (
          <div
            ref={imageRef}
            draggable
            onDragEnd={handleDrag}
            className="absolute cursor-move z-20"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              width: `${size}%`,
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
            }}
          >
            <img
              src={uploadedImage}
              alt="Design"
              className="w-full h-auto"
              style={{ aspectRatio: '1' }}
            />
            {/* Controls */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
              <button
                onClick={handleDelete}
                className="bg-red-600 px-2 py-1 rounded text-xs"
              >
                ❌
              </button>
              <button
                onClick={() => setRotation((r) => r + 15)}
                className="bg-blue-600 px-2 py-1 rounded text-xs"
              >
                ↻
              </button>
              <input
                type="range"
                min="10"
                max="60"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-20"
              />
            </div>
          </div>
        )}
      </div>

      {/* Color Selection */}
      <div className="flex justify-center gap-4 mt-6 mb-4">
        {COLORS.map((color) => (
          <div
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`w-8 h-8 rounded-full border-2 cursor-pointer transition ${
              selectedColor === color ? 'ring-2 ring-white' : ''
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* Upload Button */}
      <div className="text-center mb-6">
        <label className="bg-orange-500 cursor-pointer text-white font-medium px-5 py-2 rounded-md hover:bg-orange-600 transition">
          Add Your Design
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
        </label>
      </div>

      {/* Our Designs */}
      <h3 className="text-lg font-semibold text-center mb-4">OUR DESIGNS</h3>
      <div className="grid grid-cols-4 gap-3 max-w-[320px] mx-auto">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-[#1e1e1e] border border-gray-600 text-center text-sm py-4 rounded-md"
          >
            Sticker {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
