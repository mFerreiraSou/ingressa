/*
  Warnings:

  - Added the required column `quantidade` to the `lotes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lotes" ADD COLUMN     "quantidade" INTEGER NOT NULL;
