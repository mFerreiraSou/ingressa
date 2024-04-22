/*
  Warnings:

  - You are about to drop the column `categoriaId` on the `ingressos` table. All the data in the column will be lost.
  - You are about to drop the column `categoriaId` on the `lotes` table. All the data in the column will be lost.
  - You are about to drop the `categorias` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoria` to the `ingressos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoria` to the `lotes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ingressos" DROP CONSTRAINT "ingressos_categoriaId_fkey";

-- DropForeignKey
ALTER TABLE "lotes" DROP CONSTRAINT "lotes_categoriaId_fkey";

-- AlterTable
ALTER TABLE "ingressos" DROP COLUMN "categoriaId",
ADD COLUMN     "categoria" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "lotes" DROP COLUMN "categoriaId",
ADD COLUMN     "categoria" TEXT NOT NULL;

-- DropTable
DROP TABLE "categorias";
