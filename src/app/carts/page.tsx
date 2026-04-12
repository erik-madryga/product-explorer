'use client';

import CartPageGrid from '../../components/Cart/CartPageGrid';
import { useCartStore } from '../../store/cartStore';

export default function CartPage() {
  const { cart } = useCartStore();
  
  if (!cart || cart.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold text-gray-600">Cart is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <section className="lg:col-span-3">
          <CartPageGrid currentCart={cart[0]} />
        </section>
      </div>
    </div>
  );
}
