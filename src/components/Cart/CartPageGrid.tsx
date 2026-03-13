import React from "react";
import CartCard from "./CartCard";
import { Cart } from "./cart.types";

interface CartPageGridProps {
  initialCart: Cart;
}

export default function CartPageGrid({ initialCart }: CartPageGridProps) {
  if (!initialCart) return <div>No cart data available.</div>;
  console.log("Rendering CartPageGrid with initialCart:", initialCart); // Debug log
  // Ensure it's an array for mapping
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <h2 className="text-xl font-bold">Your cart is empty</h2>
      <h3 className="col-span-full text-xl font-bold">Order History:</h3>
      
        <CartCard key={initialCart.userId} cart={initialCart} />
      
    </div>
  );
}
