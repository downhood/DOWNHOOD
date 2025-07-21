import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_SECRET!,
    });

    const options = {
      amount: body.amount * 100, // convert to paise
      currency: 'INR',
      receipt: 'receipt_' + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json({ orderId: order.id });
  } catch (error: any) {
    console.error('Razorpay Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
