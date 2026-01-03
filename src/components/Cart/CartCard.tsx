"use client";
import React, { useEffect } from "react";
import { useProductStore } from "../../store/productStore";
import {
  CButton,
  CCard,
  CCardBody,
  CCardText,
  CCardTitle,
} from "@coreui/react";
import { Cart } from "./cart.types";
import { getData } from "../../lib/getData"; // adjust path if needed
import { PRODUCTS } from "../../constants/strings"; // adjust path if needed

interface CartCardProps {
  cart: Cart;
  onViewDetails?: (cartId: number) => void;
}

export default function CartCard({ cart, onViewDetails }: CartCardProps) {
  const products = useProductStore((state) => state.products);
  const setProducts = useProductStore((state) => state.setProducts);

  useEffect(() => {
    if (!products || products.length === 0) {
      getData(PRODUCTS).then((fetchedProducts) => {
        setProducts(fetchedProducts);
      });
    }
  }, [products, setProducts]);

  return (
    <div className="w-full max-w-4xl mx-auto border p-4 rounded shadow">
      <CCard className="max-w-xl">
        <CCardBody>
          <CCardTitle>Order #{cart.id}</CCardTitle>
          <CCardText className="text-sm">
            <strong>Date:</strong> {new Date(cart.date).toLocaleDateString()}
          </CCardText>
          <div className="flex flex-col gap-1 mb-2">
            <span className="text-sm font-semibold">Products:</span>
            <ul className="pl-0">
              {cart.products.map((item, idx) => {
                const product = products.find((p) => String(p.id) === String(item.productId));
                return (
                  <li key={idx} className="flex items-center gap-2 mb-2">
                    {product && (
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-10 h-10 object-contain border rounded pl-0"
                      />
                    )}
                    <span>{product?.title} x {item.quantity}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          {onViewDetails && (
            <CButton onClick={() => onViewDetails(cart.id)} className="underline">
              View Details
            </CButton>
          )}
        </CCardBody>
      </CCard>
    </div>
  );
}
