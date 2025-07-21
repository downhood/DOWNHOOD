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
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 3447 }),
      });

      const data = await response.json();
      console.log('Fetched order ID:', data.orderId);

      if (!data.orderId) {
        alert('Order ID not found from server');
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: 344700,
        currency: 'INR',
        name: 'REWA DOWNHOOD',
        order_id: data.orderId,
        handler: function (response: any) {
          console.log('Payment successful:', response);
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
        },
        prefill: {
          email: 'test@example.com',
          contact: '9999999999',
        },
        method: {
          upi: true,
          card: false,
          netbanking: false,
        },
        theme: {
          color: '#121212',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error: any) {
      console.error('Payment error:', error);
      alert('Payment failed: ' + error.message);
    }
  };

  // ✅ Render UPI Input + Button
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6 px-6">
      <h1 className="text-3xl font-bold">UPI Payment</h1>

      <input
        type="text"
        name="upiId"
        value={upiData.upiId}
        onChange={handleUpiInputChange}
        placeholder="Enter your UPI ID"
        className="w-full max-w-md px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none"
      />

      <button
        onClick={handlePlaceOrder}
        disabled={!isUpiFormValid}
        className={`w-full max-w-md py-3 rounded-md text-white font-semibold ${
          isUpiFormValid ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 cursor-not-allowed'
        }`}
      >
        Pay with Razorpay
      </button>

      {showSuccess && (
        <div className="text-green-400 font-semibold text-lg mt-4">
          ✅ Payment Successful!
        </div>
      )}
    </div>
  );
}
