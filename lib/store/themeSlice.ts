import { type StateCreator } from "zustand";

type Theme = "light" | "dark";

export interface ThemeState {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void
}

export const createThemeSlice: StateCreator<ThemeState> = (set) => ({
    theme: "light",

    toggleTheme: () => 
        set ((state) => ({
            theme: state.theme === "light" ? "dark" : "light"
        })),
    setTheme: (theme) => set({theme})
});