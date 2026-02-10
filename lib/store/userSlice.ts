import { type StateCreator } from "zustand";

export interface UserState {
    nombre: string;
    email: string;
    logged: boolean;

    login: (nombre: string, email: string) => void;
    logout: () => void;

}

export const createUserSlice: StateCreator<UserState> = (set, get) => ({
    nombre: "",
    email: "",
    logged: false,

    login: (nombre, email) =>
        set({
            nombre,
            email,
            logged: true
        }),
        
    logout: () =>
        set({
            nombre: "",
            email: "",
            logged: false
        }),

});