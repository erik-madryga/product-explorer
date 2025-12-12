/// <reference types="react" />
import {
  CCard,
  CCardImage,
  CCardBody,
  CCardTitle,
  CCardText,
  CButton,
} from "@coreui/react";
import { getProducts } from "../../../lib/getProducts";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const waitedParams = await params;
  const products = await getProducts();
  const product = products.find(
    ({ id }: { id: number }) => id == Number(waitedParams.id)
  );

  if (!product) return <div>Product not found</div>;

  return (
    <CCard className="w-full max-w-xl mx-auto">
      <div className="w-full flex justify-center items-center bg-white p-4 border-2">
    <CCardImage
      orientation="top"
      src={product.image}
      alt={product.title}
      className="max-w-full max-h-64 object-contain"
    />
  </div>
      <CCardBody>
        <div>
          <CCardTitle>{product.title}</CCardTitle>
        </div>
        <div>
          <CCardText>
            <strong>Price:</strong> ${product.price}
          </CCardText>
          <CCardText>
            <strong>Category:</strong> {product.category}
          </CCardText>
          <CCardText>
            <strong>Rating:</strong> {product.rating.rate} / 5
          </CCardText>
          <CCardText>
            <strong>Description:</strong> {product.description}
          </CCardText>
        </div>
      </CCardBody>
    </CCard>
  );
}
