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

  const isSuccess = status === "successCart" || status === "successBuy";
  const isWarning = status === "warningCart" || status === "warningUser";
  const isError = status === "error" || status === "errorCart";

  let bgColor =
    "bg-blue-100 dark:bg-blue-900/30 border-blue-500 dark:border-blue-600";
  let textColor = "text-blue-800 dark:text-blue-200";
  let icon = (
    <svg
      className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  if (isSuccess) {
    bgColor =
      "bg-green-100 dark:bg-green-900/30 border-green-500 dark:border-green-600";
    textColor = "text-green-800 dark:text-green-200";
    icon = (
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
    );
  } else if (isError) {
    bgColor =
      "bg-red-100 dark:bg-red-900/30 border-red-500 dark:border-red-600";
    textColor = "text-red-800 dark:text-red-200";
    icon = (
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
    );
  } else if (isWarning) {
    bgColor =
      "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-500 dark:border-yellow-600";
    textColor = "text-yellow-800 dark:text-yellow-200";
    icon = (
      <svg
        className="w-6 h-6 text-yellow-600 dark:text-yellow-400 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    );
  }

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-6 py-4 ${bgColor} border-l-4 rounded-lg shadow-lg max-w-sm animate-slide-in transition-all duration-300 ease-in-out`}
    >
      {icon}

      <div className="grow">
        <p className={`font-medium ${textColor}`}>
          {status === "successCart"
            ? "Producto agregado al carrito"
            : status === "successBuy"
              ? "¡Compra exitosa!"
              : status === "errorCart"
                ? "Error al agregar al carrito"
                : status === "warningCart"
                  ? "Stock insuficiente"
                  : status === "warningUser"
                    ? "Inicia Sesion"
                    : "Ocurrió un error"}
        </p>
      </div>

      <button
        onClick={() => setStatus("idle")}
        className={`ml-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl font-bold leading-none transition-colors`}
      >
        ×
      </button>
    </div>
  );
}
