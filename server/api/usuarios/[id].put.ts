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
  const { nombre, apellidos, email, rol, contraseña } = body;

  if (!nombre || !apellidos || !rol) {
    throw createError({
      statusCode: 400,
      statusMessage: "Datos incompletos.",
    });
  }

  let usuarioExistente;
  try {
    usuarioExistente = await prisma.usuario.findUnique({
      where: { id },
    });
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al consultar los usuarios",
    });
  }

  if (!usuarioExistente) {
    throw createError({
      statusCode: 404,
      statusMessage: "Usuario no encontrado",
    });
  }

  if (email) {
    let usuarioConEmail;
    try {
      usuarioConEmail = await prisma.usuario.findUnique({
        where: { email },
      });
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: "Error al verificar el email",
      });
    }

    if (usuarioConEmail) {
      throw createError({
        statusCode: 400,
        statusMessage: "El correo electrónico ya está en uso por otro usuario.",
      });
    }
  }

  const datosActualizacion: any = {
    nombre,
    apellidos,
    rol: {
      connect: { id: rol },
    },
  };

  if (email) {
    datosActualizacion.email = email;
  }

  if (contraseña) {
    let salt;
    let hashed_password;
    try {
      salt = generateSalt();
      hashed_password = hashPassword(salt, contraseña);
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: "Error al generar la contraseña",
      });
    }

    datosActualizacion.salt = salt;
    datosActualizacion.hashedPassword = hashed_password;
  }

  try {
    const usuarioActualizado = await prisma.usuario.update({
      where: { id },
      data: datosActualizacion,
    });

    return {
      status: "success",
      data: usuarioActualizado,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al actualizar el usuario",
    });
  }
});
