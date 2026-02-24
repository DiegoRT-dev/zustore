"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store/store";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();

  const login = useAppStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setError("Email y contraseña invalido");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "login",
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al iniciar sesion");
      }

      login(data.user.nombre, data.user.email);

      setEmail("");
      setPassword("");

      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        w-full max-w-md mx-auto p-10 
        bg-white dark:bg-gray-800 
        rounded-2xl shadow-xl 
        border border-gray-200 dark:border-gray-700
        transition-all duration-300
      `}
    >
      <h3 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
        Iniciar Sesión
      </h3>

      {error && (
        <p className="mb-6 p-4 bg-red-100 dark:bg-red-950/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg text-center">
          {error}
        </p>
      )}

      <div className="mb-6">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`
            w-full px-5 py-4 
            bg-gray-50 dark:bg-gray-900 
            border border-gray-300 dark:border-gray-600 
            rounded-lg 
            text-gray-900 dark:text-gray-100 
            placeholder-gray-500 dark:placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
            focus:border-transparent 
            transition-all duration-200
          `}
          required
        />
      </div>

      <div className="mb-8">
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`
            w-full px-5 py-4 
            bg-gray-50 dark:bg-gray-900 
            border border-gray-300 dark:border-gray-600 
            rounded-lg 
            text-gray-900 dark:text-gray-100 
            placeholder-gray-500 dark:placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
            focus:border-transparent 
            transition-all duration-200
          `}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`
          w-full py-4 rounded-lg font-bold text-lg
          bg-blue-600 hover:bg-blue-700 active:bg-blue-800 
          text-white 
          transition-colors duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          shadow-md hover:shadow-lg
        `}
      >
        {loading ? "Iniciando..." : "Iniciar Sesión"}
      </button>

      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        ¿No tienes cuenta?{" "}
        <Link
          href="/signup"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium hover:underline transition-colors"
        >
          Regístrate aquí
        </Link>
      </p>
    </form>
  );
}
