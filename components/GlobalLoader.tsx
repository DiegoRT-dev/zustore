"use client";

import { useAppStore } from "@/lib/store/store";

export function GlobalLoader() {
  const loading = useAppStore((s) => s.loading);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-t-4 border-t-blue-500 border-gray-200 dark:border-gray-600 rounded-full animate-spin" />

        <p className="text-xl font-medium text-white">Cargando...</p>
      </div>
    </div>
  );
}
