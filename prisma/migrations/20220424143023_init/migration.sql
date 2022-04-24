/*
  Warnings:

  - You are about to drop the `_ingredienttorecipe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ingredienttorecipe` DROP FOREIGN KEY `_ingredienttorecipe_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_ingredienttorecipe` DROP FOREIGN KEY `_ingredienttorecipe_ibfk_2`;

-- DropTable
DROP TABLE `_ingredienttorecipe`;
