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
  const [isValidUpi, setIsValidUpi] = useState(false);
  const [isValidFam, setIsValidFam] = useState(false);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const amt = parseInt(localStorage.getItem("finalAmount") || "3447");
    setAmount(amt);

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const validateUpi = (id: string) => /^[\w.-]{2,256}@[a-zA-Z]{2,64}$/.test(id);
  const validateFam = (id: string) => /^[0-9]{10}@fam$/.test(id);

  const handlePayNow = async () => {
    if (paymentMethod === 'upi' && !isValidUpi) return;
    if (paymentMethod === 'fampay' && !isValidFam) return;

    const res = await fetch('/api/razorpay/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });

    const data = await res.json();

    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID', // ✅ Replace with your real Razorpay Key ID
      amount: data.amount,
      currency: 'INR',
      name: 'REWA DOWNHOOD',
      description: 'Order Payment',
      order_id: data.id,
      handler: function (response: any) {
        alert("✅ Payment Successful!\nPayment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: 'Customer',
        email: 'user@example.com',
        contact: '9999999999',
      },
      theme: { color: '#27AE60' }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-4 py-10">
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold">Select Payment Method</h1>

          {/* Radio Buttons */}
          {['upi', 'bank', 'fampay'].map(method => (
            <label key={method} className="flex items-center gap-3">
              <input
                type="radio"
                value={method}
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
              />
              {method === 'upi' ? 'UPI ID' : method === 'bank' ? 'Net Banking' : 'Fampay ID'}
            </label>
          ))}

          {/* UPI Form */}
          {paymentMethod === 'upi' && (
            <div>
              <input
                type="text"
                placeholder="Enter your UPI ID"
                className="w-full bg-gray-800 p-3 rounded-lg"
                value={upiId}
                onChange={(e) => {
                  setUpiId(e.target.value);
                  setIsValidUpi(validateUpi(e.target.value));
                }}
              />
              {upiId && (isValidUpi ? <p className="text-green-400">✔ Valid</p> : <p className="text-red-400">✖ Invalid</p>)}
            </div>
          )}

          {/* Fampay Form */}
          {paymentMethod === 'fampay' && (
            <div>
              <input
                type="text"
                placeholder="Enter your Fampay ID"
                className="w-full bg-gray-800 p-3 rounded-lg"
                value={fampayId}
                onChange={(e) => {
                  setFampayId(e.target.value);
                  setIsValidFam(validateFam(e.target.value));
                }}
              />
              {fampayId && (isValidFam ? <p className="text-green-400">✔ Valid</p> : <p className="text-red-400">✖ Invalid</p>)}
            </div>
          )}

          {/* Net Banking Form */}
          {paymentMethod === 'bank' && (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Account Number"
                className="w-full bg-gray-800 p-3 rounded-lg"
                value={bankDetails.account}
                onChange={(e) => setBankDetails({ ...bankDetails, account: e.target.value })}
              />
              <input
                type="text"
                placeholder="IFSC Code"
                className="w-full bg-gray-800 p-3 rounded-lg"
                value={bankDetails.ifsc}
                onChange={(e) => setBankDetails({ ...bankDetails, ifsc: e.target.value })}
              />
              <input
                type="text"
                placeholder="Account Holder Name"
                className="w-full bg-gray-800 p-3 rounded-lg"
                value={bankDetails.name}
                onChange={(e) => setBankDetails({ ...bankDetails, name: e.target.value })}
              />
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-800 p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-bold">Order Summary</h2>
          <p>Subtotal: ₹2499</p>
          <p>Shipping: ₹499</p>
          <p>Tax: ₹449</p>
          <hr />
          <p className="text-lg font-bold">Total: ₹{amount}</p>
          <button
            className="bg-white text-black w-full py-3 mt-4 font-bold rounded-lg hover:bg-gray-300"
            onClick={handlePayNow}
            disabled={
              (paymentMethod === 'upi' && !isValidUpi) ||
              (paymentMethod === 'fampay' && !isValidFam)
            }
          >
            Pay Now
          </button>
          <Link href="/checkout/address">
            <button className="w-full mt-2 text-sm text-gray-400 underline">Back to Address</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
