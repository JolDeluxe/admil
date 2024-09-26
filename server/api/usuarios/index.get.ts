import { prisma } from "../../../prisma/db/index";

export default defineEventHandler(async () => {
  let usuarios;
  try {
    usuarios = await prisma.usuario.findMany({
      include: {
        rol: true,
      },
    });

    const usuariosData = usuarios.map((usuario) => ({
      id: usuario.id,
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      email: usuario.email,
      rol: usuario.rol.nombre,
    }));

    return {
      status: "success",
      data: usuariosData,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al obtener los usuarios",
    });
  }
});