import React from "react";
import ProductGrid from "@/components/ProductGrid";
import Filters from "@/components/Filters";
import SearchBar from "@/components/SearchBar";
import SortMenu from "@/components/SortMenu";
import { getProducts } from "@/lib/getProducts";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: any;
}) {
  // Server component loads initial product set (static/mock)
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SearchBar />
        <SortMenu />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="hidden lg:block">
          <Filters />
        </aside>
        <section className="lg:col-span-3">
          <ProductGrid initialProducts={products} />
        </section>
      </div>
    </div>
  );
}
