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
    <button onClick={toggle} className="app-button-secondary px-3 py-1.5">
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
