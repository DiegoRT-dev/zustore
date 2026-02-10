"use client";

import { useAppStore } from "@/lib/store/store";

export function GlobalLoader() {
    const loading = useAppStore((s) => s.loading);

    if (!loading) return null;

    return (
        <div className="loading">
            Cargando ...
        </div>
    );
}