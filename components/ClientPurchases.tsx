"use client";

import { useAppStore } from "@/lib/store/store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Purchase {
  id: number;
  userId: number;
  items: Array<{
    id: number;
    nombre: string;
    precio: number;
    cantidad: number;
  }>;
  total: number;
  createdAt: string;
}

export default function ClientPurchases() {
  const isLogged = useAppStore((s) => s.logged);
  const userId = useAppStore((s) => s.id);
  const router = useRouter();

  const [hydrated, setHydrated] = useState(false);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubHydrate = useAppStore.persist.onHydrate(() =>
      setHydrated(false),
    );
    const unsubFinish = useAppStore.persist.onFinishHydration(() =>
      setHydrated(true),
    );

    setHydrated(useAppStore.persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinish();
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    if (!isLogged || userId === null || isNaN(userId) || userId <= 0) {
      router.replace("/login");
      return;
    }

    const fetchPurchases = async () => {
      try {
        const res = await fetch(`/api/purchases?userId=${userId}`);

        if (!res.ok) throw new Error("Error al cargar compras");

        const data = await res.json();
        setPurchases(data);
      } catch (err: any) {
        setError(err.message || "No se pudieron cargar las compras");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [hydrated, isLogged, userId, router]);

  if (!hydrated) return null;

  if (loading)
    return <div className="text-center py-20 text-xl">Cargando compras...</div>;

  if (error)
    return (
      <div className="text-center py-20 text-red-600 dark:text-red-400 text-xl">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-gray-900 dark:text-gray-100">
          Mis Compras
        </h1>

        {purchases.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Aún no has realizado compras
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              ¡Explora nuestros productos y comienza a comprar!
            </p>

            <Link
              href="/"
              className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
            >
              Ver productos
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {purchases.map((purchase) => (
              <div
                key={purchase.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    Compra #{purchase.id} -{" "}
                    {new Date(purchase.createdAt).toLocaleDateString()}
                  </h3>

                  <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                    ${purchase.total.toFixed(2)}
                  </span>
                </div>

                <ul className="space-y-3">
                  {purchase.items?.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between text-gray-700 dark:text-gray-300"
                    >
                      <span>
                        {item.nombre ?? "Producto"} × {item.cantidad}
                      </span>

                      <span>
                        $
                        {item.precio
                          ? (item.precio * item.cantidad).toFixed(2)
                          : "0.00"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
