'use client';

import { products } from '@/app/components/data/products';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';

export default function ProductPage() {
  const router = useRouter();
  const params = useParams();

  const slug = params.slug as string; // Force it to string
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return <div className="p-10">Product not found</div>;
  }

  const handleAddToCart = () => {
    console.log('Added to cart:', product.name); 
  };

  return (
    <div className="min-h-screen bg-[#fdf8f7] p-4 md:p-8">
      <button
        onClick={() => router.back()}
        className="flex items-center text-orange-600 hover:underline mb-6"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="relative w-full h-72 md:h-96 rounded overflow-hidden mb-6">
          <Image
            src={product.image.desktop.replace('./', '/')}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <h1 className="text-2xl font-bold mb-2 text-black">{product.name}</h1>
        <p className="text-orange-600 text-lg font-semibold mb-4">${product.price.toFixed(2)}</p>

        <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

        <button
          onClick={handleAddToCart}
          className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-2 rounded font-semibold transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
