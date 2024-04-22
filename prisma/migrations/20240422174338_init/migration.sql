/*
  Warnings:

  - You are about to drop the `categorias_ingresso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lotes_ingresso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoriaId` to the `ingressos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loteId` to the `ingressos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingressoId` to the `vendas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendaId` to the `vendas` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "clientes_celular_key";

-- AlterTable
ALTER TABLE "ingressos" ADD COLUMN     "categoriaId" TEXT NOT NULL,
ADD COLUMN     "loteId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "vendas" ADD COLUMN     "ingressoId" TEXT NOT NULL,
ADD COLUMN     "vendaId" TEXT NOT NULL;

-- DropTable
DROP TABLE "categorias_ingresso";

-- DropTable
DROP TABLE "lotes_ingresso";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "categorias" (
    "id" TEXT NOT NULL,
    "inteira" TEXT NOT NULL,
    "meia" TEXT NOT NULL,
    "vip" TEXT NOT NULL,
    "sorteio" TEXT NOT NULL,
    "cortesia" TEXT NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lotes" (
    "id" TEXT NOT NULL,
    "lote" TEXT NOT NULL,
    "categoriaId" TEXT NOT NULL,

    CONSTRAINT "lotes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lotes" ADD CONSTRAINT "lotes_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingressos" ADD CONSTRAINT "ingressos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingressos" ADD CONSTRAINT "ingressos_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "lotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendas" ADD CONSTRAINT "vendas_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendas" ADD CONSTRAINT "vendas_ingressoId_fkey" FOREIGN KEY ("ingressoId") REFERENCES "ingressos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
