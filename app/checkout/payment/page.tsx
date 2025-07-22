'use client';

import { useState } from 'react';

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
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const isValidUpi = (id: string) => /^[\w.-]+@[\w.-]+$/.test(id);

  const handlePay = async () => {
    if (!isValidUpi(upiId)) {
      alert('Please enter a valid UPI ID');
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      alert('Razorpay SDK failed to load');
      return;
    }

    setIsProcessing(true);

    try {
      const orderRes = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 3447 }), // ₹3447
      });

      const data = await orderRes.json();

      if (!data.orderId) throw new Error('No order ID received');

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: 344700, // in paise
        currency: 'INR',
        name: 'REWA DOWNHOOD',
        description: 'T-shirt Purchase',
        order_id: data.orderId,
        handler: function (response: any) {
          console.log('Payment success:', response);
          setPaymentSuccess(true);
        },
        prefill: {
          email: 'test@example.com',
          contact: '9999999999',
          method: 'upi',
        },
        notes: {
          upi_id: upiId,
        },
        theme: { color: '#121212' },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      alert('Payment failed: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Payment Successful ✅</h1>
          <p className="mt-2">Thank you for your order.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-white bg-black p-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">UPI Payment</h1>
        <input
          type="text"
          placeholder="Enter your UPI ID"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 border border-gray-600"
        />
        <button
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full py-3 bg-white text-black rounded hover:bg-gray-200 font-semibold"
        >
          {isProcessing ? 'Processing...' : 'Pay with Razorpay'}
        </button>
      </div>
    </div>
  );
}
