import { prisma } from "../../../prisma/db/index";
// import { isCookieValid } from "../../utils/cookies";

export default defineEventHandler(async (event) => {
  //   const cookie = getCookie(event, "s-login");
  //   if (!isCookieValid(cookie)) {
  //     throw createError({
  //       statusCode: 401,
  //       statusMessage: "Token inválido o expirado",
  //     });
  //   }

  const params = event.context.params;

  if (!params || !params.id) {
    throw createError({
      statusCode: 400,
      statusMessage: "El ID no fue proporcionado",
    });
  }

  const id = Number(params.id);
  const body = await readBody(event);
  const { nombre } = body;

  if (!nombre) {
    throw createError({
      statusCode: 400,
      statusMessage: "Datos incompletos.",
    });
  }

  let roleExists;
  try {
    roleExists = await prisma.roles.findFirst({
      where: { nombre: nombre },
    });
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al verificar el rol",
    });
  }

  if (roleExists) {
    throw createError({
      statusCode: 400,
      statusMessage: "El rol ya existe",
    });
  }

  try {
    const rolActualizado = await prisma.roles.update({
      where: { id },
      data: { nombre },
    });
    return {
      status: "success",
      data: rolActualizado,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al actualizar el rol",
    });
  }
});
