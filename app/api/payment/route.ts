// app/api/payment/route.ts ✅

import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,      // ✅ using .env variable
    key_secret: process.env.RAZORPAY_SECRET!,  // ✅ using .env variable
  });

  const options = {
    amount: body.amount * 100,  // ✅ convert rupees to paise
    currency: 'INR',
    receipt: 'receipt_order_74394',
  };

  try {
    const order = await razorpay.orders.create(options);
    return NextResponse.json({ orderId: order.id }); // ✅ returning orderId
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
