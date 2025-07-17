
'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import DesignCanvas from './DesignCanvas';
import OurDesigns from './OurDesigns';

export default function DesignPage() {
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedStyle, setSelectedStyle] = useState('tshirt');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showDesigns, setShowDesigns] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const colors = ['#000000', '#FFFFFF', '#808080', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const styles = [
    { id: 'tshirt', name: 'T-Shirt', price: 2499 },
    { id: 'hoodie', name: 'Hoodie', price: 4199 },
    { id: 'tank', name: 'Tank Top', price: 2099 }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const currentPrice = styles.find(style => style.id === selectedStyle)?.price || 29.99;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Professional Logo Header */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer">
            <img 
              src="https://static.readdy.ai/image/22f84a0b2e3a2423de1c7f5b112fd4c1/3e1b892243d1d041e658e4081beb6363.jfif" 
              alt="REWA DOWNHOOD Logo" 
              className="w-12 h-12 object-contain rounded-full"
            />
          </div>
        </Link>
      </div>

      {/* Header */}
      <div className="bg-black/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="ml-20">
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              REWA DOWNHOOD
            </span>
          </div>
          <Link href="/cart">
            <button className="!rounded-button bg-gray-800 border border-gray-600 px-6 py-2 hover:bg-gray-700 transition-colors flex items-center gap-2">
              <i className="ri-shopping-cart-line"></i>
              Cart
            </button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Design Canvas */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold mb-6">Design Your Custom Apparel</h1>
            
            <DesignCanvas 
              selectedColor={selectedColor}
              selectedStyle={selectedStyle}
              uploadedImage={uploadedImage}
            />

            {/* Upload Image */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Upload Your Design</h3>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="!rounded-button w-full bg-gradient-to-r from-gray-700 to-gray-800 border border-gray-600 py-3 hover:from-gray-600 hover:to-gray-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <i className="ri-upload-line text-xl"></i>
                Upload Image
              </button>
            </div>

            {/* Our Designs */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Our Designs</h3>
                <button
                  onClick={() => setShowDesigns(!showDesigns)}
                  className="!rounded-button bg-gray-700 px-4 py-2 hover:bg-gray-600 transition-colors"
                >
                  {showDesigns ? 'Hide' : 'Show'} Designs
                </button>
              </div>
              {showDesigns && <OurDesigns onSelectDesign={setUploadedImage} />}
            </div>
          </div>

          {/* Customization Options */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Customize Your Design</h2>

            {/* Style Selection */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Choose Style</h3>
              <div className="grid grid-cols-3 gap-3">
                {styles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`!rounded-button p-4 border-2 transition-all duration-300 ${
                      selectedStyle === style.id
                        ? 'border-white bg-gray-700'
                        : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                    }`}
                  >
                    <div className="text-sm font-medium">{style.name}</div>
                    <div className="text-xs text-gray-400">₹{style.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Choose Color</h3>
              <div className="grid grid-cols-4 gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full border-4 transition-all duration-300 ${
                      selectedColor === color ? 'border-white scale-110' : 'border-gray-600'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Choose Size</h3>
              <div className="grid grid-cols-3 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`!rounded-button py-3 border-2 transition-all duration-300 ${
                      selectedSize === size
                        ? 'border-white bg-gray-700'
                        : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price and Buy */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-2xl font-bold">₹{currentPrice}</div>
                  <div className="text-sm text-gray-400">Size: {selectedSize}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Style</div>
                  <div className="font-medium">{styles.find(s => s.id === selectedStyle)?.name}</div>
                </div>
              </div>
              
              <Link href="/cart">
                <button className="!rounded-button w-full bg-gradient-to-r from-white to-gray-200 text-black py-4 text-lg font-bold hover:from-gray-100 hover:to-gray-300 transition-all duration-300 transform hover:scale-105">
                  BUY NOW
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
