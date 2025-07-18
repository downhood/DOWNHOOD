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
  const [isValidUpi, setIsValidUpi] = useState(false);
  const [fampayId, setFampayId] = useState('');
  const [isValidFampay, setIsValidFampay] = useState(false);
  const [bankData, setBankData] = useState({
    accountNumber: '',
    ifsc: '',
    holderName: '',
  });
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const amt = parseInt(localStorage.getItem("finalAmount") || "0");
    setAmount(amt);

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const validateUpi = (id: string) => /^[\w.-]{2,256}@[a-zA-Z]{2,64}$/.test(id);
  const validateFampay = (id: string) => /^[0-9]{10}@fam$/.test(id);

  const handlePayNow = async () => {
    if (paymentMethod === 'upi' && !isValidUpi) return;
    if (paymentMethod === 'fampay' && !isValidFampay) return;
    if (paymentMethod === 'bank' && (!bankData.accountNumber || !bankData.ifsc || !bankData.holderName)) return;

    const res = await fetch('/api/razorpay/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });

    const data = await res.json();

    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID', // 🔁 Replace this with your actual Key ID
      amount: data.amount,
      currency: 'INR',
      name: 'REWA DOWNHOOD',
      description: 'Order Payment',
      order_id: data.id,
      handler: function (response: any) {
        alert("✅ Payment Successful!\nPayment ID: " + response.razorpay_payment_id);
        localStorage.removeItem("finalAmount");
      },
      prefill: {
        name: bankData.holderName || 'Customer',
        email: 'user@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#27AE60',
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleBankInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBankData({ ...bankData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-x-hidden">
      {/* Logo */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl">
            <img 
              src="https://static.readdy.ai/image/22f84a0b2e3a2423de1c7f5b112fd4c1/3e1b892243d1d041e658e4081beb6363.jfif"
              alt="Logo"
              className="w-12 h-12 object-contain rounded-full"
            />
          </div>
        </Link>
      </div>

      {/* Header */}
      <div className="bg-black/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="ml-20 text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            REWA DOWNHOOD
          </div>
          <div className="flex gap-4 text-sm">
            <Link href="/cart" className="text-gray-400 hover:text-white">Cart</Link>
            <span className="text-gray-600">→</span>
            <Link href="/checkout/address" className="text-gray-400 hover:text-white">Address</Link>
            <span className="text-gray-600">→</span>
            <span className="text-white">Payment</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold mb-6">Choose Payment Method</h1>

          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 space-y-6">
            {/* Radio buttons */}
            <div className="space-y-3">
              {['upi', 'bank', 'fampay'].map(method => (
                <label key={method} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                    className="accent-green-500"
                  />
                  <span className="capitalize">{method === 'fampay' ? 'Fampay ID' : method === 'upi' ? 'UPI ID' : 'Net Banking'}</span>
                </label>
              ))}
            </div>

            {/* Conditional forms */}
            {paymentMethod === 'upi' && (
              <div>
                <label className="block mb-2">Enter UPI ID</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => {
                    setUpiId(e.target.value);
                    setIsValidUpi(validateUpi(e.target.value));
                  }}
                  placeholder="e.g. 9876543210@paytm"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg"
                />
                {upiId && (
                  <p className={`mt-1 text-sm ${isValidUpi ? 'text-green-400' : 'text-red-400'}`}>
                    {isValidUpi ? '✔ Valid UPI ID' : '✖ Invalid UPI ID'}
                  </p>
                )}
              </div>
            )}

            {paymentMethod === 'fampay' && (
              <div>
                <label className="block mb-2">Enter Fampay ID</label>
                <input
                  type="text"
                  value={fampayId}
                  onChange={(e) => {
                    setFampayId(e.target.value);
                    setIsValidFampay(validateFampay(e.target.value));
                  }}
                  placeholder="e.g. 7440773941@fam"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg"
                />
                {fampayId && (
                  <p className={`mt-1 text-sm ${isValidFampay ? 'text-green-400' : 'text-red-400'}`}>
                    {isValidFampay ? '✔ Valid Fampay ID' : '✖ Invalid Fampay ID'}
                  </p>
                )}
              </div>
            )}

            {paymentMethod === 'bank' && (
              <div className="space-y-4">
                <div>
                  <label className="block mb-1">Account Number</label>
                  <input
                    name="accountNumber"
                    value={bankData.accountNumber}
                    onChange={handleBankInput}
                    placeholder="e.g. 123456789012"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-1">IFSC Code</label>
                  <input
                    name="ifsc"
                    value={bankData.ifsc}
                    onChange={handleBankInput}
                    placeholder="e.g. SBIN0001234"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-1">Account Holder Name</label>
                  <input
                    name="holderName"
                    value={bankData.holderName}
                    onChange={handleBankInput}
                    placeholder="e.g. Anas Khan"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800/50 p-6 border border-gray-700 rounded-xl sticky top-24 space-y-6">
            <h2 className="text-xl font-semibold">Order Summary</h2>

            <div className="border-t border-gray-600 pt-3 text-sm space-y-2">
              <div className="flex justify-between"><span>Subtotal</span><span>₹2,499</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>₹499</span></div>
              <div className="flex justify-between"><span>Tax</span><span>₹449</span></div>
              <div className="border-t border-gray-600 pt-2 flex justify-between font-bold text-lg">
                <span>Total</span><span>₹{amount}</span>
              </div>
            </div>

            <button
              onClick={handlePayNow}
              disabled={
                (paymentMethod === 'upi' && !isValidUpi) ||
                (paymentMethod === 'fampay' && !isValidFampay) ||
                (paymentMethod === 'bank' && (!bankData.accountNumber || !bankData.ifsc || !bankData.holderName))
              }
              className={`w-full py-3 text-lg font-bold rounded-lg transition-all ${
                ((paymentMethod === 'upi' && isValidUpi) ||
                (paymentMethod === 'fampay' && isValidFampay) ||
                (paymentMethod === 'bank' && bankData.accountNumber && bankData.ifsc && bankData.holderName))
                  ? 'bg-gradient-to-r from-white to-gray-300 text-black hover:scale-105'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              Pay Now
            </button>

            <Link href="/checkout/address">
              <button className="w-full mt-3 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 border border-gray-600">
                Back to Address
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
        }
