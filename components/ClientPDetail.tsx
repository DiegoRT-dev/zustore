"use client";

import { useCartStore } from "@/lib/store/cartSlice";
import { useAppStore } from "@/lib/store/store";
import type { Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

interface ClientPDetailProps {
  product: Product;
}

export default function ClientPDetail({ product }: ClientPDetailProps) {
  const add = useCartStore((s) => s.addToCart);
  const setLoading = useAppStore((s) => s.setLoading);
  const setStatus = useAppStore((s) => s.setStatus);

  const handleAdd = () => {
    add(product);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto bg-transparent rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <div className="relative w-full h-96 md:h-130 overflow-hidden">
              {product.imagen ? (
                <Image
                  src={product.imagen}
                  alt={product.nombre || "Producto"}
                  fill
                  className="w-full h-96 md:h-full object-cover"
                  priority={false}
                  quality={85}
                  placeholder="blur"
                blurDataURL="/placeholder.jpg" 
                onError={() => console.log("Error cargando imagen:", product.imagen)}
                />
              ) : (
                <div className="w-full h-96 md:h-full bg-gray-200 flex items-center justify-center text-gray-500">
                  Sin imagen
                </div>
              )}
            </div>
          </div>

          <div className="p-8 md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{product.nombre}</h1>
            <p className="text-4xl font-bold text-green-700 mb-6">
              ${product.precio.toFixed(2)}
            </p>

            {product.descripcion && (
              <p className="text-gray-600 mb-6 text-lg">
                {product.descripcion}
              </p>
            )}

            <p className="text-gray-500 mb-4">
              Categoría:{" "}
              <span className="font-medium">{product.categoria}</span>
            </p>

            {product.stock !== undefined && (
              <p className="mb-6">
                Stock disponible:{" "}
                <span
                  className={
                    product.stock > 0
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  {product.stock > 0 ? product.stock : "Agotado"}
                </span>
              </p>
            )}

            <button
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={product.stock === 0}
              onClick={handleAdd}
            >
              {product.stock === 0 ? "Agotado" : "Agregar al carrito"}
            </button>

            <button
              className="mt-4 w-full bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition"
            ><Link href="/">
                Volver a la tienda
            </Link>
              
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
