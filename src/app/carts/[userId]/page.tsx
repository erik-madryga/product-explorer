import CartPageGrid from '../../../components/Cart/CartPageGrid';
import { fetchCart } from '../../../lib/fakeStoreApi';


export default async function Page({ params }: { params: { userId: string } }) {
  const cartParams = await params;
  const initialCart = await fetchCart(cartParams.userId);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <section className="lg:col-span-3">
          <CartPageGrid initialCart={initialCart} />
        </section>
      </div>
    </div>
  );
}
