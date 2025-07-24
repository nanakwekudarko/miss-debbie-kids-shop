"use client";

import { useCartContext } from '@/components/CartProvider';
import Image from 'next/image';
import { loadStripe } from '@stripe/stripe-js';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCartContext();

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    if (!stripe) return;

    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart }),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.sessionId,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-8">Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is currently empty.</p>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-4">
                <Image src={item.image} alt={item.name} width={100} height={100} className="w-24 h-24 object-cover rounded-lg" />
                <div>
                  <h2 className="text-xl font-bold">{item.name}</h2>
                  <p className="text-gray-600">GH¢{item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 text-center border rounded"
                />
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right text-2xl font-bold mt-8">
            Total: GH¢{totalPrice.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}