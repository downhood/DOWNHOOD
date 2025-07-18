'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentPage() {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const amt = parseInt(localStorage.getItem("finalAmount") || "0");
    setAmount(amt);

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    const res = await fetch('/api/razorpay/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });

    const data = await res.json();

    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID', // ✅ Replace with your Razorpay Key ID
      amount: data.amount,
      currency: 'INR',
      name: 'REWA DOWNHOOD',
      description: 'Order Payment',
      order_id: data.id,
      handler: async function (response: any) {
        const verifyRes = await fetch('/api/razorpay/order', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });

        const result = await verifyRes.json();
        setLoading(false);
        if (result.verified) {
          setSuccess(true);
          localStorage.removeItem("finalAmount");
        } else {
          alert("❌ Payment Verification Failed");
        }
      },
      prefill: {
        name: 'Customer',
        email: 'user@example.com',
        contact: '9999999999',
      },
      theme: { color: '#27AE60' },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
          className="w-20 mb-4"
          alt="Success"
        />
        <h2 className="text-2xl font-bold mb-2 text-green-700">Order Placed Successfully!</h2>
        <p className="text-gray-600 mb-4">Thank you for your payment. A confirmation email will be sent shortly.</p>
        <Link href="/">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full bg-gray-100 p-6 rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold mb-4">Confirm Payment</h1>
        <div className="mb-4 text-lg">Total Amount: <strong>₹{amount}</strong></div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full py-3 font-semibold rounded-lg transition ${
            loading
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {loading ? 'Processing...' : 'Pay Now Securely'}
        </button>

        <p className="text-xs text-gray-500 mt-3 text-center">
          You will be redirected to Razorpay to complete your payment.
        </p>
      </div>
    </div>
  );
}
