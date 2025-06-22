import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !dark;
    setDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
