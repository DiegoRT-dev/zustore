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
        
        if (!email.trim() ||!password.trim()) {
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
            
            if(!res.ok) {
                throw new Error(data.error || "Error al iniciar sesion");
            }

            login(data.user.nombre, data.user.email);

            setEmail("");
            setPassword("");

            router.push("/")
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        
    };

    

    return (
        <form onSubmit={handleSubmit} className="formUser">

            <h3>Iniciar Sesión</h3>

            {error && <p className="text-red-600">{error}</p>}

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

            <button type="submit" disabled={loading}>
                {loading ? "Iniciando..." : "Iniciar Sesión"}
            </button>

            <p className="mt-4 text-center text-sm">
                ¿No tienes cuenta?{" "}
                <Link href="/signup" className="text-green-600 hover:underline">
                Regístrate aquí
                </Link>
            </p>
        </form>
    );
}