import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <nav className="flex justify-center items-center py-4 px-4 sm:px-8 fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="flex gap-4 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm px-6 py-2 rounded-full shadow border border-gray-200 dark:border-zinc-700">
        <Link href="/" className="text-sm sm:text-base font-medium text-zinc-800 dark:text-zinc-200 hover:text-rose-600">
          Home
        </Link>
        <Link href="/post" className="text-sm sm:text-base font-medium text-zinc-800 dark:text-zinc-200 hover:text-rose-600">
          Post
        </Link>
        <Link href="/items" className="text-sm sm:text-base font-medium text-zinc-800 dark:text-zinc-200 hover:text-rose-600">
          Items
        </Link>
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-2"
            aria-label="Toggle Dark Mode"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5 text-yellow-400" />
            ) : (
              <MoonIcon className="h-5 w-5 text-zinc-800" />
            )}
          </button>
        )}
      </div>
    </nav>
  );
}
