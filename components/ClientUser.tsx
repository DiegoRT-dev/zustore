"use client";

import { useAppStore } from "@/lib/store/store";
import { UserInfo } from "@/components/UserInfo";
import Link from "next/link";

export default function ClientUser() {
  const isLogged = useAppStore((s) => s.logged);

  return (
    <div>
      {!isLogged ? (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div
            className="
      w-full max-w-md p-10 
      bg-white dark:bg-gray-800 
      rounded-2xl shadow-xl 
      border border-gray-200 dark:border-gray-700
      text-center transition-all duration-300
    "
          >
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              No estás logueado
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Inicia sesión para ver tu perfil, historial de compras y más.
            </p>

            <Link
              href="/login"
              className="
          inline-block w-full max-w-xs mx-auto 
          py-4 px-8 
          bg-blue-600 hover:bg-blue-700 active:bg-blue-800 
          text-white font-bold text-lg 
          rounded-lg 
          transition-all duration-200
          shadow-md hover:shadow-lg
        "
            >
              Iniciar Sesión
            </Link>

            <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
              ¿Aún no tienes cuenta?{" "}
              <Link
                href="/signup"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium hover:underline transition-colors"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <UserInfo />
      )}
    </div>
  );
}
