'use client';

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
import Link from "next/link.js";
import AddToCartButton from "../Cart/AddToCartButton";

export default function ProductCard({ product }: ProductProps) {
  const handleViewDetails = () => {
    alert(`Viewing details for: ${product.title}`);
  }
  return (
    <div className="w-full max-w-4xl mx-auto">
      <CCard className="max-w-xl h-96 flex flex-col">
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden border flex-shrink-0">
        <CCardImage
          orientation="top"
          src={product.image}
          alt={product.title}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      <CCardBody className="flex flex-col flex-grow">
        <div className="flex-grow">
          <CCardTitle className="line-clamp-2">{product.title}</CCardTitle>
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
        <div className="flex gap-3 mt-4 items-start">
          <Link href={`products/${product.id}`} className="w-1/3 text-purple-700 underline flex items-center justify-center hover:text-purple-900 transition">
            View Details
          </Link>
          <div className="w-2/3">
            <AddToCartButton productId={Number(product.id)} />
          </div>
        </div>
        </div>
      </CCardBody>
    </CCard>
    </div>
    
  );
}
