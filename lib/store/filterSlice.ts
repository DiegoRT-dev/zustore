import { type StateCreator } from "zustand";

export interface FilterState {
    search: string;
    category: string | null;

    setSearch: (value: string) => void;
    setCategory: (cat: string | null) => void;
    resetFilters: () => void;
}

export const createFilterSlice: StateCreator<FilterState> = (set) => ({
    search: "",
    category: null,

    setSearch: (value) => set({ search: value }),
    setCategory: (cat) => set({ category: cat }),

    resetFilters: () => set({ search: "", category: null })
});