/*
  Warnings:

  - Added the required column `name` to the `Algorithm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `section` to the `Algorithm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Algorithm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Algorithm` ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `section` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;
