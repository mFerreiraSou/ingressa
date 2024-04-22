/*
  Warnings:

  - Added the required column `sobrenome` to the `clientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clientes" ADD COLUMN     "sobrenome" TEXT NOT NULL;
