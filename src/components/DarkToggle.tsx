"use client";
import { useEffect, useState } from "react";

export default function DarkToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  }

  return (
    <button onClick={toggle} className="px-2 py-1 border rounded">
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
