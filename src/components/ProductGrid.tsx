"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { useProductStore } from "@/store/productStore";

type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  rating: number;
  category: string;
};

export default function ProductGrid({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const search = useProductStore((s) => s.search);
  const sort = useProductStore((s) => s.sort);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
}
