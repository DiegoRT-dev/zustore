"use client";

import { useAppStore } from "@/lib/store/store";

export function UserInfo() {
    const nombre = useAppStore((s) => s.nombre);
    const email = useAppStore((s) => s.email);
    const logout = useAppStore((s) => s.logout);

    return (
        <div className="userInfo">
            <p>Sesion iniciada como <strong>{nombre}</strong></p>
            <p>{email}</p>
            <button onClick={logout}>Cerrar Sesion</button>
        </div>
    );
}