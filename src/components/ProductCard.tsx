import React from "react"
import { CButton, CCard, CCardBody, CCardImage, CCardText, CCardTitle } from '@coreui/react'

import { ProductProps } from "./product.types.js"

export default function ProductCard({product}: ProductProps) {
  return (
    <CCard style={{ width: '18rem' }}>
      <CCardImage orientation="top" src={product.image} alt={product.title} />
      <CCardBody>
        <CCardTitle>{product.title}</CCardTitle>
        <CCardText>
          {product.description}
        </CCardText>
        <CCardText>
          <strong>Price:</strong> ${product.price}
        </CCardText>
        <CCardText>
          <strong>Category:</strong> {product.category}
        </CCardText>
        <CCardText>
          <strong>Rating:</strong> {product.rating} / 5
        </CCardText>
        <CButton href="#">View Details</CButton>
      </CCardBody>
    </CCard>
  )
}