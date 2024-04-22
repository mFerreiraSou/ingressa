/*
  Warnings:

  - You are about to drop the column `vendaId` on the `vendas` table. All the data in the column will be lost.
  - Added the required column `clienteId` to the `vendas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "vendas" DROP CONSTRAINT "vendas_vendaId_fkey";

-- AlterTable
ALTER TABLE "vendas" DROP COLUMN "vendaId",
ADD COLUMN     "clienteId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "vendas" ADD CONSTRAINT "vendas_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
