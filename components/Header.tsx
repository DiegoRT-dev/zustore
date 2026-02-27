"use client";

import { useCartStore } from "@/lib/store/cartSlice";
import { useAppStore } from "@/lib/store/store";
import { SearchBar } from "./SearchBar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type HeaderProps = {
  onToggleCart: () => void;
  onToggleUser: () => void;
};

export const Header = ({ onToggleCart, onToggleUser }: HeaderProps) => {
  const [searchOpen, setSearchOpen] = useState(false);

  const count = useCartStore((s) => s.cart.length);

  const isLogged = useAppStore((s) => s.logged);
  const nombre = useAppStore((s) => s.nombre);

  const theme = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);

  const pathname = usePathname();

  const showSearchBar = pathname === "/";

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 min-h-20 py-3">
          <Link
            href="/"
            className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            Zustore
          </Link>

          {showSearchBar && (
            <div className="hidden md:flex flex-1 justify-center">
              <div className="w-full md:max-w-md lg:max-w-xl xl:max-w-2xl">
                <SearchBar />
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            {showSearchBar && (
              <button
                onClick={() => setSearchOpen((prev) => !prev)}
                className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            )}

            <button
              onClick={onToggleCart}
              className="flex items-center gap-2 px-2 sm:px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="font-medium hidden sm:block">Carrito</span>
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                {count}
              </span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Cambiar tema"
            >
              {theme === "light" ? "⏾" : "☀︎"}
            </button>

            <button
              onClick={onToggleUser}
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium
            ${
              isLogged
                ? "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                : "text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30"
            }
            transition-colors
          `}
            >
              {isLogged ? nombre : "Ingresa"}
            </button>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div
          onClick={() => setSearchOpen(false)}
          className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center pt-24 md:hidden"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[90%] max-w-md"
          >
            <SearchBar />
          </div>
        </div>
      )}
    </header>
  );
};
