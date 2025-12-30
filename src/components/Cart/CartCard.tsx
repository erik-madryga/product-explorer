import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardText,
  CCardTitle,
} from "@coreui/react";
import { Cart } from "./cart.types";

interface CartCardProps {
  cart: Cart;
  onViewDetails?: (cartId: number) => void;
}

export default function CartCard({ cart, onViewDetails }: CartCardProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <CCard className="max-w-xl">
        <CCardBody>
          <CCardTitle>Cart #{cart.id}</CCardTitle>
          <CCardText className="text-sm">
            <strong>User ID:</strong> {cart.userId}
          </CCardText>
          <CCardText className="text-sm">
            <strong>Date:</strong> {new Date(cart.date).toLocaleDateString()}
          </CCardText>
          <CCardText className="text-sm">
            <strong>Products:</strong>
          </CCardText>
          <ul className="list-disc ml-6">
            {cart.products.map((item, idx) => (
              <li key={idx}>
                Product ID: {item.productId}, Quantity: {item.quantity}
              </li>
            ))}
          </ul>
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
