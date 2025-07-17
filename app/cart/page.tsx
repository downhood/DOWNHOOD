
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Custom Black T-Shirt',
      size: 'M',
      color: 'Black',
      price: 2499,
      quantity: 1,
      image: 'https://readdy.ai/api/search-image?query=Black%20t-shirt%20with%20custom%20design%2C%20product%20photo%2C%20custom%20printing%2C%20personalized%20apparel%2C%20front%20view%20mockup&width=200&height=200&seq=cart1&orientation=squarish'
    }
  ]);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 499;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

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
          <Link href="/design" className="text-gray-400 hover:text-white transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <i className="ri-shopping-cart-line text-6xl text-gray-600 mb-4 block"></i>
            <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
            <Link href="/design">
              <button className="!rounded-button bg-gradient-to-r from-white to-gray-200 text-black px-8 py-3 font-semibold hover:from-gray-100 hover:to-gray-300 transition-all duration-300">
                Start Designing
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                      <div className="text-sm text-gray-400 mb-3">
                        <span>Size: {item.size}</span> • <span>Color: {item.color}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="!rounded-button w-8 h-8 flex items-center justify-center bg-gray-700 hover:bg-gray-600 transition-colors"
                          >
                            <i className="ri-subtract-line"></i>
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="!rounded-button w-8 h-8 flex items-center justify-center bg-gray-700 hover:bg-gray-600 transition-colors"
                          >
                            <i className="ri-add-line"></i>
                          </button>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="font-semibold text-lg">₹{(item.price * item.quantity).toFixed(0)}</span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <i className="ri-delete-bin-line text-xl"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 sticky top-24">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹{shipping.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (GST)</span>
                    <span>₹{tax.toFixed(0)}</span>
                  </div>
                  <div className="border-t border-gray-600 pt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>₹{total.toFixed(0)}</span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout/address">
                  <button className="!rounded-button w-full bg-gradient-to-r from-white to-gray-200 text-black py-4 text-lg font-bold hover:from-gray-100 hover:to-gray-300 transition-all duration-300 transform hover:scale-105">
                    Proceed to Checkout
                  </button>
                </Link>

                <Link href="/design" className="block mt-4">
                  <button className="!rounded-button w-full bg-gray-700 border border-gray-600 py-3 hover:bg-gray-600 transition-colors">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
