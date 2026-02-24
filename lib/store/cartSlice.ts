"use client";

import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import type { Product } from "@prisma/client";
import { useAppStore } from "./store";

export interface CartItem extends Product {
  cantidad: number;
}

interface CartState {
  cart: CartItem[];

  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  clearCart: () => void;

  total: () => number;
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        cart: [],

        addToCart: (product: Product) => {
          const currentCart = get().cart;
          const itemFound = currentCart.find((item) => item.id === product.id);

          if (itemFound) {
            if (itemFound.cantidad + 1 > product.stock) {
              return;
            }

            return set({
              cart: currentCart.map((item) =>
                item.id === product.id
                  ? { ...item, cantidad: item.cantidad + 1 }
                  : item,
              ),
            });
          }

          set({
            cart: [...currentCart, { ...product, cantidad: 1 }],
          });
        },

        removeFromCart: (id) =>
          set({
            cart: get().cart.filter((item) => item.id !== id),
          }),

        increaseQty: (id: number) => {
          const currentCart = get().cart;
          const item = currentCart.find((i) => i.id === id);
          if (!item) return;

          const newQty = item.cantidad + 1;

          if (newQty > item.stock) {
            useAppStore.getState().setStatus("warningCart");
            return;
          }

          set({
            cart: currentCart.map((i) =>
              i.id === id ? { ...i, cantidad: newQty } : i,
            ),
          });
        },

        decreaseQty: (id: number) => {
          set({
            cart: get()
              .cart.map((item) =>
                item.id === id
                  ? { ...item, cantidad: Math.max(1, item.cantidad - 1) }
                  : item,
              )
              .filter((item) => item.cantidad > 0),
          });
        },

        clearCart: () => set({ cart: [] }),

        total: () =>
          get().cart.reduce(
            (acc, item) => acc + item.precio * item.cantidad,
            0,
          ),
      }),

      { name: "cart-storage" },
    ),
    { name: "CartStore" },
  ),
);
