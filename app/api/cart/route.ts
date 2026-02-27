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
  console.log("[API/cart] POST recibido");

  try {
    const body = await req.json();
    console.log("[API/cart] Body recibido:", body);

    const { action, cart, userId: rawUserId } = body;

    if (action !== "finalize") {
      return NextResponse.json({ error: "Acción no válida" }, { status: 400 });
    }

    const parsedUserId = Number(rawUserId);

    if (!rawUserId || isNaN(parsedUserId) || parsedUserId <= 0) {
      console.log("[API/cart] userId inválido:", rawUserId);
      return NextResponse.json(
        { error: "Debes estar logueado (userId requerido y válido)" },
        { status: 401 },
      );
    }

    console.log("[API/cart] userId válido:", parsedUserId);

    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json(
        { error: "Carrito vacío o inválido" },
        { status: 400 },
      );
    }

    const purchaseItems = [];
    let total = 0;

    for (const item of cart) {
      const productId = Number(item.id);

      if (isNaN(productId)) {
        return NextResponse.json(
          { error: "ID de producto invalido" },
          { status: 400 },
        );
      }

      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        return NextResponse.json(
          { error: `Producto ID ${item.id} no encontrado` },
          { status: 404 },
        );
      }

      if (product.stock < item.cantidad) {
        return NextResponse.json(
          { error: `Stock insuficiente para ${product.nombre}` },
          { status: 400 },
        );
      }

      const subtotal = product.precio * item.cantidad;

      purchaseItems.push({
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: item.cantidad,
        subtotal,
      });

      total += subtotal;
    }

    for (const item of cart) {
      await prisma.product.update({
        where: { id: Number(item.id) },
        data: {
          stock: { decrement: item.cantidad },
        },
      });
    }

    const newPurchase = await prisma.purchase.create({
      data: {
        userId: parsedUserId,
        items: purchaseItems,
        total,
        createdAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Compra finalizada exitosamente",
      purchaseId: newPurchase.id,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error interno del servidor" },
      { status: 500 },
    );
  }
}
