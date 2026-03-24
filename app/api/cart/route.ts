import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  console.log("[API/cart] POST recibido");

  try {
    const body = await req.json();
    const { action, cart, userId: rawUserId } = body;

    if (action !== "finalize") {
      return NextResponse.json({ error: "Acción no válida" }, { status: 400 });
    }

    const parsedUserId = Number(rawUserId);

    if (!rawUserId || isNaN(parsedUserId) || parsedUserId <= 0) {
      return NextResponse.json(
        { error: "Debes estar logueado" },
        { status: 401 }
      );
    }

    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json(
        { error: "Carrito vacío o inválido" },
        { status: 400 }
      );
    }

    const purchaseItems = [];
    let total = 0;

    for (const item of cart) {
      const productId = Number(item.id);

      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        return NextResponse.json(
          { error: `Producto ${item.id} no encontrado` },
          { status: 404 }
        );
      }

      if (product.stock < item.cantidad) {
        return NextResponse.json(
          { error: `Stock insuficiente para ${product.nombre}` },
          { status: 400 }
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
      },
    });

    return NextResponse.json({
      success: true,
      purchaseId: newPurchase.id,
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error interno del servidor" },
      { status: 500 }
    );
  }
}