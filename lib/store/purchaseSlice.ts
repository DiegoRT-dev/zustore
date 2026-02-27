import { StateCreator } from "zustand";
import { persist } from "zustand/middleware";

export interface Purchase {
  id: string;
  date: string;
  items: Array<{
    id: number;
    nombre: string;
    precio: number;
    cantidad: number;
  }>;
  total: number;
}

export interface PurchasesState {
  purchases: Purchase[];
  addPurchase: (cart: any[], total: number) => void;
  clearPurchases: () => void;
}

export const createPurchasesSlice: StateCreator<
  PurchasesState,
  [],
  [["zustand/persist", PurchasesState]]
> = (set) => ({
  purchases: [],

  addPurchase: (cart, total) => {
    const newPurchase: Purchase = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: cart.map((item) => ({
        id: item.id,
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.cantidad,
      })),
      total,
    };

    set((state) => ({
      purchases: [...state.purchases, newPurchase],
    }));
  },

  clearPurchases: () => set({ purchases: [] }),
});
