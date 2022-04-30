/*
  Warnings:

  - You are about to drop the column `authorId` on the `recipe` table. All the data in the column will be lost.
  - Added the required column `authorUuid` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `recipe` DROP FOREIGN KEY `Recipe_authorId_fkey`;

-- AlterTable
ALTER TABLE `recipe` DROP COLUMN `authorId`,
    ADD COLUMN `authorUuid` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Recipe` ADD CONSTRAINT `Recipe_authorUuid_fkey` FOREIGN KEY (`authorUuid`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
