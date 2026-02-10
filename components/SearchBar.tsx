"use client";

import { useAppStore } from "@/lib/store/store";

export function SearchBar() {
    const search = useAppStore((s) => s.search);
    const setSearch = useAppStore((s) => s.setSearch);

    return (
        <input 
        type="text" 
        placeholder="Buscar producto... "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="searchBar"
        />
    )
}