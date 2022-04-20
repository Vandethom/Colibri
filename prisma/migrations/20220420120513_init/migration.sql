/*
  Warnings:

  - You are about to drop the `_recipetouser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorId` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_recipetouser` DROP FOREIGN KEY `_recipetouser_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_recipetouser` DROP FOREIGN KEY `_recipetouser_ibfk_2`;

-- AlterTable
ALTER TABLE `recipe` ADD COLUMN `authorId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_recipetouser`;

-- AddForeignKey
ALTER TABLE `Recipe` ADD CONSTRAINT `Recipe_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
