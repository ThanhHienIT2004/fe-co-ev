// components/admin/DarkModeToggle.tsx
import { useState, useEffect } from "react";

export function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed top-20 right-6 z-40 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-teal-200 dark:border-cyan-800 hover:shadow-xl transition-all"
    >
      {darkMode ? "Sun" : "Moon"}
    </button>
  );
}