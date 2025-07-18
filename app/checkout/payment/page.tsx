// app/checkout/payment/page.tsx

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [fampayId, setFampayId] = useState('');
  const [bank, setBank] = useState({ account: '', ifsc: '', holder: '' });
  const [amount, setAmount] = useState(3447);

  useEffect(() => {
    const storedAmount = parseInt(localStorage.getItem('finalAmount') || '3447');
    setAmount(storedAmount);

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const isValidUpi = /^[\w.-]{2,256}@[a-zA-Z]{2,64}$/.test(upiId);
  const isValidFampay = /^[0-9]{10}@fam$/.test(fampayId);
  const isValidBank =
    bank.account.length >= 8 && bank.ifsc.length >= 6 && bank.holder.length > 2;

  const handlePayNow = async () => {
    if (
      (paymentMethod === 'upi' && !isValidUpi) ||
      (paymentMethod === 'fampay' && !isValidFampay) ||
      (paymentMethod === 'bank' && !isValidBank)
    ) {
      alert('Please fill valid details');
      return;
    }

    const res = await fetch('/api/razorpay/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });

    const data = await res.json();

    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID', // 🔁 Replace this
      amount: data.amount,
      currency: 'INR',
      name: 'REWA DOWNHOOD',
      description: 'Order Payment',
      order_id: data.id,
      handler: function (response: any) {
        alert('✅ Payment Successful!\nPayment ID: ' + response.razorpay_payment_id);
      },
      theme: {
        color: '#27AE60',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Logo */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl">
            <img
              src="https://static.readdy.ai/image/22f84a0b2e3a2423de1c7f5b112fd4c1/3e1b892243d1d041e658e4081beb6363.jfif"
              className="w-12 h-12 rounded-full object-contain"
              alt="Logo"
            />
          </div>
        </Link>
      </div>

      {/* Header */}
      <div className="bg-black/80 sticky top-0 border-b border-gray-800 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            REWA DOWNHOOD
          </span>
          <div className="flex gap-3 text-sm">
            <Link href="/cart" className="text-gray-400 hover:text-white">Cart</Link>
            <span className="text-gray-600">→</span>
            <Link href="/checkout/address" className="text-gray-400 hover:text-white">Address</Link>
            <span className="text-gray-600">→</span>
            <span className="text-white">Payment</span>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-4xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        {/* Payment Options */}
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold">Payment Method</h1>

          <div className="space-y-3">
            {['upi', 'fampay', 'bank'].map((method) => (
              <label key={method} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                  className="accent-green-500"
                />
                <span className="capitalize">{method === 'fampay' ? 'Fampay' : method}</span>
              </label>
            ))}
          </div>

          {paymentMethod === 'upi' && (
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="Enter UPI ID"
              className="w-full p-3 bg-gray-700 rounded-lg"
            />
          )}

          {paymentMethod === 'fampay' && (
            <input
              type="text"
              value={fampayId}
              onChange={(e) => setFampayId(e.target.value)}
              placeholder="e.g. 9876543210@fam"
              className="w-full p-3 bg-gray-700 rounded-lg"
            />
          )}

          {paymentMethod === 'bank' && (
            <>
              <input
                type="text"
                placeholder="Account Number"
                value={bank.account}
                onChange={(e) => setBank({ ...bank, account: e.target.value })}
                className="w-full p-3 bg-gray-700 rounded-lg"
              />
              <input
                type="text"
                placeholder="IFSC Code"
                value={bank.ifsc}
                onChange={(e) => setBank({ ...bank, ifsc: e.target.value })}
                className="w-full p-3 bg-gray-700 rounded-lg"
              />
              <input
                type="text"
                placeholder="Account Holder Name"
                value={bank.holder}
                onChange={(e) => setBank({ ...bank, holder: e.target.value })}
                className="w-full p-3 bg-gray-700 rounded-lg"
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
            className={`w-full py-3 font-bold rounded-lg ${
              (paymentMethod === 'upi' && isValidUpi) ||
              (paymentMethod === 'fampay' && isValidFampay) ||
              (paymentMethod === 'bank' && isValidBank)
                ? 'bg-white text-black hover:bg-gray-300'
                : 'bg-gray-600 text-gray-300 cursor-not-allowed'
            }`}
            disabled={
              (paymentMethod === 'upi' && !isValidUpi) ||
              (paymentMethod === 'fampay' && !isValidFampay) ||
              (paymentMethod === 'bank' && !isValidBank)
            }
          >
            Pay Now
          </button>

          <Link href="/checkout/address">
            <button className="mt-2 text-sm text-gray-400 underline w-full">
              Back to Address
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
