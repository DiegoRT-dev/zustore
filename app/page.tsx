//Este es el home
import { Suspense } from "react";
import ProductList from "@/components/ProductList";
import ClientHome from "@/components/ClientHome";
import { CategoryFilter } from "@/components/CategoryFilter";

export default function HomePage() {
  return (
    <div>
      {/*<ClientHome />*/}
      <CategoryFilter />
      <Suspense fallback={<div>Cargando productos...</div>}>
        <ProductList />
      </Suspense>
    </div>
  );
}
