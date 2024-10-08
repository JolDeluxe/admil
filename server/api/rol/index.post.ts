import { prisma } from "../../../prisma/db/index";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { nombre } = body;

  if (!nombre) {
    throw createError({
      statusCode: 400,
      statusMessage: "Datos incompletos",
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
    const newRol = await prisma.roles.create({
      data: {
        nombre,
      },
    });

    return {
      status: "success",
      data: newRol,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al crear el rol",
    });
  }
});
