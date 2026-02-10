"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store/store";

export function LoginForm() {
    const login = useAppStore((s) => s.login);

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!nombre || !email) return;

        login(nombre, email);

        setNombre("");
        setEmail("");
    };

    return (
        <form onSubmit={handleSubmit} className="formUser">
            <h3>Iniciar Sesion</h3>
            <input 
            type="text" 
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            />

            <input 
            type="text" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit">Login</button>
        </form>
    );
}