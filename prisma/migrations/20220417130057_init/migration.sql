/*
  Warnings:

  - Added the required column `glutenFree` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `porkFree` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vegan` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `recipe` ADD COLUMN `glutenFree` BOOLEAN NOT NULL,
    ADD COLUMN `porkFree` BOOLEAN NOT NULL,
    ADD COLUMN `vegan` BOOLEAN NOT NULL;
