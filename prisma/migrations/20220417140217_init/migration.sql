/*
  Warnings:

  - The primary key for the `ingredient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ingredient` table. All the data in the column will be lost.
  - The primary key for the `recipe` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `recipe` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - The required column `uuid` was added to the `Ingredient` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `Recipe` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `_ingredienttorecipe` DROP FOREIGN KEY `_ingredienttorecipe_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_ingredienttorecipe` DROP FOREIGN KEY `_ingredienttorecipe_ibfk_2`;

-- DropIndex
DROP INDEX `Ingredient_id_key` ON `ingredient`;

-- DropIndex
DROP INDEX `Recipe_id_key` ON `recipe`;

-- DropIndex
DROP INDEX `User_id_key` ON `user`;

-- AlterTable
ALTER TABLE `ingredient` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `uuid` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`uuid`);

-- AlterTable
ALTER TABLE `recipe` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `uuid` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`uuid`);

-- AlterTable
ALTER TABLE `user` DROP COLUMN `id`,
    ADD COLUMN `uuid` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`uuid`);

-- AddForeignKey
ALTER TABLE `_IngredientToRecipe` ADD FOREIGN KEY (`A`) REFERENCES `Ingredient`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_IngredientToRecipe` ADD FOREIGN KEY (`B`) REFERENCES `Recipe`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;
