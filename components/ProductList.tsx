import ClientProductList from "./ClientProductList";
import type { Product } from "@prisma/client";

async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch("http://localhost:3000/api/products", {
      cache: "no-store",
      next: {revalidate:60}
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function ProductList() {
  const products = await fetchProducts();

  if (products.length === 0) {
    return <div>No hay productos disponibles en este momento.</div>;
  }

  return <ClientProductList products={products} />;
}
