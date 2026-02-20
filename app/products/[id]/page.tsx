import ClientPDetail from "@/components/ClientPDetail";
import { notFound } from "next/navigation";
import type { Product } from "@prisma/client";

async function fetchProduct(id: number): Promise<Product | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const productId = parseInt(id, 10);
  if (isNaN(productId)) {
    notFound();
  }

  const product = await fetchProduct(productId);

  if (!product) {
    notFound();
  }
  return <ClientPDetail product={product} />;
}
