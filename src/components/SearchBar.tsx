"use client";
import { useState, useEffect } from "react";
import { useProductStore } from "../store/productStore";

function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function SearchBar() {
    const { search, setSearch } = useProductStore();
    const debounced = useDebounce(search, 300);

  useEffect(() => {
    setSearch(debounced);
  }, [debounced, setSearch]);

  return (
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search..."
      className="w-full max-w-md border rounded px-3 py-2"
    />
  );
}
