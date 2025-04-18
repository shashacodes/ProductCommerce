'use client';
import { useState } from 'react';
import { products } from '@/app/components/data/products';
import { Product } from '@/app/types/types';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem extends Product {
  quantity: number;
}

export default function ProductPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.name === product.name);
      if (found) {
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };
  const handleDecreaseFromCart = (name: string) => {
    setCart((prev) => {
      return prev
        .map((item) =>
          item.name === name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0); 
    });
  };
  

  const handleRemoveFromCart = (name: string) => {
    setCart((prev) => prev.filter((item) => item.name !== name));
  };

  const getQuantity = (name: string) => {
    const found = cart.find((item) => item.name === name);
    return found ? found.quantity : 0;
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fdf8f7] p-4 md:p-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-balance">Desserts</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.name} className="border rounded-lg shadow p-2 flex flex-col gap-2 bg-white">
             <Link href={`/product/${product.slug}`}>

              <div className="relative w-full h-40 rounded overflow-hidden">
              <Image
  src={product.image.desktop.replace('./', '/')}
  alt={product.name}
  fill
  className="object-cover"
/>

              </div>
              <h3 className="text-sm font-semibold text-black cursor-pointer">{product.name}</h3>
              </Link>
              <p className="text-orange-600 font-bold">${product.price.toFixed(2)}</p>
              <div className="flex justify-between items-center">
  {getQuantity(product.name) > 0 ? (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handleAddToCart(product)}
        className="bg-orange-600 text-white px-2 py-1 rounded font-bold"
      >
        +
      </button>
      <span className="px-4 py-1 bg-orange-100 text-orange-600 rounded font-semibold">
        {getQuantity(product.name)}
      </span>
      <button
        onClick={() => handleDecreaseFromCart(product.name)}
        className="bg-orange-600 text-white px-2 py-1 rounded font-bold"
      >
        -
      </button>
    </div>
  ) : (
    <button
      onClick={() => handleAddToCart(product)}
      className="bg-orange-600 text-white px-4 py-1 rounded"
    >
      Add to Cart
    </button>
  )}
</div>

            </div>
          ))}
        </div>

        <div className="bg-white text-gray-600 rounded-lg shadow p-6 h-fit sticky top-4">
          <h2 className="text-lg font-semibold mb-4">Your Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</h2>
          <div className="space-y-4">
            {cart.length === 0 && <p className="text-gray-400">No items yet</p>}
            {cart.map((item) => (
              <div key={item.name} className="flex justify-between items-center">
                <div>
               
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item.name)}
                  className="text-red-500 font-bold text-xl"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="mt-6 w-full bg-orange-600 hover:bg-red-200 text-white font-bold py-2 rounded transition cursor-pointer">
              Confirm Order
            </button>
          </div>

          <div className="mt-4 flex items-center text-green-600 text-sm">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>This is a carbon-neutral delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
}
