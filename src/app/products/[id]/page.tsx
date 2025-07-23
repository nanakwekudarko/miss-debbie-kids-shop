"use client";

import products from '@/data/products.json';
import Image from 'next/image';
import { useCartContext } from '@/components/CartProvider';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { addToCart } = useCartContext();
  const product = products.find((p) => p.id === parseInt(params.id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image src={product.image} alt={product.name} width={500} height={500} className="w-full h-auto object-cover rounded-lg" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-gray-800 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-8">{product.description}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}