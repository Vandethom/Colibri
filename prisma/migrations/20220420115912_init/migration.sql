/*
  Warnings:

  - You are about to drop the column `recipes` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `recipes`;

-- CreateTable
CREATE TABLE `_RecipeToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_RecipeToUser_AB_unique`(`A`, `B`),
    INDEX `_RecipeToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_RecipeToUser` ADD FOREIGN KEY (`A`) REFERENCES `Recipe`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RecipeToUser` ADD FOREIGN KEY (`B`) REFERENCES `User`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;
