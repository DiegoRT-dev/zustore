"use client";

import { useAppStore } from "@/lib/store/store";

export function CategoryFilter() {
    const category = useAppStore((s) => s.category);
    const setCategory = useAppStore((s) => s.setCategory);
    const resetFilters = useAppStore((s) => s.resetFilters);

    return (
        <div className="category">
            <select 
            value={category ?? ""}
            onChange={(e) => 
                setCategory(e.target.value === "" ? null : e.target.value)
            }
            >
                <option value="">Todas las categorias</option>
                <option value="Computo">Computo</option>
                <option value="Accesorios">Accesorios</option>
                <option value="Audio">Audio</option>
            </select>

            <button onClick={resetFilters}>
                Limpiar filtros
            </button>
        </div>
    );
}