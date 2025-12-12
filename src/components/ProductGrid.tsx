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
  const { search, filters, sort } = useProductStore();
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  useEffect(() => {
    let result = [...initialProducts];

    // Search
    if (search) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by category
    if (filters.category.length > 0) {
      result = result.filter((p) => filters.category.includes(p.category));
    }

    // Filter by price
    result = result.filter(
      (p) => p.price >= filters.price[0] && p.price <= filters.price[1]
    );

    // Filter by rating
    if (filters.rating > 0) {
      result = result.filter((p) => p.rating.rate >= filters.rating);
    }

    // Sort
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sort === "rating-desc") result.sort((a, b) => b.rating.rate - a.rating.rate);

    setFilteredProducts(result);
  }, [search, filters, sort]);

  return (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {loading ? (
        <p>Loading products...</p>
      ) : filteredProducts && filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
}
