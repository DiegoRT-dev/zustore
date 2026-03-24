import ClientProductList from "./ClientProductList";
import type { Product } from "@prisma/client";
import prisma from "@/lib/prisma";

async function fetchProducts(): Promise<Product[]> {
  try {
    return await prisma.product.findMany();
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
