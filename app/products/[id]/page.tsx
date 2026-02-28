import ClientPDetail from "@/components/ClientPDetail";
import { notFound } from "next/navigation";
import type { Product } from "@prisma/client";
import { prisma } from "@/lib/prisma";

async function fetchProduct(id: number): Promise<Product | null> {
  try {
    return await prisma.product.findUnique({
      where: { id },
    });
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
