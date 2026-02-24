"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store/store";

export function StatusMessage() {
  const status = useAppStore((s) => s.status);
  const setStatus = useAppStore((s) => s.setStatus);

  useEffect(() => {
    if (status !== "idle") {
      const timer = setTimeout(() => {
        setStatus("idle");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [status, setStatus]);

  if (status === "idle") return null;

  const isSuccess = status === "success";
  const bgColor = isSuccess
    ? "bg-green-100 dark:bg-green-900/30 border-green-500 dark:border-green-600"
    : "bg-red-100 dark:bg-red-900/30 border-red-500 dark:border-red-600";
  const textColor = isSuccess
    ? "text-green-800 dark:text-green-200"
    : "text-red-800 dark:text-red-200";

  return (
    <div
      className={`
        fixed bottom-4 right-4 z-50
        flex items-center gap-3 px-6 py-4 
        ${bgColor} border-l-4 rounded-lg shadow-lg
        max-w-sm animate-slide-in
        transition-all duration-300 ease-in-out
      `}
    >
      {isSuccess ? (
        <svg
          className="w-6 h-6 text-green-600 dark:text-green-400 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          className="w-6 h-6 text-red-600 dark:text-red-400 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}

      <div className="grow">
        <p className={`font-medium ${textColor}`}>
          {isSuccess ? "Producto agregado" : "Ocurrió un error"}
        </p>
      </div>

      <button
        onClick={() => setStatus("idle")}
        className={`
          ml-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 
          text-xl font-bold leading-none
          transition-colors
        `}
      >
        ×
      </button>
    </div>
  );
}
