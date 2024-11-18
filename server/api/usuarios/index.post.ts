import { prisma } from "../../../prisma/db/index";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { nombre, apellidos, email, contraseña } = body;

  if (!nombre || !apellidos || !contraseña) {
    throw createError({
      statusCode: 400,
      statusMessage: "Datos incompletos",
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