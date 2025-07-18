'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [fampayId, setFampayId] = useState('');
  const [bankDetails, setBankDetails] = useState({ account: '', ifsc: '', name: '' });
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const amt = parseInt(localStorage.getItem("finalAmount") || "3447");
    setAmount(amt);

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const isValidUpi = /^[\w.-]{2,256}@[a-zA-Z]{2,64}$/.test(upiId);
  const isValidFampay = /^[0-9]{10}@fam$/.test(fampayId);
  const isValidBank = bankDetails.account.length >= 8 && bankDetails.ifsc.length >= 8 && bankDetails.name.length > 2;

  const handlePayNow = async () => {
    if (
      (paymentMethod === 'upi' && !isValidUpi) ||
      (paymentMethod === 'fampay' && !isValidFampay) ||
      (paymentMethod === 'bank' && !isValidBank)
    ) return;

    const res = await fetch('/api/razorpay/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });

    const data = await res.json();

    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID', // 🔁 Replace this with your actual Razorpay Key ID
      amount: data.amount,
      currency: 'INR',
      name: 'REWA DOWNHOOD',
      description: 'Order Payment',
      order_id: data.id,
      handler: function (response: any) {
        alert('✅ Payment Successful!\nPayment ID: ' + response.razorpay_payment_id);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Logo */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition">
            <img
              src="https://static.readdy.ai/image/22f84a0b2e3a2423de1c7f5b112fd4c1/3e1b892243d1d041e658e4081beb6363.jfif"
              alt="REWA Logo"
              className="w-12 h-12 object-contain rounded-full"
            />
          </div>
        </Link>
      </div>

      {/* Header Nav */}
      <div className="bg-black/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="ml-20">
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              REWA DOWNHOOD
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/cart" className="text-gray-400 hover:text-white">Cart</Link>
            <span className="text-gray-600">→</span>
            <Link href="/checkout/address" className="text-gray-400 hover:text-white">Address</Link>
            <span className="text-gray-600">→</span>
            <span className="text-white">Payment</span>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="max-w-4xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        {/* Payment Method */}
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold mb-4">Choose Payment Method</h1>

          {['upi', 'fampay', 'bank'].map((method) => (
            <label key={method} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                value={method}
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
                className="accent-green-500"
              />
              {method === 'upi' ? 'UPI (Google Pay, PhonePe)' :
               method === 'fampay' ? 'Fampay' : 'Net Banking'}
            </label>
          ))}

          {/* UPI */}
          {paymentMethod === 'upi' && (
            <input
              type="text"
              className="w-full bg-gray-700 rounded-lg p-3"
              placeholder="Enter your UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          )}

          {/* Fampay */}
          {paymentMethod === 'fampay' && (
            <input
              type="text"
              className="w-full bg-gray-700 rounded-lg p-3"
              placeholder="Enter your Fampay ID"
              value={fampayId}
              onChange={(e) => setFampayId(e.target.value)}
            />
          )}

          {/* Net Banking */}
          {paymentMethod === 'bank' && (
            <>
              <input
                type="text"
                className="w-full bg-gray-700 rounded-lg p-3"
                placeholder="Account Number"
                value={bankDetails.account}
                onChange={(e) => setBankDetails({ ...bankDetails, account: e.target.value })}
              />
              <input
                type="text"
                className="w-full bg-gray-700 rounded-lg p-3"
                placeholder="IFSC Code"
                value={bankDetails.ifsc}
                onChange={(e) => setBankDetails({ ...bankDetails, ifsc: e.target.value })}
              />
              <input
                type="text"
                className="w-full bg-gray-700 rounded-lg p-3"
                placeholder="Account Holder Name"
                value={bankDetails.name}
                onChange={(e) => setBankDetails({ ...bankDetails, name: e.target.value })}
              />
            </>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-800 p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <p>Subtotal: ₹2499</p>
          <p>Shipping: ₹499</p>
          <p>Tax: ₹449</p>
          <hr />
          <p className="text-lg font-bold">Total: ₹{amount}</p>

          <button
            onClick={handlePayNow}
            disabled={
              (paymentMethod === 'upi' && !isValidUpi) ||
              (paymentMethod === 'fampay' && !isValidFampay) ||
              (paymentMethod === 'bank' && !isValidBank)
            }
            className="bg-white text-black font-bold w-full py-3 rounded-lg hover:bg-gray-300 transition"
          >
            Pay Now
          </button>

          <Link href="/checkout/address">
            <button className="w-full mt-2 text-sm text-gray-400 underline">
              Back to Address
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
      }
