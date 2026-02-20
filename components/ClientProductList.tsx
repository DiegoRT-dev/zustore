"use client";

import { useCartStore } from "@/lib/store/cartSlice";
import { useAppStore } from "@/lib/store/store";
import { useMemo } from "react";
import type { Product } from "@prisma/client";

interface ClientProductListProps {
  products: Product[];
}

export default function ClientProductList({
  products,
}: ClientProductListProps) {
  const add = useCartStore((s) => s.addToCart);
  const search = useAppStore((s) => s.search);
  const category = useAppStore((s) => s.category);
  const setLoading = useAppStore((s) => s.setLoading);
  const setStatus = useAppStore((s) => s.setStatus);

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
    setLoading(true);
    setStatus("idle");

    setTimeout(() => {
      add(product);
      setLoading(false);
      setStatus("success");
    }, 1000);
  };
  
  return (
    <div>
      <h2>Productos</h2>
      <div className="product-grid">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="bg-transparent rounded-lg shadow-md overflow-hidden"
          >
            {p.imagen ? (
              <img
                src={p.imagen}
                alt={p.nombre || "Producto"}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.jpg";
                  e.currentTarget.alt = "Imagen no disponible";
                }}
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
                Sin imagen disponible
              </div>
            )}

            <div className="p-4">
              <h3>{p.nombre}</h3>
              <p>{p.categoria}</p>

              <div className="flex justify-between items-center">
                <p className="text-xl font-bold text-green-700">${p.precio}</p>
                <button
                  className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-900 transition"
                  onClick={() => handleAdd(p)}
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <p className="noProduct">No se encontró producto</p>
        )}
      </div>
    </div>
  );
}
