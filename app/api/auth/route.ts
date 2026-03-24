import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, nombre, email, password } = body;

    if (!action || !email || !password) {
      return NextResponse.json(
        { error: "Faltan datos requeridos" },
        { status: 400 }
      );
    }

    if (action === "register") {
      if (!nombre) {
        return NextResponse.json(
          { error: "El nombre es obligatorio para registro" },
          { status: 400 }
        );
      }

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "El email ya está registrado" },
          { status: 409 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          nombre,
          email,
          password: hashedPassword,
        },
      });

      const { password: _, ...userWithoutPassword } = newUser;

      return NextResponse.json({
        success: true,
        user: userWithoutPassword,
      });
    }

    if (action === "login") {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return NextResponse.json(
          { error: "Usuario no encontrado" },
          { status: 401 }
        );
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        user.password
      );

      if (!isPasswordValid) {
        return NextResponse.json(
          { error: "Contraseña incorrecta" },
          { status: 401 }
        );
      }

      const { password: _, ...userWithoutPassword } = user;

      return NextResponse.json({
        success: true,
        user: userWithoutPassword,
      });
    }

    return NextResponse.json(
      { error: "Acción no válida" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error en /api/auth", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}