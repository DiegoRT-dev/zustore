"use client";

import { useAppStore } from "@/lib/store/store";

export function SearchBar() {
  const search = useAppStore((s) => s.search);
  const setSearch = useAppStore((s) => s.setSearch);

  return (
    <div className="relative w-full max-w-md mx-auto md:mx-0">
      <input
        type="text"
        placeholder="Buscar producto... "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`
          w-full px-4 py-3 
          bg-white dark:bg-gray-800 
          border border-gray-300 dark:border-gray-600 
          rounded-full 
          text-gray-900 dark:text-gray-100 
          placeholder-gray-500 dark:placeholder-gray-400 
          focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
          focus:border-transparent 
          transition-all duration-200
          shadow-sm hover:shadow-md
        `}
      />
    </div>
  );
}
