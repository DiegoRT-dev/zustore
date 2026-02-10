"use client";

import { useCartStore } from "@/lib/store/cartSlice";

export function Cart() {
  const cart = useCartStore((s) => s.cart);
  const increase = useCartStore((s) => s.increaseQty);
  const decrease = useCartStore((s) => s.decreaseQty);
  const remove = useCartStore((s) => s.removeFromCart);
  const total = useCartStore((s) => s.total());

  return (
    <div className="cart-modal">
      <h2>Carrito</h2>

      {cart.length === 0 && <p>Tu carrtio esta vacio</p>}

      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <p>
            {item.nombre} - ${item.precio}
          </p>

          <div className="qty-controls">
            <button onClick={() => decrease(item.id)}>-</button>
            {item.cantidad}
            <button onClick={() => increase(item.id)}>+</button>
          </div>

          <button onClick={() => remove(item.id)}>Quitar</button>
        </div>
      ))}

      <h3>Total: ${total}</h3>
    </div>
  );
}
