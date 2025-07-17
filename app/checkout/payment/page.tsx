
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiData, setUpiData] = useState({
    upiId: ''
  });
  const [bankData, setBankData] = useState({
    accountNumber: '',
    ifscCode: '',
    accountHolderName: ''
  });
  const [fampayData, setFampayData] = useState({
    fampayId: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFampayInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFampayData({
      ...fampayData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpiInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpiData({
      ...upiData,
      [e.target.name]: e.target.value
    });
  };

  const handleBankInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBankData({
      ...bankData,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const validUpiIds = ['8462912222@axl', 'anaskhan05092007@axl'];
  const validFampayIds = ['7440773941@fam'];
  const validAccountNumbers = ['1234567890123456', '9876543210987654'];
  const validIfscCodes = ['SBIN0001234', 'HDFC0000123', 'ICIC0000456'];
  const validAccountHolders = ['John Doe', 'Anas Khan', 'Raj Patel'];

  // Updated validation functions
  const isValidUpiId = (upiId: string) => {
    // UPI ID format: phone/text@provider (like 1234567890@paytm, user@googlepay, etc.)
    const upiRegex = /^[a-zA-Z0-9.\\-_]{2,256}@[a-zA-Z][a-zA-Z0-9.\\-_]{2,64}$/;
    return upiRegex.test(upiId);
  };

  const isValidFampayId = (fampayId: string) => {
    // Fampay ID format: phone@fam (like 1234567890@fam)
    const fampayRegex = /^[0-9]{10}@fam$/;
    return fampayRegex.test(fampayId);
  };

  const isUpiFormValid = isValidUpiId(upiData.upiId);
  const isBankFormValid = validAccountNumbers.includes(bankData.accountNumber) && 
                         validIfscCodes.includes(bankData.ifscCode) && 
                         validAccountHolders.includes(bankData.accountHolderName);
  const isFampayFormValid = isValidFampayId(fampayData.fampayId);

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex items-center justify-center overflow-x-hidden">
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
        
        <div className="text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-check-line text-3xl text-white"></i>
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-400 mb-8">Thank you for your order. You'll receive a confirmation email shortly.</p>
          <Link href="/">
            <button className="!rounded-button bg-gradient-to-r from-white to-gray-200 text-black px-8 py-3 font-semibold hover:from-gray-100 hover:to-gray-300 transition-all duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

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
            <Link href="/checkout/address" className="text-gray-400 hover:text-white transition-colors">Address</Link>
            <span className="text-gray-600">→</span>
            <span className="text-white">Payment</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-8">Payment Method</h1>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              {/* Payment Method Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Choose Payment Method</h3>
                <div className="space-y-3">
                  <label className="flex items-center p-4 bg-gray-700/50 rounded-lg border border-gray-600 cursor-pointer hover:bg-gray-700/70 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <div className="flex items-center gap-3">
                      <i className="ri-smartphone-line text-xl"></i>
                      <div>
                        <span className="block font-medium">UPI Payment</span>
                        <span className="text-sm text-gray-400">Google Pay, PhonePe, Paytm, etc.</span>
                      </div>
                    </div>
                  </label>
                  
                  <label className="flex items-center p-4 bg-gray-700/50 rounded-lg border border-gray-600 cursor-pointer hover:bg-gray-700/70 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={paymentMethod === 'bank'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <div className="flex items-center gap-3">
                      <i className="ri-bank-line text-xl"></i>
                      <div>
                        <span className="block font-medium">Net Banking</span>
                        <span className="text-sm text-gray-400">All major banks supported</span>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 bg-gray-700/50 rounded-lg border border-gray-600 cursor-pointer hover:bg-gray-700/70 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="fampay"
                      checked={paymentMethod === 'fampay'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <div className="flex items-center gap-3">
                      <i className="ri-bank-card-line text-xl"></i>
                      <span>Fampay</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* UPI Payment Form */}
              {paymentMethod === 'upi' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">UPI Payment Details</h3>
                  
                  <div className="relative">
                    <label className="block text-sm font-medium mb-2">UPI ID *</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="upiId"
                        value={upiData.upiId}
                        onChange={handleUpiInputChange}
                        placeholder="e.g. 8462912222@axl or anaskhan05092007@axl"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-white transition-colors"
                        required
                      />
                      {isUpiFormValid && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                            <i className="ri-check-line text-white text-sm"></i>
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Enter your UPI ID (format: username@provider)</p>
                  </div>
                </div>
              )}

              {/* Bank Payment Form */}
              {paymentMethod === 'bank' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Net Banking Details</h3>
                  
                  <div className="relative">
                    <label className="block text-sm font-medium mb-2">Account Number *</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="accountNumber"
                        value={bankData.accountNumber}
                        onChange={handleBankInputChange}
                        placeholder="1234567890123456"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-white transition-colors"
                        required
                      />
                      {validAccountNumbers.includes(bankData.accountNumber) && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                            <i className="ri-check-line text-white text-sm"></i>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium mb-2">IFSC Code *</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="ifscCode"
                        value={bankData.ifscCode}
                        onChange={handleBankInputChange}
                        placeholder="SBIN0001234"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-white transition-colors"
                        required
                      />
                      {validIfscCodes.includes(bankData.ifscCode) && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                            <i className="ri-check-line text-white text-sm"></i>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium mb-2">Account Holder Name *</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="accountHolderName"
                        value={bankData.accountHolderName}
                        onChange={handleBankInputChange}
                        placeholder="John Doe"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-white transition-colors"
                        required
                      />
                      {validAccountHolders.includes(bankData.accountHolderName) && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                            <i className="ri-check-line text-white text-sm"></i>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Fampay Payment Form */}
              {paymentMethod === 'fampay' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Fampay Details</h3>
                  
                  <div className="relative">
                    <label className="block text-sm font-medium mb-2">Fampay ID *</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="fampayId"
                        value={fampayData.fampayId}
                        onChange={handleFampayInputChange}
                        placeholder="e.g. 7440773941@fam"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-white transition-colors"
                        required
                      />
                      {isFampayFormValid && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                            <i className="ri-check-line text-white text-sm"></i>
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Enter your 10-digit phone number followed by @fam</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Black%20t-shirt%20with%20custom%20design%2C%20product%20photo%2C%20custom%20printing%2C%20personalized%20apparel%2C%20front%20view%20mockup&width=100&height=100&seq=payment1&orientation=squarish"
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
              
              <button 
                onClick={handlePlaceOrder}
                className={`!rounded-button w-full py-4 text-lg font-bold transition-all duration-300 ${
                  (paymentMethod === 'upi' && isUpiFormValid) || (paymentMethod === 'bank' && isBankFormValid) || (paymentMethod === 'fampay' && isFampayFormValid)
                    ? 'bg-gradient-to-r from-white to-gray-200 text-black hover:from-gray-100 hover:to-gray-300 transform hover:scale-105' 
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
                disabled={(paymentMethod === 'upi' && !isUpiFormValid) || (paymentMethod === 'bank' && !isBankFormValid) || (paymentMethod === 'fampay' && !isFampayFormValid)}
              >
                Place Order
              </button>
              
              <Link href="/checkout/address" className="block mt-4">
                <button className="!rounded-button w-full bg-gray-700 border border-gray-600 py-3 hover:bg-gray-600 transition-colors">
                  Back to Address
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
