import ProductCard from '@/components/ProductCard';
import products from '@/data/products.json';

export default function Home() {
  const featuredProducts = products.slice(0, 100);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-8">
        Welcome to MISS DEBBIE KIDS SHOP
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Cherishing childhood moments.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
