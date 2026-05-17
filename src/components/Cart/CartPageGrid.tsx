'use client';

import React, { useEffect, useState } from "react";
import CartCard from "./CartCard";
import { Cart } from "./cart.types";
import { fetchProducts } from "../../lib/fakeStoreApi";

interface CartPageGridProps {
  currentCart: Cart;
}

export default function CartPageGrid({ currentCart }: CartPageGridProps) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function calculateTotal() {
      try {
        const products = await fetchProducts();
        
        let total = 0;
        currentCart.products.forEach((cartItem) => {
          const product = products.find(
            (p) => String(p.id) === String(cartItem.productId)
          );
          if (product) {
            total += product.price * cartItem.quantity;
          }
        });
        
        setTotalPrice(total);
      } catch (error) {
        console.error("Error calculating total price:", error);
      } finally {
        setLoading(false);
      }
    }

    if (currentCart?.products?.length > 0) {
      calculateTotal();
    } else {
      setLoading(false);
    }
  }, [currentCart]);

  if (!currentCart) return <div>No cart data available.</div>;
  
  return (
    <div className="grid grid-cols-1 gap-6">
      <h3 className="col-span-full text-2xl font-bold">Your cart</h3>
      
        <CartCard key={currentCart.userId} cart={currentCart} />
      <h3 className="col-span-full text-2xl font-bold mt-2">
        Total Price: ${loading ? "..." : totalPrice.toFixed(2)}
      </h3>
      
    </div>
  );
}
