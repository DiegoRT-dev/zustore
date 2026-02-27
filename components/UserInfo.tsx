"use client";

import { useAppStore } from "@/lib/store/store";
import { useRouter } from "next/navigation";

export function UserInfo() {
  const nombre = useAppStore((s) => s.nombre);
  const email = useAppStore((s) => s.email);
  const logout = useAppStore((s) => s.logout);
  const router = useRouter();
  const isLogged = useAppStore((s) => s.logged);

  const handleLogOut = () => {
    logout();
    router.replace("/");
  };

  const handlePurchases = () => {
    if (!isLogged) {
      router.push("/login");
      useAppStore.getState().setStatus("warningUser");
    } else {
      router.push("/purchases");
    }
  };

  const handleSettings = () => {
    if (!isLogged) {
      router.push("/login");
      useAppStore.getState().setStatus("warningUser");
    } else {
      router.push("/settings");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 transition-all duration-300">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-white text-2xl font-bold">
          {nombre?.charAt(0)?.toUpperCase() || "?"}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            ¡Hola, {nombre}!
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{email}</p>
        </div>
      </div>

      <div className="space-y-6 mb-10">
        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span>{email}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Miembro desde {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <button
        onClick={handleLogOut}
        className={`w-full py-4 rounded-lg font-bold text-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        Cerrar Sesión
      </button>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <button
          onClick={handlePurchases}
          className={`py-3 px-4 rounded-lg font-medium bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          Mis Compras
        </button>
        <button
          onClick={handleSettings}
          className={`py-3 px-4 rounded-lg font-medium bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Configuración
        </button>
      </div>
    </div>
  );
}
