import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userIdParam = searchParams.get("userId");
  const userId = userIdParam ? parseInt(userIdParam, 10) : null;

  if (!userId || isNaN(userId)) {
    return NextResponse.json(
      { error: "Usuario requerido o ID inválido" },
      { status: 400 },
    );
  }

  const purchases = await prisma.purchase.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(purchases);
}
