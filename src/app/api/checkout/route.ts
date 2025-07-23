import { stripe } from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
  const { cart }: { cart: CartItem[] } = await req.json();

  const lineItems = cart.map((item: CartItem) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
        images: [item.image],
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${req.nextUrl.origin}/success`,
    cancel_url: `${req.nextUrl.origin}/cart`,
  });

  return NextResponse.json({ sessionId: session.id });
}