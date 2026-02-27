"use client";

import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

import { createThemeSlice, type ThemeState } from "./themeSlice";
import { createUserSlice, type UserState } from "./userSlice";
import { createFilterSlice, type FilterState } from "./filterSlice";
import { createUISlice, type UIState } from "./uiSlice";
import { createPurchasesSlice, type PurchasesState } from "./purchaseSlice";

export type AppState = ThemeState &
  UserState &
  FilterState &
  UIState &
  PurchasesState;

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (...a) => {
        const slices = {
          ...createThemeSlice(...a),
          ...createUserSlice(...a),
          ...createFilterSlice(...a),
          ...createUISlice(...a),
          ...createPurchasesSlice(...a),
        };

        return {
          ...slices,
          resetApp: () => {
            slices.resetFilters?.();
          },
        };
      },

      {
        name: "app-storage",
        partialize: (state) => ({
          theme: state.theme,
          id: state.id,
          nombre: state.nombre,
          email: state.email,
          logged: state.logged,
        }),
      },
    ),
    { name: "AppStore" },
  ),
);
