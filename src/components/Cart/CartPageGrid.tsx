import React from "react";
import CartCard from "./CartCard";
import { Cart } from "./cart.types";

interface CartPageGridProps {
  initialCart: Cart[];
}

export default function CartPageGrid({ initialCart }: CartPageGridProps) {
  if (!initialCart || initialCart.length === 0) return <div>No cart data available.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <h2 className="text-xl font-bold">Your cart is empty</h2>
      <h3 className="col-span-full text-xl font-bold">Order History:</h3>
      {initialCart.map((c) => (
        <CartCard key={c.id} cart={c} />
      ))}
    </div>
  );
}
