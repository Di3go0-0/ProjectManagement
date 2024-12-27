/*
  Warnings:

  - You are about to drop the `ProjectColaborator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TaskColaborator` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ProjectColaborator` DROP FOREIGN KEY `ProjectColaborator_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `ProjectColaborator` DROP FOREIGN KEY `ProjectColaborator_userId_fkey`;

-- DropForeignKey
ALTER TABLE `TaskColaborator` DROP FOREIGN KEY `TaskColaborator_taskId_fkey`;

-- DropForeignKey
ALTER TABLE `TaskColaborator` DROP FOREIGN KEY `TaskColaborator_userId_fkey`;

-- DropTable
DROP TABLE `ProjectColaborator`;

-- DropTable
DROP TABLE `TaskColaborator`;

-- CreateTable
CREATE TABLE `ProjectCollaborator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `projectId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `ProjectColaborator_projectId_fkey`(`projectId`),
    INDEX `ProjectColaborator_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TaskCollaborator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `TaskColaborator_taskId_fkey`(`taskId`),
    INDEX `TaskColaborator_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProjectCollaborator` ADD CONSTRAINT `ProjectCollaborator_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectCollaborator` ADD CONSTRAINT `ProjectCollaborator_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskCollaborator` ADD CONSTRAINT `TaskCollaborator_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskCollaborator` ADD CONSTRAINT `TaskCollaborator_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
