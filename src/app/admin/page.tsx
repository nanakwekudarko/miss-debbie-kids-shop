"use client";

import { useState, useEffect } from 'react';
import productsData from '@/data/products.json';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
  });

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = () => {
    const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    const productToAdd = {
      id: newId,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      image: newProduct.image,
      description: newProduct.description,
    };
    const updatedProducts = [...products, productToAdd];
    setProducts(updatedProducts);
    // Here you would typically make an API call to update the products.json file
    console.log('Updated products:', updatedProducts);
    setNewProduct({ name: '', price: '', image: '', description: '' });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-8">Admin - Manage Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newProduct.name}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={newProduct.price}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={newProduct.description}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <button onClick={handleAddProduct} className="bg-pink-500 text-white p-2 rounded">
              Add Product
            </button>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Existing Products</h2>
          <div className="flex flex-col gap-4">
            {products.map((product) => (
              <div key={product.id} className="border p-4 rounded">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}