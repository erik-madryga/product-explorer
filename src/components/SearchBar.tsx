"use client";
import { useState, useEffect } from "react";
import { useProductStore } from "@/store/productStore";

function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function SearchBar() {
  const setSearch = useProductStore((s) => s.setSearch);
  const [val, setVal] = useState("");
  const debounced = useDebounce(val, 300);

  useEffect(() => {
    setSearch(debounced);
  }, [debounced, setSearch]);

  return (
    <input
      value={val}
      onChange={(e) => setVal(e.target.value)}
      placeholder="Search products..."
      className="w-full max-w-md border rounded px-3 py-2"
    />
  );
}
