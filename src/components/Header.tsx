"use client";

import Link from 'next/link';
import { useCartContext } from './CartProvider';

export default function Header() {
  const { cart } = useCartContext();
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-pink-500">
          <Link href="/">MISS DEBBIE KIDS SHOP</Link>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="text-gray-600 hover:text-pink-500">Home</Link></li>
            <li><Link href="/products" className="text-gray-600 hover:text-pink-500">Products</Link></li>
            <li>
              <Link href="/cart" className="text-gray-600 hover:text-pink-500">
                Cart ({itemCount})
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}