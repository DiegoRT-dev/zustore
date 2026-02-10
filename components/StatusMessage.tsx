"use client";

import { useAppStore } from "@/lib/store/store";

export function StatusMessage() {
    const status = useAppStore((s) => s.status);
    const setStatus = useAppStore((s) => s.setStatus);

    if (status === "idle")return null;

    return (
        <div className="statusMsg"
        style={{background:
          status === "success"
            ? "#d1fae5"
            : status === "error"
            ? "#fee2e2"
            : "#eee"}}
        >
            {status === "success" && "Operacion Exitosa"}
            {status === "error" && "Ocurrio un error"}

            <button className="statusBtn" onClick={() => setStatus("idle")}>
                X
            </button>
        </div>
    );
}