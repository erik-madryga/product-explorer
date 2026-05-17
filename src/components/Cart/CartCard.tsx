"use client";
import React, { useEffect } from "react";
import { useProductStore } from "../../store/productStore";
import { useCartStore } from "../../store/cartStore";
import { useUserStore } from "../../store/userStore";
import {
  CButton,
  CCard,
  CCardBody,
  CCardText,
  CCardTitle,
} from "@coreui/react";
import { Cart } from "./cart.types";
import { fetchProducts } from "../../lib/fakeStoreApi"; // adjust path if needed

interface CartCardProps {
  cart: Cart;
  onViewDetails?: (cartId: number) => void;
}

export default function CartCard({ cart, onViewDetails }: CartCardProps) {
  const products = useProductStore((state) => state.products);
  const setProducts = useProductStore((state) => state.setProducts);
  const { clearCart, updateItemQuantity, removeItemFromCart } = useCartStore();
  const { user } = useUserStore();

  useEffect(() => {
    if (!products || products.length === 0) {
      fetchProducts().then((fetchedProducts) => {
        setProducts(fetchedProducts);
      });
    }
  }, [products, setProducts]);

  const handleClearCart = async () => {
    clearCart();
    // If user is logged in (not guest), delete cart from Blob
    if (user && user.id) {
      try {
        await fetch(`/api/carts/${user.id}`, { method: "DELETE" });
      } catch (error) {
        console.error("Error deleting cart:", error);
      }
    }
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateItemQuantity(productId, newQuantity);
  };

  const handleRemoveItem = async (productId: number) => {
    removeItemFromCart(productId);
  };

  return (
    <div className="app-panel w-full max-w-4xl mx-auto p-4 relative">
      <button
        onClick={handleClearCart}
        className="absolute top-4 right-4 rounded-lg p-1 text-muted transition hover:bg-red-50 hover:text-red-600"
        title="Clear cart"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <CCard className="max-w-xl bg-transparent shadow-none">
        <CCardBody className="p-2">
          <CCardTitle className="text-xl font-bold"><strong>Order:</strong> {cart.id}</CCardTitle>
          <CCardText className="text-sm text-muted">
            <strong>Date:</strong> {new Date(cart.date).toLocaleDateString()}
          </CCardText>
          <div className="flex flex-col gap-1 mb-2">
            <span className="app-section-label">Products</span>
            <div/>
            <ul className="pl-0">
              {cart.products.map((item, idx) => {
                const product = products.find((p) => String(p.id) === String(item.productId));
                const itemTotal = product ? product.price * item.quantity : 0;
                return (
                  <li key={idx} className="flex items-center justify-between gap-3 mb-3 border-b border-line pb-3">
                    <div className="flex items-center gap-2 flex-1">
                      {product && (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-12 w-12 rounded-lg border border-line bg-white object-contain p-1"
                        />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium">{product?.title}</p>
                        <p className="text-xs text-muted">
                          ${product?.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                          className="rounded-lg border border-line px-2 py-1 transition hover:bg-brand-50"
                        >
                          −
                        </button>
                        <span className="px-3 py-1 min-w-[2.5rem] text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                          className="rounded-lg border border-line px-2 py-1 transition hover:bg-brand-50"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right min-w-[3.5rem]">
                        <p className="text-sm font-semibold text-brand-700">
                          ${itemTotal.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.productId)}
                        className="text-red-500 hover:text-red-700 transition text-lg font-bold"
                        title="Remove item"
                      >
                        ×
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          {onViewDetails && (
            <CButton onClick={() => onViewDetails(cart.id)} className="app-link">
              View Details
            </CButton>
          )}
        </CCardBody>
      </CCard>
    </div>
  );
}
