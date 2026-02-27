"use client";

import { useAppStore } from "@/lib/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientSetting() {
  const isLogged = useAppStore((s) => s.logged);
  const currentNombre = useAppStore((s) => s.nombre);
  const currentEmail = useAppStore((s) => s.email);
  const userId = useAppStore((s) => s.id);
  const login = useAppStore((s) => s.login);
  const router = useRouter();

  const [nombre, setNombre] = useState(currentNombre);
  const [email, setEmail] = useState(currentEmail);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!isLogged) {
      router.replace("/login");
    }
  }, [isLogged, router]);

  if (!isLogged) return null;

  const handleUpdate = async (field: string, value: any) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          field,
          value,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al actualizar");
      }

      if (userId === null) {
        setError("Usuario no válido");
        return;
      }

      if (field === "nombre") {
        login(userId, value, currentEmail);
      }
      if (field === "email") {
        login(userId, currentNombre, value);
      }

      setSuccess(
        `¡${field.charAt(0).toUpperCase() + field.slice(1)} actualizado!`,
      );
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    await handleUpdate("password", { newPassword, confirmPassword });
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-gray-900 dark:text-gray-100">
          Configuración
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold mb-6">Opciones de cuenta</h2>

          {error && (
            <p className="mb-6 p-4 bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-300 rounded-lg">
              {error}
            </p>
          )}
          {success && (
            <p className="mb-6 p-4 bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-300 rounded-lg">
              {success}
            </p>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nombre
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="grow px-5 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleUpdate("nombre", nombre)}
                disabled={loading || nombre === currentNombre}
                className="px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 transition"
              >
                Guardar
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="grow px-5 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleUpdate("email", email)}
                disabled={loading || email === currentEmail}
                className="px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 transition"
              >
                Guardar
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nueva contraseña
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirmar contraseña
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <button
              onClick={handlePasswordChange}
              disabled={
                loading || !newPassword || newPassword !== confirmPassword
              }
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 transition"
            >
              Cambiar contraseña
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
