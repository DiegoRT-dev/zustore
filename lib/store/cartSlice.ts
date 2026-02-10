"use client";

import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import type { Product } from "@/mock/products";

export interface CartItem extends Product {
  cantidad: number;
}

interface CartState {
  cart: CartItem[];

  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;

  total: () => number;
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const cart = get().cart;
        const itemFound = cart.find((item) => item.id === product.id);

        if (itemFound) {
          return set({
            cart: cart.map((item) =>
              item.id === product.id
                ? { ...itemFound, cantidad: item.cantidad + 1 }
                : item
            ),
          });
        }

        set({
          cart: [...cart, { ...product, cantidad: 1 }],
        });
      },

      removeFromCart: (id) =>
        set({
          cart: get().cart.filter((item) => item.id !== id),
        }),

      increaseQty: (id) =>
        set({
          cart: get().cart.map((item) =>
            item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
          ),
        }),

      decreaseQty: (id) =>
        set({
          cart: get()
            .cart.map((item) =>
              item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
            )
            .filter((item) => item.cantidad > 0),
        }),

      total: () =>
        get().cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0),
    }),

    { name: "cart-storage" }
  ),
  { name: "CartStore "}
  )
);
