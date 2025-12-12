import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
} from "@coreui/react";

import { ProductProps } from "./product.types.js";

export default function ProductCard({ product }: ProductProps) {
  const handleViewDetails = () => {
    alert(`Viewing details for: ${product.title}`);
  }
  return (
    <div className="w-full max-w-4xl mx-auto">
      <CCard className="max-w-xl">
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden border">
        <CCardImage
          orientation="top"
          src={product.image}
          alt={product.title}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      <CCardBody>
        <div>
          <CCardTitle>{product.title}</CCardTitle>
        </div>
        <div>
          <CCardText className="text-sm">
          <strong>Price:</strong> ${product.price}
        </CCardText>
        <CCardText className="text-sm">
          <strong>Category:</strong> {product.category}
        </CCardText>
        <CCardText className="text-sm">
          <strong>Rating:</strong> {product.rating.rate} / 5
        </CCardText>
        <CButton href={`products/${product.id}`} className="underline">View Details</CButton>
        </div>
      </CCardBody>
    </CCard>
    </div>
    
  );
}
