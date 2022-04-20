/*
  Warnings:

  - You are about to drop the column `recipeId` on the `ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `ingredientsId` on the `recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ingredient` DROP COLUMN `recipeId`;

-- AlterTable
ALTER TABLE `recipe` DROP COLUMN `ingredientsId`;
