import React from "react";
import ProductPageGrid from "../components/Product/ProductPageGrid";
import { fetchProducts } from "../lib/fakeStoreApi";

const ProductPageGridComponent = ProductPageGrid as unknown as React.ComponentType<{ initialProducts: any }>;

export default async function Home({
  searchParams,
}: {
  searchParams?: any;
}) {
  // Server component loads initial product set (static/mock)
  const products = await fetchProducts();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <section className="catalog-backdrop">
          <ProductPageGridComponent initialProducts={products} />
        </section>
      </div>
    </div>
  );
}
