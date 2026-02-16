"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store/store";
import { useRouter } from "next/navigation";

export function LoginForm() {
    const router = useRouter();

    const login = useAppStore((s) => s.login);

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!nombre.trim()) {
            setError("El nombre es obligatorio");
            return;
        }
        if (!email.trim() ||!email.includes("@")) {
            setError("Email invalido");
            return;
        }

        login(nombre.trim(), email.trim());

        setNombre("");
        setEmail("");

        router.push("/")
    };

    

    return (
        <form onSubmit={handleSubmit} className="formUser">
            <h3>Iniciar Sesion</h3>

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

            <button type="submit">Login</button>
        </form>
    );
}