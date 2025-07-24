import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg p-4 shadow-lg">
      <Link href={`/products/${product.id}`}>
        <div>
          <Image src={product.image} alt={product.name} width={300} height={300} className="w-full h-48 object-cover mb-4" />
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="text-gray-600">GH¢{product.price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
}