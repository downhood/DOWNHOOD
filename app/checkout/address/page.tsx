'use client';

import Link from 'next/link'; import { useState } from 'react';

export default function AddressPage() { const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', address: '', landmark: '' });

const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> ) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };

const isFormValid = formData.firstName && formData.lastName && formData.phone && formData.address && formData.landmark;

return ( <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-black via-gray-900 to-black text-white"> {/* Logo */} <div className="relative z-50"> <div className="absolute top-4 left-4"> <Link href="/"> <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer"> <img 
src="https://static.readdy.ai/image/22f84a0b2e3a2423de1c7f5b112fd4c1/3e1b892243d1d041e658e4081beb6363.jfif" 
alt="REWA DOWNHOOD Logo" 
className="w-12 h-12 object-contain rounded-full"
/> </div> </Link> </div> </div>

{/* Header */}
  <div className="bg-black/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-40">
    <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
      <div className="ml-20">
        <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          REWA DOWNHOOD
        </span>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <Link href="/cart" className="text-gray-400 hover:text-white transition-colors">Cart</Link>
        <span className="text-gray-600">→</span>
        <span className="text-white">Address</span>
        <span className="text-gray-600">→</span>
        <span className="text-gray-400">Payment</span>
      </div>
    </div>
  </div>

  <div className="w-full max-w-4xl mx-auto px-4 py-8">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Address Form */}
      <div className="col-span-1 lg:col-span-2">
        <h1 className="text-3xl font-bold mb-8">Shipping Address</h1>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 98765 43210"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Full Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                placeholder="House/Flat No., Street, Area, City, State, PIN Code"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Nearest Landmark *</label>
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleInputChange}
                placeholder="Near XYZ Mall, ABC School, etc."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors"
                required
              />
            </div>
          </form>
        </div>
      </div>

      {/* Order Summary */}
      <div className="col-span-1">
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 sticky top-24">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6">
            <div className="flex gap-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src="https://readdy.ai/api/search-image?query=Black%20t-shirt%20with%20custom%20design%2C%20product%20photo%2C%20custom%20printing%2C%20personalized%20apparel%2C%20front%20view%20mockup&width=100&height=100&seq=checkout1&orientation=squarish"
                  alt="Custom T-Shirt"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Custom Black T-Shirt</h3>
                <p className="text-sm text-gray-400">Size: M • Qty: 1</p>
                <p className="font-semibold">₹2,499</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-6 pt-4 border-t border-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹2,499</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹499</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (GST)</span>
              <span>₹449</span>
            </div>
            <div className="border-t border-gray-600 pt-3">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹3,447</span>
              </div>
            </div>
          </div>

          <Link href={isFormValid ? "/checkout/payment" : "#"}>
            <button 
              className={`!rounded-button w-full py-4 text-lg font-bold transition-all duration-300 ${
                isFormValid 
                  ? 'bg-gradient-to-r from-white to-gray-200 text-black hover:from-gray-100 hover:to-gray-300 transform hover:scale-105' 
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!isFormValid}
            >
              Continue to Payment
            </button>
          </Link>

          <Link href="/cart" className="block mt-4">
            <button className="!rounded-button w-full bg-gray-700 border border-gray-600 py-3 hover:bg-gray-600 transition-colors">
              Back to Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>

); }

          
