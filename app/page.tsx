//Este es el home
import { Suspense } from "react";
import ProductList from "@/components/ProductList";
import { CategoryFilter } from "@/components/CategoryFilter";

export default function HomePage() {
  return (
    <div>
      <CategoryFilter />
      <Suspense fallback={<div>Cargando productos...</div>}>
        <ProductList />
      </Suspense>
    </div>
  );
}
