import { type StateCreator } from "zustand";

export interface UserState {
  id: number | null;
  nombre: string;
  email: string;
  logged: boolean;

  login: (id: number, nombre: string, email: string) => void;
  logout: () => void;
}

export const createUserSlice: StateCreator<UserState> = (set) => ({
  id: null,
  nombre: "",
  email: "",
  logged: false,

  login: (id, nombre, email) =>
    set({
      id,
      nombre,
      email,
      logged: true,
    }),

  logout: () =>
    set({
      id: null,
      nombre: "",
      email: "",
      logged: false,
    }),
});
