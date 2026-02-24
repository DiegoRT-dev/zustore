"use client";

import { useCartStore } from "@/lib/store/cartSlice";

interface CartProps {
  onClose: () => void;
}

export function Cart({ onClose }: CartProps) {
  const cart = useCartStore((s) => s.cart);
  const increase = useCartStore((s) => s.increaseQty);
  const decrease = useCartStore((s) => s.decreaseQty);
  const remove = useCartStore((s) => s.removeFromCart);
  const total = useCartStore((s) => s.total());
  const clearCart = useCartStore((s) => s.clearCart);

  return (
    <div
      className={`fixed top-20 right-4 z-50 w-80 sm:w-96 max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl transition-all duration-300 ease-in-out`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Carrito
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
          >
            ×
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            Tu carrito está vacío
          </p>
        ) : (
          <div className="space-y-5">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700"
              >
                <div className="grow">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    {item.nombre}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    ${item.precio.toFixed(2)} × {item.cantidad}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrease(item.id)}
                    className="w-8 h-8 flex items-center justify-center rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50"
                    disabled={item.cantidad <= 1}
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium text-gray-900 dark:text-gray-100">
                    {item.cantidad}
                  </span>
                  <button
                    onClick={() => increase(item.id)}
                    className="w-8 h-8 flex items-center justify-center rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => remove(item.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition ml-2"
                >
                  Quitar
                </button>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Total:
              </span>
              <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                ${total.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => {
                if (cart.length === 0) return;
                clearCart();
              }}
              className={`
                w-full py-4 rounded-lg font-bold text-lg
                bg-green-600 hover:bg-green-700 text-white
                transition-colors duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
              disabled={cart.length === 0}
            >
              Finalizar Compra (${total.toFixed(2)})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
