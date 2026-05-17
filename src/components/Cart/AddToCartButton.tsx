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
    setIsLoading(true);
    try {
      // Use guest ID if not logged in
      const userId = user?.id || 'guest';
      addItemToCart(productId, quantity, userId);
      
      // Only save to Blob if user is logged in
      if (user) {
        const updatedCart = useCartStore.getState().cart[0];
        if (updatedCart) {
          await fetch(`/api/carts/${user.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedCart),
          });
        }
      }
      
      setMessage(user ? 'Product added to cart!' : 'Product added to cart! (Logged out - cart will clear when you leave)');
    } catch (error) {
      console.error('Error saving cart:', error);
      setMessage('Error adding to cart');
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
        className="app-button-primary w-full"
      >
        {isLoading ? 'Adding...' : 'Add to Cart'}
      </button>
      {message && (
        <div className="fixed bottom-4 right-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 shadow-lg z-50 max-w-sm animate-in fade-in slide-in-from-bottom-4">
          {message}
        </div>
      )}
    </div>
  );
}
