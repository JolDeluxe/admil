-- CreateTable
CREATE TABLE `Carrera` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Grupo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_grupo` VARCHAR(191) NOT NULL,
    `periodo` VARCHAR(191) NOT NULL,
    `carreraId` INTEGER NOT NULL,
    `profesorId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Alumno` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `curp` VARCHAR(191) NOT NULL,
    `numero_empleado` VARCHAR(191) NOT NULL,
    `tipo_contrato` VARCHAR(191) NOT NULL,
    `fecha_ingreso` DATETIME(3) NOT NULL,
    `estatus` VARCHAR(191) NOT NULL,
    `area` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Alumno_correo_key`(`correo`),
    UNIQUE INDEX `Alumno_curp_key`(`curp`),
    UNIQUE INDEX `Alumno_numero_empleado_key`(`numero_empleado`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profesor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `numero_empleado` VARCHAR(12) NOT NULL,
    `tipo_contrato` VARCHAR(191) NOT NULL,
    `fecha_ingreso` DATETIME(3) NOT NULL,
    `estatus` VARCHAR(191) NOT NULL,
    `area` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Profesor_correo_key`(`correo`),
    UNIQUE INDEX `Profesor_numero_empleado_key`(`numero_empleado`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlumnoGrupo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `alumnoId` INTEGER NOT NULL,
    `grupoId` INTEGER NOT NULL,

    UNIQUE INDEX `AlumnoGrupo_alumnoId_grupoId_key`(`alumnoId`, `grupoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Grupo` ADD CONSTRAINT `Grupo_carreraId_fkey` FOREIGN KEY (`carreraId`) REFERENCES `Carrera`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grupo` ADD CONSTRAINT `Grupo_profesorId_fkey` FOREIGN KEY (`profesorId`) REFERENCES `Profesor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlumnoGrupo` ADD CONSTRAINT `AlumnoGrupo_alumnoId_fkey` FOREIGN KEY (`alumnoId`) REFERENCES `Alumno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlumnoGrupo` ADD CONSTRAINT `AlumnoGrupo_grupoId_fkey` FOREIGN KEY (`grupoId`) REFERENCES `Grupo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
