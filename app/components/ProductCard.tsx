'use client';
import { Product } from '@/app/types/types';
import Image from 'next/image';

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
  count: number;
}

export default function ProductCard({ product, onAdd, count }: Props) {
  return (
    <div className="border rounded-lg shadow p-2 flex flex-col gap-2">
      <div className="relative w-full h-40 rounded overflow-hidden">
        <Image
          src={product.image.thumbnail.replace('./', '/')}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="text-sm font-semibold">{product.name}</h3>
      <p className="text-orange-600 font-bold">${product.price.toFixed(2)}</p>
      <div className="flex justify-between items-center">
        {count > 0 ? (
          <button className="bg-orange-100 text-orange-600 px-4 py-1 rounded font-semibold">
            {count}
          </button>
        ) : (
          <button
            onClick={() => onAdd(product)}
            className="bg-black text-white px-4 py-1 rounded"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
