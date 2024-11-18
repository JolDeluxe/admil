/*
  Warnings:

  - You are about to drop the column `estatus` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `rolId` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the `alumno` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `alumnogrupo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `carrera` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `grupo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profesor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `alumnogrupo` DROP FOREIGN KEY `AlumnoGrupo_alumnoId_fkey`;

-- DropForeignKey
ALTER TABLE `alumnogrupo` DROP FOREIGN KEY `AlumnoGrupo_grupoId_fkey`;

-- DropForeignKey
ALTER TABLE `grupo` DROP FOREIGN KEY `Grupo_carreraId_fkey`;

-- DropForeignKey
ALTER TABLE `grupo` DROP FOREIGN KEY `Grupo_profesorId_fkey`;

-- DropForeignKey
ALTER TABLE `usuario` DROP FOREIGN KEY `Usuario_rolId_fkey`;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `estatus`,
    DROP COLUMN `rolId`;

-- DropTable
DROP TABLE `alumno`;

-- DropTable
DROP TABLE `alumnogrupo`;

-- DropTable
DROP TABLE `carrera`;

-- DropTable
DROP TABLE `grupo`;

-- DropTable
DROP TABLE `profesor`;

-- DropTable
DROP TABLE `roles`;
