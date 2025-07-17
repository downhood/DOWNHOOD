
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [currentFabric, setCurrentFabric] = useState(0);
  const [currentBestSeller, setCurrentBestSeller] = useState(0);

  const fabrics = [
    { id: 1, name: 'Premium Cotton', image: 'https://readdy.ai/api/search-image?query=Premium%20cotton%20fabric%20texture%2C%20soft%20white%20cotton%20material%2C%20high%20quality%20textile%2C%20clean%20minimal%20background%2C%20professional%20product%20photography%2C%20detailed%20fiber%20texture%2C%20natural%20lighting&width=300&height=300&seq=fabric1&orientation=squarish' },
    { id: 2, name: 'Organic Blend', image: 'https://readdy.ai/api/search-image?query=Organic%20cotton%20blend%20fabric%2C%20eco-friendly%20textile%20material%2C%20natural%20beige%20cotton%2C%20sustainable%20fashion%20material%2C%20soft%20texture%2C%20clean%20background&width=300&height=300&seq=fabric2&orientation=squarish' },
    { id: 3, name: 'Breathable Mesh', image: 'https://readdy.ai/api/search-image?query=Breathable%20mesh%20fabric%2C%20athletic%20sportswear%20material%2C%20performance%20textile%2C%20white%20mesh%20pattern%2C%20ventilation%20holes%2C%20technical%20fabric&width=300&height=300&seq=fabric3&orientation=squarish' },
    { id: 4, name: 'Vintage Denim', image: 'https://readdy.ai/api/search-image?query=Vintage%20denim%20fabric%20texture%2C%20classic%20blue%20jean%20material%2C%20cotton%20denim%20weave%2C%20retro%20fashion%20textile%2C%20detailed%20fabric%20structure&width=300&height=300&seq=fabric4&orientation=squarish' },
    { id: 5, name: 'Silk Touch', image: 'https://readdy.ai/api/search-image?query=Silk%20touch%20fabric%2C%20smooth%20luxurious%20textile%2C%20elegant%20white%20silk%20material%2C%20premium%20fashion%20fabric%2C%20soft%20draping%20material&width=300&height=300&seq=fabric5&orientation=squarish' },
    { id: 6, name: 'Performance Poly', image: 'https://readdy.ai/api/search-image?query=Performance%20polyester%20fabric%2C%20athletic%20wear%20material%2C%20moisture-wicking%20textile%2C%20modern%20sports%20fabric%2C%20technical%20performance%20material&width=300&height=300&seq=fabric6&orientation=squarish' },
    { id: 7, name: 'Bamboo Fiber', image: 'https://readdy.ai/api/search-image?query=Bamboo%20fiber%20fabric%2C%20eco-friendly%20sustainable%20textile%2C%20natural%20green%20bamboo%20material%2C%20organic%20fashion%20fabric%2C%20soft%20texture&width=300&height=300&seq=fabric7&orientation=squarish' },
    { id: 8, name: 'Linen Blend', image: 'https://readdy.ai/api/search-image?query=Linen%20blend%20fabric%2C%20natural%20beige%20linen%20textile%2C%20breathable%20summer%20material%2C%20casual%20fashion%20fabric%2C%20textured%20weave&width=300&height=300&seq=fabric8&orientation=squarish' },
    { id: 9, name: 'Merino Wool', image: 'https://readdy.ai/api/search-image?query=Merino%20wool%20fabric%2C%20premium%20wool%20textile%2C%20soft%20gray%20wool%20material%2C%20luxury%20fashion%20fabric%2C%20fine%20wool%20texture&width=300&height=300&seq=fabric9&orientation=squarish' },
    { id: 10, name: 'Modal Soft', image: 'https://readdy.ai/api/search-image?query=Modal%20fabric%2C%20ultra-soft%20textile%20material%2C%20smooth%20modal%20fiber%2C%20premium%20comfort%20fabric%2C%20silky%20white%20material&width=300&height=300&seq=fabric10&orientation=squarish' }
  ];

  const bestSellers = [
    { id: 1, name: 'Classic Black Tee', price: '₹2,499', image: 'https://readdy.ai/api/search-image?query=Classic%20black%20t-shirt%2C%20premium%20cotton%20tee%2C%20minimalist%20design%2C%20professional%20product%20photo%2C%20clean%20white%20background%2C%20folded%20shirt%20display&width=300&height=300&seq=shirt1&orientation=squarish' },
    { id: 2, name: 'Vintage Gray Hood', price: '₹4,199', image: 'https://readdy.ai/api/search-image?query=Vintage%20gray%20hoodie%2C%20comfortable%20pullover%20sweatshirt%2C%20casual%20streetwear%2C%20modern%20design%2C%20clean%20product%20photography%2C%20white%20background&width=300&height=300&seq=shirt2&orientation=squarish' },
    { id: 3, name: 'White Premium Tee', price: '₹2,799', image: 'https://readdy.ai/api/search-image?query=White%20premium%20t-shirt%2C%20luxury%20cotton%20tee%2C%20high-end%20fashion%2C%20clean%20minimalist%20design%2C%20professional%20product%20photo%2C%20white%20background&width=300&height=300&seq=shirt3&orientation=squarish' },
    { id: 4, name: 'Charcoal Polo', price: '₹3,299', image: 'https://readdy.ai/api/search-image?query=Charcoal%20gray%20polo%20shirt%2C%20business%20casual%20wear%2C%20professional%20clothing%2C%20cotton%20polo%2C%20clean%20product%20photography%2C%20white%20background&width=300&height=300&seq=shirt4&orientation=squarish' },
    { id: 5, name: 'Navy Blue Hoodie', price: '₹4,599', image: 'https://readdy.ai/api/search-image?query=Navy%20blue%20hoodie%2C%20comfortable%20sweatshirt%2C%20casual%20wear%2C%20modern%20streetwear%20design%2C%20clean%20product%20photo%2C%20white%20background&width=300&height=300&seq=shirt5&orientation=squarish' },
    { id: 6, name: 'Cream Tank Top', price: '₹2,099', image: 'https://readdy.ai/api/search-image?query=Cream%20colored%20tank%20top%2C%20summer%20wear%2C%20sleeveless%20shirt%2C%20casual%20fashion%2C%20clean%20product%20photography%2C%20white%20background&width=300&height=300&seq=shirt6&orientation=squarish' },
    { id: 7, name: 'Forest Green Tee', price: '₹2,699', image: 'https://readdy.ai/api/search-image?query=Forest%20green%20t-shirt%2C%20nature%20inspired%20color%2C%20organic%20cotton%20tee%2C%20eco-friendly%20fashion%2C%20clean%20product%20photo%2C%20white%20background&width=300&height=300&seq=shirt7&orientation=squarish' },
    { id: 8, name: 'Burgundy Henley', price: '₹3,099', image: 'https://readdy.ai/api/search-image?query=Burgundy%20henley%20shirt%2C%20button-up%20casual%20wear%2C%20comfortable%20fit%2C%20modern%20design%2C%20clean%20product%20photography%2C%20white%20background&width=300&height=300&seq=shirt8&orientation=squarish' },
    { id: 9, name: 'Light Blue Polo', price: '₹3,499', image: 'https://readdy.ai/api/search-image?query=Light%20blue%20polo%20shirt%2C%20casual%20business%20wear%2C%20cotton%20polo%2C%20professional%20clothing%2C%20clean%20product%20photo%2C%20white%20background&width=300&height=300&seq=shirt9&orientation=squarish' },
    { id: 10, name: 'Black Zip Hoodie', price: '₹4,999', image: 'https://readdy.ai/api/search-image?query=Black%20zip-up%20hoodie%2C%20full-zip%20sweatshirt%2C%20athletic%20wear%2C%20modern%20streetwear%2C%20clean%20product%20photography%2C%20white%20background&width=300&height=300&seq=shirt10&orientation=squarish' }
  ];

  const scrollFabrics = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setCurrentFabric((prev) => (prev + 1) % (fabrics.length - 2));
    } else {
      setCurrentFabric((prev) => (prev - 1 + (fabrics.length - 2)) % (fabrics.length - 2));
    }
  };

  const scrollBestSellers = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setCurrentBestSeller((prev) => (prev + 1) % (bestSellers.length - 2));
    } else {
      setCurrentBestSeller((prev) => (prev - 1 + (bestSellers.length - 2)) % (bestSellers.length - 2));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-x-hidden">
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

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80"></div>
        
        <div className="relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent animate-pulse leading-tight">
            REWA DOWNHOOD
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-12 font-light tracking-wide">
            CREATE YOUR OWN HOOD
          </p>
          
          <Link href="/design">
            <button className="!rounded-button bg-gradient-to-r from-gray-800 to-black border-2 border-gray-600 px-8 md:px-12 py-3 md:py-4 text-lg md:text-xl font-semibold hover:from-gray-700 hover:to-gray-900 hover:border-gray-500 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              LET'S CREATE
            </button>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <i className="ri-arrow-down-line text-2xl text-gray-400"></i>
        </div>
      </div>

      {/* Our Fabrics Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Our Fabrics
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={() => scrollFabrics('left')}
                className="!rounded-button w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-600 hover:bg-gray-700 transition-colors"
              >
                <i className="ri-arrow-left-line text-white"></i>
              </button>
              <button 
                onClick={() => scrollFabrics('right')}
                className="!rounded-button w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-600 hover:bg-gray-700 transition-colors"
              >
                <i className="ri-arrow-right-line text-white"></i>
              </button>
            </div>
          </div>
          
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out gap-6"
              style={{ transform: `translateX(-${currentFabric * 25}%)` }}
            >
              {fabrics.map((fabric) => (
                <div key={fabric.id} className="flex-shrink-0 w-1/4 md:w-1/5">
                  <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700 hover:border-gray-500 transition-all duration-300 transform hover:scale-105">
                    <div className="aspect-square rounded-lg overflow-hidden mb-3">
                      <img 
                        src={fabric.image} 
                        alt={fabric.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-sm font-medium text-center text-gray-200">{fabric.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Our Best Sellers Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Our Best Sellers
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={() => scrollBestSellers('left')}
                className="!rounded-button w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-600 hover:bg-gray-700 transition-colors"
              >
                <i className="ri-arrow-left-line text-white"></i>
              </button>
              <button 
                onClick={() => scrollBestSellers('right')}
                className="!rounded-button w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-600 hover:bg-gray-700 transition-colors"
              >
                <i className="ri-arrow-right-line text-white"></i>
              </button>
            </div>
          </div>
          
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out gap-6"
              style={{ transform: `translateX(-${currentBestSeller * 25}%)` }}
            >
              {bestSellers.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-1/4 md:w-1/5">
                  <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700 hover:border-gray-500 transition-all duration-300 transform hover:scale-105">
                    <div className="aspect-square rounded-lg overflow-hidden mb-3">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-sm font-medium text-gray-200 mb-1">{product.name}</h3>
                    <p className="text-lg font-bold text-white">{product.price}</p>
                    <Link href="/design">
                      <button className="!rounded-button w-full mt-3 bg-gradient-to-r from-gray-700 to-gray-800 py-2 text-sm font-medium hover:from-gray-600 hover:to-gray-700 transition-all duration-300">
                        Customize
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="py-16 text-center px-4">
        <Link href="/design">
          <button className="!rounded-button bg-gradient-to-r from-white to-gray-200 text-black px-12 md:px-16 py-3 md:py-4 text-lg md:text-xl font-bold hover:from-gray-100 hover:to-gray-300 transition-all duration-300 transform hover:scale-105 shadow-2xl">
            START DESIGNING NOW
          </button>
        </Link>
      </div>
    </div>
  );
}
