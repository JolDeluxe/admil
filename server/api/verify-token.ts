// server/api/verify-token.ts
import { defineEventHandler, readBody } from "h3";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const { token } = await readBody(event);

  if (!token) {
    return {
      status: "error",
      error: "Token no proporcionado",
      statusCode: 400,
    };
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;

    const { id, email, nombre, rol } = decoded;

    return {
      status: "success",
      data: { id, email, nombre, rol },
      statusCode: 200,
    };
  } catch (error) {
    return {
      status: "error",
      error: "Token inválido o expirado",
      statusCode: 401,
    };
  }
});
