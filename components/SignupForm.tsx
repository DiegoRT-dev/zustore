"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function SignupForm() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    if (!nombre.trim()) {
      setError("El nombre es obligatorio");
      setLoading(false);
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Ingresa un email válido");
      setLoading(false);
      return;
    }
    if (!password.trim()) {
      setError("La contraseña es obligatoria");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "register",
          nombre: nombre.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al registrarse");
      }

      setSuccess(true);
      setNombre("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 text-center transition-all duration-300">
        <h3 className="text-3xl font-bold mb-6 text-green-600 dark:text-green-400">
          ¡Cuenta creada con éxito!
        </h3>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Ahora puedes iniciar sesión con tus nuevas credenciales.
        </p>
        <Link
          href="/login"
          className="inline-block w-full max-w-xs mx-auto py-4 px-8 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-lg rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Ir a Iniciar Sesión
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300"
    >
      <h3 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
        Registrarse
      </h3>

      {error && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-950/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg text-center">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all duration-200"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all duration-200"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all duration-200"
          required
        />

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all duration-200"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full mt-8 py-4 rounded-lg font-bold text-lg bg-green-600 hover:bg-green-700 active:bg-green-800 text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg`}
      >
        {loading ? "Creando cuenta..." : "Registrarse"}
      </button>

      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        ¿Ya tienes cuenta?{" "}
        <Link
          href="/login"
          className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-medium hover:underline transition-colors"
        >
          Inicia sesión
        </Link>
      </p>
    </form>
  );
}
