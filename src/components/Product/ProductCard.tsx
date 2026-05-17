'use client';

import React from "react";
import {
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
} from "@coreui/react";

import { ProductProps } from "./product.types.js";
import { useRouter } from "next/navigation";
import AddToCartButton from "../Cart/AddToCartButton";

export default function ProductCard({ product }: ProductProps) {
  const router = useRouter();
  const detailsHref = `/products/${product.id}`;

  const openDetails = () => {
    router.push(detailsHref);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDetails();
    }
  };

  return (
    <div className="w-full">
      <CCard
        className="app-card h-full min-h-[27rem] flex cursor-pointer flex-col focus-within:ring-4 focus-within:ring-brand-100"
        onClick={openDetails}
        onKeyDown={handleKeyDown}
        role="link"
        tabIndex={0}
        aria-label={`View details for ${product.title}`}
      >
      <div className="w-full h-48 bg-slate-50 flex items-center justify-center overflow-hidden border-b border-line flex-shrink-0 p-5">
        <CCardImage
          orientation="top"
          src={product.image}
          alt={product.title}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      <CCardBody className="flex flex-col flex-grow p-5">
        <div className="flex-grow">
          <CCardTitle className="line-clamp-2 text-base font-semibold leading-snug text-ink">{product.title}</CCardTitle>
        </div>
        <div className="mt-4 space-y-2">
          <CCardText className="text-2xl font-bold text-ink">
          ${product.price}
        </CCardText>
        <CCardText className="text-sm text-muted">
          <span className="app-section-label">Category</span> {product.category}
        </CCardText>
        <CCardText className="text-sm text-muted">
          <span className="app-section-label">Rating</span> {product.rating.rate} / 5
        </CCardText>
        <div className="pt-3" onClick={(event) => event.stopPropagation()}>
          <div>
            <AddToCartButton productId={Number(product.id)} />
          </div>
        </div>
        </div>
      </CCardBody>
    </CCard>
    </div>
    
  );
}
