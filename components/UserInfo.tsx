"use client";

import { useAppStore } from "@/lib/store/store";
import { useRouter } from "next/navigation";

export function UserInfo() {
    const nombre = useAppStore((s) => s.nombre);
    const email = useAppStore((s) => s.email);
    const logout = useAppStore((s) => s.logout);
    const router = useRouter();

    const handleLogOut = () => {
        logout();
        router.push("/");
    }

    return (
        <div className="userInfo">
            <p>Sesion iniciada como <strong>{nombre}</strong></p>
            <p>{email}</p>
            <button onClick={handleLogOut}>Cerrar Sesion</button>
        </div>
    );
}