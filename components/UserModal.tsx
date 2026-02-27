"use client";

import { useAppStore } from "@/lib/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserModalProps {
  onClose: () => void;
}

export function UserModal({ onClose }: UserModalProps) {
  const isLogged = useAppStore((s) => s.logged);
  const nombre = useAppStore((s) => s.nombre);
  const logout = useAppStore((s) => s.logout);
  const router = useRouter();

  const handleLogOut = () => {
    logout();
    onClose();
    router.replace("/");
  };

  return (
    <div className="fixed top-20 right-4 z-50 w-[calc(100%-2rem)] sm:w-96 max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl transition-all duration-300 ease-in-out">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {isLogged ? `Hola, ${nombre || "Usuario"}` : "Cuenta"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
          >
            ×
          </button>
        </div>

        {!isLogged ? (
          <div className="space-y-5">
            <Link
              href="/login"
              onClick={onClose}
              className={`block w-full py-3 px-4 text-center rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium transition-colors duration-200`}
            >
              Iniciar Sesion
            </Link>

            <Link
              href="/signup"
              onClick={onClose}
              className={`block w-full py-3 px-4 text-center rounded-lg bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-medium transition-colors duration-200`}
            >
              Registrarme
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            <Link
              href="/user"
              onClick={onClose}
              className={`block w-full py-3 px-4 text-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium`}
            >
              Ver mi Cuenta
            </Link>
            <button
              className={`w-full py-3 px-4 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 active:bg-red-800 transition-colors duration-200`}
              onClick={handleLogOut}
            >
              Cerrar Sesion
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
