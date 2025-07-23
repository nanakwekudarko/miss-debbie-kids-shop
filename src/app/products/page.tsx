import ProductCard from '@/components/ProductCard';
import products from '@/data/products.json';

export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}