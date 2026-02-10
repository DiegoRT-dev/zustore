import { Suspense } from "react";
import ProductList from "@/components/ProductList";
import ClientHome from "@/components/ClientHome";

export default function HomePage() {
  return (
    <div>
      <ClientHome />
      <Suspense fallback={<div>Cargando productos...</div>}>
        <ProductList />
      </Suspense>
    </div>
  );
}
