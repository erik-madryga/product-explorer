import React from "react";
import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";
import { getProducts } from "../lib/getProducts";

const ProductGridComponent = ProductGrid as unknown as React.ComponentType<{ initialProducts: any }>;

export default async function Home({
  searchParams,
}: {
  searchParams?: any;
}) {
  // Server component loads initial product set (static/mock)
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <section className="lg:col-span-3">
          <ProductGridComponent initialProducts={products} />
        </section>
      </div>
    </div>
  );
}
