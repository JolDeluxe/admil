import { prisma } from "../../../prisma/db/index";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { nombre, apellidos, rol, email, contraseña } = body;

  if (!nombre || !apellidos || !rol || !contraseña) {
    throw createError({
      statusCode: 400,
      statusMessage: "Datos incompletos",
    });
  }
  let roleExists;
  try {
    roleExists = await prisma.roles.findUnique({
      where: { id: rol },
    });
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al verificar el rol",
    });
  }

  if (!roleExists) {
    throw createError({
      statusCode: 400,
      statusMessage: "El rol especificado no existe",
    });
  }

  let existUser;
  try {
    existUser = await prisma.usuario.findFirst({
      where: { email },
    });
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al buscar el usuario",
    });
  }

  if (existUser) {
    throw createError({
      statusCode: 409,
      statusMessage: "Ya hay un usuario con ese correo",
    });
  }

  let salt;
  let hashed_password;
  try {
    salt = generateSalt();
    hashed_password = hashPassword(salt, contraseña);
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al generar el salt",
    });
  }

  try {
    const newUser = await prisma.usuario.create({
      data: {
        nombre,
        apellidos,
        email,
        salt: salt,
        hashedPassword: hashed_password,
        rol: {
          connect: { id: rol },
        },
      },
    });

    return {
      status: "success",
      data: newUser,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al crear el usuario",
    });
  }
});
