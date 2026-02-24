"use client";

import { useCartStore } from "@/lib/store/cartSlice";
import { useAppStore } from "@/lib/store/store";
import { useMemo } from "react";
import type { Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

interface ClientProductListProps {
  products: Product[];
}

export default function ClientProductList({
  products,
}: ClientProductListProps) {
  const add = useCartStore((s) => s.addToCart);
  const search = useAppStore((s) => s.search);
  const category = useAppStore((s) => s.category);
  const setStatus = useAppStore((s) => s.setStatus);
  const cart = useCartStore((s) => s.cart);

  const theme = useAppStore((s) => s.theme);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.nombre
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory = category ? p.categoria === category : true;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const handleAdd = (product: Product) => {
    const currentQtyInCart =
      cart.find((item) => item.id === product.id)?.cantidad || 0;
    const newQty = currentQtyInCart + 1;

    if (newQty > product.stock) {
      setStatus("warningCart");
      return;
    }
    add(product);
    setStatus("successCart");
  };

  return (
    <div className="py-8 px-4">
      <div
        className={`
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
          gap-6 md:gap-8
        `}
      >
        {filteredProducts.map((p) => {
          const qtyInCart =
            cart.find((item) => item.id === p.id)?.cantidad || 0;
          return (
            <div
              key={p.id}
              className={`
              group bg-white dark:bg-gray-800 
              rounded-xl shadow-md overflow-hidden 
              transition-all duration-300 
              hover:shadow-xl hover:-translate-y-1
              border border-gray-200 dark:border-gray-700
            `}
            >
              <Link
                href={`/products/${p.id}`}
                className="block relative aspect-4/3 overflow-hidden"
              >
                {p.imagen ? (
                  <Image
                    src={p.imagen}
                    alt={p.nombre || "Producto"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    quality={75}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL="/placeholder.jpg"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    Sin imagen
                  </div>
                )}
              </Link>

              <div className="p-5 flex flex-col">
                <Link
                  href={`/products/${p.id}`}
                  className="text-gray-900 dark:text-gray-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <h3 className="text-lg font-semibold line-clamp-2 mb-2">
                    {p.nombre}
                  </h3>
                </Link>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {p.categoria}
                </p>

                <p className="text-sm mb-3">
                  Stock:{" "}
                  <span
                    className={
                      p.stock > 0
                        ? "text-green-600 font-medium"
                        : "text-red-600 font-medium"
                    }
                  >
                    {p.stock > 0 ? p.stock : "Agotado"}
                  </span>
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <p className="text-xl font-bold text-emerald-700 dark:text-emerald-400">
                    ${p.precio.toFixed(2)}
                  </p>

                  <button
                    className={`
                  px-5 py-2 rounded-lg font-medium text-white 
                  transition-colors duration-200
                  ${
                    p.stock === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-700 hover:bg-blue-800 active:bg-blue-900"
                  }
                `}
                    disabled={p.stock === 0}
                    onClick={() => handleAdd(p)}
                  >
                    {p.stock === 0 ? (
                      "Agotado"
                    ) : (
                      <>
                        Agregar
                        {qtyInCart > 0 && (
                          <span className="bg-white text-blue-700 font-bold text-xs px-2 py-1 ml-1 rounded-full min-w-6 text-center">
                            {qtyInCart}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16 text-gray-500 dark:text-gray-400 text-xl font-medium">
          No se encontró ningún producto
        </div>
      )}
    </div>
  );
}
