"use client";

import { useAppStore } from "@/lib/store/store";

export function CategoryFilter() {
  const category = useAppStore((s) => s.category);
  const setCategory = useAppStore((s) => s.setCategory);
  const resetFilters = useAppStore((s) => s.resetFilters);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <select
        value={category ?? ""}
        onChange={(e) =>
          setCategory(e.target.value === "" ? null : e.target.value)
        }
        className={`
          w-full sm:w-64 px-4 py-3 
          bg-white dark:bg-gray-800 
          border border-gray-300 dark:border-gray-600 
          rounded-lg 
          text-gray-900 dark:text-gray-100 
          focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 
          transition-all duration-200
          cursor-pointer
        `}
      >
        <option value="">Todas las categorias</option>
        <option value="Computo">Computo</option>
        <option value="Accesorios">Accesorios</option>
        <option value="Audio">Audio</option>
      </select>

      <button
        onClick={resetFilters}
        className={`
          px-6 py-3 rounded-lg font-medium
          bg-gray-200 dark:bg-gray-700 
          text-gray-800 dark:text-gray-200 
          hover:bg-gray-300 dark:hover:bg-gray-600 
          active:bg-gray-400 dark:active:bg-gray-500 
          transition-colors duration-200
          whitespace-nowrap
        `}
      >
        Limpiar filtros
      </button>
    </div>
  );
}
