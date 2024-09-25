/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `roles` table. All the data in the column will be lost.
  - Added the required column `rolId` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `roles` DROP FOREIGN KEY `Roles_usuarioId_fkey`;

-- AlterTable
ALTER TABLE `roles` DROP COLUMN `usuarioId`;

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `rolId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_rolId_fkey` FOREIGN KEY (`rolId`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
