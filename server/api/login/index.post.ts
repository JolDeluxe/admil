import { prisma } from "../../../prisma/db/index";
import jwt from "jsonwebtoken";
import { hashPassword } from "../../utils/crypto";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Faltan datos: correo o contraseña",
    });
  }

  let user;
  try {
    user = await prisma.usuario.findFirst({
      where: { email },
    });
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al buscar el usuario",
    });
  }

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Usuario o Contraseña incorrecto",
    });
  }

  const bodyHashedPassword = hashPassword(user.salt, password);

  if (bodyHashedPassword !== user.hashedPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: "Usuario o Contraseña incorrecto",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      nombre: user.nombre,
      apellidos: user.apellidos,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    {
      algorithm: "HS256",
      expiresIn: "24h",
    }
  );

  return {
    user: {
      id: user.id,
      nombre: user.nombre,
      apellidos: user.apellidos,
      email: user.email,
    },
    token,
  };
});
