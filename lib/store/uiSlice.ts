import { type StateCreator } from "zustand";

export interface UIState {
  loading: boolean;
  status:
    | "idle"
    | "successCart"
    | "successBuy"
    | "error"
    | "errorCart"
    | "warningCart"
    | "warningUser";

  setLoading: (value: boolean) => void;
  setStatus: (value: UIState["status"]) => void;
}

export const createUISlice: StateCreator<UIState> = (set) => ({
  loading: false,
  status: "idle",

  setLoading: (value) => set({ loading: value }),
  setStatus: (value) => set({ status: value }),
});
