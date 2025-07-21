'use client';

import Link from 'next/link';
import { useState } from 'react';

// ✅ Razorpay script loader
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiData, setUpiData] = useState({ upiId: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  const isValidUpiId = (upiId: string) => {
    const upiRegex = /^[a-zA-Z0-9._\-]{2,256}@[a-zA-Z]{2,64}$/;
    return upiRegex.test(upiId);
  };

  const isUpiFormValid = isValidUpiId(upiData.upiId);

  const handleUpiInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpiData({ ...upiData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (paymentMethod !== 'upi' || !isUpiFormValid) return;

    const res = await loadRazorpayScript();
    if (!res) {
      alert('Failed to load Razorpay. Please try again.');
      return;
    }

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 3447 }), // ₹3,447
      });

      const data = await response.json();
      if (!data.orderId) {
        alert('Failed to create order');
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: 344700, // in paise
        currency: 'INR',
        name: 'REWA DOWNHOOD',
        description: 'Order Payment',
        order_id: data.orderId,
        handler: function (response: any) {
          console.log('Payment success', response);
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
        },
        prefill: {
          email: 'test@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#1f2937',
        },
        method: {
          upi: true,
          card: false,
          netbanking: false,
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Payment error', err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">UPI Payment</h1>

      <div className="max-w-md space-y-4">
        <input
          type="text"
          name="upiId"
          value={upiData.upiId}
          onChange={handleUpiInputChange}
          placeholder="Enter your UPI ID"
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none"
        />

        <button
          onClick={handlePlaceOrder}
          disabled={!isUpiFormValid}
          className={`w-full py-3 rounded-lg font-bold ${
            isUpiFormValid
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          Pay with Razorpay
        </button>

        {showSuccess && (
          <div className="mt-4 text-green-400 text-lg font-semibold">
            ✅ Payment Successful!
          </div>
        )}
      </div>
    </div>
  );
  }
