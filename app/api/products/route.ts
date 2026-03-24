import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error en GET /api/products:", error);
    return NextResponse.json(
      { error: "Error al obtener los productos",
       detail: String(error)
      },
      { status: 500 },
    );
  }
}
