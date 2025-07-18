'use client';

import { useState } from 'react';
import Image from 'next/image';

const TShirtDesigner = () => {
  const [shirtColor, setShirtColor] = useState('white');

  const colors = [
    { name: 'black', hex: '#000000' },
    { name: 'white', hex: '#ffffff' },
    { name: 'red', hex: '#ff0000' },
    { name: 'blue', hex: '#0000ff' },
    { name: 'yellow', hex: '#ffff00' },
  ];

  const getFilter = (color: string) => {
    switch (color) {
      case 'red':
        return 'brightness(0) saturate(100%) sepia(1) hue-rotate(0deg)';
      case 'blue':
        return 'brightness(0) saturate(100%) sepia(1) hue-rotate(180deg)';
      case 'yellow':
        return 'brightness(0) saturate(100%) sepia(1) hue-rotate(60deg)';
      case 'black':
        return 'brightness(0) saturate(100%)';
      default:
        return 'none';
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfcf9] flex flex-col items-center p-4">
      <h1 className="text-2xl font-semibold mb-4">🎨 Create Your T-Shirt</h1>

      <div className="relative w-[280px] sm:w-[340px] md:w-[400px]">
        {/* Red dotted print area box */}
        <div className="absolute top-0 bottom-0 left-4 right-4 border-l-4 border-r-4 border-dotted border-red-600 rounded-lg z-10" />

        {/* T-shirt mockup */}
        <Image
          src="/tshirt-mockup.png"
          alt="T-shirt"
          width={400}
          height={400}
          className="mx-auto transition-all duration-500"
          style={{
            filter: getFilter(shirtColor),
            transition: 'filter 0.5s ease',
          }}
        />
      </div>

      {/* Color selector buttons */}
      <div className="flex gap-4 mt-6 mb-4">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => setShirtColor(color.name)}
            className={`w-8 h-8 rounded-full border-2 border-black ${
              shirtColor === color.name ? 'ring-2 ring-black' : ''
            }`}
            style={{ backgroundColor: color.hex }}
          ></button>
        ))}
      </div>

      {/* Add design button */}
      <button className="bg-orange-500 text-white px-4 py-2 rounded-lg mb-6 hover:bg-orange-600 transition">
        Add Your Design
      </button>

      {/* Our Designs section */}
      <div className="bg-[#fff5e6] rounded-lg p-4 w-full max-w-[500px] text-center">
        <h2 className="text-lg font-semibold mb-3">OUR DESIGNS</h2>
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white border p-2 rounded shadow-sm text-sm"
            >
              Sticker {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TShirtDesigner;
