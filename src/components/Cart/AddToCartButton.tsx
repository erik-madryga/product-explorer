'use client';

import { useState } from 'react';
import { useCartStore } from '../../store/cartStore';
import { useUserStore } from '../../store/userStore';

interface AddToCartButtonProps {
  productId: number;
  quantity?: number;
}

export default function AddToCartButton({
  productId,
  quantity = 1,
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { cart, addItemToCart } = useCartStore();
  const { user } = useUserStore();

  const handleAddToCart = async () => {
    if (!user) {
      setMessage('Please log in first');
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    setIsLoading(true);
    try {
      addItemToCart(productId, quantity, user.id);
      
      // Save cart to Blob
      const updatedCart = useCartStore.getState().cart[0];
      if (updatedCart) {
        await fetch(`/api/carts/${user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedCart),
        });
      }
      
      setMessage('Product added to cart!');
    } catch (error) {
      console.error('Error saving cart:', error);
      setMessage('Error saving to cart');
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleAddToCart}
        disabled={isLoading}
        className="w-full border-2 border-yellow-500 bg-yellow-500 text-purple-700 px-4 py-2 rounded-md font-medium hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {isLoading ? 'Adding...' : 'Add to Cart'}
      </button>
      {message && (
        <p className="mt-2 text-sm text-center text-green-600 font-medium">
          {message}
        </p>
      )}
    </div>
  );
}

