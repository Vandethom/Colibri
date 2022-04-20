/*
  Warnings:

  - You are about to drop the column `created_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `_recipetouser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_recipetouser` DROP FOREIGN KEY `_recipetouser_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_recipetouser` DROP FOREIGN KEY `_recipetouser_ibfk_2`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `created_at`,
    DROP COLUMN `email`,
    DROP COLUMN `lastName`,
    DROP COLUMN `password`,
    DROP COLUMN `updated_at`;

-- DropTable
DROP TABLE `_recipetouser`;
