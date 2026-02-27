import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL missing");

const adapter = new PrismaMariaDb(connectionString);

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, field, value } = body;

    if (!userId) {
      return NextResponse.json({ error: "Usuario requerido" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    if (field === "nombre") {
      if (!value || typeof value !== "string" || value.trim() === "") {
        return NextResponse.json({ error: "Nombre inválido" }, { status: 400 });
      }
      await prisma.user.update({
        where: { id: user.id },
        data: { nombre: value.trim() },
      });
      return NextResponse.json({
        success: true,
        field: "nombre",
        value: value.trim(),
      });
    }

    if (field === "email") {
      if (!value || typeof value !== "string" || !value.includes("@")) {
        return NextResponse.json({ error: "Email inválido" }, { status: 400 });
      }

      const existing = await prisma.user.findUnique({
        where: { email: value.trim() },
      });

      if (existing && existing.id !== user.id) {
        return NextResponse.json(
          { error: "Este email ya está registrado" },
          { status: 400 },
        );
      }

      await prisma.user.update({
        where: { id: user.id },
        data: { email: value.trim() },
      });

      return NextResponse.json({
        success: true,
        field: "email",
        value: value.trim(),
      });
    }

    if (field === "password") {
      const { newPassword, confirmPassword } = value;

      if (!newPassword || newPassword.length < 6) {
        return NextResponse.json(
          { error: "Contraseña debe tener al menos 6 caracteres" },
          { status: 400 },
        );
      }

      if (newPassword !== confirmPassword) {
        return NextResponse.json(
          { error: "Las contraseñas no coinciden" },
          { status: 400 },
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });

      return NextResponse.json({ success: true, field: "password" });
    }

    return NextResponse.json({ error: "Campo no válido" }, { status: 400 });
  } catch (error: any) {
    console.error("Error en /api/user/update:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
