"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useProductStore } from "../store/productStore";
import { Product } from "./product.types";

export default function ProductGrid({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const search = useProductStore((s) => s.search);
  const sort = useProductStore((s) => s.sort);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);

  return (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
}
