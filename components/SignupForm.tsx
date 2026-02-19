"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store/store";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function SignupForm() {
    const router = useRouter();

    const login = useAppStore((s) => s.login);

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
            setError("Email inválido");
            setLoading(false);
            return;
        }

        if (!password.trim()) {
            setError("La contraseña es obligatoria");
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
            
            if(!res.ok) {
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
      <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg text-center">
        <h3 className="text-2xl font-bold mb-4 text-green-600">¡Cuenta creada exitosamente!</h3>
        <p className="mb-6 text-gray-600">
          Ahora puedes iniciar sesión con tus nuevas credenciales.
        </p>
        <Link
          href="/login"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Ir a Iniciar Sesión
        </Link>
      </div>
    );
  }

    return (
        <form onSubmit={handleSubmit} className="formUser">

            <h3>Registrarse</h3>

            {error && <p className="text-red-600">{error}</p>}

            <input 
            type="text" 
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            />            

            <input 
            type="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <input 
            type="password" 
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <input 
            type="password" 
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button type="submit" disabled={loading}>
                {loading ? "Creando cuenta..." : "Registrarse"}
            </button>

            <p className="mt-4 text-center text-sm">
                ¿Ya tienes cuenta?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                Inicia sesión
                </Link>
            </p>
        </form>
    );
}