/*
  Warnings:

  - You are about to drop the column `date` on the `recipe` table. All the data in the column will be lost.
  - You are about to drop the column `glutenFree` on the `recipe` table. All the data in the column will be lost.
  - You are about to drop the column `porkFree` on the `recipe` table. All the data in the column will be lost.
  - You are about to drop the column `vegan` on the `recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `recipe` DROP COLUMN `date`,
    DROP COLUMN `glutenFree`,
    DROP COLUMN `porkFree`,
    DROP COLUMN `vegan`;
