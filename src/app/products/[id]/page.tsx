/// <reference types="react" />
import {
  CCard,
  CCardImage,
  CCardBody,
  CCardTitle,
  CCardText,
} from "@coreui/react";
import { fetchProducts } from "../../../lib/fakeStoreApi";
import AddToCartButton from "../../../components/Cart/AddToCartButton";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const waitedParams = await params;
  const products = await fetchProducts();
  const product = products.find(
    ({ id }: { id: number }) => id == Number(waitedParams.id || 1)
  );

  if (!product) return <div>Product not found</div>;

  return (
    <CCard className="app-card w-full max-w-2xl mx-auto">
      <div className="w-full flex justify-center items-center bg-slate-50 p-8 border-b border-line">
    <CCardImage
      orientation="top"
      src={product.image}
      alt={product.title}
      className="max-w-full max-h-64 object-contain"
    />
  </div>
      <CCardBody className="p-6 space-y-4">
        <div>
          <CCardTitle className="text-2xl font-bold text-balance">{product.title}</CCardTitle>
        </div>
        <div className="space-y-3 text-sm text-muted">
          <CCardText className="text-3xl font-bold text-ink">
            ${product.price}
          </CCardText>
          <CCardText>
            <span className="app-section-label">Category</span> {product.category}
          </CCardText>
          <CCardText>
            <span className="app-section-label">Rating</span> {product.rating.rate} / 5
          </CCardText>
          <CCardText className="leading-6 text-slate-700">
            {product.description}
          </CCardText>
        </div>
      </CCardBody>
      <div className="p-6 pt-0">
        <AddToCartButton productId={product.id} />
      </div>
    </CCard>
  );
}
