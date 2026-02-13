"use client";

import { useCartStore } from "@/lib/store/cartSlice";
import { useAppStore } from "@/lib/store/store";
import { useMemo } from "react";

interface Product {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
}

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
          <div key={p.id} className="product-card">
            <p>
              {p.nombre} - ${p.precio}
            </p>
            <small>{p.categoria}</small>
            <button
              className="bg-blue-950 text-white cursor-pointer py-3 rounded w-full"
              onClick={() => handleAdd(p)}
            >
              Agregar
            </button>
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <p className="noProduct">No se encontró producto</p>
        )}
      </div>
    </div>
  );
}
