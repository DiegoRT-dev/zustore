import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { NextResponse } from "next/server";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL missing");

const adapter = new PrismaMariaDb(connectionString);

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, cart } = body;

    if (action === "finalize") {
      if (!Array.isArray(cart) || cart.length === 0) {
        return NextResponse.json({ error: "Carrito vacío" }, { status: 400 });
      }

      for (const item of cart) {
        const product = await prisma.product.findUnique({
          where: { id: item.id },
        });
        if (!product || product.stock < item.cantidad) {
          return NextResponse.json(
            { error: `Stock insuficiente para ${product?.nombre}` },
            { status: 400 },
          );
        }

        await prisma.product.update({
          where: { id: item.id },
          data: { stock: product.stock - item.cantidad },
        });
      }

      return NextResponse.json({
        success: true,
        message: "Compra finalizada, stock actualizado",
      });
    }

    return NextResponse.json({ error: "Acción no válida" }, { status: 400 });
  } catch (error) {
    console.error("Error en /api/cart:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
