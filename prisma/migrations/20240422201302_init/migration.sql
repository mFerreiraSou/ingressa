/*
  Warnings:

  - You are about to drop the column `clienteId` on the `vendas` table. All the data in the column will be lost.
  - You are about to drop the column `desconto` on the `vendas` table. All the data in the column will be lost.
  - Added the required column `valor` to the `vendas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "vendas" DROP CONSTRAINT "vendas_clienteId_fkey";

-- AlterTable
ALTER TABLE "vendas" DROP COLUMN "clienteId",
DROP COLUMN "desconto",
ADD COLUMN     "valor" DOUBLE PRECISION NOT NULL;
