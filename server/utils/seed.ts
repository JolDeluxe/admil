import { prisma } from "../../prisma/db/index";
import { hashPassword, generateSalt } from "./crypto";
import chalk from "chalk";

async function main() {
  const roles = [
    {
      nombre: "Informatica",
    },
    {
      nombre: "Recursos Humanos",
    },
    {
      nombre: "Aspirante",
    },
    {
      nombre: "Alumno",
    },
    {
      nombre: "Servicios Escolares",
    },
    {
      nombre: "Profesor",
    },
  ];

  for (const rol of roles) {
    let newRol;
    try {
      newRol = await prisma.roles.findFirst({
        where: { nombre: rol.nombre },
      });
    } catch (error) {
      console.error(
        chalk.red(`Error al consultar el rol ${rol.nombre}:`),
        error
      );
      continue;
    }

    if (!newRol) {
      try {
        await prisma.roles.create({
          data: {
            nombre: rol.nombre,
          },
        });
        console.log(chalk.green(`Rol ${rol.nombre} creada con éxito.`));
      } catch (error) {
        console.error(chalk.red(`Error al crear el Rol ${rol.nombre}:`), error);
      }
    } else {
      console.log(chalk.yellow(`Rol ${rol.nombre} ya existe.`));
    }
  }

  const usuarios = [
    {
      nombre: "Maico",
      apellidos: "Lopez",
      email: "maico@gmail.com",
      password: "maico123",
      rol: 1,
    },
    {
      nombre: "Jaqui",
      apellidos: "Núñez",
      email: "Jaqui@gmail.com",
      password: "jaqui123",
      rol: 2,
    },
    {
      nombre: "Isaac",
      apellidos: "Murillo",
      email: "isaac@gmail.com",
      password: "Isaaci123",
      rol: 3,
    },
  ];

  for (const usuario of usuarios) {
    let user;
    try {
      user = await prisma.usuario.findFirst({
        where: { email: usuario.email },
      });
    } catch (error) {
      console.error(
        chalk.red(`Error al consultar el usuario ${usuario.nombre}:`),
        error
      );
      continue;
    }

    if (!user) {
      let salt;
      let hashed_password;
      try {
        salt = generateSalt();
        hashed_password = hashPassword(salt, usuario.password);
      } catch (error) {
        console.error(
          chalk.red(
            `Error al generar el hash para el usuario ${usuario.nombre}:`
          ),
          error
        );
        continue;
      }

      try {
        await prisma.usuario.create({
          data: {
            nombre: usuario.nombre,
            apellidos: usuario.apellidos,
            email: usuario.email,
            salt: salt,
            hashedPassword: hashed_password,
            rol: {
              connect: { id: usuario.rol },
            },
          },
        });
        console.log(chalk.green(`Usuario ${usuario.nombre} creado con éxito.`));
      } catch (error) {
        console.error(
          chalk.red(`Error al crear el usuario ${usuario.nombre}:`),
          error
        );
      }
    } else {
      console.log(chalk.yellow(`Usuario ${usuario.nombre} ya existe.`));
    }
  }
}

main().catch((e) => {
  console.error(chalk.red("Error al ejecutar el script:"), e);
  process.exit(1);
});
