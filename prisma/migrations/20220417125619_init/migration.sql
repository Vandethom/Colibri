/*
  Warnings:

  - Added the required column `date` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `glutenFree` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `porkFree` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vegan` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `recipe` ADD COLUMN `date` DATETIME(3) NOT NULL,
    ADD COLUMN `glutenFree` BOOLEAN NOT NULL,
    ADD COLUMN `porkFree` BOOLEAN NOT NULL,
    ADD COLUMN `vegan` BOOLEAN NOT NULL,
    MODIFY `steps` VARCHAR(12000) NOT NULL;
