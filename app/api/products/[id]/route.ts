import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const params = await context.params;

  const idParam = params.id;

  if (!idParam || typeof idParam !== "string") {
    return NextResponse.json(
      { error: "ID no recibido o inválido" },
      { status: 400 },
    );
  }

  const id = parseInt(idParam, 10);

  if (isNaN(id) || id <= 0) {
    console.log("ID parseado como NaN o <=0:", idParam);
    return NextResponse.json(
      { error: "ID inválido (debe ser número positivo)" },
      { status: 400 },
    );
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
