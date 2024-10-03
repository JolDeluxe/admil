import { prisma } from "../../../prisma/db/index";

export default defineEventHandler(async () => {
  let roles;
  try {
    roles = await prisma.roles.findMany({});

    return {
      status: "success",
      data: roles,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al obtener los roles",
    });
  }
});
