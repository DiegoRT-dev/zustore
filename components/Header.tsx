"use client";

import { useCartStore } from "@/lib/store/cartSlice";
import { useAppStore } from "@/lib/store/store";
import { SearchBar } from "./SearchBar";
import Link from "next/link";
import { usePathname } from "next/navigation";

type HeaderProps = {
  onToggleCart: () => void;
  onToggleUser: () => void;
};

export const Header = ({ onToggleCart, onToggleUser }: HeaderProps) => {
  const count = useCartStore((s) => s.cart.length);

  const isLogged = useAppStore((s) => s.logged);
  const nombre = useAppStore((s) => s.nombre);

  const theme = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);

  const pathname = usePathname();

  const showSearchBar = pathname === "/";

  return (
    <header
      className={`
        sticky top-0 z-50 
        bg-white dark:bg-gray-900 
        border-b border-gray-200 dark:border-gray-800
        shadow-sm
        transition-colors duration-300
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            Zustore
          </Link>

          {showSearchBar && <SearchBar />}

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onToggleCart}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg
                text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white
                hover:bg-gray-100 dark:hover:bg-gray-800
                transition-colors
              `}
            >
              <span className="font-medium">Carrito</span>
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                {count}
              </span>
            </button>

            <button
              onClick={toggleTheme}
              className={`
                p-2 rounded-full
                text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white
                hover:bg-gray-100 dark:hover:bg-gray-800
                transition-colors
              `}
              aria-label="Cambiar tema"
            >
              {theme === "light" ? "⏾" : "☀︎"}
            </button>

            <button
              onClick={onToggleUser}
              className={`
                px-4 py-2 rounded-lg font-medium
                ${
                  isLogged
                    ? "text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                    : "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                }
                transition-colors
              `}
            >
              {isLogged ? nombre : "Ingresa"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
