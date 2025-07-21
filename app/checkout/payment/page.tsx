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
  } catch (error) {
    console.error('Payment error:', error);
    alert('Payment failed: ' + error.message);
  }
};
