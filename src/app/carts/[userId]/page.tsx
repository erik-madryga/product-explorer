'use client';

import CartPageGrid from '../../../components/Cart/CartPageGrid';
import { useCartStore } from '../../../store/cartStore';

export default function Page() {
  const { cart } = useCartStore();
  
  if (!cart || cart.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-xl font-semibold text-muted">Cart is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <section>
          <CartPageGrid currentCart={cart[0]} />
        </section>
      </div>
    </div>
  );
}
