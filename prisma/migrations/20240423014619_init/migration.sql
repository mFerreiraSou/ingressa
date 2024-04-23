/*
  Warnings:

  - You are about to drop the column `loteId` on the `ingressos` table. All the data in the column will be lost.
  - You are about to drop the column `ingressoId` on the `vendas` table. All the data in the column will be lost.
  - Added the required column `lote` to the `ingressos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingresso` to the `vendas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ingressos" DROP CONSTRAINT "ingressos_loteId_fkey";

-- DropForeignKey
ALTER TABLE "vendas" DROP CONSTRAINT "vendas_ingressoId_fkey";

-- AlterTable
ALTER TABLE "ingressos" DROP COLUMN "loteId",
ADD COLUMN     "lote" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "vendas" DROP COLUMN "ingressoId",
ADD COLUMN     "ingresso" TEXT NOT NULL;
